import { create } from 'zustand';

// 파티 인터페이스 수정
export interface IParty {
  id: number;
  themeId: number;
  partyHashtagIdList: number[];
  myHashtagIdList: number[];
  yourHashtagIdList: number[];
}

export interface PartyStore {
  parties: IParty[];
  addParty: (party: IParty) => void;
  updateParty: (id: number, updatedParty: Partial<IParty>) => void;
}

export const usePartyStore = create<PartyStore>((set) => ({
  parties: [],
  addParty: (party) =>
    set((state) => ({ parties: [...state.parties, party] })),
  updateParty: (id, updatedParty) =>
    set((state) => ({
      parties: state.parties.map((party) =>
        party.id === id ? { ...party, ...updatedParty } : party
      ),
    })),
}));