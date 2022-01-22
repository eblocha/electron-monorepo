import { sha256 } from '@electron-monorepo/core';
import type { CryptoAPI, Callbacks } from '/@shared';
import { Channels } from '/@shared';

const callbacks: Callbacks<CryptoAPI> = {
  [Channels.SHA256]: (e, data) => sha256(data),
};

export default callbacks;
