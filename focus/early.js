export function runEarly() {
  // src/shared/settings.js
  var SETTINGS = {
    "audio_leveler": { "type": "bool", "off": null, "label": "Even out the volume (not an ImprovedTube setting)", "group": "Audio" },
    "audio_strength": { "type": "choice", "off": null, "label": "Leveling strength", "group": "Audio" },
    "audio_auto_volume": { "type": "bool", "off": null, "label": "Auto volume", "group": "Audio" },
    "stable_volume": { "type": "choice", "off": null, "label": "YouTube Stable volume (on/off)", "group": "Audio" },
    "voice_boost": { "type": "choice", "off": null, "label": "YouTube Voice boost (on/off)", "group": "Audio" },
    "audio_boost": { "type": "choice", "off": null, "label": "Boost (dB)", "group": "Audio" },
    "audio_auto_min": { "type": "choice", "off": null, "label": "Auto volume: most it may turn down (dB)", "group": "Audio" },
    "audio_auto_max": { "type": "choice", "off": null, "label": "Auto volume: most it may turn up (dB)", "group": "Audio" },
    "auto_dark_colors": { "type": "bool", "off": null, "label": "Browser uses Auto Dark Mode for websites (not an ImprovedTube setting)", "group": "Layout" },
    "live_chat_scroll": { "type": "bool", "off": null, "label": "Live chat scrolls with the video (not an ImprovedTube setting)", "group": "Layout" },
    "player_autoplay_disable": { "type": "bool", "off": null, "label": "Force autoplay off", "group": "Player" },
    "playlist_reversed_active": { "type": "bool", "off": false, "label": "Reverse button state (remembered)", "group": "Playlist", "hidden": true },
    "ambient_lighting": {
      "type": "bool",
      "off": false,
      "label": "Ambient lighting",
      "group": "Player"
    },
    "change_thumbnails_per_row": {
      "type": "choice",
      "off": null,
      "label": "Thumbnails per Row",
      "group": "General > Thumbnails"
    },
    "channel_default_tab": {
      "type": "choice",
      "off": null,
      "label": "Default channel tab",
      "group": "Channel"
    },
    "channel_trailer_autoplay": {
      "type": "bool",
      "off": false,
      "label": "Trailer autoplay",
      "group": "Channel"
    },
    "day_of_week": {
      "type": "bool",
      "off": false,
      "label": "Display day of the week",
      "group": "Appearance > Details"
    },
    "disable_auto_dubbing": {
      "type": "bool",
      "off": false,
      "label": "Disable auto-dubbing",
      "group": "Player"
    },
    "forced_theater_mode": {
      "type": "bool",
      "off": false,
      "label": "Force Theater Mode",
      "group": "Appearance > Player"
    },
    "full_screen_quality": {
      "type": "choice",
      "off": null,
      "label": "Fullscreen quality",
      "group": "Player"
    },
    "header_position": {
      "type": "choice",
      "off": null,
      "label": "Position",
      "group": "Appearance > Header"
    },
    "hide_ai_summary": {
      "type": "bool",
      "off": false,
      "label": "Hide AI Summaries",
      "group": "General"
    },
    "hide_ask_button": {
      "type": "choice",
      "off": null,
      "label": "Ask",
      "group": "Appearance > Buttons"
    },
    "hide_clip_button": {
      "type": "choice",
      "off": null,
      "label": "Clip",
      "group": "Appearance > Buttons"
    },
    "hide_download_button": {
      "type": "choice",
      "off": null,
      "label": "Download",
      "group": "Appearance > Buttons"
    },
    "hide_includes_paid_promotion": {
      "type": "bool",
      "off": false,
      "label": 'Hide "Includes Paid Promotion"',
      "group": "Appearance > Player"
    },
    "hide_more_button": {
      "type": "bool",
      "off": false,
      "label": "Hide '...'",
      "group": "Appearance > Buttons"
    },
    "hide_report_button": {
      "type": "choice",
      "off": null,
      "label": "Report",
      "group": "Appearance > Buttons"
    },
    "hide_save_button": {
      "type": "choice",
      "off": null,
      "label": "Save",
      "group": "Appearance > Buttons"
    },
    "hide_share_button": {
      "type": "choice",
      "off": null,
      "label": "Share",
      "group": "Appearance > Buttons"
    },
    "hide_thanks_button": {
      "type": "choice",
      "off": null,
      "label": "Thanks",
      "group": "Appearance > Buttons"
    },
    "hide_voice_search_button": {
      "type": "bool",
      "off": false,
      "label": "Hide voice search button",
      "group": "Appearance > Header"
    },
    "join": {
      "type": "choice",
      "off": null,
      "label": "Join",
      "group": "Appearance > Buttons"
    },
    "player_color": {
      "type": "choice",
      "off": null,
      "label": "Progress bar color",
      "group": "Appearance > Player"
    },
    "player_hide_annotations": {
      "type": "bool",
      "off": false,
      "label": "Hide annotations",
      "group": "Appearance > Player"
    },
    "player_hide_cards": {
      "type": "bool",
      "off": false,
      "label": "Hide cards",
      "group": "Appearance > Player"
    },
    "player_loudness_normalization": {
      "type": "bool",
      "off": false,
      "label": "Loudness normalization",
      "group": "Player"
    },
    "player_quality": {
      "type": "choice",
      "off": null,
      "label": "Quality",
      "group": "Player"
    },
    "player_quality_playlist": {
      "type": "choice",
      "off": null,
      "label": "Playlist quality",
      "group": "Player"
    },
    "player_quality_without_focus": {
      "type": "choice",
      "off": null,
      "label": "Quality without focus",
      "group": "Player"
    },
    "player_size": {
      "type": "choice",
      "off": null,
      "label": "Player size",
      "group": "Appearance > Player"
    },
    "player_subtitles": {
      "type": "choice",
      "off": null,
      "label": "Subtitles",
      "group": "Player > Subtitles"
    },
    "player_transparent_background": {
      "type": "bool",
      "off": false,
      "label": "Transparent background",
      "group": "Appearance > Player"
    },
    "playlist_reverse": {
      "type": "bool",
      "off": false,
      "label": "Reverse",
      "group": "Playlist"
    },
    "popup_ad": {
      "type": "bool",
      "off": false,
      "label": "Pop-up ad: Hide",
      "group": "Appearance"
    },
    "purchase": {
      "type": "choice",
      "off": null,
      "label": "Purchase",
      "group": "Appearance > Buttons"
    },
    "hide_explore_topics": { "type": "bool", "off": null, "label": 'Hide the "Explore more topics" section on the home page', "group": "General" },
    "disable_hover_preview": { "type": "bool", "off": null, "label": "Turn off the video preview that plays when you hover a thumbnail", "group": "General" },
    "disable_page_transition": { "type": "bool", "off": null, "label": "Turn off the thumbnail zoom animation", "group": "Layout" },
    "fit_recheck": { "type": "bool", "off": null, "label": "Correct a small player on first load", "group": "Layout" },
    "fit_trace": { "type": "bool", "off": null, "label": "Record a size log of the first 15 s of each video (for bug reports)", "group": "Layout" },
    "fit_without_theater": { "type": "bool", "off": null, "label": "Fit to window without theater mode", "group": "Layout" },
    "hide_related_sidebar": { "type": "bool", "off": null, "label": "Hide the recommended videos beside the video", "group": "General" },
    "hide_members_only": { "type": "bool", "off": null, "label": "Hide Members-only videos in feeds", "group": "General" },
    "hide_premieres": { "type": "bool", "off": null, "label": "Hide premieres and upcoming videos in feeds", "group": "General" },
    "hide_sign_in": { "type": "bool", "off": null, "label": "Hide the Sign in buttons (top bar and left menu)", "group": "General" },
    "hide_free_movies": { "type": "bool", "off": null, "label": 'Hide the "Free movies" shelf on the home page', "group": "General" },
    "remove_home_page_shorts": {
      "type": "bool",
      "off": false,
      "label": "Hide Shorts on the home page",
      "group": "General"
    },
    "remove_subscriptions_live_streams": {
      "type": "bool",
      "off": false,
      "label": "Hide live streams at 'Subscriptions'",
      "group": "General"
    },
    "remove_subscriptions_shorts": {
      "type": "bool",
      "off": false,
      "label": "at 'Subscriptions'",
      "group": "General"
    },
    "remove_trending_shorts": {
      "type": "bool",
      "off": false,
      "label": "at 'Trending'",
      "group": "General"
    },
    "side_panels": {
      "type": "choice",
      "off": null,
      "label": "Side panels (Watch later, In this video, ...)",
      "group": "Appearance > Sidebar"
    },
    "wrap_video_info": { "type": "bool", "off": null, "label": "Show the full channel / views / upload time (wrap instead of cutting off)", "group": "Layout" },
    "squared_thumbnails": {
      "type": "bool",
      "off": false,
      "label": "Squared thumbnails",
      "group": "General > Thumbnails"
    },
    "subscribe": {
      "type": "choice",
      "off": null,
      "label": "Subscribe",
      "group": "Appearance > Buttons"
    },
    "theme": {
      "type": "choice",
      "off": null,
      "label": "theme",
      "group": ""
    },
    "theme_primary_color": {
      "type": "color",
      "off": null,
      "label": "Primary color",
      "group": "Themes"
    },
    "theme_secondary_color": {
      "type": "color",
      "off": null,
      "label": "Secondary color",
      "group": "Themes"
    },
    "up_next_autoplay": {
      "type": "bool",
      "off": false,
      "label": "Up next autoplay",
      "group": "Player"
    }
  };
  var KNOWN = new Set(Object.keys(SETTINGS));
  function sanitize(raw) {
    const out = {};
    for (const [key, def] of Object.entries(SETTINGS)) {
      const v = raw ? raw[key] : void 0;
      if (def.type === "bool") out[key] = v === true ? true : v === false ? false : null;
      else if (def.type === "color") out[key] = Array.isArray(v) && v.length === 3 && v.every((n) => Number.isInteger(n) && n >= 0 && n <= 255) ? v : null;
      else out[key] = typeof v === "string" || typeof v === "number" ? String(v) : null;
    }
    return out;
  }
  function attributeName(key) {
    return "it-" + key.replace(/_/g, "-");
  }

  // src/youtube/dom.js
  var YT = {
    // pages
    watchFlexy: "ytd-watch-flexy",
    //                         ImprovedTube: elements.ytd_watch
    player: "#movie_player",
    //                                ImprovedTube: elements.player
    playerVideo: "#movie_player video",
    theaterButton: "#movie_player button.ytp-size-button",
    //  ImprovedTube: appearance.js forcedTheaterMode
    // attributes YouTube sets on ytd-watch-flexy when theater mode is on
    theaterAttrs: ["theater", "full-bleed-player"],
    fullBleedBox: "#full-bleed-container",
    //                  the box the player fills in theater mode
    // YouTube's own navigation events (single-page app)
    navigateStart: "yt-navigate-start",
    navigateFinish: "yt-navigate-finish",
    pageDataUpdated: "yt-page-data-updated",
    // the up-next autoplay switch, in the markups YouTube uses        ImprovedTube: player.js upNextAutoplay
    autonavToggle: 'button.ytp-autonav-toggle, .ytp-autonav-toggle-button-container, .ytp-autonav-toggle-button, [data-tooltip-target-id="ytp-autonav-toggle-button"]',
    playlistPanel: "ytd-playlist-panel-renderer",
    playlistItems: "ytd-playlist-panel-renderer #items",
    playlistSelected: "ytd-playlist-panel-renderer ytd-playlist-panel-video-renderer[selected]",
    playlistLinks: "ytd-playlist-panel-renderer ytd-playlist-panel-video-renderer a#wc-endpoint",
    // the playlist header's button row (Repeat, Shuffle): the Reverse button goes right after its last button
    playlistButtonRow: [
      "ytd-playlist-panel-renderer #playlist-action-menu #top-level-buttons-computed",
      "ytd-playlist-panel-renderer #top-level-buttons-computed",
      "ytd-playlist-panel-renderer #playlist-action-menu ytd-menu-renderer"
    ],
    playlistRowButtons: "ytd-toggle-button-renderer, ytd-playlist-loop-button-renderer, yt-button-shape, ytd-button-renderer, button",
    // fallback spots if that row isn't found, first match wins (ImprovedTube: playlist.js injectReverseButton)
    playlistButtonSpots: [
      "ytd-playlist-panel-renderer #playlist-action-menu",
      ".ytd-playlist-panel-renderer #playlist-action-menu",
      "#playlist-action-menu",
      "ytd-playlist-panel-renderer #header-description",
      "ytd-menu-renderer.ytd-playlist-panel-renderer",
      "ytd-playlist-panel-renderer #top-level-buttons-computed",
      "ytd-playlist-header-renderer #playlist-action-menu"
    ],
    adShowing: ".html5-video-player.ad-showing",
    mainVideo: ".html5-main-video, .video-stream",
    masthead: "ytd-masthead",
    // live streams in theater mode: YouTube's "fixed panels" layout pins the chat to the screen beside the player
    fixedPanelsFlexy: "ytd-watch-flexy[fixed-panels]",
    pinnedChatCandidates: ["#panels-full-bleed-container", "#chat-container", "ytd-live-chat-frame#chat", "#secondary #chat"],
    // where the upload date is shown under a video (ImprovedTube: appearance.js dayOfWeek)
    uploadDateJson: "#microformat script",
    uploadDateMeta: "[itemprop=datePublished]",
    infoStrings: ["#info span:nth-child(2)", "#info #info-strings yt-formatted-string"],
    // side panels (ImprovedTube: extension/appearance/sidebar/sidebar.js sidePanels)
    sidePanel: "#secondary #panels > *",
    sidePanelClose: '#secondary #panels > * button[aria-label="Close"], #playlist button[aria-label="Close"]',
    sidePanelHeader: "#secondary #panels > * #header, #secondary #panels > * #header-container, #secondary #panels > * #title, #playlist #header-container, #playlist #title",
    // YouTube remembers theater mode in this cookie and starts in theater mode when it's set
    theaterCookie: "wide=1"
  };
  var CHANNEL_HOME = /\/@|((channel|user|c)\/)[^/]+(\/featured)?\/?$/;
  var CHANNEL_HOME_POSTFIX = /\/(featured)?\/?$/;
  function pageTypeFor(url) {
    const u = new URL(url, location.href);
    if (u.pathname === "/watch" || u.pathname.startsWith("/live/")) return "video";
    if (u.pathname.startsWith("/embed/")) return "embed";
    if (u.pathname.startsWith("/shorts/")) return "shorts";
    if (u.pathname === "/") return "home";
    if (/^\/(@|c\/|channel\/|user\/)/.test(u.pathname)) return "channel";
    if (u.pathname.startsWith("/results")) return "search";
    if (u.pathname.startsWith("/feed/subscriptions")) return "subscriptions";
    if (u.pathname.startsWith("/feed/trending")) return "trending";
    return "other";
  }
  function isTheater(flexy) {
    return !!flexy && (flexy.theater === true || YT.theaterAttrs.some((a) => flexy.hasAttribute(a)));
  }

  // src/shared/errlog.js
  var FILES = {
    "early.js": "Page features",
    "page.js": "Page script",
    "aifilter.js": "AI Filter",
    "audio.js": "Audio",
    "sponsor.js": "Sponsor Skip",
    "background.js": "Background",
    "index.js": "Settings page",
    "options.js": "AI Filter settings"
  };
  function sourceOf(text) {
    const m = String(text || "").match(/([\w-]+\.js)(?::\d+)?(?::\d+)?\)?\s*$|([\w-]+\.js)/);
    const file = m ? m[1] || m[2] : "";
    return FILES[file] || (file ? file : "Extension");
  }
  function pageKind(pathname) {
    const p = String(pathname || "");
    if (p === "/" || p === "") return "home";
    if (p.startsWith("/watch")) return "watch";
    if (p.startsWith("/results")) return "search";
    if (p.startsWith("/@") || /^\/(channel|c|user)\//.test(p)) return "channel";
    if (p.startsWith("/playlist")) return "playlist";
    if (p.startsWith("/feed")) return "feed";
    return "other";
  }
  var sent = /* @__PURE__ */ new Map();
  function send(entry) {
    const key = entry.src + "|" + entry.msg;
    const t = Date.now();
    if (t - (sent.get(key) || 0) < 5e3 || sent.size > 40) return;
    sent.set(key, t);
    try {
      chrome.runtime.sendMessage({ type: "focus:error", entry: { ...entry, page: pageKind(location.pathname) } }).catch?.(() => {
      });
    } catch {
    }
  }
  function installErrorHooks() {
    let id = "";
    try {
      id = chrome.runtime.id;
    } catch {
    }
    if (!id) return;
    const ours = (s2) => typeof s2 === "string" && s2.includes("chrome-extension://" + id);
    addEventListener("error", (e) => {
      if (!e.isTrusted || !ours(e.filename) && !ours(e.error?.stack)) return;
      send({ src: sourceOf(e.filename || e.error?.stack), msg: e.message || e.error?.message, where: (e.filename || "").split("/").pop() + (e.lineno ? ":" + e.lineno : "") });
    });
    addEventListener("unhandledrejection", (e) => {
      const stack = e.reason?.stack;
      if (!e.isTrusted || !ours(stack)) return;
      const line = String(stack).split("\n").find((l) => ours(l)) || "";
      send({ src: sourceOf(line), msg: e.reason?.message || String(e.reason), where: line.trim().split("/").pop().replace(/\)$/, "") });
    });
    document.addEventListener("it-error", (e) => {
      try {
        const d = JSON.parse(e.detail);
        send({ src: "Page script", msg: d.msg, where: d.name });
      } catch {
      }
    });
  }

  // src/shared/fittrace.js
  var TRACE_KEY = "focusFitTrace";
  var TRACE_MAX = 120;
  var BOXES = [["flexy", "ytd-watch-flexy"], ["fbc", "#full-bleed-container"], ["ptc", "#player-theater-container"], ["pc", "#player-container"], ["mp", "#movie_player"], ["vid", "#movie_player video"], ["mast", "ytd-masthead"]];
  var box = (doc, sel) => {
    const e = doc.querySelector(sel);
    if (!e) return "-";
    const b = e.getBoundingClientRect();
    return `${Math.round(b.width)}x${Math.round(b.height)}@${Math.round(b.top)}`;
  };
  function snapshot(doc, win = doc.defaultView) {
    const root2 = doc.documentElement, fx = doc.querySelector("ytd-watch-flexy");
    const flag = (n, v) => v ? n : "";
    const states = [
      flag("cover", root2.hasAttribute("it-layout-settling")),
      flag("theater", fx?.hasAttribute("theater")),
      flag("fullbleed", fx?.hasAttribute("full-bleed-player")),
      flag("fullscreen", fx?.hasAttribute("fullscreen")),
      flag("hdr-hidden", root2.getAttribute("it-header-position") === "hidden_on_video_page"),
      root2.getAttribute("it-gate-why") ? "open:" + root2.getAttribute("it-gate-why") : ""
    ].filter(Boolean).join(",") || "none";
    const pm = doc.querySelector("ytd-page-manager");
    const pad = pm ? win.getComputedStyle(pm).marginTop : "-";
    return `win ${win.innerWidth}x${win.innerHeight} | ${states} | pm-margin ${pad} | ` + BOXES.map(([n, s2]) => `${n} ${box(doc, s2)}`).join(" | ");
  }
  function recordTrace(doc, save, version, sinceMs = 0, win = doc.defaultView) {
    const rows = [];
    let last = "", lastSave = 0;
    const t0 = performance.now() - sinceMs;
    const push = () => {
      const t = (performance.now() - t0) / 1e3;
      const s2 = snapshot(doc, win);
      if (s2 !== last && rows.length < TRACE_MAX) {
        rows.push(t.toFixed(1) + "s " + s2);
        last = s2;
      }
      return t;
    };
    const id = setInterval(() => {
      const t = push();
      if (t > 15) {
        clearInterval(id);
        save({ at: Date.now(), v: version, rows });
      } else if (t - lastSave > 3 && rows.length) {
        lastSave = t;
        save({ at: Date.now(), v: version, rows });
      }
    }, 100);
    return () => clearInterval(id);
  }

  // src/content/features.js
  var s = {};
  function setSettings(next) {
    s = next;
    setTimeout(() => shelfSoon(), 0);
    cardTries = /* @__PURE__ */ new WeakMap();
    setTimeout(() => {
      for (const a of ["it-card-members", "it-card-premiere"]) if (s.hide_members_only !== true && a === "it-card-members" || s.hide_premieres !== true && a === "it-card-premiere") for (const c of document.querySelectorAll("[" + a + "]")) c.removeAttribute(a);
      cardsSoon();
    }, 0);
    darkTheme();
    dayOfWeek();
    liveChatScroll();
    if (s.channel_default_tab) document.querySelectorAll("a[href]").forEach(channelDefaultTab);
  }
  var shelfTries = /* @__PURE__ */ new WeakMap();
  var shelfTimer = 0;
  var SHELF_RE = /primetime|free movies|youtube movies & tv/i;
  function shelfSweep() {
    shelfTimer = 0;
    if (s.hide_free_movies !== true || location.pathname !== "/") return;
    let again = false;
    for (const sec of document.querySelectorAll("ytd-rich-section-renderer:not([it-shelf-gone])")) {
      const tries = shelfTries.get(sec) || 0;
      if (tries >= 99) continue;
      const head = sec.querySelector("#rich-shelf-header-container, h2, #title");
      const text = (head?.textContent || "").trim().slice(0, 200);
      if (!text) {
        if (tries < 8) {
          shelfTries.set(sec, tries + 1);
          again = true;
        }
        continue;
      }
      if (SHELF_RE.test(text)) sec.setAttribute("it-shelf-gone", "");
      else shelfTries.set(sec, 99);
    }
    if (again) shelfTimer = setTimeout(shelfSweep, 700);
  }
  var shelfSoon = () => {
    if (s.hide_free_movies === true && !shelfTimer) shelfTimer = setTimeout(shelfSweep, 500);
  };
  document.addEventListener(YT.navigateFinish, shelfSoon);
  var CARDS = "ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model";
  var BADGES = "ytd-badge-supported-renderer, badge-shape, yt-badge-shape, .yt-badge-shape__text, ytd-thumbnail-overlay-time-status-renderer, yt-thumbnail-badge-view-model, .badge-style-type-members-only";
  var MEMBERS_RE = /\bmembers? (only|first)\b|\bmembers-only\b/i;
  var PREMIERE_RE = /^\s*(premiere|upcoming)\b|\bpremieres? (in|on|at)\b|\bscheduled for\b|\bwaiting for\b/i;
  var cardTries = /* @__PURE__ */ new WeakMap();
  var cardTimer = 0;
  var feedPage = () => !location.pathname.startsWith("/playlist");
  function badgeKinds(card) {
    let members = false, premiere = false;
    for (const b of card.querySelectorAll(BADGES)) {
      const t = (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 80);
      if (b.matches(".badge-style-type-members-only") || MEMBERS_RE.test(t)) members = true;
      if (b.getAttribute("overlay-style") === "UPCOMING" || PREMIERE_RE.test(t)) premiere = true;
    }
    return { members, premiere };
  }
  function cardSweep() {
    cardTimer = 0;
    const wantM = s.hide_members_only === true, wantP = s.hide_premieres === true;
    if (!wantM && !wantP || !feedPage()) return;
    let again = false;
    for (const card of document.querySelectorAll("[it-card-members], [it-card-premiere]")) {
      const { members, premiere } = badgeKinds(card);
      if (!members) card.removeAttribute("it-card-members");
      if (!premiere) card.removeAttribute("it-card-premiere");
      if (!members && !premiere) cardTries.delete(card);
    }
    for (const card of document.querySelectorAll(CARDS)) {
      if (card.parentElement?.closest(CARDS)) continue;
      const has = (a) => card.hasAttribute(a);
      if ((!wantM || has("it-card-members")) && (!wantP || has("it-card-premiere"))) continue;
      const tries = cardTries.get(card) || 0;
      if (tries >= 99) continue;
      const { members, premiere } = badgeKinds(card);
      if (wantM && members) card.setAttribute("it-card-members", "");
      if (wantP && premiere) card.setAttribute("it-card-premiere", "");
      if (members || premiere || tries >= 4) cardTries.set(card, 99);
      else {
        cardTries.set(card, tries + 1);
        again = true;
      }
    }
    if (again) cardTimer = setTimeout(cardSweep, 800);
  }
  var cardsSoon = () => {
    if ((s.hide_members_only === true || s.hide_premieres === true) && !cardTimer) cardTimer = setTimeout(cardSweep, 400);
  };
  document.addEventListener(YT.navigateFinish, cardsSoon);
  var THUMB = "ytd-thumbnail, yt-thumbnail-view-model, a#thumbnail";
  var CARD = THUMB + ", ytd-rich-item-renderer, ytd-rich-grid-media, yt-lockup-view-model, ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer";
  var HOVER_DEBUG = (() => {
    try {
      return localStorage.getItem("it-hover-debug") === "1";
    } catch {
      return false;
    }
  })();
  for (const [type, sel] of [["mouseover", THUMB], ["pointerover", THUMB], ["mousemove", THUMB], ["pointermove", THUMB], ["mouseenter", CARD], ["pointerenter", CARD]]) {
    addEventListener(type, (e) => {
      if (s.disable_hover_preview !== true) return;
      const hit = e.target?.closest?.(sel);
      if (HOVER_DEBUG && type !== "mousemove" && type !== "pointermove") console.log("[Focus hover]", type, e.target?.localName, hit ? "stopped" : "passed");
      if (hit) e.stopImmediatePropagation();
    }, true);
  }
  var onAdded = [];
  function watch() {
    new MutationObserver((mutations) => {
      for (const m of mutations) for (const n of m.addedNodes) {
        if (n.nodeType !== 1) continue;
        for (const fn of onAdded) fn(n);
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  function darkThemeEarly(settings2) {
    if (settings2.theme !== "dark") return;
    document.documentElement.setAttribute("dark", "");
    const m = /(?:^|;\s*)PREF=([^;]*)/.exec(document.cookie);
    const prefs = new URLSearchParams(m ? m[1] : "");
    const f6 = parseInt(prefs.get("f6") || "0", 16);
    const want = (1024 | f6 & 1).toString(16);
    if (prefs.get("f6") !== want) {
      prefs.set("f6", want);
      document.cookie = "PREF=" + [...prefs].map(([k, v]) => k + "=" + v).join("&") + "; domain=.youtube.com; path=/; max-age=31536000; secure; samesite=lax";
    }
  }
  function darkTheme() {
    if (s.theme !== "dark") return;
    document.documentElement.setAttribute("dark", "");
    document.querySelector(YT.masthead)?.setAttribute("dark", "");
  }
  onAdded.push((n) => {
    if (s.hide_free_movies === true && n.localName?.startsWith("ytd-rich-") && location.pathname === "/") shelfSoon();
  });
  onAdded.push((n) => {
    if (s.hide_members_only !== true && s.hide_premieres !== true) return;
    const inside = n.closest?.(CARDS);
    if (inside) {
      let c = inside;
      while (c.parentElement?.closest(CARDS)) c = c.parentElement.closest(CARDS);
      cardTries.delete(c);
      cardsSoon();
    } else if (n.matches?.(CARDS) || n.querySelector?.(CARDS)) cardsSoon();
  });
  onAdded.push((n) => {
    if (s.theme === "dark" && n.matches?.(YT.masthead)) n.setAttribute("dark", "");
  });
  function channelDefaultTab(a) {
    const option = s.channel_default_tab;
    if (!option || option === "/" || a.tagName !== "A" || a.parentNode?.id === "contenteditable-root") return;
    if (CHANNEL_HOME.test(a.href) && !a.href.endsWith(option) && !a.dataset.itTab) {
      a.href = a.href.replace(CHANNEL_HOME_POSTFIX, "") + option;
      a.dataset.itTab = "1";
      a.addEventListener("click", (e) => e.stopPropagation(), true);
    }
  }
  onAdded.push((n) => {
    if (!s.channel_default_tab) return;
    if (n.tagName === "A") channelDefaultTab(n);
    else if (n.firstElementChild) n.querySelectorAll("a[href]").forEach(channelDefaultTab);
  });
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function uploadDate() {
    try {
      return JSON.parse(document.querySelector(YT.uploadDateJson)?.textContent || "null")?.uploadDate;
    } catch {
    }
    return document.querySelector(YT.uploadDateMeta)?.content;
  }
  var dayTries = 0;
  function dayOfWeek() {
    if (s.day_of_week !== true || location.pathname !== "/watch") return;
    const raw = uploadDate();
    const where = YT.infoStrings.map((q) => document.querySelector(q)).find(Boolean);
    const date = raw ? new Date(raw) : null;
    if (!where || !date || isNaN(date)) {
      if (dayTries++ < 40) setTimeout(dayOfWeek, 250);
      return;
    }
    dayTries = 0;
    let label = document.querySelector(".ytd-day-of-week");
    if (!label) {
      label = document.createElement("span");
      label.className = "ytd-day-of-week";
    }
    label.textContent = DAYS[date.getDay()] + "  ";
    if (label.parentNode !== where) where.append(label);
  }
  document.addEventListener(YT.navigateFinish, () => {
    dayTries = 0;
    dayOfWeek();
  });
  addEventListener("click", (e) => {
    if (s.side_panels !== "collapsed" || !e.target?.closest) return;
    const close = e.target.closest(YT.sidePanelClose);
    if (close) {
      const panel2 = close.closest(YT.sidePanel) || close.closest("#playlist");
      if (!panel2) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      panel2.setAttribute("it-panel-collapsed", "");
      return;
    }
    const header = e.target.closest(YT.sidePanelHeader);
    if (!header || e.target.closest("button, a")) return;
    const panel = header.closest(YT.sidePanel) || header.closest("#playlist");
    if (!panel || !panel.hasAttribute("it-panel-collapsed")) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    panel.removeAttribute("it-panel-collapsed");
  }, true);
  var UNPINNED = "it-chat-unpinned";
  var PROPS = ["position", "top", "left", "width", "height", "right", "bottom"];
  var original = /* @__PURE__ */ new WeakMap();
  var chatTimer = null;
  function restoreChat(el) {
    const o = original.get(el) || {};
    for (const p of PROPS) {
      if (o[p]) el.style.setProperty(p, o[p].value, o[p].priority);
      else el.style.removeProperty(p);
    }
    el.removeAttribute(UNPINNED);
  }
  function liveChatScroll() {
    const flexy = s.live_chat_scroll === true ? document.querySelector(YT.fixedPanelsFlexy) : null;
    if (!flexy) {
      document.querySelectorAll("[" + UNPINNED + "]").forEach(restoreChat);
      return;
    }
    for (const el of YT.pinnedChatCandidates.map((q) => flexy.querySelector(q)).filter(Boolean)) {
      if (el.hasAttribute(UNPINNED) || getComputedStyle(el).position !== "fixed") continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const o = {};
      for (const p of PROPS) {
        const v = el.style.getPropertyValue(p);
        if (v) o[p] = { value: v, priority: el.style.getPropertyPriority(p) };
      }
      original.set(el, o);
      el.style.setProperty("position", "absolute", "important");
      const host = el.offsetParent || document.documentElement;
      const h = host.getBoundingClientRect();
      el.style.setProperty("top", r.top - (h.top + scrollY) + "px", "important");
      el.style.setProperty("left", r.left - (h.left + scrollX) + "px", "important");
      el.style.setProperty("width", r.width + "px", "important");
      const player = flexy.querySelector("#full-bleed-container");
      const playerBottom = player ? player.getBoundingClientRect().bottom + scrollY : 0;
      const height = playerBottom > r.top + 50 && playerBottom < r.top + r.height ? playerBottom - r.top : r.height;
      el.style.setProperty("height", height + "px", "important");
      el.style.setProperty("right", "auto", "important");
      el.style.setProperty("bottom", "auto", "important");
      el.setAttribute(UNPINNED, "");
    }
  }
  function remeasureChat() {
    document.querySelectorAll("[" + UNPINNED + "]").forEach(restoreChat);
    if (s.live_chat_scroll === true) requestAnimationFrame(liveChatScroll);
  }
  addEventListener("resize", () => {
    clearTimeout(chatTimer);
    chatTimer = setTimeout(remeasureChat, 200);
  });
  document.addEventListener(YT.navigateFinish, () => setTimeout(remeasureChat, 500));
  new MutationObserver(() => {
    clearTimeout(chatTimer);
    chatTimer = setTimeout(liveChatScroll, 150);
  }).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ["fixed-panels", "theater", "full-bleed-player"] });
  onAdded.push((n) => {
    if (s.live_chat_scroll === true && (n.matches?.("ytd-live-chat-frame, #chat-container, #panels-full-bleed-container") || n.querySelector?.("ytd-live-chat-frame"))) {
      clearTimeout(chatTimer);
      chatTimer = setTimeout(liveChatScroll, 150);
    }
  });
  function startFeatures() {
    watch();
  }

  // src/content/early.js
  var root = document.documentElement;
  var settings = sanitize(null);
  installErrorHooks();
  function applyAttributes() {
    for (const [key, def] of Object.entries(SETTINGS)) {
      if (def.type === "color") continue;
      const v = settings[key];
      const name = attributeName(key);
      if (v === null || v === false) {
        if (v === false) root.setAttribute(name, "false");
        else root.removeAttribute(name);
      } else root.setAttribute(name, String(v));
    }
  }
  function markPageType(url = location.href) {
    root.setAttribute("data-page-type", pageTypeFor(url));
    root.setAttribute("it-pathname", new URL(url, location.href).pathname);
  }
  function keepTheaterCookie() {
    if (settings.forced_theater_mode && !new RegExp("(?:^|;\\s*)" + YT.theaterCookie + "(?:;|$)").test(document.cookie)) {
      document.cookie = YT.theaterCookie + "; domain=.youtube.com; path=/; max-age=31536000; secure; samesite=lax";
    }
  }
  var GATE = "it-layout-settling";
  var MAX_FIRST_MS = 6e3;
  var MAX_MS = 2500;
  var STILL_MS = 300;
  var firstLoad = true;
  var gateTimer = null;
  var still = null;
  var polling = false;
  var wantsGate = () => settings.forced_theater_mode || settings.player_size === "fit_to_window";
  function layoutReady() {
    const flexy = document.querySelector(YT.watchFlexy);
    if (!flexy || !document.querySelector(YT.player)) return false;
    if (settings.forced_theater_mode && !isTheater(flexy)) return false;
    return true;
  }
  function sizes() {
    const p = document.querySelector(YT.player);
    const v = document.querySelector(YT.playerVideo);
    const a = p ? p.getBoundingClientRect() : { width: 0, height: 0 };
    const b = v ? v.getBoundingClientRect() : { width: 0, height: 0 };
    return [a.width, a.height, b.width, b.height].map(Math.round).join("x");
  }
  var gateIv = null;
  function openGate(why = "unwanted") {
    if (root.hasAttribute(GATE)) firstLoad = false;
    root.removeAttribute(GATE);
    root.setAttribute("it-gate-why", why);
    clearTimeout(gateTimer);
    clearInterval(gateIv);
    gateTimer = null;
    gateIv = null;
    still = null;
  }
  function tick(now) {
    if (!root.hasAttribute(GATE)) return false;
    if (pageTypeFor(location.href) !== "video") {
      markPageType();
      openGate("not-video");
      return false;
    }
    if (!wantsGate()) {
      openGate("unwanted");
      return false;
    }
    if (layoutReady()) {
      const key = sizes();
      if (!still || still.key !== key) still = { key, since: now };
      else if (now - still.since >= STILL_MS) {
        openGate("still");
        return false;
      }
    } else still = null;
    return true;
  }
  function poll(now) {
    if (!tick(now)) {
      polling = false;
      return;
    }
    requestAnimationFrame(poll);
  }
  function closeGate() {
    if (!wantsGate()) return;
    const already = root.hasAttribute(GATE);
    root.setAttribute(GATE, "");
    if (!already || !gateTimer) {
      clearTimeout(gateTimer);
      gateTimer = setTimeout(() => openGate("timeout"), firstLoad ? MAX_FIRST_MS : MAX_MS);
    }
    if (!gateIv) gateIv = setInterval(() => tick(performance.now()), 100);
    if (!polling) {
      polling = true;
      requestAnimationFrame(poll);
    }
  }
  var stopTrace = null;
  function startTrace(sinceMs = 0) {
    if (stopTrace) stopTrace();
    stopTrace = null;
    if (settings.fit_trace !== true || settings.player_size !== "fit_to_window" || location.pathname !== "/watch") return;
    stopTrace = recordTrace(document, (t) => chrome.storage.local.set({ [TRACE_KEY]: t }).catch(() => {
    }), chrome.runtime.getManifest().version, sinceMs);
  }
  function forward() {
    document.dispatchEvent(new CustomEvent("it-settings", { detail: JSON.stringify(settings) }));
  }
  document.addEventListener("it-settings-request", forward);
  var PAGE_WRITABLE = /* @__PURE__ */ new Set(["playlist_reversed_active"]);
  document.addEventListener("it-set", (e) => {
    let msg;
    try {
      msg = JSON.parse(e.detail);
    } catch {
      return;
    }
    if (!msg || !PAGE_WRITABLE.has(msg.key) || typeof msg.value !== "boolean") return;
    chrome.storage.local.set({ [msg.key]: msg.value });
  });
  startFeatures();
  markPageType();
  var startedOnVideo = pageTypeFor(location.href) === "video";
  if (startedOnVideo) root.setAttribute(GATE, "");
  chrome.storage.local.get(Object.keys(SETTINGS)).then((raw) => {
    settings = sanitize(raw);
    applyAttributes();
    keepTheaterCookie();
    darkThemeEarly(settings);
    setSettings(settings);
    if (startedOnVideo && pageTypeFor(location.href) === "video") {
      if (wantsGate()) closeGate();
      else openGate();
      startTrace(performance.now());
    }
    forward();
  }).catch(() => openGate("error"));
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    const next = {};
    for (const k of Object.keys(changes)) if (k in SETTINGS) next[k] = changes[k].newValue;
    if (!Object.keys(next).length) return;
    settings = sanitize({ ...settings, ...next });
    applyAttributes();
    keepTheaterCookie();
    darkThemeEarly(settings);
    setSettings(settings);
    forward();
  });
  document.addEventListener(YT.navigateStart, (e) => {
    const url = e.detail && e.detail.url;
    if (url && pageTypeFor(url) === "video") {
      keepTheaterCookie();
      closeGate();
    }
  });
  document.addEventListener(YT.navigateStart, (e) => {
    const url = e.detail && e.detail.url;
    if (url && pageTypeFor(url) === "video") setTimeout(() => startTrace(0), 0);
  });
  document.addEventListener(YT.navigateFinish, () => {
    markPageType();
    if (pageTypeFor(location.href) === "video") {
      if (root.hasAttribute(GATE) || !layoutReady()) closeGate();
    } else openGate();
  });
}
