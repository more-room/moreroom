from fastapi import HTTPException
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
import mysql.connector
import pandas as pd
import numpy as np
import os

# DB에서 데이터 로드 함수
def fetch_data_from_db():
    try:
        load_dotenv()
        # MySQL 연결 설정
        connection = mysql.connector.connect(
            host=os.getenv('HOST'),
            user=os.getenv('USER'),  
            password=os.getenv('PASSWORD'),  
            database=os.getenv('DATABASE'),  
            port=os.getenv('PORT')
        )
        cursor = connection.cursor()

        # 파티 요청 데이터 가져오기
        cursor.execute("SELECT partyRequestId, memberId, themeId, createdAt, matchingStatus FROM PartyRequest")
        party_request_data = cursor.fetchall()
        party_request_df = pd.DataFrame(party_request_data, columns=['partyRequestId', 'memberId', 'themeId', 'createdAt', 'status'])

        # 요청 해시태그 매핑 데이터 가져오기
        cursor.execute("SELECT partyRequestId, hashtagId, hashtagType FROM RequestHashtagMapping")
        request_hashtag_data = cursor.fetchall()
        request_hashtag_df = pd.DataFrame(request_hashtag_data, columns=['requestId', 'hashtagId', 'hashtagType'])

        # 멤버 해시태그 매핑 데이터 가져오기
        cursor.execute("SELECT memberId, hashtagId FROM MemberHashtagMapping")
        member_hashtag_data = cursor.fetchall()
        member_hashtag_df = pd.DataFrame(member_hashtag_data, columns=['memberId', 'hashtagId'])

        return party_request_df, request_hashtag_df, member_hashtag_df

    except mysql.connector.Error as error:
        print(f"DB에서 데이터를 가져오는 중 오류 발생: {error}")
        raise HTTPException(status_code=500, detail="DB에서 데이터를 가져오는 중 오류 발생")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")

# 1. 파티 요청 ID로 테마 ID와 멤버 ID 찾기
def get_theme_and_member_id_by_party_request(party_request_id, party_request_df, theme_matched_users):
    try:
        row = party_request_df[party_request_df['partyRequestId'] == party_request_id]
        if row.empty:
            raise ValueError("해당 파티 요청 ID를 찾을 수 없습니다.")
        
        theme_id = row['themeId'].values[0]
        member_id = row['memberId'].values[0]

        # 이미 해당 테마에서 매칭된 유저라면 파티 생성 중단
        if theme_id in theme_matched_users and member_id in theme_matched_users[theme_id]:
            print(f"멤버 {member_id}는 테마 {theme_id}에서 이미 매칭되었습니다.")
            return None, None

        return theme_id, member_id
    except Exception as e:
        raise ValueError("파티 요청 ID에서 테마 ID 또는 멤버 ID를 찾는 중 오류가 발생했습니다.")

# 2. 같은 테마를 선택한 후보 유저 리스트 만들기 (테마 ID로 필터링)
def get_candidate_users(theme_id, party_request_df, theme_matched_users):
    try:
        print(f"테마 ID {theme_id}에 해당하는 유저들을 필터링합니다.")
        theme_users = party_request_df[party_request_df['themeId'] == theme_id]['memberId'].unique()

        # 테마별로 매칭된 유저는 제외
        if theme_id in theme_matched_users:
            matched_users_in_theme = theme_matched_users[theme_id]
            theme_users = [user for user in theme_users if user not in matched_users_in_theme]
        else:
            theme_matched_users[theme_id] = set()  # 해당 테마에 매칭된 유저를 추적

        print(f"테마 ID {theme_id}에 대해 {len(theme_users)}명의 유저를 찾았습니다.")
        return theme_users
    except Exception as e:
        raise ValueError("테마 ID로 유저 리스트를 필터링하는 중 오류가 발생했습니다.")

# 3. 같은 테마를 고른 유저들 중 유사한 파티 분위기의 사람 추출 (K-means 클러스터링)
def get_similar_party_vibe_users(member_hashtag_df, target_member_id, candidate_users):
    try:
        print(f"Calculating n_clusters based on candidate users")
        
        # 같은 테마를 고른 유저 수로 n_clusters 계산
        num_users = len(candidate_users)
        calculated_clusters = max(num_users // 6, 3)  # n_clusters를 3으로 최소값 설정
        print(f"Calculated n_clusters: {calculated_clusters}, for {num_users} users")

        # 후보 유저들만 해시태그 벡터화
        member_hashtag_matrix = member_hashtag_df[member_hashtag_df['memberId'].isin(candidate_users)]
        member_hashtag_matrix = member_hashtag_matrix.pivot_table(index='memberId', columns='hashtagId', aggfunc=lambda x: 1, fill_value=0)

        # 군집화
        kmeans = KMeans(n_clusters=calculated_clusters, random_state=0).fit(member_hashtag_matrix)
        labels = kmeans.labels_
        
        # 타겟 유저가 속한 클러스터와 같은 유저만 추출
        target_label = labels[member_hashtag_matrix.index == target_member_id][0]
        similar_users = member_hashtag_matrix.index[labels == target_label]
        
        print(f"Found {len(similar_users)} similar users for memberId: {target_member_id}")
        return similar_users
    except Exception as e:
        print(f"Error during K-means clustering: {str(e)}")
        raise ValueError(target_member_id, "K-means 클러스터링 중 오류가 발생했습니다.")


from sklearn.preprocessing import MultiLabelBinarizer
import ast

# 해시태그 매핑 함수
def map_similar_hashtags(hashtag):
    # 18~29번을 30~41번에 매핑 (같은 성향으로 처리)
    if 18 <= hashtag <= 29:
        return hashtag + 12  # 18번은 30번, 19번은 31번, ... 29번은 41번
    elif 30 <= hashtag <= 41:
        return hashtag
    else:
        return hashtag  # 그 외의 해시태그는 그대로 사용

# 내가 원하는 성향 및 상대방 성향 처리할 때 적용
def calculate_custom_similarity(member_hashtag_df, request_hashtag_df, similar_users, target_member_id, party_request_id):
    try:
        print(f"Calculating custom similarity for {len(similar_users)} users")

        # 1. 내가 원하는 상대방의 성향 (party_request_id에서 가져온 hashtagType)
        my_request_row = request_hashtag_df[request_hashtag_df['requestId'] == party_request_id]
        my_desired_traits_list = my_request_row['hashtagId'].values  # 리스트 형식

        # 해시태그 매핑 적용
        my_desired_traits = [map_similar_hashtags(hashtag) for hashtag in my_desired_traits_list]

        # 2. 상대방이 원하는 내 성향 (각각의 상대방이 원하는 hashtagType 고려)
        desired_by_others = []
        for user in similar_users:
            user_request_row = request_hashtag_df[request_hashtag_df['requestId'] == user]
            user_desired_traits_list = user_request_row['hashtagId'].values
            # 해시태그 매핑 적용
            user_desired_traits = [map_similar_hashtags(hashtag) for hashtag in user_desired_traits_list]
            desired_by_others.append(user_desired_traits)

        # 3. 내가 원하는 파티 성향 (해시태그 ID를 기반으로 성향 정의)
        party_vibe_traits_list = my_request_row['hashtagId'].values  # 내가 원하는 파티 성향
        # 해시태그 매핑 적용
        party_vibe_traits = [map_similar_hashtags(hashtag) for hashtag in party_vibe_traits_list]

        print(f"Mapped party vibe traits (hashtagId): {party_vibe_traits}")

        # 성향에 따른 가중치 합산
        similarity_scores = []
        for user, user_desired_traits in zip(similar_users, desired_by_others):
            user_hashtags = member_hashtag_df[member_hashtag_df['memberId'] == user]['hashtagId'].values
            user_hashtags = [map_similar_hashtags(hashtag) for hashtag in user_hashtags]  # 매핑 적용

            # 유사도 계산: 내가 원하는 상대방 성향 + 상대방이 원하는 내 성향 + 내가 원하는 파티 성향
            score = cosine_similarity([my_desired_traits, user_hashtags]).sum() \
                    + cosine_similarity([user_desired_traits, user_hashtags]).sum() \
                    + cosine_similarity([party_vibe_traits, user_hashtags]).sum()

            similarity_scores.append((user, score))

        # 유사도에 따른 유저 정렬
        similarity_scores.sort(key=lambda x: x[1], reverse=True)
        return [user for user, score in similarity_scores]
    except Exception as e:
        print(f"Custom similarity 계산 중 오류 발생: {str(e)}")
        raise HTTPException(status_code=500, detail="Custom similarity 계산 중 오류 발생")


# 5. 유사도가 높은 유저로 파티 구성 (본인을 포함한 3명)
def create_party(similarity_matrix, similar_users, target_member_id, theme_id, theme_matched_users, initial_threshold=0.8):
    try:
        print(f"유저 {target_member_id}에 대한 파티를 생성합니다.")

        similar_users_array = np.array(similar_users)
        target_index = np.where(similar_users_array == target_member_id)[0][0]

        # 타겟 멤버와의 유사도를 가져옴
        target_similarities = similarity_matrix[target_index]

        # 유사도 임계치 설정
        threshold = initial_threshold
        party_members = [target_member_id]  # 본인을 미리 포함
        added_members = set(party_members)

        # 유사도가 높은 유저를 한 명씩 추가, 파티원이 3명이 될 때까지 반복
        while len(party_members) < 3 and threshold >= 0.3:  # 유사도가 0.3 미만이면 종료
            similar_members = np.where(target_similarities > threshold)[0]
            similar_members = [idx for idx in similar_members if similar_users_array[idx] not in added_members]

            if similar_members:
                new_member = similar_users_array[similar_members[0]]
                party_members.append(new_member)
                added_members.add(new_member)
                print(f"유사도 {threshold}로 멤버 {new_member}을(를) 추가했습니다.")
            else:
                # 유사한 유저가 없으면 유사도 임계치 감소
                threshold -= 0.05
                print(f"유사도를 {threshold}로 낮춥니다.")

        # 파티원이 3명이 안 될 경우 파티 생성 중단
        if len(party_members) < 3:
            print(f"파티를 생성하기에 유저 수가 부족합니다. {len(party_members)}명의 유저만 찾았습니다.")
            return None  # 파티 생성 중지

        party_members = [int(member) for member in party_members]
        print(f"최종 파티 멤버: {party_members}")

        # 매칭 완료 후 해당 테마에 매칭된 유저 추가
        theme_matched_users[theme_id].update(party_members)

        return party_members
    except Exception as e:
        print(f"파티 구성 중 오류 발생: {str(e)}")
        raise ValueError("파티 구성 중 오류가 발생했습니다.")

# 파티 매칭 과정에 성향 기반 유사도 적용
async def process_party_matching(party_request, theme_matched_users):
    try:
        print(f"파티 요청 ID {party_request.party_request_id}을(를) 받았습니다.")

        # DB에서 데이터 로드
        party_request_df, request_hashtag_df, member_hashtag_df = fetch_data_from_db()

        # 1. 파티 요청 ID로 테마 ID와 멤버 ID 찾기
        theme_id, member_id = get_theme_and_member_id_by_party_request(party_request.party_request_id, party_request_df, theme_matched_users)

        # 이미 매칭된 유저이거나 요청이 잘못되었을 때 매칭 중단
        if theme_id is None or member_id is None:
            return {
                "party_request_id": int(party_request.party_request_id),
                "message": "이미 매칭된 유저이거나 잘못된 요청이므로 파티가 생성되지 않았습니다."
            }

        # 2. 같은 테마를 선택한 후보 유저 리스트 만들기
        candidate_users = get_candidate_users(theme_id, party_request_df, theme_matched_users)
        if len(candidate_users) < 3:
            print(f"매칭에 필요한 유저 수가 부족합니다. {len(candidate_users)}명의 유저만 찾았습니다.")
            return {
                "party_request_id": int(party_request.party_request_id),
                "message": "매칭에 필요한 유저 수가 부족합니다."
            }

        # 3. 상대방과 나의 성향, 파티 성향을 고려한 유사도 계산
        similar_users = calculate_custom_similarity(member_hashtag_df, request_hashtag_df, candidate_users, member_id, party_request.party_request_id)
        if not similar_users:
            return {
                "party_request_id": int(party_request.party_request_id),
                "message": "파티를 구성할 충분한 유저를 찾지 못했습니다."
            }

        # **유사도 행렬 생성 (코사인 유사도 계산)** - 여기에 추가
        member_hashtag_matrix = member_hashtag_df.pivot_table(index='memberId', columns='hashtagId', aggfunc=lambda x: 1, fill_value=0)
        filtered_matrix = member_hashtag_matrix.loc[similar_users]
        similarity_matrix = cosine_similarity(filtered_matrix)

        # 4. 유사한 파티원 구성
        party_members = create_party(similarity_matrix=similarity_matrix, similar_users=similar_users, target_member_id=member_id, theme_id=theme_id, theme_matched_users=theme_matched_users)
        if party_members is None:
            return {
                "party_request_id": int(party_request.party_request_id),
                "message": "파티를 구성할 충분한 유저를 찾지 못했습니다."
            }

        # 파티 구성 결과 반환
        return {
            "party_request_id": int(party_request.party_request_id),
            "theme_id": int(theme_id),
            "masterId": int(member_id),
            "party_members": party_members
        }
    except Exception as e:
        print(f"파티 매칭 중 오류 발생: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
