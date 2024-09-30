import pandas as pd
import numpy as np
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import matplotlib.pyplot as plt
import seaborn as sns
from konlpy.tag import Okt
import re

### 다른 파일 import 
from dbutils import mysql_connect, mysql_disconnect, mysql_read_all
from dbutils import mongo_connect, mongo_get_collection, mongo_save_with_delete, mongo_save_with_update, mongo_disconnect
from data_center import get_genre_names
from file_utils import save_logs



### ------------ 최근 방문한 테마와 비슷한 테마 

# ## 로컬환경 데이터 로드
def load_local_data(path):
    # 이때 폐업한 카페 테마는 제외해야 한다 
    theme_df = pd.read_csv(path+"mr_theme.csv", encoding='utf-8')
    tg_df = pd.read_csv(path+"mr_themegenre.csv", encoding='utf-8')

    # 리뷰 데이터 읽기
    review_df = pd.read_csv(path+"dummy_userThemeReview.csv", encoding='utf-8')

    return theme_df, tg_df, review_df

# ## 서버 데이터 로드
def load_mysql_data():
    connection = mysql_connect()

    theme = mysql_read_all(connection, "SELECT t.themeId, t.cafeId, t.poster, t.title, t.playtime, t.minPeople, t.maxPeople, t.level, t.price, t.description, t.problemScore, t.storyScore, t.activityScore, t.fearScore, t.userLevelJb FROM THEME t Left join cafe c on t.cafeId = c.cafeId where c.openFlag = true")
    theme_df = pd.DataFrame(theme)
    tg = mysql_read_all(connection, "SELECT themeId, genreId FROM membergenremapping")
    tg_df = pd.DataFrame(tg)
    review = mysql_read_all(connection, "SELECT memberId, themeId, score, reviewId FROM review")
    review_df = pd.DataFrame(review)

    mysql_disconnect(connection)

    return theme_df, tg_df, review_df 

# ### 로직
# 1. 메타 데이터 기반 유사도 계산 
# 2. 장르 데이터 기반 유사도 계산
# 3. 줄거리 기반 유사도 계산
# 4. 유저 평점 기반 유사도 계산 
# 5. CB, CFB 종합하여 통합 모델 완성 
# 6. N개 테마 추출하여 DF 생성
# 7. DB 저장 


# #### 데이터 전처리

# - 각 열마다 최솟값과 최댓값이 다르기 때문에, Min-Max Scaling을 거쳐 정규화 해준다
# - 장르는 다중 값을 가지기 때문에, 원-핫 인코딩을 이용해 벡터화한다 -> 다른 열들은 0~1의 값으로 정규화했기 때문에, 0,1이라는 장르 값이 들어가면 너무 가중될 것 같고, 값이 달라질 것 같음 => 별도 모델로 진행
# - 줄거리를 자연어 처리한 후, TF-IDF 매트릭스를 구축한다
#     - linear_kernel은 각 TF-IDF 값을 다차원 공간에 벡터로 배치한 뒤, 코사인 유사도를 계산 


# #### 1. 메타 데이터 기반 유사도 계산 
def get_meta_similarity(theme_df):
    target_features = [ 'level', 'problemScore', 'storyScore', 'activityScore', 'fearScore', 'userLevelJb'] 

    # 전처리
    # ##### Min-Max Scaling 
    scaler = MinMaxScaler()
    scaled_features = scaler.fit_transform(theme_df[target_features])


    # ##### 메타 데이터 유사도
    similarity_normal = cosine_similarity(scaled_features)  
    
    return similarity_normal


# #### 2. 장르 데이터 기반 유사도 계산
def get_gen_similarity(tg_df):
    # ##### 장르 벡터화
    # 테마 별로 장르 집계
    grouped_genres = tg_df.groupby('themeId')['genreId'].apply(list).reset_index()

    # 원-핫 인코딩을 위해 MultiLabelBinarizer 사용
    mlb = MultiLabelBinarizer()
    encoded_genres = mlb.fit_transform(grouped_genres['genreId'])

    # ##### 장르 유사도
    similarity_genre = cosine_similarity(encoded_genres)

    return similarity_genre, grouped_genres 



# #### 3. 줄거리 기반 유사도 계산
def get_des_similarity(theme_df):

    # ##### 줄거리 데이터 전처리 
    okt = Okt()

    def sub_special(s): # 한글, 숫자, 영어 빼고 전부 제거
        if isinstance(s, float):  # 입력 값이 float일 경우 빈 문자열로 변환
            return ''
        return re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣0-9a-zA-Z ]','',s)

    stops = ['의','가','이','은','들','는', '을', '좀','잘','걍','과','도','를','으로','자','에','와','한','하다']

    def morph_and_stopword(s):
        #형태소 분석
        tmp = okt.pos(s, norm=True, stem=True)

        tokens = []
        # 조사, 어미, 구두점 제외
        for token in tmp:
            if token[1] not in ['Josa', 'Eomi', 'Punctuation']:
                tokens.append(token[0])
        
        #불용어 처리
        meaningful_words = [w for w in tokens if not w in stops]

        return ' '.join(meaningful_words)


    theme_df.loc[:, "description_analysis"] = theme_df.loc[:, "description"].apply(sub_special)
    theme_df.loc[:, "description_analysis"] = theme_df.loc[:, "description_analysis"].apply(morph_and_stopword)


    # ##### 줄거리 데이터 TF-IDF 생성
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(theme_df.get('description_analysis', ''))

    similarity_dis = linear_kernel(tfidf_matrix, tfidf_matrix)

    return similarity_dis 


# CB 유사도 
def get_CB_similarity(theme_df, tg_df, normal_per=0.7, genre_per=0.15, dis_per=0.15):
    similarity_normal = get_meta_similarity(theme_df)
    similarity_genre, grouped_genres = get_gen_similarity(tg_df)
    similarity_dis = get_des_similarity(theme_df)
    # ##### 최종 유사도
    cb_similarity = similarity_normal*normal_per + similarity_genre*genre_per + similarity_dis*dis_per

    return cb_similarity, similarity_normal, similarity_genre, grouped_genres, similarity_dis


# #### 4. 유저 평점 기반 유사도 계산
def get_review_similarity(review_df):
    # #### 유저 평점과 테마 테이블 합산

    # pivot 테이블로 변환
    review_pivot_df = review_df.pivot(index='themeId', columns='memberId', values='score')
    review_pivot_df.fillna(0, inplace=True)

    # 유사도 계산
    similarity_review = cosine_similarity(review_pivot_df)

    return similarity_review


def get_CFB_similarity(review_df):
    cfb_similarity = get_review_similarity(review_df)
    return cfb_similarity





# #### 5. CB, CFB 종합하여 통합 모델 완성 
# - CB 필터링 모델과 CFB 필터링 모델을 결합하여 최종 유사도를 계산한다
def get_hybrid_similarity(theme_df, tg_df, review_df, cb_per=0.9, cfb_per=0.1):
    cb_similarity, similarity_normal, similarity_genre, grouped_genres, similarity_dis = get_CB_similarity(theme_df, tg_df)
    cfb_similarity = get_CFB_similarity(review_df)

    hybrid_similarity = cb_per*cb_similarity + cfb_per*cfb_similarity 

    return hybrid_similarity, similarity_normal, similarity_genre, grouped_genres, similarity_dis, cfb_similarity



# #### 6. N개 테마 추출하여 DF 생성
def extract_total_similar_theme(theme_df, total_model, N=10, threshold=0.3):
    top_n_ids = []

    for i in range(total_model.shape[0]):
        top_n = {}
        indices = np.argsort(-total_model[i])[:N+1]  
        top_n_list = [int(theme_df.loc[index, 'themeId']) for index in indices if index != i and total_model[i][index] > threshold]
        top_n_sim_list = [total_model[i][index] for index in indices if index != i and total_model[i][index] > threshold]
        top_n['themeId'] = int(theme_df.loc[i, 'themeId'])
        top_n['similarThemes'] = top_n_list
        top_n['similarThemesSim'] = top_n_sim_list
        top_n_ids.append(top_n)
    
    return top_n_ids


# #### 7. DB 저장 
def save_data(result):
    client = mongo_connect()
    try:
        col = mongo_get_collection(client, "themeRec", "similarTheme")
        mongo_save_with_delete(col, result)
        # mongo_save_with_update(col, result)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        mongo_disconnect(client)


# #### 8. 로그 출력
def save_log(theme_df, tg_df, review_df, result, similarity_normal, similarity_genre, grouped_genres, similarity_dis, similarity_review, N=10):
    target_theme_index = 393
    # 대상 테마 정보 출력
    theme_title = theme_df.loc[target_theme_index, 'title']
    target_info = (
        f"대상 => ID: {theme_df.loc[target_theme_index, 'themeId']}, 제목: {theme_title}\n"
        f"{theme_df.loc[target_theme_index, 'description']}\n"
        f"장르: {get_genre_names(grouped_genres.loc[target_theme_index, 'genreId'])}\n\n\n"
    )
    

    # 상위 10개의 유사한 항목 출력
    target_info += (f"================ 유사 테마 상위 10개 ==============\n")

    for i in range(N):
        id = result[target_theme_index]['similarThemes'][i]
        sim = result[target_theme_index]['similarThemesSim'][i]
        index = theme_df.loc[theme_df['themeId'] == id].index[0]
        theme_title = theme_df.iloc[index]['title']
        target_info += (
            f"=================== {i+1}번째 =====================\n"
            f"ID: {theme_df.iloc[index]['themeId']}, 제목: {theme_title}, 유사도: {sim} \n"
            f"메타데이터 유사도: {similarity_normal[index][target_theme_index]}\n"
            f"장르 유사도: {similarity_genre[index][target_theme_index]}\n"
            f"줄거리 유사도: {similarity_dis[index][target_theme_index]}\n"
            f"평점 유사도: {similarity_review[index][target_theme_index]}\n"
            f"--------------------------------------------------\n"
            f"줄거리: {theme_df.iloc[index]['description']}\n"
            f"장르: {get_genre_names(grouped_genres.loc[index, 'genreId'])}\n\n\n"
        )                  

    save_logs('log/', "st", target_info)


# 메인 로직 
def get_recent_similar_theme():
    # theme_df, tg_df, review_df = load_local_data('C:/SSAFY/3_특화프로젝트/data/')
    theme_df, tg_df, review_df = load_mysql_data()
    hybrid_model, similarity_normal, similarity_genre, grouped_genres, similarity_dis, similarity_review = get_hybrid_similarity(theme_df, tg_df, review_df)
    result = extract_total_similar_theme(theme_df, hybrid_model) 
    save_data(result)
    save_log(theme_df, tg_df, review_df, result, similarity_normal, similarity_genre, grouped_genres, similarity_dis, similarity_review)
    # print(result)
    



## ----------------------------------------
'''
# 텍스트 파일에 기록하고 콘솔에도 출력하기 위한 함수
def log_and_print(text, file):
    print(text)  # 콘솔에 출력
    file.write(text + '\n')  # 파일에 기록



def extract_rec_theme(target_id, total_model, N=10):
    target_theme_index = int(theme_df.loc[theme_df['themeId'] == target_id].index[0])

    target_similarity = total_model[target_theme_index]
    top_N_themes = np.argsort(-target_similarity)[:N+1]
    top_N_themes = [idx for idx in top_N_themes if idx != target_theme_index]
    
    # 실행 시각을 기반으로 파일명 생성
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"log_{current_time}.txt"
    
    # 파일 열기 (쓰기 모드)
    with open(file_name, 'w') as log_file:
        top_N_similar_items = [(index, target_similarity[index]) for index in top_N_themes]
        # 대상 테마 정보 출력
        theme_title = theme_df.loc[target_theme_index, 'title']
        log_and_print(f"대상 => ID: {theme_df.loc[target_theme_index, 'themeId']}, 제목: {theme_title}", log_file)
        log_and_print(theme_df.loc[target_theme_index, 'description'], log_file)
        log_and_print(f"장르: {grouped_genres.loc[target_theme_index, 'genreId']} {encoded_genres[target_theme_index]}", log_file)
        log_and_print("", log_file)  # 빈 줄
    
        # 상위 10개의 유사한 항목 출력
        log_and_print("상위 10개의 유사한 항목:", log_file)
        for index, sim in top_N_similar_items:
            theme_title = theme_df.loc[index, 'title']
            log_and_print(f"ID: {theme_df.loc[index, 'themeId']}, 제목: {theme_title}, 유사도: {sim} ({similarity_normal[index][target_theme_index]*normal_per} + {similarity_genre[index][target_theme_index]*genre_per} + {similarity_dis[index][target_theme_index]*dis_per})", log_file)
            log_and_print(f"메타데이터 유사도: {similarity_normal[index][target_theme_index]}", log_file)
            log_and_print(f"장르 유사도: {similarity_genre[index][target_theme_index]}", log_file)
            log_and_print(f"줄거리 유사도: {similarity_dis[index][target_theme_index]}", log_file)
            log_and_print(f"평점 유사도: {similarity_review[index][target_theme_index]}", log_file)
            log_and_print(f"줄거리: {theme_df.loc[index, 'description']}", log_file)
            log_and_print(f"장르: {grouped_genres.loc[index, 'genreId']} {encoded_genres[index]}", log_file)
            log_and_print("", log_file)  # 빈 줄 추가
'''

