import asyncio
from fastapi import FastAPI
from datetime import datetime
#------ 외부 파일 임포트
from similar_themes import get_recent_similar_theme
from similar_member_themes import get_similar_member_theme, load_mysql_data
from demographics_themes import get_demographics_theme 
from pydantic import BaseModel
from party_recommend import process_party_matching

app = FastAPI()

# 요청 본문 데이터 모델 정의
class PartyRequest(BaseModel):
    party_request_id: int

@app.get("/")
def root():
    return {"message": "Hello World"}



@app.get("/similar_themes")
def similar_themes():
    get_recent_similar_theme()
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    return {"message": "get_recent_similar_theme success",
            "operation_time": current_time} 


@app.get("/similar_member_themes")
def similar_member_themes():
    start_time = datetime.now() 
    get_similar_member_theme()
    end_time = datetime.now()
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print("operation_time: "+str((end_time-start_time).total_seconds()))
    return {"message": "get_similar_member_theme success",
            "operation_time": (end_time-start_time).total_seconds()} 

@app.get("/demographics_themes")
def demographics_themes():
    get_demographics_theme()
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    return {"message": "get_demographics_theme success",
            "operation_time": current_time} 


# FastAPI 엔드포인트 - 비동기적으로 1000개의 요청 처리
@app.post("/recommend_party_batch/")
async def recommend_party_batch():
    # 테마별로 매칭된 유저를 저장하는 딕셔너리 (key: themeId, value: 매칭된 userId들의 집합)
    theme_matched_users = {}
    requests = [PartyRequest(party_request_id=i) for i in range(1, 1501)]
    tasks = [process_party_matching(request, theme_matched_users) for request in requests]
    results = await asyncio.gather(*tasks)
    return results

@app.post("/recommend_party/")
async def recommend_party(request: PartyRequest):
    # 테마별로 매칭된 유저를 저장하는 딕셔너리 (key: themeId, value: 매칭된 userId들의 집합)
    theme_matched_users = {}
    result = await process_party_matching(request, theme_matched_users)
    return result