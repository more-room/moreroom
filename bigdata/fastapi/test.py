import numpy as np
from sklearn.metrics import jaccard_score
from scipy.spatial.distance import jaccard
import timeit

# 예시 데이터 (이진 벡터)
y_true = np.random.randint(0, 2, size=10000)
y_pred = np.random.randint(0, 2, size=10000)

# scikit-learn jaccard_score 속도 측정
def sklearn_jaccard():
    return jaccard_score(y_true, y_pred)

# scipy jaccard 속도 측정
def scipy_jaccard():
    return 1-jaccard(y_true, y_pred)


# timeit을 사용한 속도 측정
sklearn_time = timeit.timeit(sklearn_jaccard, number=100)
scipy_time = timeit.timeit(scipy_jaccard, number=100)

print(f"scikit-learn jaccard_score 평균 시간: {sklearn_time / 100:.6f}초")
print(f"scipy jaccard 평균 시간: {scipy_time / 100:.6f}초")
