// Runs in the YouTube window's isolated world (sandboxed). Nothing is exposed to
// the page itself; the filter talks to the main process over IPC.

import { contextBridge, ipcRenderer, webFrame } from 'electron';
import css from '../../core/filter.css';
import { createFilter } from '../../core/engine.js';
import { installAdPrune } from '../../core/adprune.js';
import focusCss from '../../focus/styles.css';
import focusPageSource from '../../focus/page.js.txt';
import { runEarly } from '../../focus/early.js';
import { runAudio } from '../../focus/audio.js';
import { makeChrome } from './focus-chrome.js';

// Focus layout/cleanup/audio scripts (see focus/). They are off until enabled in
// Focus settings, and share nothing with the AI filter below.
try {
  globalThis.chrome = makeChrome();
  webFrame.insertCSS(focusCss);
  webFrame.executeJavaScript(focusPageSource).catch(() => {});
  const whenRoot = (fn) => {
    if (document.documentElement) return fn();
    const mo = new MutationObserver(() => {
      if (!document.documentElement) return;
      mo.disconnect();
      fn();
    });
    mo.observe(document, { childList: true });
  };
  whenRoot(runEarly);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runAudio, { once: true });
  else runAudio();
} catch (err) {
  console.error('YGRTM: Focus scripts not installed', err);
}

const storage = {
  load: () => ipcRenderer.invoke('aif:load'),
  save: (settings) => ipcRenderer.invoke('aif:save', settings),
  subscribe: (cb) => ipcRenderer.on('aif:changed', (_e, settings) => cb(settings)),
};

// Runs in the page's own world before YouTube's scripts: strips ad data from player
// responses (only while Shields is on).
try {
  if (ipcRenderer.sendSync('aif:ad-prune')) contextBridge.executeInMainWorld({ func: installAdPrune });
} catch (err) {
  console.error('YGRTM: ad pruning not installed', err);
}

webFrame.insertCSS(css);

// YouTube ignores script clicks on its Skip button, so the main process sends a real one.
const adHooks = {
  trustedClick: (x, y) => {
    const z = webFrame.getZoomFactor();
    ipcRenderer.send('aif:trusted-click', { x: Math.round(x * z), y: Math.round(y * z) });
  },
  onStuck: (videoId) => ipcRenderer.send('aif:ad-stuck', videoId),
};

const filter = createFilter({ storage, adHooks });
filter.init();

ipcRenderer.on('aif:block-page-channel', () => {
  const channel = filter.getPageChannel();
  if (channel) filter.actions.blockChannel(channel);
});
