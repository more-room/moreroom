import pandas as pd
from datetime import date, datetime

## ------ 다른 파일 함수
from dbutils import mysql_connect, mysql_disconnect, mysql_read_all
from dbutils import mongo_connect, mongo_get_collection, mongo_save_with_delete, mongo_save_with_update, mongo_disconnect
from file_utils import save_logs

def load_db_data():
    connection = mysql_connect()
    members = mysql_read_all(connection, "SELECT * FROM member")
    # pandas DataFrame으로 변환
    m_df = pd.DataFrame(members)

    # 특정 컬럼만 선택
    member_df =  m_df[m_df['delFlag'] == 0][['memberId', 'gender', 'birth']]
    # 나이대 계산
    current_year = datetime.now().year
    member_df['age'] = current_year - member_df['birth'].apply(lambda x: x.year)
    member_df['age_group'] = member_df['age'].apply(lambda age: (age // 10) * 10)

    # 리뷰 데이터 읽기
    # review_df = pd.read_csv(path+"dummy_userThemeReview.csv", encoding='utf-8')
    reviews = mysql_read_all(connection, "SELECT memberId, themeId, score, reviewId FROM review")
    review_df = pd.DataFrame(reviews)
    # pandas DataFrame으로 변환
    m_df = pd.DataFrame(members)

    mysql_disconnect(connection)

    return member_df, review_df 

def calculate_theme_score(rm_df, N=10):
    # 연령대, 성별, 테마 별로 평균 점수와 점수 개수 계산
    grouped = rm_df.groupby(['age_group', 'gender', 'themeId']).agg(
        score_mean=('score', 'mean'),
        score_count=('score', 'size')
    ).reset_index()

    # 연령대, 성별로 묶어서 N개의 테마를 평균 점수와 점수 개수 기준으로 정렬
    result_dict = grouped.groupby(['age_group', 'gender']).apply(
        lambda x: x.sort_values(by=['score_mean', 'score_count'], ascending=False).head(N)
    ).reset_index(drop=True)

    # 리스트로 변환
    result = []
    
    for (age_group, gender), group_data in result_dict.groupby(['age_group', 'gender']):
        current = {}
        current['groupId'] = f"{age_group}_{gender}"
        current['demographicThemes'] = group_data['themeId'].tolist()  # 테마 ID 리스트
        current['demographicThemesScore'] = group_data['score_mean'].tolist()  # 평균 점수 리스트
        current['demographicThemesScoreCount'] = group_data['score_count'].tolist()  # 평균 점수 리스트
        
        result.append(current)

    return result 

def save_data(result):
    client = mongo_connect()
    try:
        col = mongo_get_collection(client, "themeRec", "demographicsTheme")
        mongo_save_with_delete(col, result)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        mongo_disconnect(client)


def save_log(result, N=10):
    target_info = (f"================ 인기 테마 상위 10개 ==============\n")
    for row in result:
        group_id = row['groupId']
        theme_ids = row['demographicThemes']
        score = row['demographicThemesScore']
        scoreCount = row['demographicThemesScoreCount']
        
        target_info += (f"그룹 ID: {group_id}\n")

        for i in range(N):
            target_info += (
                        f"테마 ID: {theme_ids[i]}, 점수: {score[i]}({scoreCount[i]}개)\n"
                        
                    )
        
        target_info += ("--------------------------------------------------\n")
        
    save_logs('C:/SSAFY/3_특화프로젝트/data/logs/', "dm", target_info)


def get_demographics_theme():
    member_df, review_df = load_db_data()
    rm_df = pd.merge(review_df, member_df, on='memberId')
    result = calculate_theme_score(rm_df)
    save_data(result)
    save_log(result)
    # print(top_reviews_by_age_gender)




