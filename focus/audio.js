export function runAudio() {
  // src/audio/settings.js
  var PRESETS = {
    // DynamicsCompressor values: threshold/knee in dB, ratio, attack/release in seconds, makeup gain in dB.
    // Deliberately subtle after listening tests: each earlier scale was too aggressive, so the whole thing moved down
    // again and what used to be the gentlest setting is now Strong. For sheer loudness use Boost, not a higher
    // strength — strength is only about evening out the difference between loud and quiet.
    light: { threshold: -29, knee: 30, ratio: 1.8, attack: 0.012, release: 0.35, makeup: 1.5 },
    medium: { threshold: -32, knee: 30, ratio: 2.1, attack: 0.01, release: 0.3, makeup: 2.2 },
    strong: { threshold: -35, knee: 30, ratio: 2.5, attack: 0.01, release: 0.3, makeup: 3 }
  };
  function audioSettings(all) {
    const a = all && typeof all === "object" ? all : {};
    const strength = PRESETS[a.audio_strength] ? a.audio_strength : "medium";
    const boost = Math.max(-24, Math.min(24, Math.round(Number(a.audio_boost) || 0)));
    const autoMin = a.audio_auto_min == null ? -12 : Math.max(-24, Math.min(0, Math.round(Number(a.audio_auto_min) || 0)));
    const autoMax = a.audio_auto_max == null ? 18 : Math.max(0, Math.min(24, Math.round(Number(a.audio_auto_max) || 0)));
    return { enabled: a.audio_leveler === true, strength, boost, autoVolume: a.audio_auto_volume === true, autoMin, autoMax };
  }

  // src/audio/engine.js
  var settings = audioSettings(null);
  var ctx = null;
  var userGestured = false;
  var hooked = /* @__PURE__ */ new WeakMap();
  var active = /* @__PURE__ */ new Set();
  var db = (x) => 20 * Math.log10(Math.max(x, 1e-9));
  var fromDb = (d) => Math.pow(10, d / 20);
  var DEBUG = (() => {
    try {
      return localStorage.getItem("ity-audio-debug") === "1";
    } catch {
      return false;
    }
  })();
  function context() {
    if (!ctx) {
      ctx = new AudioContext();
      ctx.addEventListener("statechange", () => {
        if (ctx.state === "suspended" && userGestured) ctx.resume().catch(() => {
        });
      });
    }
    return ctx;
  }
  var audioAllowed = () => userGestured || !!navigator.userActivation?.hasBeenActive;
  async function ready() {
    if (!audioAllowed()) return ctx != null && ctx.state === "running";
    const c = context();
    if (c.state !== "running") {
      try {
        await c.resume();
      } catch {
      }
    }
    return c.state === "running";
  }
  function build(video) {
    const c = ctx;
    const source = c.createMediaElementSource(video);
    const compressor = c.createDynamicsCompressor();
    const makeup = c.createGain();
    const auto = c.createGain();
    const boost = c.createGain();
    const limiter = c.createDynamicsCompressor();
    limiter.threshold.value = -6;
    limiter.knee.value = 4;
    limiter.ratio.value = 20;
    limiter.attack.value = 1e-3;
    limiter.release.value = 0.1;
    const clip = c.createWaveShaper();
    const curve = new Float32Array(4097), CEIL = 0.89, KNEE = 0.4;
    for (let i = 0; i < curve.length; i++) {
      const x = i / 2048 - 1, a = Math.abs(x);
      curve[i] = Math.sign(x) * (a <= KNEE ? a : KNEE + (CEIL - KNEE) * Math.tanh((a - KNEE) / (CEIL - KNEE)));
    }
    clip.curve = curve;
    clip.oversample = "4x";
    const meter = c.createAnalyser();
    meter.fftSize = 2048;
    const out = c.createAnalyser();
    out.fftSize = 2048;
    const nodes = { source, compressor, makeup, auto, boost, limiter, clip, meter, out, loud: null, hist: [], autoDb: 0, since: performance.now() };
    const fresh = () => {
      nodes.loud = null;
      nodes.hist = [];
      nodes.autoDb = 0;
      nodes.since = performance.now();
      nodes.auto.gain.setTargetAtTime(1, c.currentTime, 0.05);
    };
    video.addEventListener("loadstart", fresh);
    video.addEventListener("emptied", fresh);
    hooked.set(video, nodes);
    active.add(video);
    ensureLoop();
    video.dataset.ityHooked = "1";
    wire(nodes);
    return nodes;
  }
  function anyActive() {
    return settings.enabled || settings.autoVolume || settings.boost !== 0;
  }
  function wire(n) {
    for (const k of ["source", "compressor", "makeup", "auto", "boost", "limiter", "clip"]) {
      try {
        n[k].disconnect();
      } catch {
      }
    }
    if (!anyActive()) {
      n.source.connect(ctx.destination);
      n.source.connect(n.out);
      return;
    }
    let head = n.source;
    if (settings.enabled) {
      const p = PRESETS[settings.strength];
      n.compressor.threshold.value = p.threshold;
      n.compressor.knee.value = p.knee;
      n.compressor.ratio.value = p.ratio;
      n.compressor.attack.value = p.attack;
      n.compressor.release.value = p.release;
      n.makeup.gain.value = fromDb(p.makeup);
      n.source.connect(n.compressor);
      n.compressor.connect(n.makeup);
      head = n.makeup;
    }
    head.connect(n.meter);
    head.connect(n.auto);
    if (!settings.autoVolume) {
      n.auto.gain.setTargetAtTime(1, ctx.currentTime, 0.3);
      n.autoDb = 0;
      n.loud = null;
      n.hist = [];
    } else if (n.autoDb > settings.autoMax || n.autoDb < settings.autoMin) {
      n.autoDb = Math.max(settings.autoMin, Math.min(settings.autoMax, n.autoDb));
      n.auto.gain.setTargetAtTime(fromDb(n.autoDb), ctx.currentTime, 0.1);
    }
    n.boost.gain.setTargetAtTime(fromDb(settings.boost), ctx.currentTime, 0.05);
    n.auto.connect(n.boost);
    n.boost.connect(n.limiter);
    n.limiter.connect(n.clip);
    n.clip.connect(n.out);
    n.clip.connect(ctx.destination);
  }
  var TARGET = -20;
  var buf = new Float32Array(2048);
  function rms(an) {
    an.getFloatTimeDomainData(buf);
    let s = 0;
    for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i];
    return Math.sqrt(s / buf.length);
  }
  var loop = null;
  function ensureLoop() {
    const needed = active.size > 0 && (settings.autoVolume || DEBUG);
    if (needed && !loop) loop = setInterval(tick, 250);
    else if (!needed && loop) {
      clearInterval(loop);
      loop = null;
    }
  }
  function tick() {
    for (const v of active) {
      if (!v.isConnected) {
        active.delete(v);
        continue;
      }
      const n = hooked.get(v);
      if (settings.autoVolume && !v.paused && !v.muted && v.volume > 1e-3) {
        const level = db(rms(n.meter)) - db(v.volume);
        if (level > -55) {
          n.hist.push(level);
          if (n.hist.length > 32) n.hist.shift();
          const sorted = [...n.hist].sort((a, b) => a - b);
          n.loud = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.8))];
          const fresh = performance.now() - n.since < 4e3;
          const want = Math.max(settings.autoMin, Math.min(settings.autoMax, TARGET - n.loud));
          const step = fresh ? 3 : want < n.autoDb ? 1 : 0.375;
          n.autoDb += Math.max(-step, Math.min(step, want - n.autoDb));
          n.auto.gain.setTargetAtTime(fromDb(n.autoDb), ctx.currentTime, fresh ? 0.08 : 0.2);
        }
      }
      if (DEBUG) {
        const r = document.documentElement;
        r.dataset.ityOut = db(rms(n.out)).toFixed(1);
        r.dataset.ityAuto = n.autoDb.toFixed(1);
        r.dataset.ityLoud = n.loud === null ? "" : n.loud.toFixed(1);
        r.dataset.ityRaw = db(rms(n.meter)).toFixed(1);
        r.dataset.ityVol = v.volume.toFixed(2);
        let pk = 0;
        for (let i = 0; i < buf.length; i++) pk = Math.max(pk, Math.abs(buf[i]));
        r.dataset.ityPeak = db(pk).toFixed(1);
        r.dataset.ityState = anyActive() ? "on" : "bypass";
        r.dataset.ityCtx = ctx.state;
      }
    }
    if (!active.size) ensureLoop();
  }
  async function hookAll() {
    if (!anyActive()) return;
    const videos = [...document.querySelectorAll("video")].filter((v) => !hooked.has(v) && !v.dataset.ityHooked);
    if (!videos.length || !await ready()) return;
    for (const v of videos) {
      try {
        build(v);
      } catch (e) {
        v.dataset.ityHooked = "1";
        if (DEBUG) console.warn("[Focus audio] could not hook a video:", e && e.name, e && e.message);
      }
    }
  }
  document.addEventListener("play", () => hookAll(), true);
  for (const ev of ["pointerdown", "keydown", "touchend"]) addEventListener(ev, () => {
    userGestured = true;
    hookAll();
  }, true);
  var AUDIO_KEYS = ["audio_leveler", "audio_strength", "audio_auto_volume", "audio_boost", "audio_auto_min", "audio_auto_max"];
  chrome.storage.local.get(AUDIO_KEYS).then((all) => {
    settings = audioSettings(all);
    hookAll();
  });
  chrome.storage.onChanged.addListener((ch, area) => {
    if (area !== "local" || !Object.keys(ch).some((k) => k.startsWith("audio_"))) return;
    chrome.storage.local.get(AUDIO_KEYS).then((all) => {
      settings = audioSettings(all);
      for (const v of active) {
        const n = hooked.get(v);
        if (n) wire(n);
      }
      ensureLoop();
      hookAll();
    });
  });
}
