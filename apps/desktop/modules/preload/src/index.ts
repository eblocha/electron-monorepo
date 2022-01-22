/**
 * @module preload
 */

import { contextBridge } from 'electron';
import { createInvoker, createSubscriber } from './ipc';
import { Channels } from '/@shared';
import { sha256sum } from '/@/sha256sum';

/**
 * Expose Environment versions.
 * @example
 * console.log( window.versions )
 */
contextBridge.exposeInMainWorld('versions', process.versions);

const nodeCrypto = { sha256sum };

/**
 * Safe expose node.js API
 * @example
 * window.nodeCrypto('data')
 */
contextBridge.exposeInMainWorld('nodeCrypto', nodeCrypto);

export const api = {
  title: {
    maximize: createInvoker(Channels.MAXIMIZE),
    minimize: createInvoker(Channels.MINIMIZE),
    restore: createInvoker(Channels.RESTORE),
    close: createInvoker(Channels.CLOSE),
    onMaximized: createSubscriber(Channels.MAXIMIZED),
    onUnMaximized: createSubscriber(Channels.UNMAXIMIZED),
    isMaximized: createInvoker(Channels.IS_MAXIMIZED),
  },
  lib: {
    sha256sum: createInvoker(Channels.SHA256),
  },
};

contextBridge.exposeInMainWorld('main', api);

declare global {
  interface Window {
    main: typeof api;
    nodeCrypto: typeof nodeCrypto;
    versions: typeof process.versions;
  }
}
