import { Channels } from '../../channels';

export type LogParameters = {
  level: 'error' | 'warn' | 'info' | 'verbose' | 'debug';
  message: string;
};

export type LogEvents = {
  [Channels.LOG]: (args: LogParameters) => void;
};
