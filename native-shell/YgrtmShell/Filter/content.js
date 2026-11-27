(() => {
  // core/adskip.js
  var SKIP_BUTTONS = [
    ".ytp-skip-ad-button",
    ".ytp-ad-skip-button",
    ".ytp-ad-skip-button-modern",
    ".ytp-ad-skip-button-slot button",
    'button[id^="skip-button"]',
    'button[class*="skip-button"]',
    'button[class*="skip-ad"]'
  ].join(",");
  var AD_CLASSES = ["ad-showing", "ad-interrupting"];
  var AD_HIDE_ATTR = "data-msm-ad";
  var STUCK_MS = 4e3;
  var CLICK_EVERY_MS = 400;
  function createAdSkipper({ doc, win, intervalMs = 250, trustedClick = null, onStuck = null }) {
    let timer = null;
    let mutedByUs = false;
    let rateByUs = null;
    let adSince = 0;
    let lastClick = 0;
    let stuckFiredFor = null;
    function alreadyReloaded(vid) {
      try {
        if (win.sessionStorage.getItem("msm-ad-reloaded") === vid) return true;
        win.sessionStorage.setItem("msm-ad-reloaded", vid);
        return false;
      } catch {
        return true;
      }
    }
    function videoId() {
      return new URLSearchParams(win.location.search).get("v");
    }
    function clickSkip(btn) {
      const now = Date.now();
      if (now - lastClick < CLICK_EVERY_MS) return;
      lastClick = now;
      const r = btn.getBoundingClientRect();
      if (trustedClick && r.width > 0 && r.height > 0) {
        trustedClick(r.left + r.width / 2, r.top + r.height / 2);
      }
      btn.click();
    }
    function endAd(player, video) {
      if (adSince) {
        adSince = 0;
        player?.removeAttribute(AD_HIDE_ATTR);
        if (video) {
          if (mutedByUs) video.muted = false;
          if (rateByUs !== null && video.playbackRate === 16) video.playbackRate = rateByUs;
        }
      }
      mutedByUs = false;
      rateByUs = null;
    }
    function tick() {
      const player = doc.querySelector("#movie_player");
      const video = player?.querySelector("video");
      if (!player || !video) return;
      const adShowing = AD_CLASSES.some((c) => player.classList.contains(c));
      if (!adShowing) {
        endAd(player, video);
        return;
      }
      const now = Date.now();
      if (!adSince) adSince = now;
      if (!player.hasAttribute(AD_HIDE_ATTR)) player.setAttribute(AD_HIDE_ATTR, "");
      if (!video.muted) {
        video.muted = true;
        mutedByUs = true;
      }
      if (Number.isFinite(video.duration) && video.duration > 0) {
        if (video.currentTime < video.duration - 0.25) video.currentTime = video.duration;
      } else if (video.playbackRate !== 16) {
        if (rateByUs === null) rateByUs = video.playbackRate;
        video.playbackRate = 16;
      }
      if (video.paused && !video.ended) {
        try {
          Promise.resolve(video.play()).catch(() => {
          });
        } catch {
        }
      }
      const skip = player.querySelector(SKIP_BUTTONS);
      if (skip) clickSkip(skip);
      if (onStuck && now - adSince > STUCK_MS) {
        const vid = videoId();
        if (vid && stuckFiredFor !== vid) {
          stuckFiredFor = vid;
          if (alreadyReloaded(vid)) return;
          adSince = now;
          onStuck(vid);
        }
      }
    }
    return {
      /** Call on every page scan; runs only while `active` (on a video page, setting on). */
      update(active) {
        if (active && !timer) timer = win.setInterval(tick, intervalMs);
        if (!active && timer) {
          win.clearInterval(timer);
          timer = null;
          endAd(doc.querySelector("#movie_player"), doc.querySelector("#movie_player video"));
        }
      },
      tick
    };
  }

  // core/sponsorblock.js
  var API = "https://sponsor.ajay.app/api/skipSegments/";
  var SPONSOR_CATEGORIES = ["sponsor", "selfpromo"];
  async function sha256Hex(text2, win) {
    const buf = await win.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text2));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  async function fetchSegments(videoId, win = window, categories = SPONSOR_CATEGORIES) {
    try {
      const prefix = (await sha256Hex(videoId, win)).slice(0, 4);
      const url = `${API}${prefix}?categories=${encodeURIComponent(JSON.stringify(categories))}`;
      const res = await win.fetch(url, { credentials: "omit" });
      if (!res.ok) return [];
      const data = await res.json();
      const entry = Array.isArray(data) && data.find((v) => v.videoID === videoId);
      if (!entry) return [];
      return entry.segments.filter((s) => s.actionType === "skip" && Array.isArray(s.segment)).map((s) => ({ start: +s.segment[0], end: +s.segment[1], category: s.category })).filter((s) => s.end - s.start >= 1).sort((a, b) => a.start - b.start);
    } catch {
      return [];
    }
  }
  function createSponsorSkipper({ doc, win, onSkip }) {
    let videoId = null;
    let segments = [];
    let video = null;
    const skipped = /* @__PURE__ */ new Set();
    function onTime() {
      if (!video || !segments.length) return;
      const t = video.currentTime;
      for (const seg of segments) {
        const key = `${seg.start}`;
        if (t >= seg.start && t < seg.end - 0.3 && !skipped.has(key)) {
          skipped.add(key);
          const from = t;
          video.currentTime = Math.min(seg.end, video.duration || seg.end);
          onSkip?.(seg, () => {
            video.currentTime = from;
          });
          return;
        }
      }
    }
    function attach(v) {
      if (video === v) return;
      video?.removeEventListener("timeupdate", onTime);
      video = v;
      video?.addEventListener("timeupdate", onTime);
    }
    return {
      /** Call on every page scan. id = current watch-page video id (or null). */
      update(id, enabled) {
        if (!enabled || !id) {
          attach(null);
          videoId = null;
          segments = [];
          return;
        }
        attach(doc.querySelector("#movie_player video, video.html5-main-video"));
        if (id === videoId) return;
        videoId = id;
        segments = [];
        skipped.clear();
        fetchSegments(id, win).then((segs) => {
          if (videoId === id) segments = segs;
        });
      }
    };
  }

  // core/defaults.js
  var KEYWORD_PACKS = {
    aiGenerated: {
      label: "AI-generated videos",
      description: 'Videos made with AI video, image, music or voice generators ("AI slop").',
      keywords: [
        // Explicit disclosure
        "ai generated",
        // Who did the work: "voiced by AI", "AI narrator"
        "voiced by ai",
        "narrated by ai",
        "written by ai",
        "directed by ai",
        "animated by ai",
        "scripted by ai",
        "composed by ai",
        "sung by ai",
        "drawn by ai",
        "illustrated by ai",
        "ai voiced",
        "ai narrator",
        "ai host",
        "ai presenter",
        "ai avatar",
        // With a word in between: "made entirely by AI", "100% AI generated"
        "100% ai",
        "entirely ai",
        "entirely by ai",
        "entirely with ai",
        "fully ai",
        "fully by ai",
        "fully with ai",
        "completely ai",
        "completely by ai",
        "completely with ai",
        "totally ai",
        "/\\b(made|created|generated|produced|written|directed|animated|voiced|narrated)\\s+(entirely|fully|completely|totally|wholly|100%)\\s+(by|with|using|in)\\s+ai\\b/i",
        "generated by ai",
        "generated with ai",
        "generated using ai",
        "made with ai",
        "made by ai",
        "made using ai",
        "created with ai",
        "created by ai",
        "created using ai",
        "ai made",
        "ai created",
        // Formats
        "ai art",
        "ai artwork",
        "ai animation",
        "ai animated",
        "ai video",
        "ai film",
        "ai movie",
        "ai short film",
        "ai trailer",
        "ai cinema",
        "ai music",
        "ai song",
        "ai cover",
        "ai voice",
        "ai voiceover",
        "ai narrated",
        "ai narration",
        "ai singing",
        "ai remix",
        "ai version",
        "ai reimagined",
        "ai remake",
        "ai slop",
        "ai story",
        "ai storytime",
        "ai cat",
        "ai dog",
        "ai baby",
        "ai babies",
        "ai animal",
        "ai fruit",
        // Generators
        "sora ai",
        "openai sora",
        "sora 2",
        "made with sora",
        "veo 3",
        "veo3",
        "google veo",
        "kling ai",
        "hailuo",
        "minimax video",
        "runway gen",
        "runwayml",
        "pika labs",
        "luma dream machine",
        "midjourney",
        "stable diffusion",
        "dall-e",
        "dalle",
        "leonardo ai",
        // Not plain "suno" or "udio": "suno" means "listen" in Hindi and is in countless songs.
        "suno ai",
        "made with suno",
        "udio ai",
        "made with udio",
        "elevenlabs",
        // Hashtags
        "#ai",
        "#aiart",
        "#aigenerated",
        "#aivideo",
        "#aimusic",
        "#aicover",
        "#aianimation",
        "#aifilm",
        "#sora2",
        "#soraai",
        "#veo3",
        "#midjourney",
        "#suno",
        "#kling",
        "#aiartwork",
        "#aislop"
      ]
    },
    aiTopics: {
      label: "AI news, hype & tutorials",
      description: "Anything about AI: ChatGPT, LLMs, AI tools, AI news. Aggressive \u2014 off by default.",
      keywords: [
        "ai",
        "a.i.",
        "artificial intelligence",
        "generative ai",
        "genai",
        "chatgpt",
        "chat gpt",
        "gpt",
        "openai",
        "anthropic",
        "claude ai",
        "gemini ai",
        "google gemini",
        "copilot",
        "grok",
        "deepseek",
        "perplexity ai",
        "mistral ai",
        "llm",
        "large language model",
        "agi",
        "machine learning",
        "deep learning",
        "neural network",
        "prompt engineering",
        "ai agent",
        "ai tool",
        "ai news",
        "deepfake"
      ]
    }
  };
  var WEAK_KEYWORDS = [
    "you wont believe",
    "you won't believe",
    "heartwarming",
    "heart touching",
    "emotional story",
    "true story",
    "real story",
    "miracle",
    "rescued",
    "unbelievable",
    "incredible",
    "shocking",
    "viral",
    "adorable",
    "cute baby",
    "must watch",
    "cinematic",
    "hyper realistic",
    "hyperrealistic",
    "ultra realistic",
    "prompt",
    "synthetic",
    "generated",
    "animated story",
    "mythical",
    "transformation"
  ];
  var NAME_SHAPES = [
    /\b(stories|storytime|tales|facts|clips|toons|wonders|vibes|shorts)$/i,
    /\b(tv|daily|studios?|world|zone|hub|central)$/i
  ];
  var DEFAULT_SETTINGS = {
    // Master switch for keyword matching. The blocked list has its own switch (blockedEnabled).
    enabled: true,
    // Apply the blocked-channels list even when the AI filter above is off.
    blockedEnabled: true,
    // Show a "Block channel" button when hovering a video card.
    hoverBlock: false,
    // Don't apply keywords to videos uploaded before this year (AI generators didn't exist yet).
    // Uses the "x years ago" text on each video. Channel block lists still apply.
    skipOldVideos: true,
    oldVideoYear: 2022,
    // "Possibly AI": a small badge on videos with softer signals (never hides).
    possible: false,
    possibleKeywords: [],
    // Also read hashtags/description on the watch page you open (the "Block" bar uses it).
    scanWatchPage: false,
    // 'hide' removes matching videos; 'blur' blurs them behind a label you can click through.
    mode: "hide",
    packs: { aiGenerated: true, aiTopics: false },
    // Extra keywords. Wrap in slashes for a regular expression: /\bai\s+\w+\s+cat/i
    customKeywords: [],
    // Words from the built-in packs that should never trigger a match.
    ignoredKeywords: [],
    // Channels are { key, name } where key is "@handle", "UC…" channel id, or "name:<display name>".
    blockedChannels: [],
    allowedChannels: [],
    matchChannelNames: true,
    matchDescriptions: true,
    // On a watch page, detect YouTube's "Altered or synthetic content" label.
    detectDisclosure: true,
    // Automatically add channels that use the synthetic-content label to the block list.
    autoBlockDisclosed: false,
    // Show the small AI Filter bar on watch and channel pages.
    showPageBar: true,
    // Hide YouTube Playables (in-browser games): the home-feed shelf, game cards and the sidebar entry.
    hidePlayables: true,
    // Hide YouTube Shorts everywhere; Shorts links open in the normal video player instead.
    hideShorts: true,
    // Video player size: 'default' (normal YouTube), 'theater' (wide) or 'fit' (wide, fills the window).
    playerSize: "default",
    // Fast-forward and skip YouTube's video ads (mutes them while they're skipped).
    skipAds: true,
    // Auto-skip sponsor / self-promo segments inside videos (community SponsorBlock data).
    skipSponsors: true
  };
  var SETTINGS_KEY = "aiFilterSettings";

  // core/rules.js
  var WORD_CHAR = "[\\p{L}\\p{N}_]";
  function normalizeText(text2) {
    return String(text2 ?? "").normalize("NFKC").toLowerCase().replace(/[​-‍﻿]/g, "").replace(/\s+/g, " ").trim();
  }
  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function keywordSource(keyword) {
    const kw = normalizeText(keyword);
    if (!kw) return null;
    let src = kw.split(" ").map(escapeRegex).join("[\\s\\-_]*");
    if (new RegExp("\\p{L}$", "u").test(kw)) src += "s?";
    const startsWord = /^[\p{L}\p{N}_]/u.test(kw);
    const endsWord = /[\p{L}\p{N}_]$/u.test(kw);
    return (startsWord ? `(?<!${WORD_CHAR})` : "") + `(?:${src})` + (endsWord ? `(?!${WORD_CHAR})` : "");
  }
  function parseRegexKeyword(keyword) {
    const m = /^\/(.+)\/([a-z]*)$/s.exec(String(keyword).trim());
    if (!m) return null;
    try {
      const flags = new Set(m[2].replace(/[gy]/g, ""));
      flags.add("i");
      flags.add("u");
      return new RegExp(m[1], [...flags].join(""));
    } catch {
      return null;
    }
  }
  function isRegexKeyword(keyword) {
    return /^\/.+\/[a-z]*$/s.test(String(keyword).trim());
  }
  function isRiskyRegex(keyword) {
    const src = String(keyword).trim().replace(/^\/|\/[a-z]*$/g, "").replace(/\\./g, "x");
    if (/\((?:[^()]*[+*]|[^()]*\{\d*,\d*\})[^()]*\)\s*(?:[+*]|\{\d*,)/.test(src)) return true;
    return /\([^()]*\|[^()]*\)\s*(?:[+*]|\{\d*,)/.test(src);
  }
  function compileRules(settings, weakPass = false) {
    const ignored = new Set((settings.ignoredKeywords || []).map(normalizeText));
    const plain = /* @__PURE__ */ new Map();
    const regexes = [];
    const add = (kw) => {
      if (typeof kw !== "string" || !kw.trim()) return;
      if (isRegexKeyword(kw)) {
        const re = parseRegexKeyword(kw);
        if (re && !isRiskyRegex(kw)) regexes.push({ re, keyword: kw.trim() });
        return;
      }
      if (ignored.has(normalizeText(kw))) return;
      const src = keywordSource(kw);
      if (src && !plain.has(src)) plain.set(src, kw.trim());
    };
    if (weakPass) {
      WEAK_KEYWORDS.forEach(add);
      (settings.possibleKeywords || []).forEach(add);
    } else {
      for (const [packId, pack] of Object.entries(KEYWORD_PACKS)) {
        if (settings.packs?.[packId]) pack.keywords.forEach(add);
      }
      (settings.customKeywords || []).forEach(add);
    }
    const entries = [...plain.entries()].sort((a, b) => b[1].length - a[1].length).map(([src, kw]) => ({ src, kw, re: new RegExp(src, "iu") }));
    const combined = entries.length ? new RegExp(entries.map((e) => e.src).join("|"), "iu") : null;
    function matchText(text2) {
      const t = normalizeText(text2);
      if (!t) return null;
      if (combined) {
        const m = combined.exec(t);
        if (m) {
          for (const { re, kw } of entries) {
            if (re.test(m[0])) return kw;
          }
          return m[0];
        }
      }
      const short = t.length > 300 ? t.slice(0, 300) : t;
      for (const { re, keyword } of regexes) {
        if (re.test(short)) return keyword;
      }
      return null;
    }
    if (weakPass) return { matchText, settings };
    const matchWeak = settings.possible ? compileRules(settings, true).matchText : null;
    const weakName = settings.possible ? (name) => NAME_SHAPES.some((re) => re.test(normalizeText(name))) : null;
    return { matchText, matchWeak, weakName, settings };
  }
  function channelKeys(channel) {
    const keys = /* @__PURE__ */ new Set();
    if (!channel) return keys;
    if (channel.handle) keys.add(normalizeHandle(channel.handle));
    if (channel.id) keys.add(channel.id);
    if (channel.name) keys.add("name:" + normalizeText(channel.name));
    return keys;
  }
  function normalizeHandle(handle) {
    let h2 = decodeURIComponentSafe(String(handle).trim());
    if (!h2.startsWith("@")) h2 = "@" + h2;
    return h2.toLowerCase();
  }
  function decodeURIComponentSafe(s) {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  }
  function channelEntry(channel) {
    const key = channel.handle ? normalizeHandle(channel.handle) : channel.id ? channel.id : "name:" + normalizeText(channel.name);
    return { key, name: channel.name || channel.handle || channel.id || key };
  }
  function channelInList(channel, list) {
    if (!channel || !list?.length) return null;
    const keys = channelKeys(channel);
    if (!keys.size) return null;
    for (const entry of list) {
      if (keys.has(entry.key)) return entry;
      if (entry.name && keys.has("name:" + normalizeText(entry.name))) return entry;
    }
    return null;
  }
  function addChannel(list, channel) {
    const entry = channelEntry(channel);
    const rest = (list || []).filter((e) => e.key !== entry.key && !channelInList(channel, [e]));
    return [...rest, entry];
  }
  function removeChannel(list, channel) {
    return (list || []).filter((e) => !channelInList(channel, [e]));
  }
  function evaluate(meta, compiled) {
    const s = compiled.settings;
    const channel = meta.channel;
    if (channelInList(channel, s.allowedChannels)) return { blocked: false, kind: "allowed" };
    const blockedEntry = s.blockedEnabled ? channelInList(channel, s.blockedChannels) : null;
    if (blockedEntry) {
      return { blocked: true, kind: "channel", reason: `Blocked channel: ${blockedEntry.name}` };
    }
    if (!s.enabled) return { blocked: false };
    if (s.skipOldVideos && meta.newestUploadDate && meta.newestUploadDate < Date.UTC(s.oldVideoYear, 0, 1)) {
      return { blocked: false, kind: "old" };
    }
    const titleHit = compiled.matchText(meta.title);
    if (titleHit) return { blocked: true, kind: "title", reason: `Title matches \u201C${titleHit}\u201D` };
    if (s.matchChannelNames && channel?.name) {
      const hit = compiled.matchText(channel.name);
      if (hit) return { blocked: true, kind: "channelName", reason: `Channel name matches \u201C${hit}\u201D` };
    }
    if (s.matchDescriptions && meta.description) {
      const hit = compiled.matchText(meta.description);
      if (hit) return { blocked: true, kind: "description", reason: `Description matches \u201C${hit}\u201D` };
    }
    if (s.possible) {
      const weak = meta.title && compiled.matchWeak ? compiled.matchWeak(meta.title) : null;
      if (weak) return { blocked: false, kind: "possible", reason: `Possibly AI: title has \u201C${weak}\u201D` };
      if (channel?.name && compiled.weakName?.(channel.name)) {
        return { blocked: false, kind: "possible", reason: "Possibly AI: channel name looks mass-produced" };
      }
    }
    return { blocked: false };
  }
  function cleanStrings(value, max = 500) {
    if (!Array.isArray(value)) return [];
    const out = [];
    for (const v of value) {
      if (typeof v === "string" && v.trim() && v.length <= 300) out.push(v.trim());
      if (out.length >= max) break;
    }
    return [...new Set(out)];
  }
  function cleanChannels(value) {
    if (!Array.isArray(value)) return [];
    const out = [];
    const seen = /* @__PURE__ */ new Set();
    for (const v of value) {
      if (!v || typeof v.key !== "string" || !v.key || v.key.length > 300) continue;
      if (seen.has(v.key)) continue;
      seen.add(v.key);
      out.push({ key: v.key, name: typeof v.name === "string" ? v.name.slice(0, 200) : v.key });
      if (out.length >= 5e3) break;
    }
    return out;
  }
  function sanitizeSettings(raw) {
    const r = raw && typeof raw === "object" ? raw : {};
    const d = DEFAULT_SETTINGS;
    const bool = (v, def) => typeof v === "boolean" ? v : def;
    const packs = {};
    for (const id of Object.keys(KEYWORD_PACKS)) packs[id] = bool(r.packs?.[id], d.packs[id]);
    return {
      enabled: bool(r.enabled, d.enabled),
      blockedEnabled: bool(r.blockedEnabled, d.blockedEnabled),
      hoverBlock: bool(r.hoverBlock, d.hoverBlock),
      skipOldVideos: bool(r.skipOldVideos, d.skipOldVideos),
      oldVideoYear: Number.isInteger(r.oldVideoYear) && r.oldVideoYear >= 2015 && r.oldVideoYear <= 2100 ? r.oldVideoYear : d.oldVideoYear,
      possible: bool(r.possible, d.possible),
      possibleKeywords: cleanStrings(r.possibleKeywords),
      scanWatchPage: bool(r.scanWatchPage, d.scanWatchPage),
      mode: r.mode === "blur" || r.mode === "hide" ? r.mode : d.mode,
      packs,
      customKeywords: cleanStrings(r.customKeywords),
      ignoredKeywords: cleanStrings(r.ignoredKeywords),
      blockedChannels: cleanChannels(r.blockedChannels),
      allowedChannels: cleanChannels(r.allowedChannels),
      matchChannelNames: bool(r.matchChannelNames, d.matchChannelNames),
      matchDescriptions: bool(r.matchDescriptions, d.matchDescriptions),
      detectDisclosure: bool(r.detectDisclosure, d.detectDisclosure),
      autoBlockDisclosed: bool(r.autoBlockDisclosed, d.autoBlockDisclosed),
      showPageBar: bool(r.showPageBar, d.showPageBar),
      hidePlayables: bool(r.hidePlayables, d.hidePlayables),
      hideShorts: bool(r.hideShorts, d.hideShorts),
      playerSize: ["default", "theater", "fit"].includes(r.playerSize) ? r.playerSize : d.playerSize,
      skipAds: bool(r.skipAds, d.skipAds),
      skipSponsors: bool(r.skipSponsors, d.skipSponsors)
    };
  }

  // core/youtube.js
  var CARD_SELECTOR = [
    "ytd-rich-item-renderer",
    "ytd-video-renderer",
    "ytd-compact-video-renderer",
    "ytd-grid-video-renderer",
    "ytd-playlist-video-renderer",
    "ytd-playlist-panel-video-renderer",
    "ytd-reel-item-renderer",
    "ytd-compact-movie-renderer",
    "ytd-movie-renderer",
    "yt-lockup-view-model",
    "ytm-shorts-lockup-view-model-v2",
    "ytm-shorts-lockup-view-model",
    "a.ytp-videowall-still"
  ].join(",");
  var TITLE_SELECTORS = [
    "#video-title",
    "#video-title-link",
    '[class*="ockupMetadataViewModelTitle"]',
    '[class*="lockup-metadata-view-model__title"]',
    '[class*="lockup-metadata-view-model-wiz__title"]',
    '[class*="MetadataTitle"]',
    ".ytp-videowall-still-info-title",
    "h3"
  ];
  var CHANNEL_LINK_SELECTOR = 'a[href^="/@"], a[href^="/channel/"], a[href^="/c/"], a[href^="/user/"], a[href*="youtube.com/@"], a[href*="youtube.com/channel/"]';
  var METADATA_ROW_SELECTOR = '[class*="ContentMetadataViewModelMetadataRow"], [class*="content-metadata-view-model__metadata-row"], [class*="content-metadata-view-model-wiz__metadata-row"]';
  var DESCRIPTION_SELECTORS = ["#description-text", ".metadata-snippet-text", "#description"];
  function text(el) {
    let raw = el?.textContent || "";
    if (el?.querySelector?.(".aif-hoverblock, .aif-possible")) {
      const copy = el.cloneNode(true);
      for (const b of copy.querySelectorAll(".aif-hoverblock, .aif-possible")) b.remove();
      raw = copy.textContent || "";
    }
    return raw.replace(/\s+/g, " ").trim();
  }
  var AGE_UNITS = {
    second: 1e3,
    minute: 6e4,
    hour: 36e5,
    day: 864e5,
    week: 7 * 864e5,
    month: 30.44 * 864e5,
    year: 365.25 * 864e5
  };
  var YEAR_WORDS = [
    "years?",
    "a\xF1os?",
    "ans?",
    "ann\xE9es?",
    "jahre[n]?",
    "jahr",
    "anos?",
    "ann[oi]",
    "jaar",
    "jaren",
    "\xE5r",
    "\xE5rs",
    "\u0433\u043E\u0434[\u0430]?",
    "\u043B\u0435\u0442",
    "\u0440\u0456\u043A",
    "\u0440\u043E\u043A\u0438",
    "\u0440\u043E\u043A\u0456\u0432",
    "rok[ua]?",
    "lat[a]?",
    "roky",
    "rokov",
    "rokmi",
    "y\u0131l",
    "vuo(?:si|tta)",
    "\xE9v(?:e|vel)?",
    "\u03C7\u03C1\u03CC\u03BD\u03B9\u03B1",
    "\u03C7\u03C1\u03CC\u03BD\u03BF",
    "n\u0103m",
    "tahun",
    "taon",
    "\u0633\u0646\u0629",
    "\u0633\u0646\u0648\u0627\u062A",
    "\u0633\u0646\u062A\u064A\u0646",
    "\u0938\u093E\u0932",
    "\u0935\u0930\u094D\u0937",
    "aasta[t]?",
    "metai",
    "metus",
    "gad[iu]?",
    "godin[ae]?",
    "leto",
    "let",
    "ani",
    "an"
  ].join("|");
  var YEARS_RE = new RegExp(`(?:^|[^\\p{L}\\p{N}])(\\d+)\\s?(?:${YEAR_WORDS})(?![\\p{L}])`, "iu");
  var YEARS_CJK_RE = /(\d+)\s?(?:年|년|ปี)/u;
  function parseUploadAge(str, now = Date.now()) {
    const s = String(str || "");
    const en = /(?:^|[^\p{L}\p{N}])(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago(?![\p{L}\p{N}])/iu.exec(s);
    if (en) return now - parseInt(en[1], 10) * AGE_UNITS[en[2].toLowerCase()];
    const years = YEARS_RE.exec(s) || YEARS_CJK_RE.exec(s);
    if (years) return now - parseInt(years[1], 10) * AGE_UNITS.year;
    return null;
  }
  var AGE_SELECTORS = [
    "#metadata-line",
    "#metadata",
    ".inline-metadata-item",
    METADATA_ROW_SELECTOR,
    ".ytp-videowall-still-info-author"
  ].join(", ");
  function cardUploadDate(card) {
    for (const el of card.querySelectorAll(AGE_SELECTORS)) {
      const d = parseUploadAge(text(el));
      if (d) return d;
    }
    return null;
  }
  function watchUploadDate(doc, flexy) {
    const iso = doc.querySelector('meta[itemprop="datePublished"], meta[itemprop="uploadDate"]')?.getAttribute("content");
    if (iso) {
      const t = Date.parse(iso);
      if (!Number.isNaN(t)) return t;
    }
    return parseUploadAge(text(flexy.querySelector("ytd-watch-metadata #info, #info-container, #info-strings, #info")));
  }
  function firstText(root, selectors) {
    for (const sel of selectors) {
      const el = root.querySelector(sel);
      if (!el) continue;
      const t = el.getAttribute("title") || text(el);
      if (t) return t;
    }
    return "";
  }
  function parseChannelHref(href) {
    if (!href) return null;
    let path = href;
    try {
      path = new URL(href, "https://www.youtube.com").pathname;
    } catch {
      return null;
    }
    let m = /^\/(@[^/?#]+)/.exec(path);
    if (m) {
      let handle = m[1];
      try {
        handle = decodeURIComponent(handle);
      } catch {
      }
      return { handle };
    }
    m = /^\/channel\/(UC[\w-]{10,})/.exec(path);
    if (m) return { id: m[1] };
    m = /^\/(?:c|user)\/([^/?#]+)/.exec(path);
    if (m) return { name: m[1] };
    return null;
  }
  function parseVideoId(href) {
    if (!href) return null;
    try {
      const u = new URL(href, "https://www.youtube.com");
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = /^\/shorts\/([\w-]{6,})/.exec(u.pathname);
      if (m) return m[1];
    } catch {
    }
    return null;
  }
  function cardVideoId(card) {
    const host = card.querySelector('[class*="content-id-"]') || card;
    const cls = typeof host.className === "string" ? host.className : "";
    const m = /content-id-([\w-]{6,})/.exec(cls);
    if (m) return m[1];
    const link = card.matches?.("a[href]") ? card : card.querySelector('a[href*="/watch?v="], a[href*="/shorts/"]');
    return parseVideoId(link?.getAttribute("href"));
  }
  function cardChannel(card) {
    const channel = {};
    const nameEl = card.querySelector("ytd-channel-name");
    const link = nameEl?.querySelector(CHANNEL_LINK_SELECTOR) || card.querySelector(CHANNEL_LINK_SELECTOR);
    if (link) Object.assign(channel, parseChannelHref(link.getAttribute("href")));
    let name = nameEl ? text(nameEl.querySelector("#text") || nameEl) : "";
    if (!name) {
      const rows = card.querySelectorAll(METADATA_ROW_SELECTOR);
      if (rows.length >= 2) name = text(rows[0]);
    }
    if (!name) {
      const author = card.querySelector(".ytp-videowall-still-info-author");
      if (author) name = text(author).split(" \u2022 ")[0];
    }
    if (!name && link) {
      const linkText = text(link);
      if (linkText && !linkText.startsWith("@")) name = linkText;
      else name = link.getAttribute("aria-label")?.replace(/^Go to channel\s*/i, "") || "";
    }
    if (name) channel.name = name;
    return Object.keys(channel).length ? channel : null;
  }
  function extractCard(card, pageChannel = null) {
    const title = firstText(card, TITLE_SELECTORS);
    const channel = cardChannel(card) || pageChannel || null;
    const description = firstText(card, DESCRIPTION_SELECTORS);
    const videoId = cardVideoId(card);
    return { title, channel, description, videoId, newestUploadDate: cardUploadDate(card) };
  }
  function hideTarget(card) {
    const parent = card.parentElement;
    if (parent && typeof parent.className === "string" && /GridShelfItem|grid-shelf-view-model[\w-]*__shelf-item/.test(parent.className)) {
      return parent;
    }
    return card;
  }
  function isNestedCard(card) {
    return !!card.parentElement?.closest(CARD_SELECTOR);
  }
  var SHORTS_LINK = 'a[href^="/shorts/"], a[href*="youtube.com/shorts/"]';
  var SHORTS_CARD = "ytm-shorts-lockup-view-model-v2, ytm-shorts-lockup-view-model, ytd-reel-item-renderer";
  var SHORTS_SHELF = "ytd-rich-section-renderer, ytd-rich-shelf-renderer, ytd-shelf-renderer, ytd-reel-shelf-renderer, grid-shelf-view-model";
  var SHORTS_ITEM = `${CARD_SELECTOR}, ${SHORTS_CARD}`;
  function findShorts(doc) {
    const out = /* @__PURE__ */ new Set();
    const consider = (el) => {
      let shelf = null;
      for (let s = el.closest(SHORTS_SHELF); s && isShortsShelf(s); s = s.parentElement?.closest(SHORTS_SHELF))
        shelf = s;
      if (shelf) return out.add(shelf);
      const item = outermost(el, SHORTS_ITEM);
      if (item) out.add(hideTarget(item));
    };
    for (const a of doc.querySelectorAll(SHORTS_LINK)) consider(a);
    for (const card of doc.querySelectorAll(SHORTS_CARD)) consider(card);
    for (const shelf of doc.querySelectorAll("ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts]"))
      out.add(shelf.closest("ytd-rich-section-renderer") || shelf);
    for (const a of doc.querySelectorAll(
      'ytd-guide-entry-renderer a[title="Shorts"], ytd-mini-guide-entry-renderer a[title="Shorts"], ytd-mini-guide-entry-renderer[aria-label="Shorts"]'
    )) {
      out.add(a.closest("ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer"));
    }
    out.delete(null);
    return out;
  }
  function isShortsShelf(shelf) {
    const links = shelf.querySelectorAll('a[href*="/watch"], a[href*="/shorts/"], a[href*="/playables"]');
    let shorts = 0;
    for (const a of links) {
      if (!/\/shorts\//.test(a.getAttribute("href"))) return false;
      shorts++;
    }
    return shorts > 0;
  }
  function shortsToWatchUrl(loc) {
    const m = /^\/shorts\/([\w-]{6,})/.exec(loc.pathname);
    return m ? `${loc.origin}/watch?v=${m[1]}` : null;
  }
  var PLAYABLE_LINK = 'a[href^="/playables"], a[href*="youtube.com/playables"]';
  var PLAYABLE_CARD = "ytd-mini-game-card-view-model, ytd-mini-game-card-renderer";
  var PLAYABLE_SHELF = "ytd-rich-section-renderer, ytd-rich-shelf-renderer, ytd-shelf-renderer, ytd-horizontal-card-list-renderer, ytd-reel-shelf-renderer";
  var PLAYABLE_ITEM = `${CARD_SELECTOR}, ${PLAYABLE_CARD}, ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer`;
  function findPlayables(doc) {
    const out = /* @__PURE__ */ new Set();
    const consider = (el) => {
      let shelf = null;
      for (let s = el.closest(PLAYABLE_SHELF); s && isGameShelf(s); s = s.parentElement?.closest(PLAYABLE_SHELF))
        shelf = s;
      if (shelf) return out.add(shelf);
      const item = outermost(el, PLAYABLE_ITEM);
      if (item) out.add(item);
    };
    for (const a of doc.querySelectorAll(PLAYABLE_LINK)) consider(a);
    for (const card of doc.querySelectorAll(PLAYABLE_CARD)) consider(card);
    return out;
  }
  function outermost(el, selector) {
    let found = el.closest(selector);
    while (found) {
      const up = found.parentElement?.closest(selector);
      if (!up) break;
      found = up;
    }
    return found;
  }
  function isGameShelf(shelf) {
    const links = shelf.querySelectorAll('a[href*="/watch"], a[href*="/shorts/"], a[href*="/playables"]');
    let games = 0;
    for (const a of links) {
      if (!/\/playables/.test(a.getAttribute("href"))) return false;
      games++;
    }
    return games > 0 || !!shelf.querySelector(PLAYABLE_CARD);
  }
  var DISCLOSURE_TEXT = /altered or synthetic content/i;
  function visible(doc, selector) {
    for (const el of doc.querySelectorAll(selector)) {
      if (!el.hasAttribute("hidden")) return el;
    }
    return null;
  }
  function getPageContext(doc, loc) {
    const path = loc.pathname;
    if (path === "/watch") {
      const flexy = visible(doc, "ytd-watch-flexy");
      if (!flexy) return { type: "other" };
      const meta = flexy.querySelector("ytd-watch-metadata") || flexy;
      const title = text(meta.querySelector("#title h1, h1.ytd-watch-metadata, h1 yt-formatted-string, h1"));
      const owner = meta.querySelector("#owner") || flexy.querySelector("ytd-video-owner-renderer") || meta;
      const channel = cardChannel(owner);
      const descEl = meta.querySelector("#description") || flexy.querySelector("#description");
      const tags = [...meta.querySelectorAll('a[href*="/hashtag/"]')].map((a) => text(a)).join(" ");
      const description = text(descEl).slice(0, 5e3);
      const disclosed = !!flexy.querySelector("how-this-was-made-section-view-model") || DISCLOSURE_TEXT.test(text(descEl));
      return {
        type: "watch",
        videoId: new URLSearchParams(loc.search).get("v"),
        title,
        channel,
        description,
        tags,
        disclosed,
        newestUploadDate: watchUploadDate(doc, flexy),
        anchor: meta.tagName.toLowerCase() === "ytd-watch-metadata" ? meta : null
      };
    }
    const chan = parseChannelHref(path);
    if (chan && !path.startsWith("/c/") && !path.startsWith("/user/")) {
      const browse = visible(doc, 'ytd-browse[page-subtype="channels"]');
      if (!browse) return { type: "other" };
      const header = browse.querySelector(
        "yt-page-header-renderer h1, #page-header h1, ytd-c4-tabbed-header-renderer #channel-name #text, #channel-header #text"
      );
      const name = text(header);
      const channel = { ...chan };
      if (name) channel.name = name;
      return {
        type: "channel",
        channel,
        anchor: browse.querySelector("ytd-two-column-browse-results-renderer")
      };
    }
    return { type: "other" };
  }

  // core/engine.js
  var ATTR = "data-aif";
  var GAMES_ATTR = "data-aif-games";
  var SHORTS_ATTR = "data-aif-shorts";
  var CINEMA_ATTR = "data-aif-cinema";
  var TOAST_ID = "aif-toast";
  var OVERLAY_CLASS = "aif-overlay";
  var BAR_ID = "aif-page-bar";
  function h(doc, tag, props = {}, ...children) {
    const el = doc.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === "class") el.className = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    for (const c of children) {
      if (c == null || c === false) continue;
      el.append(typeof c === "string" ? doc.createTextNode(c) : c);
    }
    return el;
  }
  function guard(fn) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      fn(e);
    };
  }
  function createFilter({ storage, doc = document, win = window, debounceMs = 120, adHooks = {}, appOnly = false }) {
    let settings = null;
    let compiled = null;
    let version = 0;
    const cardState = /* @__PURE__ */ new WeakMap();
    const revealed = /* @__PURE__ */ new Set();
    let blockedOnPage = /* @__PURE__ */ new Set();
    let barKey = "";
    let autoBlocked = /* @__PURE__ */ new Set();
    let timer = null;
    let observer = null;
    let stopped = false;
    function applySettings(next) {
      settings = sanitizeSettings(next);
      compiled = compileRules(settings);
      version++;
      barKey = "";
      scheduleScan(0);
    }
    async function update(mutator) {
      const current = sanitizeSettings(await storage.load());
      const next = sanitizeSettings(mutator(current));
      await storage.save(next);
      applySettings(next);
    }
    const actions = {
      blockChannel: (channel) => update((s) => ({
        ...s,
        blockedChannels: addChannel(s.blockedChannels, channel),
        allowedChannels: removeChannel(s.allowedChannels, channel)
      })),
      allowChannel: (channel) => update((s) => ({
        ...s,
        allowedChannels: addChannel(s.allowedChannels, channel),
        blockedChannels: removeChannel(s.blockedChannels, channel)
      })),
      unblockChannel: (channel) => update((s) => ({ ...s, blockedChannels: removeChannel(s.blockedChannels, channel) })),
      unallowChannel: (channel) => update((s) => ({ ...s, allowedChannels: removeChannel(s.allowedChannels, channel) }))
    };
    function clearCard(card, target) {
      target.removeAttribute(ATTR);
      if (target !== card) card.removeAttribute(ATTR);
      for (const o of target.querySelectorAll(":scope > ." + OVERLAY_CLASS)) o.remove();
      for (const o of card.querySelectorAll(":scope > .aif-hoverblock, :scope > .aif-possible")) o.remove();
    }
    function decorateCard(card, meta, verdict) {
      if (verdict.blocked) return;
      if (settings.hoverBlock && meta.channel && (meta.channel.handle || meta.channel.id || meta.channel.name)) {
        const name = meta.channel.name || meta.channel.handle || "channel";
        card.append(
          h(
            doc,
            "button",
            {
              type: "button",
              class: "aif-hoverblock",
              title: `Block ${name}`,
              onclick: guard(() => actions.blockChannel(meta.channel))
            },
            "Block channel"
          )
        );
      }
      if (verdict.kind === "possible") {
        card.append(h(doc, "span", { class: "aif-possible", title: verdict.reason || "" }, "Possibly AI"));
      }
    }
    function buildOverlay(meta, verdict) {
      const reveal = guard(() => {
        if (meta.videoId) revealed.add(meta.videoId);
        version++;
        scheduleScan(0);
      });
      const allow = guard(() => actions.allowChannel(meta.channel));
      return h(
        doc,
        "div",
        { class: OVERLAY_CLASS, role: "note" },
        h(doc, "div", { class: "aif-overlay-title" }, "Hidden by AI Filter"),
        h(doc, "div", { class: "aif-overlay-reason" }, verdict.reason || ""),
        h(
          doc,
          "div",
          { class: "aif-overlay-actions" },
          meta.videoId ? h(doc, "button", { type: "button", onclick: reveal }, "Show") : null,
          meta.channel ? h(doc, "button", { type: "button", onclick: allow }, "Allow channel") : null
        )
      );
    }
    function processCard(card, pageChannel) {
      const meta = extractCard(card, pageChannel);
      const ch = meta.channel;
      const sig = [
        version,
        meta.title,
        meta.description,
        meta.videoId,
        ch?.handle,
        ch?.id,
        ch?.name,
        meta.newestUploadDate ? new Date(meta.newestUploadDate).getUTCFullYear() : ""
      ].join("");
      const prev = cardState.get(card);
      const target = hideTarget(card);
      if (prev && prev.sig === sig && prev.target === target) {
        if (prev.blocked) blockedOnPage.add(prev.key);
        return;
      }
      if (prev) clearCard(card, prev.target);
      clearCard(card, target);
      let verdict = { blocked: false };
      if (meta.title || ch) verdict = evaluate(meta, compiled);
      if (verdict.blocked && meta.videoId && revealed.has(meta.videoId)) verdict = { blocked: false };
      const key = meta.videoId || meta.title;
      if (verdict.blocked) {
        blockedOnPage.add(key);
        target.setAttribute(ATTR, settings.mode);
        if (settings.mode === "blur") target.append(buildOverlay(meta, verdict));
      }
      cardState.set(card, { sig, target, blocked: verdict.blocked, key });
      decorateCard(card, meta, verdict);
    }
    function removeBar() {
      doc.getElementById(BAR_ID)?.remove();
      barKey = "";
    }
    function renderBar(ctx) {
      if (!settings.enabled && !settings.blockedEnabled || !settings.showPageBar || !ctx.channel || !ctx.anchor) {
        removeBar();
        return;
      }
      const channel = ctx.channel;
      const name = channel.name || channel.handle || "this channel";
      const blocked = channelInList(channel, settings.blockedChannels);
      const allowed = channelInList(channel, settings.allowedChannels);
      const verdict = ctx.type === "watch" && !blocked && !allowed ? evaluate(
        {
          title: ctx.title,
          channel,
          description: [ctx.description, settings.scanWatchPage ? ctx.tags : ""].filter(Boolean).join(" "),
          newestUploadDate: ctx.newestUploadDate
        },
        compiled
      ) : { blocked: false };
      let tone = "neutral";
      let message = name;
      const buttons = [];
      const btn = (label, fn, primary = false) => h(doc, "button", { type: "button", class: primary ? "aif-primary" : "", onclick: guard(fn) }, label);
      if (blocked) {
        tone = "blocked";
        message = `${name} is on your AI block list \u2014 its videos are hidden everywhere.`;
        buttons.push(btn("Unblock channel", () => actions.unblockChannel(channel)));
      } else if (allowed) {
        tone = "allowed";
        message = `${name} is always allowed.`;
        buttons.push(btn("Remove from allow list", () => actions.unallowChannel(channel)));
      } else if (ctx.disclosed && settings.detectDisclosure) {
        tone = "warn";
        message = "The creator labeled this video as altered or synthetic content.";
        buttons.push(btn(`Block ${name}`, () => actions.blockChannel(channel), true));
        buttons.push(btn("Always allow", () => actions.allowChannel(channel)));
      } else if (verdict.blocked) {
        tone = "warn";
        message = `Looks AI-generated (${verdict.reason}).`;
        buttons.push(btn(`Block ${name}`, () => actions.blockChannel(channel), true));
        buttons.push(btn("Always allow", () => actions.allowChannel(channel)));
      } else {
        removeBar();
        return;
      }
      const key = [version, ctx.type, tone, message, name].join("|");
      const existing = doc.getElementById(BAR_ID);
      const placed = existing && existing.previousElementSibling === ctx.anchor;
      const placedBefore = existing && existing.nextElementSibling === ctx.anchor;
      if (key === barKey && (placed || placedBefore)) return;
      const bar = h(
        doc,
        "div",
        { id: BAR_ID, class: `aif-tone-${tone}` },
        h(doc, "span", { class: "aif-bar-badge" }, "AI Filter"),
        h(doc, "span", { class: "aif-bar-message" }, message),
        h(doc, "span", { class: "aif-bar-actions" }, ...buttons)
      );
      existing?.remove();
      if (ctx.type === "watch") ctx.anchor.after(bar);
      else ctx.anchor.before(bar);
      barKey = key;
    }
    function handlePage() {
      const ctx = getPageContext(doc, win.location);
      if (ctx.type === "watch" && ctx.disclosed && settings.enabled && settings.detectDisclosure && settings.autoBlockDisclosed && ctx.channel && !channelInList(ctx.channel, settings.allowedChannels) && !channelInList(ctx.channel, settings.blockedChannels) && !autoBlocked.has(ctx.videoId)) {
        autoBlocked.add(ctx.videoId);
        actions.blockChannel(ctx.channel);
      }
      renderBar(ctx);
      return ctx;
    }
    function scan() {
      timer = null;
      if (stopped || !settings || !doc.documentElement) return;
      blockedOnPage = /* @__PURE__ */ new Set();
      if (!appOnly) {
        const ctx = handlePage();
        const pageChannel = ctx.type === "channel" ? ctx.channel : null;
        for (const card of doc.querySelectorAll(CARD_SELECTOR)) {
          if (isNestedCard(card)) continue;
          processCard(card, pageChannel);
        }
      }
      hidePlayables();
      hideShorts();
      if (!appOnly) playerLayout();
      adSkipper.update(win.location.pathname === "/watch" && settings.skipAds);
      playerWatchdog();
      skipper.update(
        win.location.pathname === "/watch" ? new URLSearchParams(win.location.search).get("v") : null,
        settings.enabled && settings.skipSponsors
      );
    }
    const WATCHDOG_MS = 7e3;
    let watchdog = { vid: null, timer: null };
    function playerWatchdog() {
      const vid = win.location.pathname === "/watch" ? new URLSearchParams(win.location.search).get("v") : null;
      if (vid === watchdog.vid) return;
      win.clearTimeout(watchdog.timer);
      watchdog = { vid, timer: null };
      if (!vid) return;
      watchdog.timer = win.setTimeout(() => {
        if (stopped || watchdog.vid !== vid || doc.hidden) return;
        const player = doc.querySelector("#movie_player");
        const video = player?.querySelector("video");
        const errorShown = player?.querySelector(".ytp-error");
        if (errorShown) return;
        const hasMedia = video && (video.currentSrc || video.src);
        const noPicture = video && video.readyState < 2 && video.currentTime === 0;
        if (hasMedia && !noPicture) return;
        try {
          if (win.sessionStorage.getItem("aif-reloaded") === vid) return;
          win.sessionStorage.setItem("aif-reloaded", vid);
        } catch {
          return;
        }
        win.location.reload();
      }, WATCHDOG_MS);
    }
    const adSkipper = createAdSkipper({ doc, win, ...adHooks });
    let toastTimer = null;
    function showToast(text2, undo) {
      doc.getElementById(TOAST_ID)?.remove();
      const host = doc.querySelector("#movie_player") || doc.body;
      const toast = h(
        doc,
        "div",
        { id: TOAST_ID },
        h(doc, "span", {}, text2),
        h(doc, "button", { type: "button", onclick: guard(() => (undo(), toast.remove())) }, "Undo")
      );
      host.append(toast);
      win.clearTimeout(toastTimer);
      toastTimer = win.setTimeout(() => toast.remove(), 4e3);
    }
    const SKIP_LABEL = { sponsor: "sponsor", selfpromo: "self-promotion" };
    const skipper = createSponsorSkipper({
      doc,
      win,
      onSkip: (seg, undo) => showToast(`Skipped ${SKIP_LABEL[seg.category] || seg.category}`, undo)
    });
    let sizing = { vid: null, done: false, tries: 0, last: 0, waiting: false };
    function setWideCookie(on) {
      const has = /(?:^|;\s*)wide=1(?:;|$)/.test(doc.cookie);
      if (has !== on)
        doc.cookie = `wide=${on ? 1 : 0}; domain=.youtube.com; path=/; max-age=31536000; secure; samesite=lax`;
    }
    function playerLayout() {
      const root = doc.documentElement;
      const onWatch = win.location.pathname === "/watch";
      const size = settings.playerSize;
      const fit = onWatch && size === "fit";
      if (fit !== root.hasAttribute(CINEMA_ATTR)) {
        if (fit) root.setAttribute(CINEMA_ATTR, "");
        else root.removeAttribute(CINEMA_ATTR);
        win.dispatchEvent(new win.Event("resize"));
      }
      if (size === "default") return;
      const wantTheater = true;
      setWideCookie(wantTheater);
      if (!onWatch) return;
      const vid = new URLSearchParams(win.location.search).get("v");
      if (sizing.vid !== vid) sizing = { vid, done: false, tries: 0, last: 0, waiting: false };
      if (sizing.done || sizing.tries >= 30) return;
      const flexy = doc.querySelector("ytd-watch-flexy:not([hidden])");
      const btn = doc.querySelector("#movie_player .ytp-size-button");
      if (flexy && btn && flexy.hasAttribute("theater") === wantTheater) {
        sizing.done = true;
        return;
      }
      const now = Date.now();
      if (!flexy || !btn || now - sizing.last < 1e3) {
        if (!sizing.waiting) {
          sizing.waiting = true;
          win.setTimeout(() => {
            sizing.waiting = false;
            sizing.tries++;
            if (!stopped) scheduleScan(0);
          }, 1e3);
        }
        return;
      }
      sizing.tries++;
      sizing.last = now;
      btn.click();
      win.setTimeout(() => {
        win.dispatchEvent(new win.Event("resize"));
        if (!stopped) scheduleScan(0);
      }, 400);
    }
    function markAll(attr, want) {
      for (const el of doc.querySelectorAll(`[${attr}]`)) if (!want.has(el)) el.removeAttribute(attr);
      for (const el of want) if (!el.hasAttribute(attr)) el.setAttribute(attr, "");
    }
    function hidePlayables() {
      markAll(GAMES_ATTR, settings.enabled && settings.hidePlayables ? findPlayables(doc) : /* @__PURE__ */ new Set());
    }
    function hideShorts() {
      const on = settings.enabled && settings.hideShorts;
      if (on) {
        const watch = shortsToWatchUrl(win.location);
        if (watch) win.location.replace(watch);
      }
      markAll(SHORTS_ATTR, on ? findShorts(doc) : /* @__PURE__ */ new Set());
    }
    function scheduleScan(delay = debounceMs) {
      if (timer) {
        if (delay > 0) return;
        win.clearTimeout(timer);
      }
      timer = win.setTimeout(scan, delay);
    }
    function start() {
      observer = new win.MutationObserver(() => scheduleScan());
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["href", "hidden", "title"],
        characterData: true
      });
      doc.addEventListener("yt-navigate-finish", () => scheduleScan(0));
      scheduleScan(0);
    }
    return {
      async init() {
        applySettings(await storage.load());
        storage.subscribe((next) => applySettings(next));
        start();
      },
      stop() {
        stopped = true;
        adSkipper.update(false);
        win.clearTimeout(watchdog.timer);
        observer?.disconnect();
        if (timer) win.clearTimeout(timer);
      },
      scanNow: scan,
      getStats() {
        return { enabled: !!settings?.enabled, hiddenOnPage: blockedOnPage.size, mode: settings?.mode };
      },
      getPageChannel() {
        return getPageContext(doc, win.location).channel || null;
      },
      actions
    };
  }

  // core/storage.js
  function chromeStorage(api = globalThis.chrome) {
    return {
      async load() {
        const data = await api.storage.local.get(SETTINGS_KEY);
        return sanitizeSettings(data?.[SETTINGS_KEY]);
      },
      async save(settings) {
        await api.storage.local.set({ [SETTINGS_KEY]: sanitizeSettings(settings) });
      },
      subscribe(cb) {
        api.storage.onChanged.addListener((changes, area) => {
          if (area === "local" && changes[SETTINGS_KEY]) cb(sanitizeSettings(changes[SETTINGS_KEY].newValue));
        });
      }
    };
  }

  // extension/src/content.js
  var filter = createFilter({ storage: chromeStorage() });
  function boot() {
    filter.init();
  }
  if (document.documentElement) boot();
  else document.addEventListener("DOMContentLoaded", boot, { once: true });
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg?.type === "aif:stats") {
      sendResponse({ ...filter.getStats(), channel: filter.getPageChannel() });
      return;
    }
    if (msg?.type === "aif:blockPageChannel" || msg?.type === "aif:allowPageChannel") {
      const channel = filter.getPageChannel();
      if (!channel) return sendResponse({ ok: false });
      const action = msg.type === "aif:blockPageChannel" ? "blockChannel" : "allowChannel";
      filter.actions[action](channel).then(() => sendResponse({ ok: true }));
      return true;
    }
  });
})();
