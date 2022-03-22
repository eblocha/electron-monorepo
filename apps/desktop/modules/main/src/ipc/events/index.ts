import logSlice from './logging';
import { MainEvents, MainListeners } from '/@shared';

export const eventListeners: MainListeners<MainEvents> = {
  ...logSlice,
};
