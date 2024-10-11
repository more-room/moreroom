
// 생일 입력할 때 예외 처리하기 위한 함수입니다.
// 회원 가입, 마이페이지 등에 쓰입니다.


export const handleDateChange = (
  value: string,
  type: 'year' | 'month' | 'day',
  setState: (value: string) => void,
) => {
  let onlyNumber = value.replace(/[^0-9]/g, '');

  // 연도 처리
  if (type === 'year') {
    if (onlyNumber.length > 4) {
      onlyNumber = onlyNumber.slice(0, 4);
    }

    if (onlyNumber.length === 4) {
      const year = parseInt(onlyNumber, 10);
      if (year < 1924) {
        setState('1924');
      } else if (year > 2024) {
        setState('2024');
      } else {
        setState(onlyNumber);
      }
    } else {
      setState(onlyNumber);
    }
  }

  // 월 처리
  else if (type === 'month') {
    if (onlyNumber.length <= 2) {
      setState(onlyNumber);
    }

    const month = parseInt(onlyNumber, 10);
    if (onlyNumber.length === 2) {
      if (month < 1) {
        setState('01');
      } else if (month > 12) {
        setState('12');
      } else {
        setState(onlyNumber);
      }
    }
  }

  // 일 처리
  else if (type === 'day') {
    if (onlyNumber.length <= 2) {
      setState(onlyNumber);
    }

    const day = parseInt(onlyNumber, 10);
    if (onlyNumber.length === 2) {
      if (day < 1) {
        setState('01');
      } else if (day > 31) {
        setState('31');
      } else {
        setState(onlyNumber);
      }
    }
  }
};
