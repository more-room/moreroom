import mysql.connector
from faker import Faker
import random
from datetime import datetime
from dotenv import load_dotenv
import os

fake = Faker('ko_KR')  # 한국 로케일 설정

# DB에서 memberId와 themeId 가져오는 함수
def fetch_member_theme_ids():
    try:
        load_dotenv()
        # MySQL 연결 설정
        connection = mysql.connector.connect(
            host=os.getenv('HOST'),
            user=os.getenv('USER'),  # 데이터베이스 사용자 이름
            password=os.getenv('PASSWORD'),  # 데이터베이스 비밀번호
            database=os.getenv('DATABASE'),  # 사용할 데이터베이스 이름
            port=os.getenv('PORT')
        )
        cursor = connection.cursor()

        # memberId와 themeId 가져오기
        cursor.execute("SELECT memberId FROM Member")
        member_ids = [row[0] for row in cursor.fetchall()]
        
        cursor.execute("SELECT themeId FROM Theme LIMIT 100")
        theme_ids = [row[0] for row in cursor.fetchall()]
        
        # 멤버 수 가져오기
        member_count = len(member_ids)
        
        return member_ids, theme_ids, member_count

    except mysql.connector.Error as error:
        print(f"데이터 가져오기 중 오류 발생: {error}")
        return [], [], 0

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# 파티 요청 데이터 생성
def generate_party_request_data(num_requests, member_ids, theme_ids):
    party_requests = []
    existing_requests = set()  # 중복된 memberId, themeId 조합을 저장하는 집합
    
    while len(party_requests) < num_requests:
        member_id = random.choice(member_ids)
        theme_id = random.choice(theme_ids)
        
        # 유저와 테마의 조합이 중복되는지 확인
        if (member_id, theme_id) in existing_requests:
            continue  # 중복된 경우, 새로운 조합을 찾기 위해 다시 시도

        created_at = fake.date_time_this_year().strftime('%Y-%m-%d %H:%M:%S')
        last_matched_at = None  # 처음에는 매칭되지 않음
        matching_status = 'NOT_MATCHED'
        
        party_request = {
            'member_id': member_id,
            'theme_id': theme_id,
            'created_at': created_at,
            'last_matched_at': last_matched_at,
            'matching_status': matching_status
        }
        
        # 새로운 요청 데이터를 리스트에 추가하고, 해당 조합을 집합에 저장
        party_requests.append(party_request)
        existing_requests.add((member_id, theme_id))  # 조합 저장
    
    return party_requests


# DB에 파티 요청 데이터 삽입
def insert_party_request_data_to_db(party_request_data):
    try:
        load_dotenv()
        # MySQL 연결 설정
        connection = mysql.connector.connect(
            host=os.getenv('HOST'),
            user=os.getenv('USER'),  # 데이터베이스 사용자 이름
            password=os.getenv('PASSWORD'),  # 데이터베이스 비밀번호
            database=os.getenv('DATABASE'),  # 사용할 데이터베이스 이름
            port=os.getenv('PORT')
        )
        cursor = connection.cursor()

        # INSERT 쿼리
        insert_query = """
        INSERT INTO PartyRequest (memberId, themeId, createdAt, lastMatchedAt, matchingStatus)
        VALUES (%s, %s, %s, %s, %s)
        """
        
        # 데이터를 하나씩 삽입
        for request in party_request_data:
            cursor.execute(insert_query, (
                request['member_id'], request['theme_id'], request['created_at'],
                request['last_matched_at'], request['matching_status']
            ))
        
        # 변경사항 커밋
        connection.commit()
        print(f"{len(party_request_data)}개의 파티 요청 데이터가 성공적으로 삽입되었습니다.")

    except mysql.connector.Error as error:
        print(f"데이터 삽입 중 오류 발생: {error}")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")

# 실행 함수
def generate_and_insert_party_requests():
    member_ids, theme_ids, member_count = fetch_member_theme_ids()
    if not member_ids or not theme_ids:
        print("멤버 또는 테마 데이터를 가져오는 데 문제가 발생했습니다.")
        return

    # 멤버 수 * 3 으로 파티 요청 데이터 수 설정
    num_requests = member_count * 3

    party_request_data = generate_party_request_data(num_requests, member_ids, theme_ids)
    insert_party_request_data_to_db(party_request_data)

# 파티 요청 데이터 생성 및 DB에 삽입 실행
generate_and_insert_party_requests()
