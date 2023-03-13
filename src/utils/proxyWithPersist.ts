import { proxy, snapshot, subscribe } from 'umi';

export function proxyWithPersist<V extends Object>(
  val: V,
  opts: {
    key: string;
  },
) {
  const local = localStorage.getItem(opts.key);
  const state = proxy<V>(local ? JSON.parse(local) : val);
  subscribe(state, () => {
    const snapshotState = snapshot(state);
    localStorage.setItem(opts.key, JSON.stringify(snapshotState));
  });
  return state;
}
