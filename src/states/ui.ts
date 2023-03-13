import { proxy } from 'umi';

interface IState {
  sending: boolean;
  showTokenDialog: boolean;
}
export const state = proxy<IState>({
  sending: false,
  showTokenDialog: false,
});

export const actions = {
  update(newState: Partial<IState>) {
    Object.assign(state, newState);
  },
};
