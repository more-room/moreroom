<p>
<details>
<summary> <h5>8월 26일</h5> </summary>

- 주제: 파이썬을 사용하여 데이터를 가공 및 분석
    - Pandas를 통한 정제, 통계적 분석
    - Matplotlib, Folium 라이브러리를 통한 시각화
    - EDA(Exploratory Data Analysis; EDA) - 탐색적 데이터 분석
        - 데이터를 이해하는 단계

- 추천 방법론
    - 콘텐츠 기반 필터링 Content-based filtering
        - 대상 자체의 특성을 바탕으로 추천
        - 딥러닝 개입 여지 많음 - 딥러닝이 피처 만들어준다
        - KNN
    - 협업 필터링 Collaborative Filtering
        - 다른 사람들이 들은 곡을 바탕으로 어떤 곡들이 서로 비슷한지 알아내는 방법
        - 주로 사용하는 모델: 행렬 분해(Matrix Factorization)
            - 등장한지 오래된 간단한 모델
        - 얕은 데이터 구조에서 유리


### Pandas를 통한 데이터 전처리, 통계 분석 실습 
<details><summary><h6>Code</h6></summary>

# parse.py

```python
user_columns = (
    "id",
    "gender",
    "age"
)

def import_data(data_path=DATA_FILE):
    """
    Req. 1-1-1 음식점 데이터 파일을 읽어서 Pandas DataFrame 형태로 저장합니다
    """
    users = [] # 유저 테이블

    for d in data:

        for review in d["review_list"]:
            u = review["writer_info"]

            users.append(
                [u['id'], u['gender'], u['born_year']]
            )


    user_frame = pd.DataFrame(data=users, columns=user_columns).drop_duplicates(subset='id').reset_index(drop=True)

    return {"stores": store_frame, "reviews": review_frame, "users": user_frame}
```


# analyze.py

```python
def sort_stores_by_score(dataframes, n=20, min_reviews=30):
    """
    Req. 1-2-1 각 음식점의 평균 평점을 계산하여 높은 평점의 음식점 순으로 `n`개의 음식점을 정렬하여 리턴합니다
    Req. 1-2-2 리뷰 개수가 `min_reviews` 미만인 음식점은 제외합니다.
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    # 리뷰 개수 `min_reviews` 미만인 음식점은 제외
    stores_reviews_filtered = stores_reviews.groupby(["store", "store_name"]).filter(lambda x: len(x) >= min_reviews)
    
    # 각 음식점의 평균 평점 계산
    scores_group = stores_reviews_filtered.groupby(["store", "store_name"])
    scores = scores_group["score"].mean().reset_index()
    
    return scores.sort_values("score", ascending=False).reset_index(drop=True).head(n=n)


def get_most_reviewed_stores(dataframes, n=20):
    """
    Req. 1-2-3 가장 많은 리뷰를 받은 `n`개의 음식점을 정렬하여 리턴합니다
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    # 각 음식점의 리뷰 개수 계산
    scores = stores_reviews.groupby(["store", "store_name"]).agg({
        'id_y': 'count'
    }).reset_index()
    scores = scores.rename(columns={'id_y': 'review_count'})
     
    return scores.sort_values("review_count", ascending=False).reset_index(drop=True).head(n=n)


def get_most_active_users(dataframes, n=20):
    """
    Req. 1-2-4 가장 많은 리뷰를 작성한 `n`명의 유저를 정렬하여 리턴합니다.
    """
    users_reviews = pd.merge(
        dataframes["users"], dataframes["reviews"], left_on="id", right_on="user"
    )
    # 각 음식점의 리뷰 개수 계산
    scores = users_reviews.groupby(["user", "id_x"]).agg({
        'id_y': 'count'
    }).reset_index()
    scores = scores.rename(columns={'id_y': 'review_count'})
     
    return scores.sort_values("review_count", ascending=False).reset_index(drop=True).head(n=n)
```

</details>
</details>
</p>

<p>
<details>
<summary> <h5>8월 27일</h5> </summary>

✅ 데이터 분석 코드(Pandas, 26일 진행) 리팩토링 

✅ Matplotlib, Folium 라이브러리를 통한 시각화 

⬜ EDA 


- 주제: 파이썬을 사용하여 데이터를 가공 및 분석
    - Pandas를 통한 정제, 통계적 분석
    - Matplotlib, Folium 라이브러리를 통한 시각화
    - EDA(Exploratory Data Analysis; EDA) - 탐색적 데이터 분석
        - 데이터를 이해하는 단계

### Matplotlib, Folium 라이브러리를 통한 시각화 실습

<details><summary><h6>Code</h6></summary>

# 파일명

```python
def show_store_review_distribution_graph(dataframes):
    """
    Req. 1-3-1 전체 음식점의 리뷰 개수 분포를 그래프로 나타냅니다. 
    """
    # 전체 음식점 데이터 가져오기
    most_reviewed_stores = get_most_reviewed_stores(dataframes, dataframes["stores"].shape[0])
    
    # 리뷰 개수의 히스토그램 생성
    plt.figure(figsize=(10, 6))
    plt.hist(most_reviewed_stores['review_count'], bins=100, color='skyblue', edgecolor='black')
    
    # 가로 너비를 최대 리뷰 개수에 맞추기
    # 101이 있어서 그냥 30으로 설정
    max_review_count = most_reviewed_stores['review_count'].max()
    print(max_review_count)
    plt.xlim(0, 30)  # x축 범위 설정

    plt.title('음식점 리뷰 개수 분포')
    plt.xlabel('리뷰 개수')
    plt.ylabel('음식점 수')
    plt.grid(axis='y', alpha=0.75)
    
    # 그래프 보여주기
    plt.show()


def show_store_average_ratings_graph(dataframes):
    """
    Req. 1-3-2 각 음식점의 평균 평점을 그래프로 나타냅니다.
    """
    df = sort_stores_by_score(dataframes, dataframes["stores"].shape[0], 0)
    # 리뷰 개수의 히스토그램 생성
    plt.figure(figsize=(10, 6))
    plt.hist(df['score'], bins=30, color='skyblue', edgecolor='black')
    
    # 가로 너비를 최대 리뷰 개수에 맞추기
    # 101이 있어서 그냥 30으로 설정
    max_score = df['score'].max()
    min_score = df['score'].min()
    plt.xlim(min_score, max_score)  # x축 범위 설정

    plt.title('음식점 평균 평점 분포')
    plt.xlabel('평균 평점')
    plt.ylabel('음식점 수')
    plt.grid(axis='y', alpha=0.75)
    
    # 그래프 보여주기
    plt.show()


def show_user_review_distribution_graph(dataframes):
    """
    Req. 1-3-3 전체 유저의 리뷰 개수 분포를 그래프로 나타냅니다.
    """
    df = get_most_active_users(dataframes, dataframes["users"].shape[0])
    
    plt.figure(figsize=(10, 6))
    plt.hist(df['review_count'], bins=100, color='lightgreen', edgecolor='black')

    # 가로 너비를 최대 리뷰 개수에 맞추기
    # 최대가 너무 커서 100에 맞춤
    max_review_count = df['review_count'].max()
    plt.xlim(0, 100)  # x축 범위 설정
    
    plt.title('유저 리뷰 개수 분포')
    plt.xlabel('리뷰 개수')
    plt.ylabel('유저 수')
    plt.grid(axis='y', alpha=0.75)
    
    plt.show()



def show_user_age_gender_distribution_graph(dataframes):
    """
    Req. 1-3-4 전체 유저의 성별/나이대 분포를 그래프로 나타냅니다.
    """
    df = dataframes["users"]
    # 나이를 10년 단위로 나누기
    # age 컬럼을 정수형으로 변환
    df['age'] = df['age'].astype(int)
    df['age_group'] = (2024 - df['age']) // 10 * 10  # 현재 연도에 맞춰 나이대 계산

    # 성별과 나이대별로 그룹화하여 각 그룹의 수를 계산
    age_gender_distribution = df.groupby(['gender', 'age_group']).size().reset_index(name='count')

    # 그래프로 표현
    plt.figure(figsize=(12, 6))
    chart = sns.barplot(x="age_group", y="count", hue="gender", data=age_gender_distribution)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("성별 및 나이대 분포")
    plt.xlabel("나이대")
    plt.ylabel("유저 수")
    plt.legend(title='성별')
    plt.show()


def show_stores_distribution_graph(dataframes):
    """
    Req. 1-3-5 각 음식점의 위치 분포를 지도에 나타냅니다.
    """
    df = dataframes['stores']
    # 'address' 컬럼의 NaN 값을 처리
    df = df[df['address'].notna()]
    # 구미 지역의 음식점만 필터링
    gumi_stores = df[df['address'].str.contains('구미') & df['address'].str.contains('경상북도')]

    # 중심 좌표 설정 (구미의 평균 좌표)
    map_center = [36.0976, 128.3442]  # 구미의 중심 좌표
    store_map = folium.Map(location=map_center, zoom_start=12)

    # 각 음식점의 위치에 마커 추가
    for idx, row in gumi_stores.iterrows():
        if pd.notna(row['category']) and row['category']:
            popup_text = f"{row['store_name']} ({row['category']})"
        else:
            popup_text = row['store_name']
        
        folium.Marker(
            location=[row['latitude'], row['longitude']],
            popup=popup_text,
            icon=folium.Icon(color='blue')
        ).add_to(store_map)

    # 지도를 HTML 파일로 저장
    store_map.save("gumi_stores_distribution_map.html")
    print("지도 파일이 'gumi_stores_distribution_map.html'로 저장되었습니다.")
```

</details>
</details>
</p>


<p>
<details>
<summary> <h5>8월 26일</h5> </summary>

# 주제

## 타이틀1

타이틀 1의 내용

## 타이틀2

타이틀 2의 내용
</details>
</p>


<p>
<details>
<summary> <h5>8월 26일</h5> </summary>

# 주제

## 타이틀1

타이틀 1의 내용

## 타이틀2

타이틀 2의 내용
</details>
</p>


<p>
<details>
<summary> <h5>8월 26일</h5> </summary>

# 주제

## 타이틀1

타이틀 1의 내용

## 타이틀2

타이틀 2의 내용
</details>
</p>
