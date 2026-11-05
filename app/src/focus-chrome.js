// Minimal chrome.storage / chrome.runtime stand-in so the Focus scripts (focus/) run
// unchanged inside the app. Storage lives in the main process (config.focus).

import { ipcRenderer } from 'electron';

export function makeChrome() {
  const listeners = new Set();
  ipcRenderer.on('focus:changed', (_e, changes) => {
    for (const fn of listeners) {
      try {
        fn(changes, 'local');
      } catch (err) {
        console.error('YGRTM: focus listener failed', err);
      }
    }
  });
  return {
    storage: {
      local: {
        get: (keys) => ipcRenderer.invoke('focus:get', keys ?? null),
        set: (obj) => ipcRenderer.invoke('focus:set', obj),
        remove: (keys) => ipcRenderer.invoke('focus:remove', keys),
      },
      onChanged: { addListener: (fn) => listeners.add(fn) },
    },
    runtime: {
      id: 'ygrtm-app',
      getManifest: () => ({ version: 'app' }),
      sendMessage: () => Promise.resolve(),
    },
  };
}
