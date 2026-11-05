(() => {
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

  // src/options/spec.js
  var Q = [
    ["tiny", "144p"],
    ["small", "240p"],
    ["medium", "360p"],
    ["large", "480p"],
    ["hd720", "720p"],
    ["hd1080", "1080p"],
    ["hd1440", "1440p"],
    ["hd2160", "2160p (4K)"],
    ["hd2880", "2880p"],
    ["highres", "4320p (8K)"]
  ];
  var SECTIONS = [
    { title: "Layout", items: [
      { key: "forced_theater_mode", label: "Always use theater mode", value: true },
      { key: "player_size", label: "Player fits the window", value: "fit_to_window" },
      { key: "fit_without_theater", label: 'Fit to window without theater mode (needs "Player fits the window")', value: true },
      { key: "fit_trace", label: 'Record a size log of the first 15 s of each video, shown on the Backup tab (needs "Player fits the window")', value: true },
      { key: "fit_recheck", label: 'Correct a small player on first load (needs "Player fits the window")', value: true },
      { key: "header_position", label: "Hide the header on video pages", value: "hidden_on_video_page" },
      { key: "side_panels", label: "Side panels collapse instead of closing", value: "collapsed" },
      { key: "live_chat_scroll", label: "Live chat scrolls with the video (not pinned to the screen)", value: true },
      { key: "theme", label: "Dark theme", value: "dark" },
      { key: "change_thumbnails_per_row", label: "Thumbnails per row", choices: [2, 3, 4, 5, 6, 7, 8].map((n) => [String(n), String(n)]) },
      { key: "wrap_video_info", label: "Show the full channel, views and upload time under videos (wrap instead of cutting off)", value: true },
      { key: "squared_thumbnails", label: "Square thumbnail corners", value: true },
      { key: "day_of_week", label: "Show the day of the week by the upload date", value: true },
      { key: "disable_page_transition", label: "Turn off the thumbnail zoom animation", value: true }
    ] },
    { title: "Player", items: [
      { key: "player_quality", label: "Quality", choices: Q },
      { key: "player_quality_playlist", label: "Quality in playlists", choices: Q },
      { key: "full_screen_quality", label: "Quality in fullscreen", choices: Q },
      { key: "player_quality_without_focus", label: "Quality while the tab is in the background", choices: Q },
      { key: "player_subtitles", label: "Turn subtitles off", value: "disabled" },
      { key: "player_autoplay_disable", label: "Don't autoplay videos when opened", value: true },
      { key: "disable_auto_dubbing", label: "Keep the original audio (no auto-dubbing)", value: true },
      { key: "up_next_autoplay", label: "Turn off up-next autoplay", value: false },
      { key: "player_color", label: "Progress bar color", choices: [
        ["red", "Red"],
        ["pink", "Pink"],
        ["purple", "Purple"],
        ["deep_purple", "Deep purple"],
        ["indigo", "Indigo"],
        ["blue", "Blue"],
        ["light_blue", "Light blue"],
        ["cyan", "Cyan"],
        ["teal", "Teal"],
        ["green", "Green"],
        ["light_green", "Light green"],
        ["lime", "Lime"],
        ["yellow", "Yellow"],
        ["amber", "Amber"],
        ["orange", "Orange"],
        ["deep_orange", "Deep orange"],
        ["brown", "Brown"],
        ["blue_gray", "Blue gray"],
        ["white", "White"]
      ] },
      { key: "auto_dark_colors", label: "My browser uses Auto Dark Mode for websites (keeps Yellow and White visible)", value: true },
      { key: "player_transparent_background", label: "Transparent player background", value: true }
    ] },
    { title: "Hide", items: [
      { key: "hide_ai_summary", group: "Feeds and home page", label: "AI summaries", value: true },
      { key: "hide_explore_topics", group: "Feeds and home page", label: '"Explore more topics" section on the home page', value: true },
      { key: "hide_free_movies", group: "Feeds and home page", label: '"Free movies" shelf on the home page (Free Primetime movies and similar)', value: true },
      { key: "remove_home_page_shorts", group: "Feeds and home page", label: "Shorts on the home page", value: true },
      { key: "remove_subscriptions_shorts", group: "Feeds and home page", label: "Shorts in subscriptions", value: true },
      { key: "remove_trending_shorts", group: "Feeds and home page", label: "Shorts in trending", value: true },
      { key: "remove_subscriptions_live_streams", group: "Feeds and home page", label: "Live streams in subscriptions", value: true },
      { key: "hide_voice_search_button", group: "Feeds and home page", label: "Voice search button", value: true },
      { key: "hide_sign_in", group: "Feeds and home page", label: 'Sign in button (top bar) and the "Sign in to like videos" box (left menu)', value: true },
      { key: "hide_members_only", group: "Feeds and home page", label: "Members-only videos (everywhere, including channel pages)", value: true },
      { key: "hide_premieres", group: "Feeds and home page", label: "Premieres and upcoming videos (everywhere, including channel pages)", value: true },
      { key: "disable_hover_preview", group: "Feeds and home page", label: "Video preview that plays when you hover a thumbnail (turn it off)", value: true },
      { key: "hide_related_sidebar", group: "Video page", label: "Recommended videos beside the video (live chat and playlists stay)", value: true },
      { key: "subscribe", group: "Video page", label: "Subscribe button", value: "hidden" },
      { key: "join", group: "Video page", label: "Join button", value: "hidden" },
      { key: "purchase", group: "Video page", label: "Purchase button", value: "hidden" },
      { key: "hide_share_button", group: "Video page", label: "Share button", value: "hidden" },
      { key: "hide_ask_button", group: "Video page", label: "Ask button", value: "hidden" },
      { key: "hide_download_button", group: "Video page", label: "Download button", value: "hidden" },
      { key: "hide_thanks_button", group: "Video page", label: "Thanks button", value: "hidden" },
      { key: "hide_clip_button", group: "Video page", label: "Clip button", value: "hidden" },
      { key: "hide_save_button", group: "Video page", label: "Save button", value: "hidden" },
      { key: "hide_report_button", group: "Video page", label: "Report button", value: "hidden" },
      { key: "hide_more_button", group: "Video page", label: '"\u2026" (more) button', value: true },
      { key: "ambient_lighting", group: "Player clutter", label: "Hide YouTube's glow around the video (black bars)", value: false },
      { key: "player_hide_annotations", group: "Player clutter", label: "Hide annotations", value: true },
      { key: "player_hide_cards", group: "Player clutter", label: "Hide cards", value: true },
      { key: "hide_includes_paid_promotion", group: "Player clutter", label: 'Hide "Includes paid promotion"', value: true },
      { key: "popup_ad", group: "Player clutter", label: "Hide pop-up ads", value: true }
    ] },
    { title: "Channels", items: [
      { key: "channel_default_tab", label: "Channels open on", choices: [["/videos", "Videos"], ["/shorts", "Shorts"], ["/streams", "Live"], ["/playlists", "Playlists"], ["/community", "Community"], ["/about", "About"]] },
      { key: "channel_trailer_autoplay", label: "Don't autoplay channel trailers", value: false },
      { key: "playlist_reverse", label: "Reverse button in playlists", value: true }
    ] },
    // Not ImprovedTube settings: the browser's own audio processing, so quiet videos aren't a reach for the volume.
    { title: "Audio", items: [
      { key: "audio_leveler", label: "Even out the volume (quiets loud moments, lifts quiet ones)", value: true },
      { key: "audio_strength", label: "Leveling strength", choices: [["light", "Light"], ["medium", "Medium"], ["strong", "Strong"]], def: "medium", noOff: true },
      { key: "audio_auto_volume", label: "Auto volume (slowly evens out quiet and loud videos)", value: true },
      { key: "audio_auto_max", label: "Auto volume: most it may turn up", slider: { min: 0, max: 24, def: 18 } },
      { key: "audio_auto_min", label: "Auto volume: most it may turn down", slider: { min: -24, max: 0, def: -12 } },
      { key: "stable_volume", label: "YouTube's Stable volume", choices: [["on", "Always on"], ["off", "Always off"]] },
      { key: "voice_boost", label: "YouTube's Voice boost", choices: [["on", "Always on"], ["off", "Always off"]] },
      { key: "audio_boost", label: "Boost / reduce volume", slider: { min: -24, max: 24, def: 0 } }
    ] }
  ];

  // src/sponsor/core.js
  var DEFAULT_SERVER = "https://sponsor.ajay.app";
  var CATEGORIES = {
    sponsor: { label: "Sponsor", color: "#00d400", help: "Paid promotions and ad reads." },
    selfpromo: { label: "Self-promotion", color: "#ffff00", help: "Merch, Patreon, their other channels." },
    interaction: { label: "Interaction reminder", color: "#cc00ff", help: '"Like and subscribe" reminders.' },
    intro: { label: "Intro", color: "#00ffff", help: "Intro animations with no real content." },
    outro: { label: "Endcards / credits", color: "#0202ed", help: "End screens and credits." },
    preview: { label: "Preview / recap", color: "#008fd6", help: "Clips of what is coming up or a recap." },
    filler: { label: "Filler tangent", color: "#7300ff", help: "Off-topic tangents and jokes. Strict: off by default." },
    music_offtopic: { label: "Non-music part (music videos)", color: "#ff9900", help: "Talking parts in music videos." },
    poi_highlight: { label: "Highlight", color: "#ff1684", help: "The moment most people came for: a pink mark (SponsorBlock colour) on the progress bar, and a way to jump straight to it." }
  };
  var DEFAULT_SETTINGS = {
    enabled: true,
    categories: {
      sponsor: "auto",
      selfpromo: "auto",
      interaction: "auto",
      intro: "button",
      outro: "button",
      preview: "off",
      filler: "off",
      music_offtopic: "off",
      poi_highlight: "off"
    },
    showMarkers: true,
    // coloured segments on the progress bar
    showNotice: true,
    // "Skipped sponsor · Undo" message
    server: DEFAULT_SERVER
  };
  var ACTIONS = /* @__PURE__ */ new Set(["auto", "button", "off"]);
  function normalizeServer(value) {
    try {
      const u = new URL(String(value || "").trim());
      if (u.protocol !== "https:" || u.username || u.password) return DEFAULT_SERVER;
      return u.origin + u.pathname.replace(/\/+$/, "");
    } catch {
      return DEFAULT_SERVER;
    }
  }
  function sanitizeSettings(raw) {
    const r = raw && typeof raw === "object" ? raw : {};
    const d = DEFAULT_SETTINGS;
    const bool = (v, def) => typeof v === "boolean" ? v : def;
    const categories = {};
    for (const id of Object.keys(CATEGORIES)) {
      const v = r.categories?.[id];
      categories[id] = ACTIONS.has(v) ? v : d.categories[id];
    }
    return {
      enabled: bool(r.enabled, d.enabled),
      categories,
      showMarkers: bool(r.showMarkers, d.showMarkers),
      showNotice: bool(r.showNotice, d.showNotice),
      server: normalizeServer(r.server ?? d.server)
    };
  }

  // src/aifilter/core/defaults.js
  var KEYWORD_PACKS = {
    aiGenerated: {
      label: "AI-generated videos",
      description: 'Videos made with AI video, image, music or voice generators ("AI slop").',
      keywords: [
        // Explicit disclosure
        "ai generated",
        // who did the work: "voiced by AI", "AI narrator"
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
        // with a word in between: "made entirely by AI", "100% AI generated", "fully AI"
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
        // (Not plain "suno" or "udio": "suno" means "listen" in Hindi and is in countless songs.)
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
  var DEFAULT_SETTINGS2 = {
    enabled: true,
    // 'hide' removes matching videos; 'blur' blurs them behind a label you can click through.
    mode: "hide",
    packs: { aiGenerated: true, aiTopics: false },
    // Extra keywords. Wrap in slashes for a regular expression: /\bai\s+\w+\s+cat/i
    customKeywords: [],
    // Words from the built-in packs that should never trigger a match.
    ignoredKeywords: [],
    // Channels are { key, name } where key is "@handle", "UC…" channel id, or "name:<display name>".
    blockedChannels: [],
    // Apply the Blocked list (its own switch: it works with the AI filter on or off). Turn off to keep the list but show everything.
    blockedEnabled: true,
    aiChannels: [],
    // channels blocked as AI (blockedChannels is for "just don't want to see")
    allowedChannels: [],
    matchChannelNames: true,
    matchDescriptions: true,
    // On a watch page, detect YouTube's "Altered or synthetic content" label.
    detectDisclosure: true,
    // Automatically add channels that use the synthetic-content label to the block list.
    autoBlockDisclosed: false,
    // Show the small AI Filter bar on watch and channel pages.
    showPageBar: true,
    // A "Block channel" button when hovering any video (only the button: the Blocked list has its own switch and works with the AI filter on or off).
    hoverBlock: false,
    // Don't apply keywords to videos uploaded before this year (AI video generators didn't exist yet).
    // Uses the "x years ago" shown on each video. Channel block lists still apply.
    skipOldVideos: true,
    oldVideoYear: 2022,
    // Channels you block as AI stay in a readable list this many days, then move to a compact archive that still blocks
    // them but can't be browsed (0 = keep them readable forever).
    archiveDays: 30,
    // "Possibly AI": a small badge on videos with softer signals, and a review list of channels that show two of them.
    possible: false,
    possibleKeywords: [],
    // your own softer keywords
    // Read the description and hashtags of the video you open / the description of the channel page you open.
    scanWatchPage: false,
    scanChannelPage: false,
    reviewChannels: [],
    // Collect which words show up in titles from channels you blocked as AI, and suggest them (nothing is used until you approve).
    learnWords: false,
    possibleNameWords: [],
    // channel-name words that mark a channel as Possibly AI (added from the learned suggestions)
    // Show the small AI Filter strip at the top of the YouTube home page.
    showHomeBar: true
  };
  var SETTINGS_KEY = "aiFilterSettings";

  // src/aifilter/core/rules.js
  function cleanStrings(value, max = 500) {
    if (!Array.isArray(value)) return [];
    const out = [];
    for (const v of value) {
      if (typeof v === "string" && v.trim() && v.length <= 300) out.push(v.trim());
      if (out.length >= max) break;
    }
    return [...new Set(out)];
  }
  var LIST_MAX = 5e4;
  var cleanLists = /* @__PURE__ */ new WeakSet();
  var REVIEW_MAX = 2e3;
  function cleanChannels(value, max = 5e3) {
    if (!Array.isArray(value)) return [];
    if (cleanLists.has(value) && value.length <= max) return value;
    const out = [];
    const seen = /* @__PURE__ */ new Set();
    for (const v of value) {
      if (!v || typeof v.key !== "string" || !v.key || v.key.length > 300) continue;
      if (seen.has(v.key)) continue;
      seen.add(v.key);
      const e = { key: v.key, name: typeof v.name === "string" ? v.name.slice(0, 200) : v.key };
      if (Number.isFinite(v.at) && v.at > 0) e.at = v.at;
      if (typeof v.why === "string" && v.why) e.why = v.why.slice(0, 120);
      out.push(e);
      if (out.length >= max) break;
    }
    cleanLists.add(out);
    return out;
  }
  function sanitizeSettings2(raw) {
    const r = raw && typeof raw === "object" ? raw : {};
    const d = DEFAULT_SETTINGS2;
    const bool = (v, def) => typeof v === "boolean" ? v : def;
    const packs = {};
    for (const id of Object.keys(KEYWORD_PACKS)) packs[id] = bool(r.packs?.[id], d.packs[id]);
    return {
      enabled: bool(r.enabled, d.enabled),
      mode: r.mode === "blur" || r.mode === "hide" ? r.mode : d.mode,
      packs,
      customKeywords: cleanStrings(r.customKeywords),
      ignoredKeywords: cleanStrings(r.ignoredKeywords),
      blockedChannels: cleanChannels(r.blockedChannels, LIST_MAX),
      aiChannels: cleanChannels(r.aiChannels, LIST_MAX),
      allowedChannels: cleanChannels(r.allowedChannels),
      reviewChannels: cleanChannels(r.reviewChannels, REVIEW_MAX),
      possible: bool(r.possible, d.possible),
      possibleKeywords: cleanStrings(r.possibleKeywords),
      scanWatchPage: bool(r.scanWatchPage, d.scanWatchPage),
      scanChannelPage: bool(r.scanChannelPage, d.scanChannelPage),
      learnWords: bool(r.learnWords, d.learnWords),
      possibleNameWords: cleanStrings(r.possibleNameWords),
      blockedEnabled: bool(r.blockedEnabled, d.blockedEnabled),
      matchChannelNames: bool(r.matchChannelNames, d.matchChannelNames),
      matchDescriptions: bool(r.matchDescriptions, d.matchDescriptions),
      detectDisclosure: bool(r.detectDisclosure, d.detectDisclosure),
      autoBlockDisclosed: bool(r.autoBlockDisclosed, d.autoBlockDisclosed),
      showPageBar: bool(r.showPageBar, d.showPageBar),
      hoverBlock: bool(r.hoverBlock, d.hoverBlock),
      skipOldVideos: bool(r.skipOldVideos, d.skipOldVideos),
      oldVideoYear: Number.isInteger(r.oldVideoYear) && r.oldVideoYear >= 2015 && r.oldVideoYear <= 2100 ? r.oldVideoYear : d.oldVideoYear,
      // days before an entry of "AI channels (yours)" moves to the compact archive; 0 = never
      archiveDays: Number.isInteger(r.archiveDays) && r.archiveDays >= 0 && r.archiveDays <= 3650 ? r.archiveDays : d.archiveDays,
      showHomeBar: bool(r.showHomeBar, d.showHomeBar)
    };
  }

  // src/aifilter/core/learn.js
  var LEARN_KEY = "aifLearn";
  var NAMES_MAX = 5e3;
  var LEARN_MAX = 1e5;
  var LEARN_HARD = LEARN_MAX + 5e3;
  var STOP = new Set("the and for with this that you your are was were have has had not but from they them their what when where which who whom how why all any can will just out about into over than then there here its it's our his her she him one two more most some such only also very much many new now get got how part full episode video videos official".split(" "));
  var emptyData = () => ({ p: {}, dismissed: [], names: {}, src: {}, ac: 0, oc: 0 });
  function cleanData(raw) {
    const out = emptyData();
    if (!raw || typeof raw !== "object") return out;
    let np = 0;
    for (const [k, v] of Object.entries(raw.p || {})) {
      if (k.length <= 60 && Array.isArray(v) && Number.isFinite(v[0]) && Number.isFinite(v[1])) {
        out.p[k] = [Math.max(0, v[0] | 0), Math.max(0, v[1] | 0)];
        np++;
      }
      if (np >= LEARN_HARD) break;
    }
    let nn = 0;
    for (const [k, v] of Object.entries(raw.names || {})) {
      if (k.length <= 40 && Array.isArray(v) && Number.isFinite(v[0]) && Number.isFinite(v[1])) {
        out.names[k] = [Math.max(0, v[0] | 0), Math.max(0, v[1] | 0)];
        nn++;
      }
      if (nn >= NAMES_MAX) break;
    }
    for (const [id, v] of Object.entries(raw.src || {}).slice(0, 20)) {
      if (!v || !Number.isFinite(v.n) || typeof v.w !== "object") continue;
      const w = {};
      for (const [k, n] of Object.entries(v.w || {}).slice(0, 2e3)) if (k.length <= 40 && Number.isFinite(n)) w[k] = n | 0;
      out.src[id] = { n: v.n | 0, w };
    }
    out.ac = Number.isFinite(raw.ac) ? raw.ac | 0 : 0;
    out.oc = Number.isFinite(raw.oc) ? raw.oc | 0 : 0;
    out.dismissed = (Array.isArray(raw.dismissed) ? raw.dismissed : []).filter((x) => typeof x === "string" && x.length <= 60).slice(0, 500);
    return out;
  }

  // src/aifilter/core/sets.js
  var INDEX_KEY = "aifSetIndex";
  var SET_PREFIX = "aifSet:";
  var ARCHIVE_KEY = "aifArchive";
  var BACKUP_FORMAT = 2;
  var ID_RE = /^[a-z0-9_-]{1,40}$/;
  var text = (v, max) => typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "";
  function cleanSource(raw) {
    const id = typeof raw?.id === "string" && ID_RE.test(raw.id) ? raw.id : null;
    if (!id) return null;
    const url = text(raw.url, 500);
    return { id, label: text(raw.label, 80) || id, url: /^https:\/\//i.test(url) ? url : "" };
  }
  function cleanIndex(raw) {
    if (!Array.isArray(raw)) return [];
    const out = [], seen = /* @__PURE__ */ new Set();
    for (const r of raw) {
      const s = cleanSource(r);
      if (!s || seen.has(s.id)) continue;
      seen.add(s.id);
      out.push({ ...s, count: Number.isInteger(r.count) && r.count >= 0 ? r.count : 0, at: Number.isFinite(r.at) ? r.at : 0, mode: r.mode === "badge" ? "badge" : "block" });
      if (out.length >= 20) break;
    }
    return out;
  }
  var store = (api) => api.storage.local;
  async function loadSetIndex(api = globalThis.chrome) {
    return cleanIndex((await store(api).get(INDEX_KEY))?.[INDEX_KEY]);
  }
  async function exportAiData(api = globalThis.chrome, { learn = false } = {}) {
    const index = await loadSetIndex(api);
    const d = await store(api).get([SETTINGS_KEY, ARCHIVE_KEY, ...learn ? [LEARN_KEY] : [], ...index.map((m) => SET_PREFIX + m.id)]);
    const sets = {};
    for (const m of index) if (d[SET_PREFIX + m.id]) sets[m.id] = d[SET_PREFIX + m.id];
    const out = { format: BACKUP_FORMAT, settings: sanitizeSettings2(d[SETTINGS_KEY]), index, sets, archive: d[ARCHIVE_KEY] || null };
    if (learn && d[LEARN_KEY]) out.learn = cleanData(d[LEARN_KEY]);
    return out;
  }

  // src/shared/errlog.js
  var ERR_KEY = "focusErrorLog";
  var ERR_MAX = 30;
  var clip = (v, n) => String(v ?? "").replace(/[\u0000-\u001f]+/g, " ").replace(/\?[^\s)'"]*/g, "").trim().slice(0, n);
  var num = (v, d = 0) => Number.isFinite(v) ? v : d;
  function cleanLog(raw) {
    if (!Array.isArray(raw)) return [];
    const out = [];
    for (const e of raw) {
      if (!e || typeof e !== "object" || !e.msg) continue;
      out.push({ src: clip(e.src, 40) || "Extension", msg: clip(e.msg, 300), where: clip(e.where, 80), page: clip(e.page, 20), n: Math.max(1, num(e.n, 1) | 0), first: num(e.first), last: num(e.last) });
      if (out.length >= ERR_MAX) break;
    }
    return out;
  }

  // src/shared/fittrace.js
  var TRACE_KEY = "focusFitTrace";
  var TRACE_MAX = 120;
  function cleanTrace(raw) {
    if (!raw || typeof raw !== "object" || !Array.isArray(raw.rows)) return null;
    return { at: Number(raw.at) || 0, v: String(raw.v || "").slice(0, 20), rows: raw.rows.filter((r) => typeof r === "string").map((r) => r.slice(0, 400)).slice(0, TRACE_MAX) };
  }

  // src/options/index.js
  var $ = (sel) => document.querySelector(sel);
  var el = (tag, props = {}, ...kids) => {
    const e = Object.assign(document.createElement(tag), props);
    e.append(...kids);
    return e;
  };
  var savedTimer;
  var flash = () => {
    $("#saved").textContent = "Saved";
    clearTimeout(savedTimer);
    savedTimer = setTimeout(() => $("#saved").textContent = "", 1200);
  };
  async function save(key, value) {
    if (value === null || value === void 0) await chrome.storage.local.remove(key);
    else await chrome.storage.local.set({ [key]: value });
    flash();
  }
  var panes = [];
  function addPane(title, content, onShow) {
    const id = "pane-" + panes.length;
    const tab = el("button", { textContent: title, role: "tab" });
    tab.setAttribute("aria-controls", id);
    const pane = el("section", { id, className: "pane", hidden: true }, content);
    tab.addEventListener("click", () => select(panes.indexOf(entry)));
    const entry = { tab, pane, title, onShow };
    panes.push(entry);
    $("#tabs").append(tab);
    $("#panes").append(pane);
  }
  function select(i) {
    panes.forEach((p, n) => {
      p.tab.setAttribute("aria-selected", String(n === i));
      p.pane.hidden = n !== i;
    });
    if (panes[i]?.onShow) {
      panes[i].onShow();
      panes[i].onShow = null;
    }
    try {
      sessionStorage.setItem("tab", String(i));
    } catch {
    }
  }
  function renderSettings(stored) {
    const s = sanitize(stored);
    for (const section of SECTIONS) {
      const renderItem = (item) => {
        const id = "opt-" + item.key;
        let control;
        if (item.slider) {
          const { min, max, def } = item.slider;
          const cur = s[item.key] == null || s[item.key] === "" ? def : Number(s[item.key]);
          const out = el("output", { className: "slider-out" });
          const show = (v) => out.textContent = v === 0 ? "0 dB (100%)" : `${v > 0 ? "+" : ""}${v} dB (${Math.round(Math.pow(10, v / 20) * 100)}%)`;
          const range = el("input", { id, type: "range", min, max, step: 1, value: cur });
          show(cur);
          range.addEventListener("input", () => {
            show(Number(range.value));
            save(item.key, String(range.value));
          });
          return el("div", { className: "row col" }, el("label", { htmlFor: id }, item.label + " ", out), range);
        }
        if (item.choices) {
          const first = item.noOff ? [] : [el("option", { value: "", textContent: "Off (YouTube default)" })];
          control = el("select", { id }, ...first, ...item.choices.map(([v, t]) => el("option", { value: v, textContent: t })));
          control.value = s[item.key] && item.choices.some(([v]) => v === s[item.key]) ? s[item.key] : item.def || "";
          control.addEventListener("change", () => save(item.key, control.value || null));
        } else {
          control = el("input", { id, type: "checkbox", checked: s[item.key] === item.value });
          control.addEventListener("change", () => save(item.key, control.checked ? item.value : null));
        }
        return el("div", { className: "row" }, el("label", { htmlFor: id, textContent: item.label }), control);
      };
      let lastGroup = null;
      const rows = section.items.flatMap((item) => {
        const heading = item.group && item.group !== lastGroup ? [el("h3", { className: "group-title", textContent: item.group })] : [];
        if (item.group) lastGroup = item.group;
        return [...heading, renderItem(item)];
      });
      let blocked = null;
      if (section.title === "Channels") blocked = growingFrame("Blocked channels", "aif:height");
      addPane(section.title, el("div", {}, ...rows, ...blocked ? [blocked] : []), blocked ? () => {
        blocked.src = "aifilter.html?embed&view=blocked";
      } : void 0);
    }
  }
  function growingFrame(title, heightMessage) {
    const frame = el("iframe", { title });
    addEventListener("message", (e) => {
      if (e.source === frame.contentWindow && e.data?.type === heightMessage) frame.style.height = e.data.height + "px";
    });
    return frame;
  }
  function framePane(title, src, heightMessage) {
    const frame = growingFrame(title, heightMessage);
    addPane(title, frame, () => {
      frame.src = src;
    });
  }
  var EXTRA = ["aiFilter2", "aiFilterSettings", "sponsorSkipSettings"];
  var MARKER = "_focusBackup";
  function diagnosticsBox() {
    const listEl = el("div", { className: "diag-list" });
    const when = (t) => t ? new Date(t).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
    const line = (e) => `${when(e.last)} \xB7 ${e.src}${e.page ? " \xB7 " + e.page + " page" : ""}${e.n > 1 ? " \xB7 " + e.n + " times" : ""}
${e.msg}${e.where ? " (" + e.where + ")" : ""}`;
    let log = [];
    async function draw() {
      log = cleanLog((await chrome.storage.local.get(ERR_KEY))[ERR_KEY]);
      listEl.replaceChildren();
      if (!log.length) {
        listEl.append(el("p", { className: "diag-empty", textContent: "No errors recorded." }));
        return;
      }
      for (const e of log) {
        listEl.append(el(
          "div",
          { className: "diag-item" },
          el("div", { className: "diag-head", textContent: line(e).split("\n")[0] }),
          el("div", { className: "diag-msg", textContent: e.msg + (e.where ? " (" + e.where + ")" : "") })
        ));
      }
    }
    const copy = el("button", { textContent: "Copy for a bug report" });
    copy.addEventListener("click", async () => {
      const head = `Focus for YouTube ${chrome.runtime.getManifest().version} \xB7 ${navigator.userAgent}`;
      const text2 = [head, ...log.map(line)].join("\n\n");
      try {
        await navigator.clipboard.writeText(text2);
        copy.textContent = "Copied";
      } catch {
        copy.textContent = "Could not copy";
      }
      setTimeout(() => copy.textContent = "Copy for a bug report", 1500);
    });
    const clear = el("button", { textContent: "Clear" });
    clear.addEventListener("click", async () => {
      await chrome.storage.local.remove(ERR_KEY);
      draw();
    });
    chrome.storage.onChanged.addListener((ch, area) => {
      if (area === "local" && ch[ERR_KEY]) draw();
    });
    draw();
    return el(
      "div",
      { className: "diag" },
      el("h3", { textContent: "Diagnostics" }),
      el("p", { textContent: "Errors from this extension's own code, newest first (the last 30). They stay on this computer; only the kind of page is kept, never an address. An empty list while something misbehaves usually means the problem is not in the extension." }),
      listEl,
      copy,
      clear,
      traceBox()
    );
  }
  function traceBox() {
    const area = el("textarea", { className: "diag-trace", readOnly: true, rows: 8 });
    const copy = el("button", { textContent: "Copy size log" });
    const clear = el("button", { textContent: "Clear size log" });
    const wrap = el(
      "div",
      { className: "diag-trace-box", hidden: true },
      el("h3", { textContent: "Size log" }),
      el("p", { textContent: "The player and page box sizes during the first 15 seconds of the last video you opened with the size log setting on (Layout tab). Only sizes and page states, no addresses." }),
      area,
      copy,
      clear
    );
    let text2 = "";
    async function draw() {
      const t = cleanTrace((await chrome.storage.local.get(TRACE_KEY))[TRACE_KEY]);
      wrap.hidden = !t;
      text2 = t ? [`Focus for YouTube ${t.v} \xB7 ${new Date(t.at).toLocaleString()}`, ...t.rows].join("\n") : "";
      area.value = text2;
    }
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(text2);
        copy.textContent = "Copied";
      } catch {
        area.select();
        copy.textContent = "Press Ctrl+C";
      }
      setTimeout(() => copy.textContent = "Copy size log", 1500);
    });
    clear.addEventListener("click", async () => {
      await chrome.storage.local.remove(TRACE_KEY);
      draw();
    });
    chrome.storage.onChanged.addListener((ch, area2) => {
      if (area2 === "local" && ch[TRACE_KEY]) draw();
    });
    draw();
    return wrap;
  }
  function backupPane() {
    const msg = el("div", { className: "msg" });
    const exportBtn = el("button", { textContent: "Export settings" });
    const importBtn = el("button", { textContent: "Import a backup" });
    const file = el("input", { type: "file", accept: ".json,application/json", hidden: true });
    const withLearn = el("input", { type: "checkbox", id: "backup-learn" });
    const learnRow = el("label", { className: "backup-learn", title: "Off by default: they make the file bigger (a full list is about 2 MB) and rebuild by themselves as you browse." }, withLearn, " Include learned words in the export");
    exportBtn.addEventListener("click", async () => {
      const all = await chrome.storage.local.get([...Object.keys(SETTINGS), "sponsorSkipSettings"]);
      const out = { [MARKER]: { format: 2, version: chrome.runtime.getManifest().version } };
      for (const k of [...Object.keys(SETTINGS), "sponsorSkipSettings"]) if (all[k] !== void 0 && all[k] !== null) out[k] = all[k];
      out.aiFilter2 = await exportAiData(chrome, { learn: withLearn.checked });
      const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", "_").replace(":", "-");
      const url = URL.createObjectURL(new Blob([JSON.stringify(out)], { type: "application/json" }));
      el("a", { href: url, download: `focus-for-youtube-v${out[MARKER].version}-settings-${stamp}.json` }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1e4);
      msg.textContent = `Exported ${Object.keys(out).length - 1} settings in the new format (version ${out[MARKER].version})${out.aiFilter2.learn ? ", with learned words" : ""}. Older versions of this extension can't use the AI list from this file.`;
    });
    importBtn.addEventListener("click", () => file.click());
    file.addEventListener("change", async () => {
      let data;
      const chosen = file.files[0];
      file.value = "";
      if (!chosen) return;
      try {
        data = JSON.parse(await chosen.text());
      } catch {
        msg.textContent = "That file isn't a settings backup.";
        return;
      }
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        msg.textContent = "That file isn't a settings backup.";
        return;
      }
      const clean = sanitize(data);
      const set = {}, remove = [];
      for (const k of Object.keys(SETTINGS)) {
        if (!(k in data)) continue;
        if (clean[k] === null) remove.push(k);
        else set[k] = clean[k];
      }
      if (data.sponsorSkipSettings && typeof data.sponsorSkipSettings === "object") set.sponsorSkipSettings = sanitizeSettings(data.sponsorSkipSettings);
      if (remove.length) await chrome.storage.local.remove(remove);
      await chrome.storage.local.set(set);
      let aiNote = "";
      const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
      if (isObj(data.aiFilter2)) {
        await chrome.runtime.sendMessage({ type: "aif:sets", op: { op: "restoreAll", data: data.aiFilter2 } });
        aiNote = data.aiFilter2.learn ? " (new format, with learned words)" : " (new format)";
      } else if (isObj(data.aiFilterSettings)) {
        await chrome.runtime.sendMessage({ type: "aif:sets", op: { op: "restoreOld", settings: data.aiFilterSettings } });
        aiNote = " (older format: the AI list was converted to an imported list)";
      }
      const hasAi = isObj(data.aiFilter2) || isObj(data.aiFilterSettings);
      const ignored = Object.keys(data).filter((k) => k !== MARKER && !(k in SETTINGS) && !EXTRA.includes(k)).length;
      msg.textContent = `Imported ${Object.keys(set).length + remove.length + (hasAi ? 1 : 0)} settings${aiNote}` + (ignored ? `; ${ignored} not used by this extension were skipped.` : ".");
      setTimeout(() => location.reload(), 1200);
    });
    addPane("Backup", el(
      "div",
      { className: "backup" },
      el("p", { textContent: "Uses the same file format as ImprovedTube, so an ImprovedTube settings backup can be imported here. Settings this extension doesn't have are skipped." }),
      learnRow,
      exportBtn,
      importBtn,
      file,
      msg,
      diagnosticsBox()
    ));
  }
  function appPane() {
    const app = window.ygrtmApp;
    if (!app) return;
    const ITEMS = [
      ["shields", "Block ads and trackers (Shields)", "Network-level blocking with the uBlock Origin, EasyList and EasyPrivacy lists. Open YouTube windows reload when you change this."],
      ["skipAds", "Skip video ads", "Fast-forwards and mutes the ads that still get through, then clicks Skip."],
      ["skipSponsors", "Skip sponsor and self-promotion segments", "Uses the community SponsorBlock database; only a 4-character hash prefix of the video ID is sent."],
      ["hideShorts", "Hide YouTube Shorts", "Hides Shorts shelves, cards and the sidebar link; Shorts links open in the normal player."],
      ["hidePlayables", "Hide YouTube Playables", "Hides the games shelf, game cards and the Playables sidebar link."]
    ];
    const boxes = {};
    const rows = ITEMS.map(([key, label, help]) => {
      const box = el("input", { id: "app-" + key, type: "checkbox" });
      boxes[key] = box;
      box.addEventListener("change", () => {
        app.save({ [key]: box.checked }).then(flash);
      });
      return el("div", { className: "row" }, el("label", { htmlFor: box.id, title: help, textContent: label }), box);
    });
    const apply = (s) => {
      for (const [key, box] of Object.entries(boxes)) box.checked = !!s?.[key];
    };
    app.load().then(apply);
    app.subscribe(apply);
    addPane("App", el(
      "div",
      {},
      el("p", { textContent: "Options that belong to this desktop app, not to Focus. They apply to every YouTube window." }),
      ...rows
    ));
  }
  if (new URLSearchParams(location.search).has("popup")) document.documentElement.classList.add("popup");
  chrome.storage.local.get(Object.keys(SETTINGS)).then((stored) => {
    $("#version").textContent = "v" + chrome.runtime.getManifest().version;
    renderSettings(stored);
    framePane("AI Filter", "aifilter.html?embed", "aif:height");
    framePane("AI Lists", "aifilter.html?embed&view=lists", "aif:height");
    appPane();
    backupPane();
    let start = 0;
    try {
      start = Number(sessionStorage.getItem("tab")) || 0;
    } catch {
    }
    select(Math.min(start, panes.length - 1));
  });
})();
