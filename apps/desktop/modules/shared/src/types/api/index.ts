import type { CombinedAPI } from './combined';

export * from './combined';
export * from './window';
export * from './crypto';

/** Invokes a callback on the main process, and awaits the result */
export type Invoker<Channel extends keyof CombinedAPI> = CombinedAPI[Channel];
