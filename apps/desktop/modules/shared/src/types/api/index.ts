import type { WindowAPI } from './window';
import type { CryptoAPI } from './crypto';

export * from './window';
export * from './crypto';

export type CombinedAPI = WindowAPI & CryptoAPI;

/** Invokes a callback on the main process, and awaits the result */
export type Invoker<Channel extends keyof CombinedAPI> = CombinedAPI[Channel];
