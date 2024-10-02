
import pandas as pd
import numpy as np
from sklearn.metrics import jaccard_score
from scipy.spatial.distance import jaccard
from scipy.sparse import csr_matrix

## ------- 다른 파일 
from dbutils import mysql_connect, mysql_disconnect, mysql_read_all
from dbutils import mongo_connect, mongo_get_collection, mongo_save_with_delete, mongo_disconnect
from data_center import get_genre_names
from file_utils import save_logs

### 로직
# 1. 사용자 - 장르 행렬 생성
# 2. 유저별 유사도 계산
# 3. 테마별 점수의 가중 평균 계산하여 테마 추천 산출 
# 4. 모든 사용자에 대해 계산 
# 5. DB 저장 

# 데이터 로드
def load_local_data(path):
    mr_df = pd.read_csv(path+"dummy_userThemeReview.csv", encoding='utf-8')
    mg_df = pd.read_csv(path+"dummy_memberGenre.csv", encoding='utf-8')

    return mr_df, mg_df

def load_local_data_small(path):
    mr_df = pd.read_csv(path+"dummy_userThemeReview_small.csv", encoding='utf-8')
    mg_df = pd.read_csv(path+"dummy_memberGenre_small.csv", encoding='utf-8')

    return mr_df, mg_df

def load_mysql_data(n=None):
    connection = mysql_connect()
    member_query = "SELECT memberId FROM member order by memberId"
    if n != None:
        member_query += " limit " + str(n)
    member = mysql_read_all(connection, member_query)
    member_df = pd.DataFrame(member)

    member_ids_str = ','.join(map(str, member_df['memberId'].tolist()))
    mr_query = f"SELECT memberId, themeId, score, reviewId FROM review WHERE memberId IN ({member_ids_str})"
    mg_query = f"SELECT memberId, genreId FROM membergenremapping WHERE memberId IN ({member_ids_str})"

    mr = mysql_read_all(connection, mr_query)
    mr_df = pd.DataFrame(mr)
    mg = mysql_read_all(connection, mg_query)
    mg_df = pd.DataFrame(mg)

    mysql_disconnect(connection)

    return member_df, mr_df, mg_df

# 1. 사용자 - 장르 행렬 생성 
# 사용자 - 테마 행렬도 함께 생성
def get_members_matrix(member_df, mr_df, mg_df):
    member_list = member_df['memberId'].tolist() 
    mr_matrix = mr_df.pivot_table(index='memberId', columns='themeId', values='score').reindex(member_list, fill_value=0)
    mg_matrix = mg_df.pivot_table(index='memberId', columns='genreId', aggfunc=lambda x: 1, fill_value=0).reindex(member_list, fill_value=0)
    print(mr_matrix)
    # 희소 행렬로 변환 
    sparse_mg_matrix = csr_matrix(mg_matrix)
    return mr_matrix, sparse_mg_matrix, mr_matrix.index

# 2. 유저별 유사도 계산
# 자카드 유사도 계산
# 선호 장르의 집합 사이의 유사도를 계산하기 때문에, 자카드 유사도를 사용하여 계산한다 
def calculate_jaccard_similarity(mg_matrix, mg_index):
    num_users = mg_matrix.shape[0]
    print(num_users)

    similarity_matrix = np.zeros((num_users, num_users))
    # 희소 행렬의 행렬 곱셈을 통해 유사도 계산
    intersection = mg_matrix.dot(mg_matrix.T).toarray()  # 두 희소 행렬의 교집합
    row_sum = mg_matrix.sum(axis=1).A1  # 각 사용자의 장르 수
    union = row_sum[:, None] + row_sum[None, :] - intersection  # 합집합 계산

    with np.errstate(divide='ignore', invalid='ignore'):
        similarity_matrix = intersection / union  
        similarity_matrix[np.isnan(similarity_matrix)] = 0  # NaN 값 처리
    np.fill_diagonal(similarity_matrix, 1)  # 자기 자신과의 유사도는 1로 설정

    # for i in range(num_users):
    #     member_i = mg_matrix[i].toarray()[0]
    #     # row_i = mg_matrix[i]
    #     for j in range(i, num_users):
    #         member_j = mg_matrix[j].toarray()[0]
    #         # row_j = mg_matrix[j]
            
    #         # 자카드 유사도 계산
    #         # jaccard_sim = jaccard_score(member_i, member_j)
    #         jaccard_sim = 1-jaccard(member_i, member_j)
    #         # 희소 행렬에서 비트 연산을 통해 교집합과 합집합 계산
    #         # intersection = (row_i.multiply(row_j)).sum()
    #         # union = row_i.sum() + row_j.sum() - intersection
            
    #         # # Jaccard 유사도 계산
    #         # jaccard_sim = intersection / union if union != 0 else 0
            
    #         similarity_matrix.iloc[i, j] = jaccard_sim
    #         similarity_matrix.iloc[j, i] = jaccard_sim
    #     if i%100 == 0:
    #        print(f"end user {i}")
    
    # DataFrame으로 변환하고 인덱스를 mg_index로 설정
    similarity_df = pd.DataFrame(similarity_matrix, index=mg_index, columns=mg_index)
    print("calculate jaccard end")
    return similarity_df

# 3. 테마별 점수의 가중 평균 계산하여 테마 추천 산출
def extract_member_similar_theme(mr_matrix, similarity_matrix, member_id, N=10):
    # 선택한 사용자와 다른 사용자 간의 유사도 가져오기
    similar_users = similarity_matrix[member_id].sort_values(ascending=False).index[1:]
    
    # 유사한 사용자가 평가한 테마의 가중 평균 점수 계산
    weighted_scores = pd.Series(dtype=np.float64)
    user_rated_themes = mr_matrix.loc[member_id][mr_matrix.loc[member_id] > 0].index
    
    # 유사도와 평가된 점수를 곱해 한 번에 계산
    other_user_ratings = mr_matrix.loc[similar_users]
    similarity_scores = similarity_matrix.loc[member_id, similar_users]
    
    # 평가하지 않은 테마에 대한 점수 계산
    unrated_scores = other_user_ratings.loc[:, other_user_ratings.columns.difference(user_rated_themes)]
    
    # 가중 평균 점수 계산
    weighted_scores = (unrated_scores.values.T * similarity_scores.values).T.sum(axis=0) / np.abs(similarity_scores).sum()
    
    # 점수 시리즈로 변환
    weighted_scores_series = pd.Series(weighted_scores, index=unrated_scores.columns)

    # for other_user in similar_users:
    #     sim_score = similarity_matrix.loc[member_id, other_user]
    #     other_user_ratings = mr_matrix.loc[other_user]
        
    #     # 사용자가 평가하지 않은 테마에 대한 점수만 가중 평균으로 계산
    #     # diffrence - 차집합 함수로 평가되지 않은 테마 추출
    #     unrated_themes = other_user_ratings[other_user_ratings.index.difference(user_rated_themes)]
    #     weighted_scores = weighted_scores.add(unrated_themes * sim_score, fill_value=0)

    top_N = weighted_scores_series.sort_values(ascending=False).head(N)
    return top_N 


def extract_total_similar_theme(mr_matrix, similarity_matrix, N=10):
    top_n_total = []
    
    for member_id in similarity_matrix.index:
        top_n = {}
        recommendations = extract_member_similar_theme(mr_matrix, similarity_matrix, member_id, N)
        top_n_list = recommendations.index.tolist()
        top_n_sim_list = recommendations.values.tolist()
        top_n['memberId'] = member_id
        top_n['similarMemberThemes'] = top_n_list
        top_n['similarMemberThemesSim'] = top_n_sim_list
        top_n_total.append(top_n)

        if member_id%100 == 0:
           print(f"theme end user {member_id}")
    

    return top_n_total



# #### 5. DB 저장 
def save_data(result):
    client = mongo_connect()
    try:
        col = mongo_get_collection(client, "themeRec", "similarMemberTheme")
        mongo_save_with_delete(col, result)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        mongo_disconnect(client)


# #### 6. 로그 저장 
def save_log(similarity_matrix, result, mg_df, mg_matrix, mg_index, N=10):
    target_user_index = 1
    target_user_id = mg_index[target_user_index]
    genre_ids = mg_df.loc[mg_df['memberId'] == target_user_id, 'genreId'].tolist()
    target_info = (
        f"대상 => ID: {mg_df.loc[target_user_index, 'memberId']}\n"
        f"장르: {get_genre_names(genre_ids)}\n\n\n"
    )
    

    # 상위 10개의 유사한 항목 출력
    similar_users = similarity_matrix.iloc[target_user_index].sort_values(ascending=False).index[1:N+1]
    
    target_info += (f"================ 유사 유저 상위 {N}명 ==============\n")
    for user_id in similar_users:
        genre_ids = mg_df.loc[mg_df['memberId'] == user_id, 'genreId'].tolist()
        similarity_score = similarity_matrix.loc[target_user_id, user_id]
        target_info += (
            f"=================== =====================\n"
            f"ID: {user_id}, 유사도: {similarity_score:.4f}\n"
            f"장르: {get_genre_names(genre_ids)}\n"
        )

    # 상위 10개의 유사한 테마 출력
    target_info += (f"================ 가중 선호도 테마 상위 {N}개 ==============\n")

    for i in range(N):
        id = result[target_user_index]['similarMemberThemes'][i]
        sim = result[target_user_index]['similarMemberThemesSim'][i]
        target_info += (
            f"=================== {i+1}번째 =====================\n"
            f"ID: {id}, 가중 선호도: {sim} \n"
        )                  

    save_logs('log/', "smt", target_info)

    return 

def get_similar_member_theme():
    # mr_df, mg_df = load_local_data_small('C:/SSAFY/3_특화프로젝트/data/')
    # member_df, mr_df, mg_df = load_local_data('C:/SSAFY/3_특화프로젝트/data/')
    member_df, mr_df, mg_df = load_mysql_data()
    mr_matrix, mg_matrix, mg_index = get_members_matrix(member_df, mr_df, mg_df)
    similarity_matrix = calculate_jaccard_similarity(mg_matrix, mg_index)
    result = extract_total_similar_theme(mr_matrix, similarity_matrix)
    save_data(result)
    save_log(similarity_matrix, result, mg_df, mg_matrix, mg_index)
