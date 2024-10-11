import { create } from 'zustand';
import { IChatListItem } from '../types/chatingTypes';

type ChatingRoomState = {
  chatList: IChatListItem[];
  lastMessageId?: string;
};

type ChatingRoomAction = {
  addOldChatList: (oldList: IChatListItem[]) => void;
  addNewChat: (chat: IChatListItem) => void;
  setLastMessageId: (lastMessageId: ChatingRoomState['lastMessageId']) => void;
};

export const useChatingRoomStore = create<
  ChatingRoomState & ChatingRoomAction
>()((set) => ({
  chatList: [],
  addOldChatList: (oldList) =>
    set((state) => ({ chatList: [...oldList.reverse(), ...state.chatList] })),
  addNewChat: (chat) =>
    set((state) => ({ chatList: [...state.chatList, chat] })),
  setLastMessageId: (lastMessageId) =>
    set(() => ({ lastMessageId: lastMessageId })),
}));
