<p>
<details>
<summary> <h5>8월 26일</h5> </summary>

# 타입 스크립트 학습

## 기초 1
```javascript
// 배열
let numArr:number[] = [1, 2, 3]

let strArr:string[] = ["hello", "im", "winter"];

// 2번 방식
let boolArr: Array<boolean> = [true, false]

// 배열에 들어가는 요소들의 타입이 다양할 경우
let multiArr: (number | string)[] = [1, 'hello'];

// 다차원 배열의 타입을 정의하는 방법 
let doubleArr:number[][] = [
  [1,2,3],
  [4,5]
];

// 튜플 
// 길이와 타입이 고정된 배열 
let tup1:[number, number] = [1, 2]

let tup2: [number, string, boolean] = [1, '2', true]

const users: [string,number][]= [
  ["남은식", 1],
  ["이정환", 2],
  ["김아무개", 3],
  // [4, "빌런"] // 여기에 오류가 나기 때문에 튜플로 가이드 지정
];

// object
let user: {
  id?: number;  // ?는 있어도 되고 없어도 되고, 있으면 넘버형으로 해야한다!
  name: string;  // 객체 리터럴 타입으로 정의해주고 만들기
} = {
  id : 1,
  name : "남은식"
};


// let dog: {
//   name:string;
//   color:string;  // 이런 특징을 구조적 타입 시스템
// } = {
//   name: "돌돌이",
//   color: 'white',
// }
// user.id //잘 나옴
// dog.color

user = {
  name: "홍길동",  // 일단 이름만 아는 상황, id는 선택적
}

let config: {
  readonly apikey: string
} = {
  apikey: "MY API KEY"
};

// config.apikey = "hacked" //readonly는 값 못바꾸게 함

```

## 기초 2
```javascript
// 타입 별칭
let user: {
  id: number;
  name: string;
  nickname:string;
  birth: string;
  bio : string;
  location : string
} = {
  id: 1,
  name: "남은식",
  nickname: 'sik',
  birth : '1999-03-11',
  bio : '안녕하세요',
  location : '대구, 구미'
}
// 한명에 이정도인데 여러명 된다면?? 너무 길어진다!!
// 이럴때 타입을 변수처럼 만드는 타입별칭 

type User = {
  id: number;
  name: string;
  nickname:string;
  birth: string;
  bio : string;
  location : string
};



let user2: User = {
  id: 2,
  name: "남은식",
  nickname: 'sik',
  birth : '1999-03-11',
  bio : '안녕하세요',
  location : '대구, 구미'
}

// 컴파일 후 js에서는 타입 별칭 사라짐 

// 인덱스 시그니처 : 키와 벨류의 규칙을 기준으로 다 정의

// type CountryCodes = {
//   Korea : string;
//   UnitedState: string;
//   UnitedKingdom : string
//   // 이렇게 하면 나라가 추가될때 다 적기 힘들다!
// }

type CountryCodes = {
  [key : string] : string;
  // 키와 밸류의 타입 규칙을 기준으로 다 허용시키기
}

let contryCodes: CountryCodes = {
  Korea : 'ko',
  UnitedState: 'us',
  UnitedKingdom: 'uk',
}

type CountryNumberCodes = {
  [key : string] : number; // 이걸 위반하지만 않으면 다 허용이라 객체가 없어도 오류가 안남ㅋ
}

let countryNumberCodes: CountryNumberCodes = {
  Korea : 410,
  UnitedState: 840,
  UnitedKingdom: 826,
};
<br>
// enum 타입
// 열거형 타입 : 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입


enum Role {
  ADMIN = 0, // 숫자 할당 안해도 자동으로 맨 위는 0부터 시작
  USER = 1,  // 자동으로 밑의 숫자는 위에꺼 +1씩
  GUEST = 2,
}

enum Language {
  korean = "ko",
  english = "er"
}


const user1 = {
  name : "남은식",
  // role : 0 // 관리자
  role: Role.ADMIN,
  language: Language.korean,
}

const user2 = {
  name : "조소연",
  role : Role.USER // 일반 유저
}

const user3 = {
  name : "박민준",
  role : Role.GUEST // 게스트
}

console.log(user1, user2, user3)
```
</details>
</p>

<p>
<details>
<summary> <h5>8월 27일</h5> </summary>

# Sub 1

## parse.py

```python


DATA_DIR = "../data"
DATA_FILE = os.path.join(DATA_DIR, "data.json")
DUMP_FILE = os.path.join(DATA_DIR, "dump.pkl")

store_columns = (
    "id",  # 음식점 고유번호
    "store_name",  # 음식점 이름
    "branch",  # 음식점 지점 여부
    "area",  # 음식점 위치
    "tel",  # 음식점 번호
    "address",  # 음식점 주소
    "latitude",  # 음식점 위도
    "longitude",  # 음식점 경도
    "category",  # 음식점 카테고리
)

review_columns = (
    "id",  # 리뷰 고유번호
    "store",  # 음식점 고유번호
    "user",  # 유저 고유번호
    "score",  # 평점
    "content",  # 리뷰 내용
    "reg_time",  # 리뷰 등록 시간
)


def import_data(data_path=DATA_FILE):
    """
    Req. 1-1-1 음식점 데이터 파일을 읽어서 Pandas DataFrame 형태로 저장합니다
    """

    try:
        with open(data_path, encoding="utf-8") as f:
            data = json.loads(f.read())
    except FileNotFoundError as e:
        print(f"`{data_path}` 가 존재하지 않습니다.")
        exit(1)

    stores = []  # 음식점 테이블
    reviews = []  # 리뷰 테이블

    for d in data:

        categories = [c["category"] for c in d["category_list"]]
        stores.append(
            [
                d["id"],
                d["name"],
                d["branch"],
                d["area"],
                d["tel"],
                d["address"],
                d["latitude"],
                d["longitude"],
                "|".join(categories),
            ]
        )

        for review in d["review_list"]:
            r = review["review_info"]
            u = review["writer_info"]

            reviews.append(
                [r["id"], d["id"], u["id"], r["score"], r["content"], r["reg_time"]]
            )

    store_frame = pd.DataFrame(data=stores, columns=store_columns)
    review_frame = pd.DataFrame(data=reviews, columns=review_columns)

    return {"stores": store_frame, "reviews": review_frame}


def dump_dataframes(dataframes):
    pd.to_pickle(dataframes, DUMP_FILE)


def load_dataframes():
    return pd.read_pickle(DUMP_FILE)


def main():

    print("[*] Parsing data...")
    data = import_data()
    print("[+] Done")

    print("[*] Dumping data...")
    dump_dataframes(data)
    print("[+] Done\n")

    data = load_dataframes()

    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    print("[음식점]")
    print(f"{separater}\n")
    print(data["stores"].head())
    print(f"\n{separater}\n\n")

    print("[리뷰]")
    print(f"{separater}\n")
    print(data["reviews"].head())
    print(f"\n{separater}\n\n")


if __name__ == "__main__":
    main()

```

## analyze.py

```python
from parse import load_dataframes
import pandas as pd
import shutil


def sort_stores_by_score(dataframes, n=20, min_reviews=30):
    """
    Req. 1-2-1 각 음식점의 평균 평점을 계산하여 높은 평점의 음식점 순으로 `n`개의 음식점을 정렬하여 리턴합니다
    Req. 1-2-2 리뷰 개수가 `min_reviews` 미만인 음식점은 제외합니다.
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )

     # 음식점별로 그룹화하고, 각 그룹의 평균 평점과 리뷰 개수를 계산
    scores_group = stores_reviews.groupby(["store", "store_name"]).agg(
        avg_score=('score', 'mean'),
        review_count=('score', 'count')
    )
    
     # 리뷰 개수가 min_reviews 미만인 음식점 제외
    filtered_scores = scores_group[scores_group['review_count'] >= min_reviews]
    
    # 평균 평점으로 정렬하고 상위 n개의 음식점 반환
    sorted_scores = filtered_scores.sort_values(by='avg_score', ascending=False).head(n)
    
    return sorted_scores.reset_index()


def get_most_reviewed_stores(dataframes, n=20):
    """
    Req. 1-2-3 가장 많은 리뷰를 받은 `n`개의 음식점을 정렬하여 리턴합니다
    """
    # 리뷰 데이터를 음식점별로 그룹화하고, 리뷰 수를 계산
    review_counts = dataframes["reviews"].groupby("store").size()
    
    # 리뷰 수를 기준으로 내림차순 정렬하고 상위 n개의 음식점을 반환
    top_reviewed_stores = review_counts.nlargest(n).reset_index(name='review_count')
    
    # 상위 n개의 음식점 정보를 stores 데이터프레임과 병합하여 반환
    top_reviewed_stores = pd.merge(top_reviewed_stores, dataframes["stores"], left_on="store", right_on="id")
    
    return top_reviewed_stores


def get_most_active_users(dataframes, n=20):
    """
    Req. 1-2-4 가장 많은 리뷰를 작성한 `n`명의 유저를 정렬하여 리턴합니다.
    """
    # 리뷰 데이터를 유저별로 그룹화하고, 리뷰 수를 계산
    user_review_counts = dataframes["reviews"].groupby("user").size()
    
    # 리뷰 수를 기준으로 내림차순 정렬하고 상위 n명의 유저를 반환
    top_active_users = user_review_counts.nlargest(n).reset_index(name='review_count')
    
    # 상위 n명의 유저 정보를 users 데이터프레임과 병합하여 반환
    top_active_users = pd.merge(top_active_users, dataframes["users"], left_on="user", right_on="id")
    
    return top_active_users



def main():
    data = load_dataframes()

    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    # 최고 평점 음식점 출력
    stores_most_scored = sort_stores_by_score(data)
    print("[최고 평점 음식점]")
    print(f"{separater}\n")
    for i, store in stores_most_scored.iterrows():
        print(
            "{rank}위: {store}({score}점)".format(
                rank=i + 1, store=store.store_name, score=store.avg_score
            )
        )
    print(f"\n{separater}\n\n")

    # 가장 많은 리뷰를 받은 음식점 출력
    most_reviewed_stores = get_most_reviewed_stores(data)
    print("[가장 많은 리뷰를 받은 음식점]")
    print(f"{separater}\n")
    for i, store in most_reviewed_stores.iterrows():
        print(
            "{rank}위: {store_name}({reviews}개 리뷰)".format(
                rank=i + 1, store_name=store.store_name, reviews=store.review_count
            )
        )
    print(f"\n{separater}\n\n")

    # 가장 많은 리뷰를 작성한 유저 출력
    most_active_users = get_most_active_users(data)
    print("[가장 많은 리뷰를 작성한 유저]")
    print(f"{separater}\n")
    for i, user in most_active_users.iterrows():
        print(
            "{rank}위: {username}({reviews}개 리뷰)".format(
                rank=i + 1, username=user.username, reviews=user.review_count
            )
        )
    print(f"\n{separater}\n\n")

if __name__ == "__main__":
    main()

```

</details>
</p>