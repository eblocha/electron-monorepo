// These are events that the main process listens to - activated with ipcRenderer.send, subscribed with ipcMain.on

import { LogEvents } from './logging';

export * from './logging';

/** Defines the available events that the main process can subscribe to */
export type MainEvents = LogEvents;

/** Sends an event to the main process */
export type MainEventSender<Channel extends keyof MainEvents> = MainEvents[Channel];
