from fastapi import HTTPException

from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import os



# 데이터 로드 함수
def load_data():
    user_name = "SSAFY"
    base_path = f'C:/Users/{user_name}/Desktop/'
    party_request_path = os.path.join(base_path, 'partyrequest.csv')
    request_hashtag_mapping_path = os.path.join(base_path, 'requesthashtagmapping.csv')
    member_hashtag_mapping_path = os.path.join(base_path, 'memberhashtagmapping.csv')

    party_request_df = pd.read_csv(party_request_path, encoding='utf-8', names=['partyRequestId', 'memberId', 'themeId', 'date', 'null', 'status', 'uuid'])
    request_hashtag_df = pd.read_csv(request_hashtag_mapping_path, encoding='utf-8', names=['requestId', 'hashtagId'])
    member_hashtag_df = pd.read_csv(member_hashtag_mapping_path, encoding='utf-8', names=['memberId', 'hashtagId'])

    return party_request_df, request_hashtag_df, member_hashtag_df

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

# 4. 해시태그 기반으로 유사도를 계산하는 함수 (코사인 유사도 사용)
def calculate_hashtag_similarity(member_hashtag_df, similar_users):
    try:
        print(f"Calculating hashtag similarity for {len(similar_users)} users")
        member_hashtag_matrix = member_hashtag_df.pivot_table(index='memberId', columns='hashtagId', aggfunc=lambda x: 1, fill_value=0)
        
        # 유사도 계산 (코사인 유사도를 해시태그 기반으로 적용)
        filtered_matrix = member_hashtag_matrix.loc[similar_users]
        similarity_matrix = cosine_similarity(filtered_matrix)
        
        return similarity_matrix
    except Exception as e:
        raise ValueError("해시태그 유사도 계산 중 오류가 발생했습니다.")

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

# 비동기 함수로 파티 매칭 처리
async def process_party_matching(party_request, theme_matched_users):
    try:
        print(f"파티 요청 ID {party_request.party_request_id}을(를) 받았습니다.")

        # 1. 데이터 로드
        party_request_df, request_hashtag_df, member_hashtag_df = load_data()

        # 2. 파티 요청 ID로 테마 ID와 멤버 ID 찾기
        theme_id, member_id = get_theme_and_member_id_by_party_request(party_request.party_request_id, party_request_df, theme_matched_users)

        # 이미 매칭된 유저이거나 요청이 잘못되었을 때 매칭 중단
        if theme_id is None or member_id is None:
            return {
                "party_request_id": int(party_request.party_request_id),
                "message": "이미 매칭된 유저이거나 잘못된 요청이므로 파티가 생성되지 않았습니다."
            }

        # 3. 같은 테마를 선택한 후보 유저 리스트 만들기
        candidate_users = get_candidate_users(theme_id, party_request_df, theme_matched_users)
        if len(candidate_users) < 3:
            print(f"매칭에 필요한 유저 수가 부족합니다. {len(candidate_users)}명의 유저만 찾았습니다.")
            return {
                "party_request_id": int(party_request.party_request_id),
                "message": "매칭에 필요한 유저 수가 부족합니다."
            }

        # 4. 같은 테마를 고른 유저들 중 유사한 파티 분위기의 유저 추출
        similar_users = get_similar_party_vibe_users(member_hashtag_df, member_id, candidate_users)
        if similar_users is None:
            return {
                "party_request_id": int(party_request.party_request_id),
                "message": "파티를 구성할 충분한 유저를 찾지 못했습니다."
            }

        # 5. 유사도 계산
        similarity_matrix = calculate_hashtag_similarity(member_hashtag_df, similar_users)

        # 6. 유사한 파티원 구성
        party_members = create_party(similarity_matrix, similar_users, member_id, theme_id, theme_matched_users)
        if party_members is None:
            return {
                "party_request_id": int(party_request.party_request_id),
                "message": "파티를 구성할 충분한 유저를 찾지 못했습니다."
            }

        # 7. 파티 구성 결과 반환
        return {
            "party_request_id": int(party_request.party_request_id),
            "theme_id": int(theme_id),
            "masterId": int(member_id),
            "party_members": party_members
        }
    except Exception as e:
        print(f"파티 매칭 중 오류 발생: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
