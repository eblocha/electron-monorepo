import type { API, Implementation } from './util';

/** This represents all the implementations of the callbacks in the main process */
export type Callbacks<A extends API> = {
  [K in keyof A]: Implementation<A, K>;
};
