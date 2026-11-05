// Runs Focus's unmodified background script (focus/background.js) inside the main
// process. It handles the aif:update / aif:sets messages (AI lists, learned words,
// archive compaction, backups) against a chrome.storage.local stand-in.

export function startBackground({ source, storage }) {
  const listeners = [];
  const never = { addListener() {} };
  const chrome = {
    storage: { local: storage },
    runtime: {
      id: 'ygrtm-app',
      onInstalled: never,
      onStartup: never,
      onMessage: { addListener: (fn) => void listeners.push(fn) },
    },
  };
  new Function('chrome', 'self', source)(chrome, { addEventListener() {} });

  return {
    /** Delivers a message to the background handlers; resolves with the first response. */
    dispatch(msg) {
      return new Promise((resolve) => {
        const sender = { id: chrome.runtime.id };
        let async = false;
        for (const fn of listeners) {
          let result;
          try {
            result = fn(msg, sender, resolve);
          } catch (err) {
            console.error('Focus background handler failed', err);
          }
          if (result === true) {
            async = true;
            break;
          }
        }
        if (!async) resolve(undefined);
      });
    },
  };
}
