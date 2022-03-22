import { app, ipcMain } from 'electron';
import { callbacks, eventListeners } from './ipc';
import './security-restrictions';
import { restoreOrCreateWindow } from '/@/mainWindow';

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Create app window when background process be ready
 */
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .catch(e => console.error('Failed create window:', e));

/**
 * Install React.js or some other devtools in development mode only
 */
if (import.meta.env.DEV) {
  app
    .whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) =>
      installExtension(REACT_DEVELOPER_TOOLS, {
        loadExtensionOptions: {
          allowFileAccess: true,
        },
      }),
    )
    .catch(e => console.error('Failed install extension:', e));
}

/**
 * Check new app version in production mode only
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch(e => console.error('Failed check updates:', e));
}

// IPC ------------------------------------------------------------------------
Object.entries(callbacks).forEach(([channel, method]) => {
  ipcMain.handle(channel, method);
});

Object.entries(eventListeners).forEach(([channel, listener]) => {
  ipcMain.on(channel, listener);
});
