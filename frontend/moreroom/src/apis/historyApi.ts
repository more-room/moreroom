import {
  IHistoryDetail,
  IHistoryList,
  IHistoryListRequestParameter,
} from '../types/historyTypes';
import { api } from './interceptors';

/* 기록 목록 조회 */
export const getHistoryList = (dateRange: IHistoryListRequestParameter) => {
  return api.get<IHistoryList>('api/history', { params: dateRange });
};

/* 기록 상세 조회 */
export const getHistoryDetail = (historyId: number) => {
  return api.get<IHistoryDetail>(`api/history/${historyId}`);
};
