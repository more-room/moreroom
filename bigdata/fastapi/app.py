from fastapi import FastAPI
from datetime import datetime
#------ 외부 파일 임포트
from similar_themes import get_recent_similar_theme
from similar_member_themes import get_similar_member_theme 
from demographics_themes import get_demographics_theme 

app = FastAPI()

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
    get_similar_member_theme()
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    return {"message": "get_similar_member_theme success",
            "operation_time": current_time} 

@app.get("/demographics_themes")
def demographics_themes():
    get_demographics_theme()
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    return {"message": "get_demographics_theme success",
            "operation_time": current_time} 