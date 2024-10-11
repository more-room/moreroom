import mysql.connector
from faker import Faker
import random
from dotenv import load_dotenv
import os

fake = Faker('ko_KR')  # 한국 로케일 설정

# DB에서 멤버와 장르 데이터 가져오기
def fetch_members_and_genres():
    try:
        load_dotenv()
        # MySQL 연결 설정
        connection = mysql.connector.connect(
            host = os.getenv('HOST'),
            user = os.getenv('USER'),  # 데이터베이스 사용자 이름
            password = os.getenv('PASSWORD'),  # 데이터베이스 비밀번호
            database = os.getenv('DATABASE'),  # 사용할 데이터베이스 이름
            port = os.getenv('PORT')
        )
        cursor = connection.cursor()

        # 멤버 가져오기 쿼리 (예: 1300명의 멤버)
        fetch_members_query = "SELECT memberId FROM Member LIMIT 1300"
        cursor.execute(fetch_members_query)
        members = cursor.fetchall()

        # 장르 가져오기 쿼리
        fetch_genres_query = "SELECT genreId FROM Genre"
        cursor.execute(fetch_genres_query)
        genres = cursor.fetchall()

        return members, genres

    except mysql.connector.Error as error:
        print(f"데이터 가져오는 중 오류 발생: {error}")
        return [], []

    finally:
        # 연결 종료
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")


# 멤버-장르 매핑 데이터 생성 (각 멤버당 2~4개의 장르, 중복 없음)
def generate_member_genre_mapping_data(members, genres):
    member_genre_mappings = []
    
    for member in members:
        member_id = member[0]
        num_genres = random.randint(3, 6)  # 각 멤버당 3~6개의 장르 할당
        selected_genres = random.sample(genres, num_genres)  # 장르 중 중복 없이 랜덤으로 선택
        
        for genre in selected_genres:
            genre_id = genre[0]
            # 매핑 데이터 생성
            mapping = {
                'member_id': member_id,
                'genre_id': genre_id
            }
            member_genre_mappings.append(mapping)
    
    return member_genre_mappings


# DB에 매핑 데이터 삽입
def insert_member_genre_mappings_to_db(mappings):
    try:
        load_dotenv()
        # MySQL 연결 설정
        connection = mysql.connector.connect(
            host = os.getenv('HOST'),
            user = os.getenv('USER'),  # 데이터베이스 사용자 이름
            password = os.getenv('PASSWORD'),  # 데이터베이스 비밀번호
            database = os.getenv('DATABASE'),  # 사용할 데이터베이스 이름
            port = os.getenv('PORT')
        )
        cursor = connection.cursor()

        # INSERT 쿼리
        insert_query = """
        INSERT INTO MemberGenreMapping (memberId, genreId)
        VALUES (%s, %s)
        """
        
        # 매핑 데이터를 하나씩 삽입
        for mapping in mappings:
            cursor.execute(insert_query, (mapping['member_id'], mapping['genre_id']))
        
        # 변경사항 커밋
        connection.commit()
        print(f"{len(mappings)}개의 멤버-장르 매핑 데이터가 성공적으로 삽입되었습니다.")

    except mysql.connector.Error as error:
        print(f"데이터 삽입 중 오류 발생: {error}")

    finally:
        # 연결 종료
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")


# 실행 로직
members, genres = fetch_members_and_genres()
if members and genres:
    mappings = generate_member_genre_mapping_data(members, genres)
    insert_member_genre_mappings_to_db(mappings)
else:
    print("멤버 또는 장르 데이터를 가져오는 데 문제가 발생했습니다.")
