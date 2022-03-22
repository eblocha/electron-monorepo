// These are events the renderer process responds to - activated with ipcMain.send, subscribed with ipcRenderer.on

import { WindowEvents } from './window';

export * from './window';

/**
 * Defines the available events that the renderer can subscribe to
 */
export type RendererEvents = WindowEvents;
