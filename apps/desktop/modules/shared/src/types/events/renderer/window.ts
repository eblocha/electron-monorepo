import { Channels } from '../../channels';

export type WindowEvents = {
  [Channels.MAXIMIZED]: () => void;
  [Channels.UNMAXIMIZED]: () => void;
};
