from bs4 import BeautifulSoup
import re
import time
import urllib.request
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
from datetime import datetime
import os 
from dotenv import load_dotenv 

## ------- 
from dbutil import mysql_connect, mysql_read_all, mysql_disconnect, mongo_connect, mongo_disconnect, mongo_get_collection, mongo_save_with_delete, mongo_save_many, mongo_read

def get_env():
    load_dotenv()
    n_id = os.getenv('client_id')
    n_pw = os.getenv('client_secret')

    return n_id, n_pw 


def get_crawling(driver, keyword, client_id, client_secret, page=1, dis=10):
    # selenium으로 검색 페이지 불러오기
    naver_urls = []
    postdate = []
    titles = []
    linkss = []
    
    # 검색어 입력
    encText = urllib.parse.quote(keyword)
    
    # 검색을 끝낼 페이지 입력
    end = page
    
    # 한번에 가져올 페이지 입력
    display = dis
    
    for start in range(1, end + 1):
        try: 
            url = f"https://openapi.naver.com/v1/search/blog?query={encText}&start={start}&display={display}"
            request = urllib.request.Request(url)
            request.add_header("X-Naver-Client-Id", client_id)
            request.add_header("X-Naver-Client-Secret", client_secret)
            response = urllib.request.urlopen(request)
            rescode = response.getcode()
            
            if rescode == 200:
                response_body = response.read()
                data = json.loads(response_body.decode('utf-8'))['items']
                for row in data:
                    if 'blog.naver' in row['link']:
                        naver_urls.append(row['link'])
                        postdate.append(row['postdate'])
                        
                        title = row['title']
                        # html태그제거
                        pattern1 = '<[^>]*>'
                        title = re.sub(pattern=pattern1, repl='', string=title)
                        titles.append(title)
                time.sleep(0.2)
            else:
                print("Error Code:" + str(rescode))
        except Exception as e:
                print(f"Error occurred: {e} in keyword {keyword}")
    
    ### Naver 기사 본문 및 제목 가져오기 ###
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/98.0.4758.102"}
    
    contents = []
    try:
        for i in naver_urls:
           # print(i)
            linkss.append(i)
            driver.get(i)
            time.sleep(0.5)  # 대기시간 변경 가능
    
            iframe = driver.find_element(By.ID , "mainFrame")  # id가 mainFrame이라는 요소를 찾아내고 -> iframe임
            driver.switch_to.frame(iframe)  # 이 iframe이 내가 찾고자 하는 HTML을 포함하고 있는 내용
    
            source = driver.page_source
            html = BeautifulSoup(source, "html.parser")
            
            # 기사 텍스트만 가져오기
            content = html.select("div.se-main-container")
            # list 합치기
            content = ''.join(str(content))
            
            # html태그제거 및 텍스트 다듬기
            content = re.sub(pattern=pattern1, repl=' ', string=content)
            pattern2 = """[\n\n\n\n\n// flash 오류를 우회하기 위한 함수 추가\nfunction _flash_removeCallback() {}"""
            content = content.replace(pattern2, '')
            content = content.replace('\u200b', ' ')
            pattern3 = r'\s+' 
            content = re.sub(pattern=pattern3,  repl=' ', string=content)
            
            # 맨 앞의 [] 삭제
            content = content[1:-1].strip()
            contents.append(content)
          #  print("hi")
    
        news_df = pd.DataFrame({'title': titles, 'content': contents, 'date': postdate, 'link': linkss})
        # current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    
        # # 파일 이름 지정
        # file_name = f'blog_{current_time}.csv'
        # news_df.to_csv(path+file_name, index=False, encoding='utf-8-sig')

        return news_df 
    except Exception as e:
        print(f"Error occurred: {e}")
        # contents.append('error')
        # news_df = pd.DataFrame({'title': titles, 'content': contents, 'date': postdate})
        # current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    
        # # 파일 이름 지정
        # file_name = f'blog_{current_time}.csv'
        # news_df.to_csv(path+file_name, index=False, encoding='utf-8-sig')

        return pd.DataFrame(columns=['themeId', 'title', 'content', 'date', 'link']) 

def get_driver():
     # # 웹드라이버 설정
    options = Options()
    options.add_argument("--headless")  # Headless 모드 추가
    options.add_argument("--disable-gpu")  
    options.add_argument("--no-sandbox")  # 리눅스 환경에서 권장
    options.add_argument("--disable-dev-shm-usage")  # 공유 메모리 사용 비활성화
    options.add_argument("--window-size=1920x1080")  # 창 크기 설정 (optional)
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    
    # Service 객체 생성
    service = Service(ChromeDriverManager().install())
    
    # 웹드라이버 초기화
    driver = webdriver.Chrome(service=service, options=options)
    driver.implicitly_wait(3)

    return driver 

def get_theme_list():
    connection = mysql_connect()
    theme_query = "select t.themeId, t.title, c.cafeName from theme t left join cafe c on t.cafeId = c.cafeId order by themeId"
    theme = mysql_read_all(connection, theme_query)
    theme_df = pd.DataFrame(theme)
    mysql_disconnect(connection)
    
    return theme_df 

def save_data(result):
    client = mongo_connect()
    try:
        col = mongo_get_collection(client, "themeNaverReview")
        mongo_save_many(col, result)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        mongo_disconnect(client)

def get_theme_mongo():
    client = mongo_connect()
    try:
        col = mongo_get_collection(client, "themeNaverReview")
        theme_taken = mongo_read(col)
        unique_theme_ids = set() 
        for doc in theme_taken:
            # 각 문서에서 themeId를 추출하여 set에 추가
            if 'themeId' in doc:  # themeId가 있는지 확인
                unique_theme_ids.add(doc['themeId'])

        return list(unique_theme_ids)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        mongo_disconnect(client)

def naver_crawling():
    n_id, n_pw = get_env()
    driver = get_driver()
    theme_df = get_theme_list()
    theme_mongo_list = get_theme_mongo() 
    
    # 결과를 담을 리스트 초기화
    final_data = []

    # 각 테마마다 검색결과 수집
    limit = 2000
    checkpoint = 50
    cur = 0 
    start_time = datetime.now() 
    
    for index, row in theme_df.iterrows():
        themeId = row['themeId']

        if themeId in theme_mongo_list:
            continue 

        title = row['title']
        cafeName = row['cafeName']

        # 검색 키워드 생성 (cafeName + title)
        keyword = f"{cafeName} {title}"
        print(f"search start theme {themeId}")
        
        # 키워드로 크롤링 진행하여 결과 DataFrame 얻기
        crawling_df = get_crawling(driver, keyword, n_id, n_pw)

        if crawling_df.empty:
            continue

        # 크롤링 결과에 themeId와 title 추가
        for _, crawling_row in crawling_df.iterrows():
            final_data.append({
                'themeId': themeId,
                'title': crawling_row['title'],
                'content': crawling_row['content'],
                'date': crawling_row['date'],
                'link': crawling_row['link']
            })
        
        print(f"search end theme {themeId}")

        cur += 1
        if cur % checkpoint == 0:
            print(f"save_data theme {themeId} ({cur})")
            final_df = pd.DataFrame(final_data)
            save_data(final_df.to_dict('records'))
            final_data = [] 
        if cur == limit:
            break

    # 최종 DataFrame 생성
    final_df = pd.DataFrame(final_data)
    save_data(final_df.to_dict('records'))
    end_time = datetime.now()
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print("operation_time: "+str((end_time-start_time).total_seconds()))


naver_crawling()

    