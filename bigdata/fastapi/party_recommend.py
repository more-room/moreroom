from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import os
import asyncio

# FastAPI 앱 생성
app = FastAPI()

# 요청 본문 데이터 모델 정의
class PartyRequest(BaseModel):
    party_request_id: int

# 데이터 로드 함수
def load_data():
    user_name = "SSAFY"
    base_path = f'C:/Users/{user_name}/Desktop/'
    party_request_path = os.path.join(base_path, 'partyrequest.csv')
    request_hashtag_mapping_path = os.path.join(base_path, 'requesthashtagmapping.csv')
    member_hashtag_mapping_path = os.path.join(base_path, 'memberhashtagmapping.csv')

    party_request_df = pd.read_csv(party_request_path, encoding='utf-8', names=['partyRequestId', 'memberId', 'themeId', 'date', 'null', 'status'])
    request_hashtag_df = pd.read_csv(request_hashtag_mapping_path, encoding='utf-8', names=['requestId', 'hashtagId'])
    member_hashtag_df = pd.read_csv(member_hashtag_mapping_path, encoding='utf-8', names=['memberId', 'hashtagId'])

    return party_request_df, request_hashtag_df, member_hashtag_df

# 1. 파티 요청 ID로 테마 ID와 멤버 ID 찾기
def get_theme_and_member_id_by_party_request(party_request_id, party_request_df):
    try:
        row = party_request_df[party_request_df['partyRequestId'] == party_request_id]
        if row.empty:
            raise ValueError("해당 파티 요청 ID를 찾을 수 없습니다.")
        
        theme_id = row['themeId'].values[0]
        member_id = row['memberId'].values[0]
        return theme_id, member_id
    except Exception as e:
        raise ValueError("파티 요청 ID에서 테마 ID 또는 멤버 ID를 검색하는 중 오류가 발생했습니다.")

# 2. 같은 테마를 선택한 후보 유저 리스트 만들기 (테마 ID로 필터링)
def get_candidate_users(theme_id, party_request_df):
    try:
        print(f"Filtering users for themeId: {theme_id}")
        theme_users = party_request_df[party_request_df['themeId'] == theme_id]['memberId'].unique()
        print(f"Found {len(theme_users)} users for themeId: {theme_id}")
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
        raise ValueError("K-means 클러스터링 중 오류가 발생했습니다.")

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
def create_party(similarity_matrix, similar_users, target_member_id, initial_threshold=0.8):
    try:
        print(f"Creating party for target_member_id: {target_member_id}")

        if isinstance(similar_users, list):
            similar_users_array = np.array(similar_users)
        else:
            similar_users_array = similar_users
        
        target_index = np.where(similar_users_array == target_member_id)[0][0]

        # 타겟 멤버와의 유사도를 가져옴
        target_similarities = similarity_matrix[target_index]
        
        # 유사도 임계치 설정
        threshold = initial_threshold
        
        party_members = [target_member_id]  # 본인은 미리 포함
        added_members = set(party_members)
        
        # 유사도가 높은 유저를 한 명씩 추가, 파티원이 3명이 될 때까지 반복
        while len(party_members) < 3 and threshold > 0:
            similar_members = np.where(target_similarities > threshold)[0]
            similar_members = [idx for idx in similar_members if similar_users_array[idx] not in added_members]
            
            if similar_members:
                new_member = similar_users_array[similar_members[0]]
                party_members.append(new_member)
                added_members.add(new_member)
                print(f"Added member {new_member} with threshold {threshold}")
            else:
                threshold -= 0.05
                print(f"Lowering threshold to {threshold}")
        
        party_members = [int(member) for member in party_members]
        print(f"Final party members: {party_members}")
        return party_members
    except Exception as e:
        print(f"Error during party creation: {str(e)}")
        raise ValueError("파티 구성 중 오류가 발생했습니다.")

# 비동기 함수로 파티 매칭 처리
async def process_party_matching(party_request: PartyRequest):
    try:
        print(f"Received party_request_id: {party_request.party_request_id}")
        
        party_request_df, request_hashtag_df, member_hashtag_df = load_data()
        theme_id, member_id = get_theme_and_member_id_by_party_request(party_request.party_request_id, party_request_df)
        candidate_users = get_candidate_users(theme_id, party_request_df)
        similar_users = get_similar_party_vibe_users(member_hashtag_df, member_id, candidate_users)
        similarity_matrix = calculate_hashtag_similarity(member_hashtag_df, similar_users)
        party_members = create_party(similarity_matrix, similar_users, member_id)
        
        return {
            "party_request_id": int(party_request.party_request_id),
            "theme_id": int(theme_id),
            "masterId": int(member_id),
            "party_members": party_members
        }
    except Exception as e:
        print(f"Error during party matching: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# FastAPI 엔드포인트 - 비동기적으로 1000개의 요청 처리
@app.post("/recommend_party_batch/")
async def recommend_party_batch():
    requests = [PartyRequest(party_request_id=i, n_clusters=3) for i in range(1, 1001)]
    tasks = [process_party_matching(request) for request in requests]
    results = await asyncio.gather(*tasks)
    return results

@app.post("/recommend_party/")
async def recommend_party(request: PartyRequest):
    try:
        print(f"Received party_request_id: {request.party_request_id}")
        
        # 1. 데이터 로드
        party_request_df, request_hashtag_df, member_hashtag_df = load_data()
        
        # 2. 파티 요청 ID로 테마 ID와 멤버 ID 찾기
        theme_id, member_id = get_theme_and_member_id_by_party_request(request.party_request_id, party_request_df)
        
        # 3. 같은 테마를 선택한 후보 유저 리스트 만들기 (테마 ID로 필터링)
        candidate_users = get_candidate_users(theme_id, party_request_df)
        
        # 4. 같은 테마를 고른 유저들 중 유사한 파티 분위기의 유저 추출
        similar_users = get_similar_party_vibe_users(member_hashtag_df, member_id, candidate_users)
        
        # 5. 유사도 계산 (필터링된 사용자 집합에서 유사도 계산)
        similarity_matrix = calculate_hashtag_similarity(member_hashtag_df, similar_users)
        
        # 6. 유사한 파티원 구성 (본인을 포함한 3명)
        party_members = create_party(similarity_matrix, similar_users, member_id)
        
        # 7. 파티 구성 결과 반환
        return {
            "party_request_id": int(request.party_request_id),  # numpy.int64 변환
            "theme_id": int(theme_id),  # numpy.int64 변환
            "target_member_id": int(member_id),  # numpy.int64 변환
            "party_members": party_members
        }
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))