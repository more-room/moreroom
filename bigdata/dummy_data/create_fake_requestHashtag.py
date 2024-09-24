import mysql.connector
import random
from dotenv import load_dotenv
import os

# DB에서 파티 요청과 해시태그 데이터 가져오기
def fetch_party_requests_and_hashtags():
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

        # 파티 요청 가져오기 쿼리
        fetch_party_requests_query = "SELECT partyRequestId FROM PartyRequest"
        cursor.execute(fetch_party_requests_query)
        party_requests = cursor.fetchall()

        # 해시태그 그룹ID가 1인 해시태그 가져오기 쿼리
        fetch_hashtags_query = "SELECT hashtagId FROM Hashtag WHERE hashtagGroupId = 1"
        cursor.execute(fetch_hashtags_query)
        hashtags = cursor.fetchall()

        return party_requests, hashtags

    except mysql.connector.Error as error:
        print(f"데이터 가져오는 중 오류 발생: {error}")
        return [], []

    finally:
        # 연결 종료
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")


# 파티 요청-해시태그 매핑 데이터 생성 (각 파티 요청당 3개의 해시태그, 중복 없음)
def generate_party_request_hashtag_mapping_data(party_requests, hashtags):
    party_request_hashtag_mappings = []
    
    for party_request in party_requests:
        party_request_id = party_request[0]
        num_hashtags = 3  # 각 파티 요청에 3개의 해시태그 할당
        selected_hashtags = random.sample(hashtags, num_hashtags)  # 해시태그 중 중복 없이 랜덤으로 선택
        
        for hashtag in selected_hashtags:
            hashtag_id = hashtag[0]
            # 매핑 데이터 생성
            mapping = {
                'party_request_id': party_request_id,
                'hashtag_id': hashtag_id
            }
            party_request_hashtag_mappings.append(mapping)
    
    return party_request_hashtag_mappings


# DB에 매핑 데이터 삽입
def insert_party_request_hashtag_mappings_to_db(mappings):
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
        INSERT INTO RequestHashtagMapping (partyRequestId, hashtagId)
        VALUES (%s, %s)
        """
        
        # 매핑 데이터를 하나씩 삽입
        for mapping in mappings:
            cursor.execute(insert_query, (mapping['party_request_id'], mapping['hashtag_id']))
        
        # 변경사항 커밋
        connection.commit()
        print(f"{len(mappings)}개의 파티 요청-해시태그 매핑 데이터가 성공적으로 삽입되었습니다.")

    except mysql.connector.Error as error:
        print(f"데이터 삽입 중 오류 발생: {error}")

    finally:
        # 연결 종료
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")


# 실행 로직
party_requests, hashtags = fetch_party_requests_and_hashtags()
if party_requests and hashtags:
    mappings = generate_party_request_hashtag_mapping_data(party_requests, hashtags)
    insert_party_request_hashtag_mappings_to_db(mappings)
else:
    print("파티 요청 또는 해시태그 데이터를 가져오는 데 문제가 발생했습니다.")