import { BrowserWindow } from 'electron';
import type { WindowAPI, Callbacks } from '/@shared';
import { Channels } from '/@shared';

const callbacks: Callbacks<WindowAPI> = {
  [Channels.MAXIMIZE]: e => {
    const win = BrowserWindow.fromWebContents(e.sender);
    if (win) {
      win.maximize();
    }
  },
  [Channels.MINIMIZE]: e => {
    const win = BrowserWindow.fromWebContents(e.sender);
    if (win) {
      win.minimize();
    }
  },
  [Channels.RESTORE]: e => {
    const win = BrowserWindow.fromWebContents(e.sender);
    if (win) {
      win.restore();
    }
  },
  [Channels.CLOSE]: e => {
    const win = BrowserWindow.fromWebContents(e.sender);
    if (win) {
      win.close();
    }
  },
  [Channels.IS_MAXIMIZED]: e => {
    const win = BrowserWindow.fromWebContents(e.sender);
    if (win) {
      return win.isMaximized();
    } else return false;
  },
};

export default callbacks;
