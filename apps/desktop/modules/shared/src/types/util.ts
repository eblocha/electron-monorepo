/** Unwraps nested promises */
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

// Callbacks - run on main process, invoked by renderer -----------------------

/** Represents the callbacks available to the renderer process. Intended as a base type. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type API = Record<string, (...args: any[]) => any>;

/** Implementation of a callback in the main process */
export type Implementation<T extends API, C extends keyof T> = (
  e: Electron.IpcMainInvokeEvent,
  ...args: Parameters<T[C]>
) => ReturnType<T[C]> | Awaited<ReturnType<T[C]>>;

/** Represents all the implementations of the callbacks in the main process */
export type Callbacks<A extends API> = {
  [K in keyof A]: Implementation<A, K>;
};

// Events - run on either process, invoked by either process ------------------

/** Mapping of event name to a listener. Intended as a base type. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventListeners = Record<string, (...args: any[]) => void>;

/** An event listener that runs on the renderer process */
export type RendererEventListener<T extends EventListeners, C extends keyof T> = (
  e: Electron.IpcRendererEvent,
  ...args: Parameters<T[C]>
) => void;

/** An event listener that runs on the main process */
export type MainEventListener<T extends EventListeners, C extends keyof T> = (
  e: Electron.IpcMainEvent,
  ...args: Parameters<T[C]>
) => void;

/** A collection of all main process event listeners - used to bind to ipcMain on init */
export type MainListeners<A extends EventListeners> = {
  [K in keyof A]: MainEventListener<A, K>;
};
