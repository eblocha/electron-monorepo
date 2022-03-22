import { ipcRenderer } from 'electron';
import type { CombinedAPI, Invoker, MainEvents, MainEventSender, RendererEvents } from '/@shared';

/**
 * Expose a function to subscribe to events from the main process
 * @param channel The Channel to fire the provided callback for
 * @returns A function to expose the renderer that can be used to subscribe to an event
 */
export const createSubscriber = <C extends keyof RendererEvents>(channel: C) => {
  return (fn: RendererEvents[C]) => {
    const listener = (event: Electron.IpcRendererEvent, ...args: unknown[]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fn(...args);
    };
    ipcRenderer.on(channel, listener);
    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  };
};

/**
 * Expose a method in the renderer to invoke a callback on the main process
 * @param channel The channel to invoke
 * @returns A method to expose in the renderer to invoke the given channel
 */
export const createInvoker = <Channel extends keyof CombinedAPI>(channel: Channel): Invoker<Channel> => {
  return (...args: unknown[]) => ipcRenderer.invoke(channel, ...args);
};

/**
 * Expose a method to send a message to the main process, with no return value
 * @param channel The channel to send the event on
 * @returns A function to send to the channel
 */
export const createSender = <Channel extends keyof MainEvents>(channel: Channel): MainEventSender<Channel> => {
  return (...args: unknown[]) => ipcRenderer.send(channel, ...args);
};
