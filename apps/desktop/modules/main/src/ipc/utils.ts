import type { Subscriptions } from '/@shared'

/**
 * Send events to subscribers in a type-safe way
 * @param wc The webcontents to send the event to
 * @param channel The channel to send the event on
 * @returns A function to send the events to the webcontents
 */
export const createSender = <C extends keyof Subscriptions>(wc: Electron.WebContents, channel: C) => {
  return (...args: Parameters<Subscriptions[C]>) => wc.send(channel, ...args)
}
