# Adding IPC Callbacks and Events

## Creating invokable callbacks

If you need the renderer process to use some API only available to the main process, you will need to create a callback.

1. Create all the new channels you will need in `packages/shared/types/channels.ts`

2. Create new types in the `packages/shared/types` module

   - Create a new file in `api` with the name of the new module (see `api/crypto.ts` as an example)
     - This maps your new channels to callback signatures (must be wrapped with Promise)
   - Import your new type into the `api/combined.ts` file, and join it with the other API type slices there
   - Export your new module from `api/index.ts`

3. Bind the channels to the IPC api exposed to the renderer

   - In `packages/preload/src/index.ts`, add the new module as a new property onto `api`, and assign your channels with `createInvoker`.

4. Implement the callbacks for each new channel

   - In `packages/main/src/callbacks`, create a new file for your module (see `callbacks/crpyto` as an example)
     - The callbacks API should be the default export
   - In `callbacks/index.ts`, import your new API slice, and combine it with the existing slices

5. Implement a jest mock for the new API

   - In `packages/renderer/setupTests.ts`, create mock implementations for your new IPC api

Your renderer should now be able to asyncronously call your new channels!

## Creating subscribable events

You may want the renderer to subscribe to events that happen on the main process (e.g. when using a file watcher).
In order to add a new event:

1. Create the new channel you will need in `packages/shared/types/channels.ts`

2. Register your event

   - Add the event subscription callback signature to the Subscriptions type in `packages/shared/src/types/subscriptions.ts`
   - Use the Callback type provided to create the signature. You can pass argument types as an array in the type argument.
     - For example, if your subscription callback takes a string and a number, you would use `Callback<[string, number]>`
     - **These arguments are passed to the callback that will run on the renderer process**

3. Bind the event subscriber to the API

   - In `packages/preload/src/index.ts`, assign an object parameter to `createSubscriber(Channels.YOUR_NEW_EVENT_CHANNEL)`
     - This function will return a function to the renderer to unsubscribe itself from the event

4. Implement a jest mock for the new API

   - In `packages/renderer/setupTests.ts`, create mock implementations for your new IPC api

You're ready to send the event!

- Whenever you need the main process to send an event, use the `createSender` function from `packages/main/src/ipc/utils.ts`
  - This takes the webContents to send to and the channel name, and returns a function to fire the event. The function is fully typed for the channel spcified!

## Why this complexity?

As your app grows, you will need more and more callbacks to the main process. In order to ensure type safety, this project re-uses the function signatures for these callbacks for both processes.

This architecture ensures that the correct channel is invoked for each callback by mapping the channel name to the callback itself. Then, we just use `createInvoker` to specify the "structure" of the api to the renderer. It also ensures that every channel will be responded to by the main process, because it collects all the callbacks into a single object, and binds them to `ipcMain` in `packages/main/src/index.ts`.

Without the `createInvoker` utility, you would have no way to ensure that `ipcRenderer.invoke()` returns what you think it does. This architecture ensures that.
