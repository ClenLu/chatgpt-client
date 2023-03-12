import { proxy } from 'umi';
import type { IChat, IMessage } from '@/types';
import invariant from 'invariant';

export const state = proxy<{
  chats: string[];
  chatsById: { [key: string]: IChat };
}>({
  chats: [],
  chatsById: {},
});

const CHAT_NOT_FOUND = 'Chat not found';

export const actions = {
  create() {
    const id = crypto.randomUUID();
    state.chats.push(id);
    state.chatsById[id] = {
      createdAt: Date.now(),
      id,
      messages: [],
      title: 'Chat with ChatGPT',
    };
    return id;
  },
  delete(id: string) {
    invariant(state.chats.includes(id), CHAT_NOT_FOUND);
    state.chats = state.chats.filter((chatId) => chatId !== id);
    delete state.chatsById[id];
  },
  update(id: string, chat: Partial<IChat>) {
    invariant(state.chats.includes(id), CHAT_NOT_FOUND);
    state.chatsById[id] = {
      ...state.chatsById[id],
      ...chat,
    };
  },
  addMessage(id: string, message: IMessage) {
    invariant(state.chats.includes(id), CHAT_NOT_FOUND);
    state.chatsById[id].messages.push(message);
  },
};
