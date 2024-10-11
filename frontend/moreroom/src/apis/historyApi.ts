import {
  IHistoryDetail,
  IHistoryList,
  IHistoryListRequestParameter,
  IHistoryWrite,
} from '../types/historyTypes';
import { api } from './interceptors';

/* 기록 목록 조회 */
export const getHistoryList = (dateRange: IHistoryListRequestParameter) => {
  return api.get<IHistoryList>('/api/history', { params: dateRange });
};

/* 기록 상세 조회 */
export const getHistoryDetail = (historyId: number) => {
  return api.get<IHistoryDetail>(`/api/history/${historyId}`);
};

/* 기록 등록 */
export const addHistory = (data: IHistoryWrite) => {
  return api.post('/api/history', data);
};

/* 기록 수정 */
export const editHistory = (data: IHistoryWrite, historyId: number) => {
  return api.patch(`/api/history/${historyId}`, data);
};

/* 기록 삭제 */
export const delHistory = (historyId: number) => {
  return api.delete(`/api/history/${historyId}`);
};
