import random
from faker import Faker
import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
import os
from datetime import timedelta

# .env 파일 로드
load_dotenv()

# 환경 변수에서 MySQL 연결 정보 가져오기
db_host = os.getenv('HOST')
db_user = os.getenv('USER')
db_password = os.getenv('PASSWORD')
db_name = os.getenv('DATABASE')

# Faker 초기화
fake = Faker('ko_KR')

# 확장된 리뷰용 주어, 형용사, 동사, 부사 리스트
review_subjects = [
    "이 테마", "이 방탈출", "이 게임", "이 도전", "이 퍼즐", "이 모험", "이 챌린지", "이 사건", "이 경험", "이 미션",
    "이 모험의 여정", "이 탈출의 시작", "이 탈출 게임", "이 방", "이 비밀의 방", "이 탐험", "이 탈출 과정", "이 장소", "이 스토리",
    "이 미스터리", "이 비밀", "이 모험담", "이 실험", "이 모험의 끝", "이 여정", "이 승부"
]

review_adjectives = [
    "정말 재미있었습니다", "매우 흥미로웠습니다", "조금 어려웠습니다", "도전적이었습니다", "긴장감이 넘쳤습니다", 
    "창의적이었습니다", "몰입감이 있었습니다", "시간 가는 줄 몰랐습니다", "완벽한 경험이었습니다", "아주 만족스러웠습니다",
    "약간 실망스러웠습니다", "기대 이상이었습니다", "평범했습니다", "독창적이었습니다", "너무 어렵지는 않았습니다",
    "흥미진진했습니다", "기대에 부응했습니다", "집중을 요했습니다", "끝까지 긴장을 늦출 수 없었습니다", "완벽한 구성이었습니다",
    "대단했습니다", "깜짝 놀랐습니다", "정말 신선했습니다", "충격적이었습니다", "매우 감명 깊었습니다", "상상력이 풍부했습니다",
    "직관적이었습니다", "복잡했습니다", "세심하게 준비되었습니다", "마지막까지 흥미로웠습니다", "흥미로운 전개였습니다"
]

review_verbs = [
    "친구들에게 추천하고 싶습니다", "다시 한 번 도전하고 싶습니다", "한 번 더 방문하고 싶습니다", "아쉬움이 남습니다", 
    "직원들도 친절했습니다", "시설도 잘 관리되어 있었습니다", "시간이 너무 빨리 지나갔습니다", "더 많은 테마를 도전하고 싶습니다",
    "조금 더 쉬웠으면 좋겠습니다", "다음번에도 도전해보고 싶습니다", "재미있게 즐겼습니다", "즐거운 시간이었습니다",
    "긴장감이 넘쳤습니다", "재방문 의사가 있습니다", "도전하고 싶은 마음이 생깁니다", "정말 흥미진진했습니다", 
    "특별한 경험이었습니다", "마지막까지 긴장하게 했습니다", "처음부터 끝까지 몰입했습니다", "여러번 도전할 만합니다",
    "다른 테마도 시도해 보고 싶습니다", "새로운 시도를 해보고 싶습니다", "다음번에 더 잘하고 싶습니다", "마음속에 깊이 남았습니다"
]

review_adverbs = [
    "완벽하게", "충분히", "아주", "적당히", "매우", "조금", "대체로", "굉장히", "특히", "별로",
    "전혀", "한없이", "상당히", "매우 만족스럽게", "정말", "그리", "심각하게", "상당히 집중해서", "아주 오랜 시간 동안", "대단히",
    "거의 완벽하게", "믿을 수 없을 정도로", "아주 강하게", "상상 이상으로", "놀랍도록", "긴장감 넘치게", "끝까지", "놀라울 정도로", "예상 외로"
]

# 확장된 기록용 주어, 경험, 회고 리스트 (각각 약 90개 이상)
personal_subjects = [
    "오늘", "이번에", "이번 경험에서", "이번 테마에서", "오늘의 도전에서", "이번 방탈출에서", "이번 게임에서", 
    "친구들과 함께한 방탈출", "혼자서 도전한 게임", "이 게임", "처음 시도한 테마", "이번 퍼즐에서", 
    "다른 사람들과 함께한 방탈출", "새로운 모험", "기대했던 게임", "처음 도전한 방탈출", "친구와 함께한 게임",
    "이 특별한 경험", "이번에 새로 발견한 테마", "이번 장소에서", "다음 도전", "오랜만에 해본 게임", "새로운 도전",
    "가장 기대했던 테마", "완벽한 시도", "긴장된 순간", "처음으로 시도한 도전", "기다려왔던 테마", "기다림 끝에 시작한 도전",
    "마지막 도전", "이탈하려 했던 순간", "복잡한 상황 속에서", "끝없는 모험", "마지막까지 도전한 순간", "포기하지 않았던 순간",
    "고난을 겪었던 시도", "난관 속에서의 도전", "긴박한 순간", "신비한 느낌이 들었던 테마", "첫 도전", "두 번째 도전에서",
    "이전 시도에서 실패했던 경험", "다시 도전한 테마", "예상치 못한 어려움이 있었던 게임", "모든 것이 새로웠던 게임",
    "다시 한 번 시도한 도전", "이 게임의 시작", "복잡한 퍼즐 속에서", "시간과의 싸움 속에서", "이야기의 마지막에서",
    "고난과 역경 속에서", "시간에 쫓겨서", "긴장감이 가득했던 순간", "처음으로 이겨낸 도전", "내가 풀어낸 게임", 
    "끝내 풀어낸 테마", "모두가 함께한 순간", "친구와 힘을 합친 순간", "더 이상 물러날 수 없는 도전", "간신히 풀어낸 도전",
    "끝까지 몰입했던 게임", "정말 혼신을 다했던 순간", "기대와 다르게 진행된 순간", "마지막에 놀랐던 경험",
    "처음부터 다시 시작한 도전", "여러 번의 실패 끝에 도전한 테마", "연속적으로 풀어낸 게임", "여러 번 힌트를 사용한 도전",
    "조금 더 시간이 필요했던 순간", "끊임없이 고민했던 퍼즐", "모든 것을 풀어낸 마지막 순간", "최대한 집중했던 순간",
    "마지막 남은 퍼즐을 풀었던 순간", "정말 마지막까지 몰입했던 순간", "혼신을 다했던 게임", "끊임없는 몰입이 필요했던 테마",
    "힌트 없이 풀려고 했던 순간", "시간이 없던 마지막 순간", "친구와 함께 풀었던 마지막 문제", "혼자서도 풀어낸 순간",
    "마지막에 풀지 못해 아쉬웠던 순간", "내가 주도했던 게임", "첫 퍼즐부터 어려웠던 순간", "마지막 문제까지 풀어낸 도전",
    "시간을 맞추기 어려웠던 순간", "혼자서 풀기 힘들었던 퍼즐", "처음부터 끝까지 흥미진진했던 순간", "시간이 부족해 아쉬웠던 도전",
    "마지막으로 풀어낸 게임", "연속적인 문제를 풀어낸 순간", "끝까지 포기하지 않고 풀어낸 퍼즐"
]

personal_experiences = [
    "정말 긴장감 넘치는 경험이었다", "힌트를 몇 개 써서 겨우 풀었다", "시간이 부족해 다 풀지 못해 아쉬웠다", 
    "조금 더 집중했으면 좋았을 것 같다", "친구들과 함께 풀어서 즐거웠다", "문제가 어려워 고생했지만 재미있었다", 
    "이번 테마는 나에게 정말 어려웠다", "처음부터 끝까지 손에 땀을 쥐게 하는 경험이었다", "마지막 문제가 정말 어려웠다", 
    "다음에는 더 잘할 수 있을 것 같다", "한 번 더 도전하고 싶다", "힌트 없이 풀어냈다", "전체적으로 매우 만족스러웠다",
    "친구들과 함께 하니까 훨씬 재미있었다", "혼자서 풀기에 어려운 부분이 있었다", "무척 재미있고 도전적인 경험이었다",
    "기대 이상으로 어려웠다", "완벽하게 풀어냈다", "많은 고민이 필요했다", "정말 많은 시간을 들여야 했다", 
    "생각보다 많은 힌트를 사용했다", "마지막까지 끈기 있게 풀어냈다", "힌트 없이 진행하기는 어려웠다", "퍼즐들이 매우 도전적이었다",
    "결과적으로 매우 만족스러웠다", "너무나 흥미로운 시간이었고 많은 것을 배웠다", "매 순간 도전적인 경험이었다",
    "다음번에는 더 잘할 수 있을 것 같다", "끝까지 노력한 것이 정말 뿌듯했다", "처음에는 막막했지만 결국 해냈다",
    "처음엔 쉽게 풀렸지만 뒤로 갈수록 어려워졌다", "정말 많은 힌트를 사용했다", "처음에는 쉬웠지만 점점 어려워졌다",
    "힌트를 많이 사용하지 않아서 뿌듯했다", "생각보다 빨리 풀었다", "끝까지 포기하지 않고 진행했다", 
    "시간 내에 모든 문제를 해결할 수 없어서 아쉬웠다", "전체적인 난이도가 조금 높았다", "정말 만족스러운 퍼즐이었다",
    "힌트가 없어도 충분히 해결할 수 있었다", "문제 풀이 과정이 매우 흥미로웠다", "매우 도전적이었지만 재미있었다",
    "처음부터 끝까지 몰입해서 풀어냈다", "마지막 퍼즐이 조금 어려웠다", "힌트 덕분에 겨우 해결할 수 있었다",
    "기대보다 흥미진진한 시간이었습니다", "혼자 풀기 어려웠던 문제였지만 끝까지 해냈다", "시간이 많이 걸렸지만 결국 해결했다",
    "처음에는 쉽게 해결할 수 있을 것 같았지만 생각보다 어려웠다", "완벽하게 모든 문제를 해결해서 뿌듯했다",
    "마지막 순간까지 끝까지 집중할 수 있었다", "힌트를 사용하지 않고 풀어서 더 뿌듯했다", "다음번에는 더 능숙하게 할 수 있을 것 같다",
    "처음부터 끝까지 도전적인 순간이 많았다", "더 많은 시간을 들여야 했던 테마였다", "기다린 보람이 있었다",
    "조금 더 쉬웠다면 더 좋았을 것 같다", "힌트 덕분에 더 빨리 해결할 수 있었다", "최대한 집중해서 모든 문제를 풀었다",
    "힌트를 사용하지 않아도 충분히 풀 수 있었다", "힌트를 하나도 쓰지 않고 모든 문제를 해결했다", "처음부터 조금 복잡했지만 재미있었다",
    "기다림 끝에 시작한 도전이었지만 기대를 저버리지 않았다", "처음으로 모든 퍼즐을 시간 내에 해결했다",
    "시간이 촉박했지만 모든 문제를 해결할 수 있었다", "모든 퍼즐을 풀 수 있어 매우 뿌듯했다", "친구들과 힘을 합쳐서 모든 문제를 풀었다",
    "이 퍼즐을 혼자서 해결한 것이 매우 자랑스럽다", "계속된 어려움 속에서 끝까지 포기하지 않았다", 
    "힌트를 몇 개 더 써야 했지만 만족스러웠다", "전체적으로 매우 어려웠지만 재미있었다"
]

personal_reflections = [
    "처음엔 쉽게 풀렸지만 뒤로 갈수록 어려워졌다", "다음에는 더 집중해서 해보고 싶다", "생각보다 시간이 빨리 지나갔다", 
    "힌트 시스템이 흥미로웠다", "친구들과 함께해서 더 재미있었다", "정교한 문제가 많아서 좋았다", 
    "조금 더 쉬웠으면 좋겠다", "정말 집중해서 해냈다", "더 많은 테마를 도전해 보고 싶다", "생각보다 긴장감을 유지해야 했다",
    "시간이 정말 부족했던 것 같다", "처음엔 어려웠지만 결국 성공했다", "재미있고 도전적인 문제들이 많았다", 
    "끝까지 포기하지 않아서 뿌듯했다", "친구들 덕분에 성공할 수 있었다", "다음번에는 더 잘해볼 수 있을 것 같다",
    "매우 흥미진진한 경험이었다", "추가적인 도전이 필요했다", "더 많은 시간을 투자해야 했다", "이번 경험을 통해 많은 것을 배웠다", 
    "끝까지 도전정신을 발휘할 수 있었다", "다음번에는 더욱 능숙하게 할 수 있을 것 같다", "진짜 몰입감이 넘치는 경험이었다",
    "계속해서 도전하고 싶다", "정말 많은 것을 배우게 되었다", "다음번에는 더 잘할 수 있을 것 같다", "이 도전이 앞으로도 기억에 남을 것 같다",
    "계속해서 집중하는 것이 중요했다", "다음번에는 더욱 잘할 수 있을 것 같다", "시간이 조금 더 있었으면 좋았을 것 같다",
    "정말 도전적인 순간들이었다", "처음에는 몰랐지만 나중에는 힌트 없이도 해결할 수 있었다", 
    "친구들과 함께 하면서 해결할 수 있었다", "많은 시간을 들였지만 결국엔 성공했다", "시간을 더 투자했다면 더 빨리 풀 수 있었을 것 같다",
    "정말 기억에 남을 만한 경험이었다", "다음번에는 더 좋은 전략으로 도전하고 싶다", "계속해서 노력할 가치가 있었다",
    "처음엔 힘들었지만 끝까지 해냈다", "다음에는 더 전략적으로 접근해야 할 것 같다", "마지막 퍼즐에서 크게 놀랐다",
    "정말 많은 것을 배운 순간이었다", "처음엔 막막했지만 친구들과 함께 해내서 좋았다", "힌트를 좀 더 아껴서 써야 했을 것 같다",
    "처음엔 조금 복잡했지만 나중엔 쉬웠다", "결국엔 성공해서 만족스러웠다", "매우 도전적이었지만 결과적으로 성공했다"
]

# 리뷰용 문장 패턴 (3가지로 축소)
review_patterns = [
    "{subject}은 {adjective}. {adverb} {verb}.",
    "{subject}, {adverb} {adjective}. {verb}.",
    "{subject}이(가) {adjective} 그리고 {adverb} {verb}."
]

# 기록용 문장 패턴 (3가지로 축소)
diary_patterns = [
    "{subject}, {experience}. {reflection}.",
    "{subject}, {experience} 그리고 {reflection}.",
    "{experience}. {subject} 정말 {reflection}."
]

# 리뷰용 content 생성 함수
def generate_review_content():
    subject = random.choice(review_subjects)
    adjective = random.choice(review_adjectives)
    verb = random.choice(review_verbs)
    adverb = random.choice(review_adverbs)
    
    pattern = random.choice(review_patterns)
    sentence = pattern.format(subject=subject, adjective=adjective, verb=verb, adverb=adverb)
    return sentence

# 일기 형식의 content 생성 함수
def generate_diary_content():
    subject = random.choice(personal_subjects)
    experience = random.choice(personal_experiences)
    reflection = random.choice(personal_reflections)
    
    pattern = random.choice(diary_patterns)
    sentence = pattern.format(subject=subject, experience=experience, reflection=reflection)
    return sentence

# 실제 themeId와 테마의 playTime, maxPlayer 가져오는 함수
def fetch_theme_data():
    connection = None
    try:
        connection = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            database=db_name
        )
        cursor = connection.cursor()
        cursor.execute("SELECT themeId, playtime, maxPeople FROM Theme")
        result = cursor.fetchall()
        theme_data = {row[0]: {'playtime': row[1], 'maxPlayer': row[2]} for row in result}
        return theme_data
    except mysql.connector.Error as error:
        print(f"데이터 조회 중 오류 발생: {error}")
        return {}
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()

# 실제 memberId를 가져오는 함수
def fetch_member_ids():
    connection = None
    try:
        connection = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            database=db_name
        )
        cursor = connection.cursor()
        cursor.execute("SELECT memberId FROM member")
        result = cursor.fetchall()
        member_ids = [row[0] for row in result]
        return member_ids
    except mysql.connector.Error as error:
        print(f"데이터 조회 중 오류 발생: {error}")
        return []
    finally:
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()

# 리뷰 데이터 생성 함수
def generate_review_data(num_reviews, member_ids, theme_data):
    reviews = []
    
    for _ in range(num_reviews):
        member_id = random.choice(member_ids)  # 실제 존재하는 멤버ID 선택
        theme_id = random.choice(list(theme_data.keys()))  # 실제 존재하는 테마ID 선택
        content = generate_review_content()  # 랜덤한 리뷰 내용 생성
        score = random.randint(1, 5)  # 1에서 5점 사이의 점수
        
        # 생성일, 수정일은 현재 연도 내의 무작위 시간
        created_at = fake.date_time_this_year()
        updated_at = created_at + timedelta(minutes=random.randint(10, 1000))

        # 리뷰 데이터 생성
        review = {
            'member_id': member_id,
            'theme_id': theme_id,
            'content': content,
            'score': score,
            'created_at': created_at,
            'updated_at': updated_at
        }
        reviews.append(review)

    return reviews

# 리뷰 데이터를 DB에 삽입하는 함수
def insert_review_data_to_db(reviews):
    connection = None
    try:
        # MySQL 연결 설정
        connection = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            database=db_name,
            use_pure=True
        )
        cursor = connection.cursor()

        # INSERT 쿼리
        insert_query = """
        INSERT INTO review (memberId, themeId, content, score, createdAt, updatedAt)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        
        # 데이터를 하나씩 삽입
        for review in reviews:
            cursor.execute(insert_query, (
                review['member_id'], review['theme_id'], review['content'], review['score'], 
                review['created_at'], review['updated_at']
            ))
        
        # 변경사항 커밋
        connection.commit()
        print(f"{len(reviews)}개의 리뷰 데이터가 성공적으로 삽입되었습니다.")

    except mysql.connector.Error as error:
        if error.errno == errorcode.CR_CONN_HOST_ERROR:
            print("MySQL 서버에 연결할 수 없습니다.")
        else:
            print(f"리뷰 데이터 삽입 중 오류 발생: {error}")
    
    finally:
        # 연결 종료
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")

# 리뷰 ID를 가져오는 함수 (해당 멤버가 해당 테마에 남긴 리뷰가 있는 경우)
def fetch_review_id(member_id, theme_id):
    connection = None
    cursor = None
    try:
        connection = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            database=db_name
        )
        cursor = connection.cursor()
        query = """
        SELECT reviewId FROM review 
        WHERE memberId = %s AND themeId = %s
        """
        cursor.execute(query, (member_id, theme_id))
        
        # 쿼리 결과 가져오기
        result = cursor.fetchone()
        
        if result:
            return result[0]  # 리뷰 ID가 있으면 반환
        else:
            return None
        
    except mysql.connector.Error as error:
        print(f"리뷰 ID 조회 중 오류 발생: {error}")
        return None
    finally:
        # 커서를 닫기 전에 남은 결과가 있는지 확인하고 처리
        if cursor:
            try:
                cursor.fetchall()  # 남은 결과가 있을 수 있으므로 모두 읽어 처리
            except mysql.connector.errors.InterfaceError:
                # 남은 결과가 없는 경우 발생하는 예외는 무시
                pass
            cursor.close()
        if connection and connection.is_connected():
            connection.close()


# 기록 데이터 생성 함수
def generate_history_data(num_records, member_ids, theme_data, review_data):
    history_records = []
    
    for _ in range(num_records):
        member_id = random.choice(member_ids)  # 실제 존재하는 멤버ID 선택
        theme_id = random.choice(list(theme_data.keys()))  # 실제 존재하는 테마ID 선택
        theme_info = theme_data[theme_id]
        playtime = theme_info['playtime']
        max_players = theme_info['maxPlayer']

        # memberPlayTime은 테마의 playTime에서 -30분에서 +10분 사이로 랜덤 설정
        member_play_time = random.randint(playtime - 30, playtime + 10)
        
        # players는 maxPlayer 이하로 설정
        players = random.randint(1, max_players)
        
        # 무작위로 힌트 개수, 성공 여부, 가격 설정
        hint_count = random.randint(0, 3)
        success_flag = random.randint(0, 1)  # 0: 실패, 1: 성공
        price = random.randint(10000, 50000)
        
        # memberLevel은 1.0에서 5.0 사이의 랜덤 값
        member_level = round(random.uniform(1.0, 5.0), 1)
        
        # content는 무작위로 생성된 일기 형식의 문장 사용
        content = generate_diary_content()
        
        # 리뷰가 있는 경우 기록의 리뷰ID 설정
        review_id = fetch_review_id(member_id, theme_id)
        
        # 생성일, 수정일은 현재 연도 내의 무작위 시간 (updatedAt은 createdAt보다 이후)
        created_at = fake.date_time_this_year()
        updated_at = created_at + timedelta(minutes=random.randint(10, 1000))

        # 기록 데이터 생성
        history_record = {
            'member_id': member_id,
            'theme_id': theme_id,
            'review_id': review_id,  # 리뷰가 있으면 해당 리뷰 ID 삽입
            'member_play_time': member_play_time,
            'price': price,
            'hint_count': hint_count,
            'content': content,
            'member_level': member_level,
            'created_at': created_at,
            'updated_at': updated_at,
            'del_flag': 0,
            'players': players,
            'success_flag': success_flag
        }
        history_records.append(history_record)

    return history_records

# 기록 데이터를 DB에 삽입하는 함수
def insert_history_data_to_db(history_records):
    connection = None
    try:
        # MySQL 연결 설정
        connection = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            database=db_name,
            use_pure=True
        )
        cursor = connection.cursor()

        # INSERT 쿼리
        insert_query = """
        INSERT INTO history (memberId, themeId, reviewId, memberPlayTime, price, hintCount, content, memberLevel, createdAt, updatedAt, delFlag, players, successFlag)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        # 데이터를 하나씩 삽입
        for history in history_records:
            cursor.execute(insert_query, (
                history['member_id'], history['theme_id'], history['review_id'], history['member_play_time'], 
                history['price'], history['hint_count'], history['content'], history['member_level'], 
                history['created_at'], history['updated_at'], history['del_flag'], history['players'], 
                history['success_flag']
            ))
        
        # 변경사항 커밋
        connection.commit()
        print(f"{len(history_records)}개의 기록 데이터가 성공적으로 삽입되었습니다.")

    except mysql.connector.Error as error:
        if error.errno == errorcode.CR_CONN_HOST_ERROR:
            print("MySQL 서버에 연결할 수 없습니다.")
        else:
            print(f"기록 데이터 삽입 중 오류 발생: {error}")
    
    finally:
        # 연결 종료
        if connection is not None and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL 연결이 종료되었습니다.")

# 리뷰와 기록 데이터를 생성 및 삽입하는 메인 로직
def generate_and_insert_data():
    # 실제 themeId와 테마 데이터를 조회
    theme_data = fetch_theme_data()
    # 실제 memberId를 조회
    member_ids = fetch_member_ids()

    # 리뷰와 기록 데이터 개수 설정
    num_reviews = 10000  # 10000개의 리뷰 생성
    num_histories = 12000  # 12000개의 기록 생성 (리뷰가 없는 경우도 포함)

    if member_ids and theme_data:
        # 리뷰 데이터를 먼저 생성 및 삽입
        review_data = generate_review_data(num_reviews, member_ids, theme_data)
        insert_review_data_to_db(review_data)

        # 기록 데이터를 생성 및 삽입 (리뷰가 없는 경우도 포함)
        history_data = generate_history_data(num_histories, member_ids, theme_data, review_data)
        insert_history_data_to_db(history_data)
    else:
        print("멤버 또는 테마 데이터를 조회할 수 없습니다.")

# 실행
generate_and_insert_data()
