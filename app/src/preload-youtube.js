// Runs in the YouTube window's isolated world (sandboxed). Nothing is exposed to
// the page itself. Two things run here:
//  - Focus (focus/): layout, cleanup, audio and its full AI filter (aifilter.js), all
//    talking to the main process through a chrome.storage / chrome.runtime stand-in.
//  - The app's own extras (core/engine.js in appOnly mode): ad skipping, SponsorBlock,
//    Shorts / Playables hiding. Its keyword filter is off so only Focus's filter runs.

import { ipcRenderer, webFrame, contextBridge } from 'electron';
import css from './app-features.css';
import { createFilter } from '../../core/engine.js';
import { installAdPrune } from '../../core/adprune.js';
import focusCss from '../../focus/styles.css';
import focusPageSource from '../../focus/page.js.txt';
import { runEarly } from '../../focus/early.js';
import { runAudio } from '../../focus/audio.js';
import { makeChrome } from './focus-chrome.js';

const whenRoot = (fn) => {
  if (document.documentElement) return fn();
  const mo = new MutationObserver(() => {
    if (!document.documentElement) return;
    mo.disconnect();
    fn();
  });
  mo.observe(document, { childList: true });
};

try {
  globalThis.chrome = makeChrome();
  webFrame.insertCSS(focusCss);
  // The page script reads document.documentElement immediately, so wait for it.
  whenRoot(() => webFrame.executeJavaScript(focusPageSource).catch(() => {}));
  whenRoot(runEarly);
  // Focus's AI filter content script (self-starting, bundled lazily so it waits for the root).
  if (!location.pathname.startsWith('/audiolibrary/') && !location.pathname.startsWith('/tv')) {
    whenRoot(() => require('../../focus/aifilter.js'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runAudio, { once: true });
  else runAudio();
} catch (err) {
  console.error('YGRTM: Focus scripts not installed', err);
}

// App-only options (skip ads, SponsorBlock, Shorts, Playables) live in the main process.
const forApp = (s) => ({ ...s, enabled: true });
const storage = {
  load: async () => forApp(await ipcRenderer.invoke('app:load')),
  save: async () => {},
  subscribe: (cb) => ipcRenderer.on('app:changed', (_e, settings) => cb(forApp(settings))),
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

const filter = createFilter({ storage, adHooks, appOnly: true });
filter.init();

// "Block This Channel" menu item: add the channel on the page to Focus's AI channel list.
ipcRenderer.on('aif:block-page-channel', () => {
  const channel = filter.getPageChannel();
  if (channel) {
    globalThis.chrome.runtime
      .sendMessage({ type: 'aif:update', op: { op: 'add', list: 'aiChannels', channel } })
      .catch(() => {});
  }
});
