<p>
<details>
<summary> <h5>8월 26일</h5> </summary>

## 리액트 쿼리(tanstack-query)

- 기존의 Client state를 다루는 상태관리 라이브러리와 다르게 sever state를 Fetching, Caching, 비동기적으로 업데이트 하는 데 도움을 줌
- 비동기 상태 관리하는 쿼리
- 기존의 상태 관리 라이브러리의 문제점
  - 기능 추가가 될 수록 store가 커진다.
  - API 관련해서 작성되는 코드 수와 반복되는 작업이 많다.
  - 컴포넌트가 렌더링 하는 작업만 하지 않고 API나 다른 로직들도 포함

장점

- 코드의 라인 수가 줄어 들어 코드 가독성이 좋아짐
- 기존의 비동기 API 로직을 한 곳에서 확인이 가능해서 관심사 분리에 용이
- **`onSuccess` `onError` `isFetching`** 등 ErrorFlag를 지원해줘서 편리하게 사용 가능
- 지원해주는 다양한 옵션을 이용하여 데이터 변환이 가능

</details>
</p>

Queries

HTTP GET 요청과 같이 외부 데이터를 불러오고자 할 때는 `useQuery` hook을 통해 쿼리 호출

useQuery(queryKey, queryFn, config)

- queryKey: 내부적으로 쿼리를 관리하기 위한 값
  
  - 문자열 하나이거나 여러 값을 포함한 배열
  
  - 배열 안 원소들의 순서가 다르면 서로 다른 쿼리로 취급
  
  - 서로 다른 두 컴포넌트에서 동일한 쿼리 키로 인스턴스를 생성하면 서로 공유

- queryFn: Promise를 반환하는 비동기 함수, 외부 데이터를 직접 요청하는 코드 포함
  
  - 요청 성공 시엔 응답된 값을 넣어주고, 에러 발생 시엔 throw문을 통해 반드시 에러를 던져줘야 함
    
    - fetch API는 HTTP 요청에 실패하더라도 axios와 달리 자동으로 에러를 던지지 않음(네트워크 오류시에만 에러)
    
    - `{ queryKey === [_key, { status, page }] }` 인자를 통해 쿼리 키를 참조할 수도 있다.
    
    - config : 쿼리의 옵션 지정
