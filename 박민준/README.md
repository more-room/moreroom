<p>
<details>
<summary> <h5>8월 26일</h5> </summary>

# SUB PJT 1

## Req. 1-2-1 각 음식점의 평균 평점을 계산하여 높은 평점의 음식점 순으로 `n`개의 음식점을 정렬하여 리턴합니다.
## Req. 1-2-2 리뷰 개수가 `min_reviews` 미만인 음식점은 제외합니다.

```python
def sort_stores_by_score(dataframes, n=20, min_reviews=30):
    
    # 데이터프레임 병합
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )

    # 리뷰 개수 계산
    review_counts = stores_reviews.groupby("store").size()

    # min_reviews 이상인 음식점만 필터링
    filtered_stores_reviews = stores_reviews[stores_reviews["store"].isin(review_counts[review_counts >= min_reviews].index)]

    # 음식점별 평균 평점 계산
    scores_group = filtered_stores_reviews.groupby(["store", "store_name"])["score"].mean()

    # 평점 순으로 정렬하여 상위 n개 선택
    top_scores = scores_group.sort_values(ascending=False).head(n).reset_index()

    return top_scores
```

## Req. 1-2-3 가장 많은 리뷰를 받은 `n`개의 음식점을 정렬하여 리턴합니다.

```python
def get_most_reviewed_stores(dataframes, n=20):
    
    # stores와 reviews 데이터 병합
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )

    # 각 음식점별 리뷰 개수 계산
    review_counts = stores_reviews.groupby(["store", "store_name"]).size()

    # 리뷰 개수로 정렬한 상위 n개의 음식점 반환
    top_review = review_counts.sort_values(ascending=False).head(n).reset_index(name="review_count")

    return top_review
```

## Req. 1-2-4 가장 많은 리뷰를 작성한 `n`명의 유저를 정렬하여 리턴합니다.

```python
def get_most_active_users(dataframes, n=20):

    # 리뷰 데이터에서 유저별 리뷰 개수를 계산
    user_review_counts = dataframes["reviews"].groupby("user").size()

    # 리뷰 개수가 많은 순으로 정렬 후 상위 n명의 유저 반환
    top_active_users = user_review_counts.sort_values(ascending=False).head(n).reset_index(name="review_count")

    return top_active_users
```
</details>
</p>
