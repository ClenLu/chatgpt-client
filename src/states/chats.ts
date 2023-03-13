import type { IChat, IMessage } from '@/types';
import invariant from 'invariant';
import { proxyWithPersist } from '@/utils/proxyWithPersist';

export const state = proxyWithPersist<{
  chats: string[];
  chatsById: { [key: string]: IChat };
}>(
  {
    chats: [],
    chatsById: {},
  },
  {
    key: 'CC_chats',
  },
);

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
      systemMessage:
        'You are ChatGPT, a large language model trained by OpenAI.',
    };
    return state.chatsById[id];
  },
  delete(id: string) {
    invariant(state.chats.includes(id), CHAT_NOT_FOUND);
    const index = state.chats.indexOf(id);
    state.chats.splice(index, 1);
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
