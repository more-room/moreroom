import pandas as pd
from datetime import date, datetime

## ------ 다른 파일 함수
from dbutils import mysql_connect, mysql_disconnect, mysql_read_all
from dbutils import mongo_connect, mongo_get_collection, mongo_save_with_delete, mongo_save_with_update, mongo_disconnect
from file_utils import save_logs

def load_db_data():
    connection = mysql_connect()
    # 플레이로그 데이터 읽기
    reviews = mysql_read_all(connection, "SELECT memberId, themeId, score, reviewId FROM review")
    review_df = pd.DataFrame(reviews)

    # 테마장르 데이터 읽기
    tgs = mysql_read_all(connection, "SELECT themeId, genreId FROM themegenremapping")
    tg_df = pd.DataFrame(tgs) 
    # pandas DataFrame으로 변환

    mysql_disconnect(connection)

    return review_df, tg_df  

def bayesian_average(row, C, m):
    R = row['score_mean']   # 해당 테마의 평균 점수
    v = row['score_count']   # 해당 테마의 리뷰 개수
    return (C * m + R * v) / (C + v)

def calculate_theme_score(rg_df, N=10):
    # 테마 별로 평균 점수와 점수 개수 계산
    theme_stats = rg_df.groupby(['themeId', 'genreId']).agg(
        score_mean=('score', 'mean'),      # 평균 점수
        score_count=('score', 'size')      # 리뷰 개수
    ).reset_index()

    # 전체 평균 점수와 전체 리뷰 개수의 평균 (베이지안 평균에 사용될 기준값)
    C = theme_stats['score_count'].mean()  
    m = theme_stats['score_mean'].mean()  

    # 각 테마별로 베이지안 평균 계산
    theme_stats['bayesian_avg'] = theme_stats.apply(lambda row: bayesian_average(row, C, m), axis=1)

    # 연령대, 성별로 묶어서 N개의 테마를 평균 점수와 점수 개수 기준으로 정렬
    # 6. 각 장르별로 베이지안 평균을 기준으로 상위 10개 테마를 추출
    top_themes_by_genre = theme_stats.groupby('genreId').apply(
        lambda x: x.sort_values(by=['score_mean', 'bayesian_avg'], ascending=False).head(N)
    ).reset_index(drop=True)


    # 전체 장르 - 테마 별로만 평균 점수와 점수 개수 계산
    top_themes_all = theme_stats.sort_values(by=['score_mean', 'bayesian_avg'], ascending=False).head(N)

    # 리스트로 변환
    result = []
    
    for (genreId,), group_data in top_themes_by_genre.groupby(['genreId']):
        current = {}
        current['groupId'] = f"{genreId}"
        current['genreTopThemes'] = group_data['themeId'].tolist()  # 테마 ID 리스트
        current['genreTopThemesScore'] = group_data['score_mean'].tolist()  # 평균 점수 리스트
        current['genreTopThemesScoreCount'] = group_data['score_count'].tolist()  # 평균 점수 리스트
        
        result.append(current)

    # # 전체 데이터 추가
    current = {}
    current['groupId'] = f"Total"
    current['genreTopThemes'] = top_themes_all['themeId'].tolist()  # 테마 ID 리스트
    current['genreTopThemesScore'] = top_themes_all['score_mean'].tolist()  # 평균 점수 리스트
    current['genreTopThemesScoreCount'] = top_themes_all['score_count'].tolist()  # 평균 점수 리스트

    return result 

def save_data(result):
    client = mongo_connect()
    try:
        col = mongo_get_collection(client, "themeRec", "genreThemes")
        mongo_save_with_delete(col, result)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        mongo_disconnect(client)


def save_log(result, N=10):
    target_info = (f"================ 인기 테마 상위 10개 ==============\n")
    for row in result:
        group_id = row['groupId']
        theme_ids = row['genreTopThemes']
        score = row['genreTopThemesScore']
        scoreCount = row['genreTopThemesScoreCount']
        
        target_info += (f"그룹 ID: {group_id}\n")

        for i in range(N):
            target_info += (
                        f"테마 ID: {theme_ids[i]}, 점수: {score[i]}({scoreCount[i]}개)\n"
                        
                    )
        
        target_info += ("--------------------------------------------------\n")
        
    save_logs('log/', "dm", target_info)


def get_genre_theme():
    review_df, tg_df   = load_db_data()
    rg_df = pd.merge(review_df, tg_df, on='themeId')
    result = calculate_theme_score(rg_df)
    save_data(result)
    save_log(result)




