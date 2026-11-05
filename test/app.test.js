import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sanitizeApp, migrateOldFilter } from '../app/appsettings.js';
import { startBackground } from '../app/background-host.js';

test('sanitizeApp fills defaults and drops junk', () => {
  assert.deepEqual(sanitizeApp({ skipAds: false, x: 1, hideShorts: 'no' }), {
    skipAds: false,
    skipSponsors: true,
    hideShorts: true,
    hidePlayables: true,
  });
});

test('migrateOldFilter carries channels, keywords and player size', () => {
  const m = migrateOldFilter({
    blockedChannels: [{ key: '@x', name: 'X' }],
    customKeywords: ['foo'],
    hideShorts: false,
    playerSize: 'fit',
  });
  assert.equal(m.aiFilterSettings.blockedChannels[0].key, '@x');
  assert.ok(m.aiFilterSettings.customKeywords.includes('foo'));
  assert.equal(m.app.hideShorts, false);
  assert.equal(m.focus.forced_theater_mode, true);
  assert.equal(m.focus.player_size, 'fit_to_window');
});

test('background host runs the real Focus background', async () => {
  const data = {};
  const storage = {
    get: async (k) => {
      const keys = typeof k === 'string' ? [k] : Array.isArray(k) ? k : Object.keys(k || data);
      return Object.fromEntries(keys.filter((x) => x in data).map((x) => [x, data[x]]));
    },
    set: async (o) => void Object.assign(data, o),
    remove: async () => {},
    onChanged: { addListener() {} },
  };
  const bg = startBackground({ source: readFileSync(new URL('../focus/background.js', import.meta.url), 'utf8'), storage });
  const res = await bg.dispatch({ type: 'aif:update', op: { op: 'add', list: 'aiChannels', channel: { handle: '@a', id: 'UCabcdefghijklmnopqrstuv', name: 'A' } } });
  assert.equal(res?.ok, true);
});
