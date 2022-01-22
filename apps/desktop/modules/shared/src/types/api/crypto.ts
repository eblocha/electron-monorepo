import type { Channels } from '../channels';

export type CryptoAPI = {
  [Channels.SHA256]: (data: string) => Promise<string>;
};
