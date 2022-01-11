import { ipcRenderer } from 'electron'
import type { Subscriptions, CombinedAPI, Invoker } from '/@shared'

/**
 * Expose a function to subscribe to events from the main process
 * @param channel The Channel to fire the provided callback for
 * @returns A function to expose the renderer that can be used to subscribe to an event
 */
export const createSubscriber = <C extends keyof Subscriptions>(channel: C) => {
  return (fn: Subscriptions[C]) => {
    const listener = (event: Electron.IpcRendererEvent, ...args: unknown[]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fn(...args)
    }
    ipcRenderer.on(channel, listener)
    return () => {
      ipcRenderer.removeListener(channel, listener)
    }
  }
}

/**
 * Expose a method in the renderer to invoke a callback on the main process
 * @param channel The channel to invoke
 * @returns A method to expose in the renderer to invoke the given channel
 */
export const createInvoker = <Channel extends keyof CombinedAPI>(channel: Channel): Invoker<Channel> => {
  return (...args: unknown[]) => ipcRenderer.invoke(channel, ...args)
}
