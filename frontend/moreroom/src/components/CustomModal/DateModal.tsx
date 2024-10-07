/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일 설정
import { TextField } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';

const modalBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContainer = css`
  background: ${Colors['light']['100']};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const modalHeader = css`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${Colors['dark']['900']};
  text-align: center;
`;

const buttonContainer = css`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const buttonStyle = css`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;

  &:first-of-type {
    margin-right: 1rem;
  }
`;

const confirmButton = css`
  ${buttonStyle};
  background-color: ${Colors['primary']['A200']};
  color: white;

  &:hover {
    background-color: ${Colors['primary']['A400']};
  }
`;

const cancelButton = css`
  ${buttonStyle};
  background-color: ${Colors['danger']['A200']};
  color: white;

  &:hover {
    background-color: ${Colors['danger']['A400']};
  }
`;

interface DateModalProps {
  title: string;
  initialValue: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

export const DateModal: React.FC<DateModalProps> = ({ title, initialValue, onConfirm, onCancel }) => {
  const initialDayjs = dayjs(initialValue).locale('ko'); // 한국어 로케일 설정
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(initialDayjs.isValid() ? initialDayjs : dayjs().locale('ko'));
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(initialDayjs.isValid() ? initialDayjs : dayjs().locale('ko'));

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      // 날짜와 시간 병합
      const combinedDateTime = selectedDate
        .hour(selectedTime.hour())
        .minute(selectedTime.minute());
      const formattedDate = combinedDateTime.format('YYYY-MM-DD HH:mm');
      onConfirm(formattedDate);
    }
  };

  return (
    <div css={modalBackground} onClick={onCancel}>
      <div css={modalContainer} onClick={(e) => e.stopPropagation()}>
        <div css={modalHeader}>{title}</div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          {/* 날짜 선택 캘린더 */}
          <div>
            <div css={modalHeader}>날짜 선택</div>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              disablePast // 과거 날짜는 비활성화
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '1rem',
                },
              }}
            />
          </div>

          {/* 시간 선택 디지털 시계 */}
          <div>
            <div css={modalHeader}>시간 선택</div>
            <DigitalClock
              value={selectedTime}
              onChange={(newTime) => setSelectedTime(newTime)}
              ampm // 오전/오후 선택 가능
              sx={{
                width: '100%',
                '& .MuiTypography-root': {
                  fontSize: '1rem',
                },
              }}
            />
          </div>
        </LocalizationProvider>
        <div css={buttonContainer}>
          <button css={confirmButton} onClick={handleConfirm}>
            확인
          </button>
          <button css={cancelButton} onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
