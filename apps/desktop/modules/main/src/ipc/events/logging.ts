import { Channels, LogEvents, MainListeners } from '/@shared';

const eventListeners: MainListeners<LogEvents> = {
  [Channels.LOG]: (_e, logEvent) => {
    console.log(logEvent);
  },
};

export default eventListeners;
