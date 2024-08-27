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

</details>
</p>

<p>
<details>
<summary> <h5>8월 27일</h5> </summary>

## 자바스크립트 그래프 라이브러리

**D3.js**

- Data-Driven-Documents
- 웹브라우저상에서 동적이고 인터렉티브한 정보시각화를 구현하기 위한 자바스크립트 라이브러리
- 기본 문법
  - [d3.select](http://d3.select) : 특정 태그 하나를 선택
  - d3.selectAll : 특정 태그 전체를 선택
  - selection.attr : 선택 태그의 속성값 지정
  - [selection.data](http://selection.data) : 집어넣을 즉 차트에 사용할 데이터를 가져옴
  - selection.enter : 데이터 개수만큼 태그가 부족할 시에 추가(ex.데이터가 5개, p 태그가 3개일시 데이터 개수에 맞게 p태그 2개를 더 추가)
  - selection.append : 새로운 태그를 추가

**chart.js**

- canvas 태그를 통해 차트를 그리는 간단하고 유연한 자바스크립트 차트
- 속성
  - type : 차트의 형태
    ```jsx
    bar: "bar"; // line,doughnut 등 다양한 형태 존재
    ```
  - data: 차트에 표시할 데이터, dataset 객체들을 담고 있음
    - 만약 하나의 label에 두개의 데이터를 넣고 싶다면, datasets에 객체를 하나 더 추가하면 됨
    - labels: 축제목
    - datasets: 각 축에 들어갈 데이터를 넣어주고 색이나 두께 같은 꾸밈 요소도 지정가능
    ```jsx
    data: {
      labels: ['2020', '2021', '2022', '2023'], // x축 데이터
        datasets: [ // 데이터의 속성
          {
            label: 'Dataset', // 축의 제목
            fill: false, // line 형태일 때, 선 안쪽을 채우는지 여부
            data: [10,20,30,40], // dataset 값
            backgroundColor: '#00C7E2' // dataset 배경색
            borderColor: 'white', // dataset 테두리 색상
            borderWidth: 2, // dataset 테두리 두께
            maxBarThickness: 30 // 최대 bar의 두께 설정
          }
        ]
    }
    ```
  - opions : 차트 모양을 꾸밀 수 있음
    ```jsx
    options: {
      responsive: false, // 반응형 여부 (기본값 true)
      maintainAspectRatio: false, // 크기 고정
      plugins: {
      	tooltip: { // 튤팁 스타일링
          enabled: true, // 튤팁 활성화 (기본값 true)
          backgroundColor: '#000', // 튤팁 색상
          padding: 10 // 튤팁 패딩
        },
        legend: { // 범례 스타일링
        	display: true, // 범례 활성화 (기본값 true)
            position: 'bottom' // 범례 위치
        }
      },
      scales: { // x축과 y축에 대한 설정
    	x: {
          grid: { // 축에 대한 격자선
            display: false, // grid 활성화 (기본값 true)
          }
       	},
        y: {
          min: 0, // y축에 대한 최소값
          max: 50, // y축에 대한 최대값
          border: { // 축에 대한 테두리 속성
          	dash: [5, 5] // 점선 형태
          },
        }
      }
    }
    ```

**Bilboard.js**

- C3.js를 네이버에서 변형하여 불편한 부분을 편리하게 만들어 오픈소스로 배포
- 차트를 쉽게 구현할 수 있고, 내부 메서드를 사용해 쉽게 차트를 조작할 수 있다.
- 속성 - div의 위치: 차트가 삽입될 위치 - bindto: 차트 이름, class나 id를 사용하면 됨. - data: 차트의 각종 데이터. - columns: `["계열이름", 1번데이터, 2번데이터, ...]` - types: `계열이름: "차트형태"` - colors: `계열이름: "색상"`
  ```
  <div id="pieChart"></div>

      var chart = bb.generate({
        data: {
          columns: [
        ["data1", 30],
        ["data2", 120]
          ],
          type: "pie", // for ESM specify as: pie()
          onclick: function(d, i) {
        console.log("onclick", d, i);
        },
          onover: function(d, i) {
        console.log("onover", d, i);
        },
          onout: function(d, i) {
        console.log("onout", d, i);
        }
        },
        bindto: "#pieChart"
      });

      setTimeout(function() {
        chart.load({
          columns: [
            ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
            ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
            ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
          ]
        });
      }, 1500);

      setTimeout(function() {
        chart.unload({ ids: "data1" });
        chart.unload({ ids: "data2" });
      }, 2500);
      ```

  </details>
  </p>
