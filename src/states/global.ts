import { proxy } from 'umi';

export const state = proxy<{
  config: {
    token: string;
  };
  ui: {
    activeChatId: string;
  };
}>({
  config: {
    token: '',
  },
  ui: {
    activeChatId: '',
  },
});

export const actions = {
  setToken(token: string) {
    state.config.token = token;
  },
};
