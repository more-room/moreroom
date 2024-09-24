import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from party_recommend import process_party_matching

app = FastAPI()

# 요청 본문 데이터 모델 정의
class PartyRequest(BaseModel):
    party_request_id: int

@app.get("/")
def root():
    return {"message": "Hello World"}

# FastAPI 엔드포인트 - 비동기적으로 1000개의 요청 처리
@app.post("/recommend_party_batch/")
async def recommend_party_batch():
    matched_users = set()
    requests = [PartyRequest(party_request_id=i) for i in range(1, 1001)]
    tasks = [process_party_matching(request, matched_users) for request in requests]
    results = await asyncio.gather(*tasks)
    return results

@app.post("/recommend_party/")
async def recommend_party(request: PartyRequest):
    result = await process_party_matching(request, matched_users=set())
    return result