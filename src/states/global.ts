import { proxyWithPersist } from '@/utils/proxyWithPersist';

interface IState {
  token: string;
  activeChatId: string;
}
export const state = proxyWithPersist<IState>(
  {
    token: '',
    activeChatId: '',
  },
  {
    key: 'CC_global',
  },
);

export const actions = {
  update(newState: Partial<IState>) {
    Object.assign(state, newState);
  },
};
