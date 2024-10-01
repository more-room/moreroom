import mysql.connector
from faker import Faker
import random
from dotenv import load_dotenv
import os

fake = Faker('ko_KR')  # 한국 로케일 설정

# DB에서 멤버와 해시태그 데이터 가져오기
def fetch_members_and_hashtags():
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

        # 멤버 가져오기 쿼리 (1000개의 멤버)
        fetch_members_query = "SELECT memberId FROM Member"
        cursor.execute(fetch_members_query)
        members = cursor.fetchall()

        # 해시태그 그룹ID가 4인 해시태그 가져오기 쿼리
        fetch_hashtags_query = "SELECT hashtagId FROM Hashtag WHERE hashtagGroupId = 4"
        cursor.execute(fetch_hashtags_query)
        hashtags = cursor.fetchall()

        return members, hashtags

    except mysql.connector.Error as error:
        print(f"데이터 가져오는 중 오류 발생: {error}")
        return [], []

    finally:
        # 연결 종료
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")


# 멤버-해시태그 매핑 데이터 생성 (각 멤버당 3개의 해시태그, 중복 없음)
def generate_member_hashtag_mapping_data(members, hashtags):
    member_hashtag_mappings = []
    
    for member in members:
        member_id = member[0]
        num_hashtags = 3  # 각 멤버당 3개의 해시태그 할당
        selected_hashtags = random.sample(hashtags, num_hashtags)  # 해시태그 중 중복 없이 랜덤으로 선택
        
        for hashtag in selected_hashtags:
            hashtag_id = hashtag[0]
            # 매핑 데이터 생성
            mapping = {
                'member_id': member_id,
                'hashtag_id': hashtag_id
            }
            member_hashtag_mappings.append(mapping)
    
    return member_hashtag_mappings


# DB에 매핑 데이터 삽입
def insert_member_hashtag_mappings_to_db(mappings):
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
        INSERT INTO MemberHashtagMapping (memberId, hashtagId)
        VALUES (%s, %s)
        """
        
        # 매핑 데이터를 하나씩 삽입
        for mapping in mappings:
            cursor.execute(insert_query, (mapping['member_id'], mapping['hashtag_id']))
        
        # 변경사항 커밋
        connection.commit()
        print(f"{len(mappings)}개의 멤버-해시태그 매핑 데이터가 성공적으로 삽입되었습니다.")

    except mysql.connector.Error as error:
        print(f"데이터 삽입 중 오류 발생: {error}")

    finally:
        # 연결 종료
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")


# 실행 로직
members, hashtags = fetch_members_and_hashtags()
if members and hashtags:
    mappings = generate_member_hashtag_mapping_data(members, hashtags)
    insert_member_hashtag_mappings_to_db(mappings)
else:
    print("멤버 또는 해시태그 데이터를 가져오는 데 문제가 발생했습니다.")
