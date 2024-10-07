import { create } from 'zustand';
import { ISignUP } from '../types/mypageTypes';

type SignUpAction = {
  setSignUpData: (data: Partial<ISignUP>) => void;
};

export const useSignUpStore = create<ISignUP & SignUpAction>()((set) => ({
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  gender: undefined,
  birth: '',
  genreIdList: [],
  regionId: '',

  // 입력된 데이터를 업데이트하는 함수
  setSignUpData: (data) => set((state) => ({ ...state, ...data })),
}));


interface RegionState {
  selectedRegionId: string | undefined;
  selectedRegion: string | null;
  selectedCity: string | null;
  setSelectedRegionId: (regionId: string) => void;
  setSelectedRegion: (region: string) => void;
  setSelectedCity: (city: string | null) => void;
  resetSelection: () => void;
}

export const useRegionSelectionStore = create<RegionState>((set) => ({
  selectedRegionId: '',
  selectedRegion: null,
  selectedCity: null,
  setSelectedRegionId: (regionId) => set({ selectedRegionId: regionId}),
  setSelectedRegion: (region) => set({ selectedRegion: region}),
  setSelectedCity: (city) => set({ selectedCity: city }),
  resetSelection: () => set({ selectedRegionId:undefined, selectedRegion: null, selectedCity: null }),
}));
