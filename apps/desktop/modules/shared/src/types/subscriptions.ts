import type { Channels } from './channels'

/** Runs in the renderer when an event is recieved */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback<A extends any[]> = (...args: A) => void

/**
 * Defines the available events that can be subscribed to.
 * This should be of the form Record<string, Callback>
 */
export type Subscriptions = {
  [Channels.MAXIMIZED]: Callback<[]>
  [Channels.UNMAXIMIZED]: Callback<[]>
}
