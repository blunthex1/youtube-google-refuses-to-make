// Preload for the settings window (and its embedded AI Filter / AI Lists frames): gives the
// Focus options page its chrome.storage / chrome.runtime shim and the app-only settings.

import { contextBridge, ipcRenderer } from 'electron';
import { makeChrome } from './focus-chrome.js';

// window.chrome already exists in Chromium, so expose under another name; shim.js merges it.
contextBridge.exposeInMainWorld('ygrtmChrome', makeChrome());
contextBridge.exposeInMainWorld('ygrtmApp', {
  load: () => ipcRenderer.invoke('app:load'),
  save: (patch) => ipcRenderer.invoke('app:save', patch),
  subscribe: (cb) => {
    ipcRenderer.on('app:changed', (_e, settings) => cb(settings));
  },
});
