import type { Callbacks, CombinedAPI } from '/@shared'
import windowSlice from './window'
import cryptoSlice from './crypto'

export const callbacks: Callbacks<CombinedAPI> = {
  ...windowSlice,
  ...cryptoSlice,
}
