// Settings that belong to the desktop app itself (not to Focus), plus the one-time
// migration of the old built-in filter's settings into Focus's AI filter storage.

import { sanitizeSettings } from '../core/rules.js';

export const APP_DEFAULTS = {
  skipAds: true,
  skipSponsors: true,
  hideShorts: true,
  hidePlayables: true,
};

export function sanitizeApp(raw) {
  const r = raw && typeof raw === 'object' ? raw : {};
  const out = {};
  for (const [k, d] of Object.entries(APP_DEFAULTS)) out[k] = typeof r[k] === 'boolean' ? r[k] : d;
  return out;
}

// Keys the old built-in filter shares with Focus's AI filter (same names and shapes).
const SHARED_KEYS = [
  'enabled',
  'mode',
  'packs',
  'customKeywords',
  'ignoredKeywords',
  'blockedChannels',
  'blockedEnabled',
  'allowedChannels',
  'matchChannelNames',
  'matchDescriptions',
  'detectDisclosure',
  'autoBlockDisclosed',
  'showPageBar',
  'hoverBlock',
  'skipOldVideos',
  'oldVideoYear',
  'possible',
  'possibleKeywords',
  'scanWatchPage',
];

/**
 * Turns the old `config.filter` into { aiFilterSettings, app, focus }: Focus's AI filter
 * settings, the app-only options, and the Focus layout keys that replace the old player size.
 */
export function migrateOldFilter(rawFilter) {
  const old = sanitizeSettings(rawFilter);
  const aiFilterSettings = {};
  for (const k of SHARED_KEYS) aiFilterSettings[k] = old[k];
  const focus = {};
  if (old.playerSize === 'theater' || old.playerSize === 'fit') focus.forced_theater_mode = true;
  if (old.playerSize === 'fit') focus.player_size = 'fit_to_window';
  return { aiFilterSettings, app: sanitizeApp(old), focus };
}
