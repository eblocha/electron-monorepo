// Add other api slices here
import type { WindowAPI } from './window'
import type { CryptoAPI } from './crypto'

export type CombinedAPI = WindowAPI & CryptoAPI
