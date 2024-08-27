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
