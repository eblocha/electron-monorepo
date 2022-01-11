import type { CombinedAPI } from './combined'

/** Invokes a callback on the main process, and awaits the result */
export type Invoker<Channel extends keyof CombinedAPI> = CombinedAPI[Channel]
