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
