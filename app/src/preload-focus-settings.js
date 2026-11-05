// Preload for the Focus settings window: gives its page the chrome.storage shim.

import { contextBridge } from 'electron';
import { makeChrome } from './focus-chrome.js';

contextBridge.exposeInMainWorld('chrome', makeChrome());
