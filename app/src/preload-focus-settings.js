// Preload for the Focus settings window: gives its page the chrome.storage shim.

import { contextBridge } from 'electron';
import { makeChrome } from './focus-chrome.js';

// window.chrome already exists in Chromium, so expose under another name; shim.js merges it.
contextBridge.exposeInMainWorld('ygrtmChrome', makeChrome());
