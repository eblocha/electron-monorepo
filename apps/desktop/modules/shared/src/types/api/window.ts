import type { Channels } from '../channels'

export type WindowAPI = {
  [Channels.MAXIMIZE]: () => Promise<void>
  [Channels.MINIMIZE]: () => Promise<void>
  [Channels.RESTORE]: () => Promise<void>
  [Channels.CLOSE]: () => Promise<void>
  [Channels.IS_MAXIMIZED]: () => Promise<boolean>
}
