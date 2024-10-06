import asyncio
from pydantic import BaseModel
from fastapi import HTTPException
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
import mysql.connector
import pandas as pd
import numpy as np
import os
from concurrent.futures import ThreadPoolExecutor

# 전역 변수로 캐싱된 데이터를 저장할 변수 선언
cached_party_request_df = None
cached_request_hashtag_df = None
cached_member_hashtag_df = None

# 요청 본문 데이터 모델 정의
class PartyRequest(BaseModel):
    party_request_id: int

# 최초 1회만 DB에서 데이터 로드 및 캐싱
def load_data():
    global cached_party_request_df, cached_request_hashtag_df, cached_member_hashtag_df

    if cached_party_request_df is None or cached_request_hashtag_df is None or cached_member_hashtag_df is None:
        try:
            load_dotenv()
            connection = mysql.connector.connect(
                host=os.getenv('HOST'),
                user=os.getenv('USER'),  
                password=os.getenv('PASSWORD'),  
                database=os.getenv('DATABASE'),  
                port=os.getenv('PORT')
            )
            cursor = connection.cursor()

            # 데이터를 캐싱하여 한 번에 가져오도록 설정
            cursor.execute("SELECT partyRequestId, memberId, themeId, createdAt, matchingStatus FROM PartyRequest")
            party_request_data = cursor.fetchall()
            cached_party_request_df = pd.DataFrame(party_request_data, columns=['partyRequestId', 'memberId', 'themeId', 'createdAt', 'status'])

            cursor.execute("SELECT partyRequestId, hashtagId, hashtagType FROM RequestHashtagMapping")
            request_hashtag_data = cursor.fetchall()
            cached_request_hashtag_df = pd.DataFrame(request_hashtag_data, columns=['requestId', 'hashtagId', 'hashtagType'])

            cursor.execute("SELECT memberId, hashtagId FROM MemberHashtagMapping")
            member_hashtag_data = cursor.fetchall()
            cached_member_hashtag_df = pd.DataFrame(member_hashtag_data, columns=['memberId', 'hashtagId'])

            print("데이터 캐싱 완료")
        except mysql.connector.Error as error:
            print(f"DB에서 데이터를 가져오는 중 오류 발생: {error}")
            raise HTTPException(status_code=500, detail="DB에서 데이터를 가져오는 중 오류 발생")
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
                print("MySQL 연결이 종료되었습니다.")
    else:
        print("이미 데이터가 캐싱되어 있습니다.")

# 파티 요청 ID로 테마 ID와 멤버 ID 찾기
def get_theme_and_member_id_by_party_request(party_request_id, theme_matched_users):
    global cached_party_request_df
    row = cached_party_request_df[cached_party_request_df['partyRequestId'] == party_request_id]
    if row.empty:
        raise ValueError("해당 파티 요청 ID를 찾을 수 없습니다.")
    
    theme_id = row['themeId'].values[0]
    member_id = row['memberId'].values[0]

    if theme_id in theme_matched_users and member_id in theme_matched_users[theme_id]:
        return None, None  # 이미 매칭된 유저인 경우
    
    return theme_id, member_id

# 같은 테마를 선택한 후보 유저 리스트 만들기 (캐싱 및 벡터화 적용)
def get_candidate_users(theme_id, theme_matched_users):
    global cached_party_request_df
    theme_users = cached_party_request_df[cached_party_request_df['themeId'] == theme_id]['memberId'].unique()

    if theme_id in theme_matched_users:
        matched_users_in_theme = theme_matched_users[theme_id]
        theme_users = [user for user in theme_users if user not in matched_users_in_theme]
    else:
        theme_matched_users[theme_id] = set()

    return theme_users

# 해시태그 매핑 함수
def map_similar_hashtags(hashtag):
    if 18 <= hashtag <= 29:
        return hashtag + 12
    elif 30 <= hashtag <= 41:
        return hashtag
    else:
        return hashtag

# 성향 및 유사도 계산 최적화
def calculate_custom_similarity(similar_users, target_member_id, party_request_id):
    global cached_request_hashtag_df, cached_member_hashtag_df
    try:
        print(f"Calculating custom similarity for {len(similar_users)} users")

        # 타겟 사용자가 원하는 성향 해시태그를 가져옵니다
        my_request_row = cached_request_hashtag_df[cached_request_hashtag_df['requestId'] == party_request_id]
        my_desired_traits = [map_similar_hashtags(hashtag) for hashtag in my_request_row['hashtagId'].values]

        # 빈 배열 확인: 내가 원하는 성향이 없는 경우 기본값으로 처리
        if len(my_desired_traits) == 0:
            return []

        desired_by_others = []
        for user in similar_users:
            user_request_row = cached_request_hashtag_df[cached_request_hashtag_df['requestId'] == user]
            user_desired_traits = [map_similar_hashtags(hashtag) for hashtag in user_request_row['hashtagId'].values]

            # 빈 배열 확인: 다른 유저가 원하는 성향이 없는 경우 기본값으로 처리
            if len(user_desired_traits) == 0:
                user_desired_traits = [0]  # 기본값 설정
            desired_by_others.append(user_desired_traits)

        # 파티 분위기에 맞춘 해시태그 목록
        party_vibe_traits = [map_similar_hashtags(hashtag) for hashtag in my_request_row['hashtagId'].values]

        similarity_scores = []
        for user, user_desired_traits in zip(similar_users, desired_by_others):
            user_hashtags = [map_similar_hashtags(hashtag) for hashtag in cached_member_hashtag_df[cached_member_hashtag_df['memberId'] == user]['hashtagId'].values]

            # 빈 배열 확인: 유저 해시태그가 없을 경우 기본값으로 처리
            if len(user_hashtags) == 0:
                user_hashtags = [0]  # 기본값 설정

            # 배열을 numpy 배열로 변환하고 동일한 차원을 가지도록 맞춥니다
            my_desired_traits_array = np.array(my_desired_traits).reshape(1, -1)
            user_hashtags_array = np.array(user_hashtags).reshape(1, -1)
            user_desired_traits_array = np.array(user_desired_traits).reshape(1, -1)
            party_vibe_traits_array = np.array(party_vibe_traits).reshape(1, -1)

            # 배열 차원을 맞추기 위해 작은 차원인 배열을 패딩
            max_length = max(my_desired_traits_array.shape[1], user_hashtags_array.shape[1], user_desired_traits_array.shape[1], party_vibe_traits_array.shape[1])

            # 각 배열을 동일한 차원으로 확장 (0으로 패딩)
            my_desired_traits_array = np.pad(my_desired_traits_array, ((0, 0), (0, max_length - my_desired_traits_array.shape[1])), mode='constant')
            user_hashtags_array = np.pad(user_hashtags_array, ((0, 0), (0, max_length - user_hashtags_array.shape[1])), mode='constant')
            user_desired_traits_array = np.pad(user_desired_traits_array, ((0, 0), (0, max_length - user_desired_traits_array.shape[1])), mode='constant')
            party_vibe_traits_array = np.pad(party_vibe_traits_array, ((0, 0), (0, max_length - party_vibe_traits_array.shape[1])), mode='constant')

            # 유사도 계산: 내가 원하는 상대방 성향 + 상대방이 원하는 내 성향 + 파티 분위기 성향
            score = cosine_similarity(my_desired_traits_array, user_hashtags_array).sum() \
                    + cosine_similarity(user_desired_traits_array, user_hashtags_array).sum() \
                    + cosine_similarity(party_vibe_traits_array, user_hashtags_array).sum()

            similarity_scores.append((user, score))

        # 유사도에 따라 정렬된 유저를 반환
        similarity_scores.sort(key=lambda x: x[1], reverse=True)
        return [user for user, score in similarity_scores]
    except Exception as e:
        print(f"Custom similarity 계산 중 오류 발생: {str(e)}")
        raise HTTPException(status_code=500, detail="Custom similarity 계산 중 오류 발생")




# 유사도가 높은 유저로 파티 구성 (본인을 포함한 3명)
def create_party(similarity_matrix, similar_users, target_member_id, theme_id, theme_matched_users, initial_threshold=0.8):
    try:
        print(f"유저 {target_member_id}에 대한 파티를 생성합니다.")
        similar_users_array = np.array(similar_users)
        target_index = np.where(similar_users_array == target_member_id)[0][0]
        target_similarities = similarity_matrix[target_index]
        threshold = initial_threshold
        party_members = [target_member_id]
        added_members = set(party_members)

        while len(party_members) < 3 and threshold >= 0.3:
            similar_members = np.where(target_similarities > threshold)[0]
            similar_members = [idx for idx in similar_members if similar_users_array[idx] not in added_members]

            if similar_members:
                new_member = similar_users_array[similar_members[0]]
                party_members.append(new_member)
                added_members.add(new_member)
                print(f"유사도 {threshold}로 멤버 {new_member}을(를) 추가했습니다.")
            else:
                threshold -= 0.05
                print(f"유사도를 {threshold}로 낮춥니다.")

        if len(party_members) < 3:
            print(f"파티를 생성하기에 유저 수가 부족합니다. {len(party_members)}명의 유저만 찾았습니다.")
            return None

        party_members = [int(member) for member in party_members]
        print(f"최종 파티 멤버: {party_members}")
        theme_matched_users[theme_id].update(party_members)
        return party_members
    except Exception as e:
        print(f"파티 구성 중 오류 발생: {str(e)}")
        raise ValueError("파티 구성 중 오류가 발생했습니다.")

# 비동기 처리 및 최적화 적용
async def process_party_matching(party_request, theme_matched_users):
    try:
        print(f"파티 요청 ID {party_request.party_request_id}을(를) 받았습니다.")
        load_data()  # 데이터가 없으면 불러오고, 이미 있으면 캐싱된 데이터 사용
        theme_id, member_id = get_theme_and_member_id_by_party_request(party_request.party_request_id, theme_matched_users)
        if theme_id is None or member_id is None:
            return {"party_request_id": int(party_request.party_request_id), "message": "이미 매칭된 유저이거나 잘못된 요청이므로 파티가 생성되지 않았습니다."}
        candidate_users = get_candidate_users(theme_id, theme_matched_users)
        if len(candidate_users) < 3:
            return {"party_request_id": int(party_request.party_request_id), "message": "매칭에 필요한 유저 수가 부족합니다."}
        similar_users = calculate_custom_similarity(candidate_users, member_id, party_request.party_request_id)
        if not similar_users:
            return {"party_request_id": int(party_request.party_request_id), "message": "파티를 구성할 충분한 유저를 찾지 못했습니다."}
                # 해시태그 매트릭스를 생성하고 코사인 유사도 계산
        member_hashtag_matrix = cached_member_hashtag_df.pivot_table(index='memberId', columns='hashtagId', aggfunc=lambda x: 1, fill_value=0)
        filtered_matrix = member_hashtag_matrix.loc[similar_users]
        similarity_matrix = cosine_similarity(filtered_matrix)

        # 파티 생성
        party_members = create_party(similarity_matrix=similarity_matrix, similar_users=similar_users, target_member_id=member_id, theme_id=theme_id, theme_matched_users=theme_matched_users)
        if party_members is None:
            return {"party_request_id": int(party_request.party_request_id), "message": "파티를 구성할 충분한 유저를 찾지 못했습니다."}

        # 최종 결과 반환
        return {
            "party_request_id": int(party_request.party_request_id),
            "theme_id": int(theme_id),
            "masterId": int(member_id),
            "party_members": party_members
        }
    except Exception as e:
        print(f"파티 매칭 중 오류 발생: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 비동기 배치 처리 함수
async def process_party_matching_batch(party_requests, theme_matched_users):
    with ThreadPoolExecutor() as pool:
        # 모든 파티 매칭 요청을 비동기적으로 처리
        loop = asyncio.get_event_loop()
        
        # 파티 요청을 PartyRequest 객체로 변환
        tasks = [await loop.run_in_executor(pool, process_party_matching, PartyRequest(**party_request), theme_matched_users) for party_request in party_requests]
        
        results = await asyncio.gather(*tasks)
    
    return results

# 비동기 처리 함수 실행
async def run_batch_matching():
    theme_matched_users = {}
    load_data()  # 최초 1회 데이터 로드 및 캐싱

    # 배치로 파티 요청 가져오기
    party_requests = cached_party_request_df.to_dict('records')

    # 딕셔너리 필드명을 PartyRequest 모델에 맞게 변경
    for party_request in party_requests:
        party_request['party_request_id'] = party_request.pop('partyRequestId')

    # 비동기 매칭 프로세스 실행
    results = await process_party_matching_batch(party_requests, theme_matched_users)
    
    return results

