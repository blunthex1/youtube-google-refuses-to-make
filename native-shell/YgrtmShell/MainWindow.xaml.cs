using System;
using System.IO;
using System.Windows;
using Microsoft.Web.WebView2.Core;

namespace YgrtmShell;

/// <summary>
/// Hosts youtube.com in WebView2 and injects the project's real content-script bundle
/// (the same core/ filter engine used by the browser extension) at document start.
///
/// This is an early scaffold: it ports the filter/ad-block content script and a minimal
/// localStorage-backed chrome.storage shim. Not yet ported: the Settings window, the
/// application menu (Shields toggle, quality picker, navigation shortcuts), sign-in
/// user-agent switching, resume-on-restart, and the Ghostery ad/tracker request blocker
/// (that one needs a WebResourceRequested-based port, a separate piece of work).
/// </summary>
public partial class MainWindow : Window
{
    private const string HomeUrl = "https://www.youtube.com/";

    public MainWindow()
    {
        InitializeComponent();
        Loaded += async (_, _) => await InitializeBrowserAsync();
    }

    private async System.Threading.Tasks.Task InitializeBrowserAsync()
    {
        var userDataFolder = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "YGRTM-native", "WebView2");
        Directory.CreateDirectory(userDataFolder);

        var env = await CoreWebView2Environment.CreateAsync(userDataFolder: userDataFolder);
        await Browser.EnsureCoreWebView2Async(env);

        var baseDir = AppContext.BaseDirectory;
        var contentJs = await File.ReadAllTextAsync(Path.Combine(baseDir, "Filter", "content.js"));
        var filterCss = await File.ReadAllTextAsync(Path.Combine(baseDir, "Filter", "filter.css"));

        // Minimal chrome.storage.local shim backed by WebView2's own persistent localStorage,
        // so the unmodified content script (built for a real browser extension) just works.
        // Settings therefore persist per the WebView2 profile folder above, same as before.
        string shim = $$"""
            (() => {
              if (window.chrome && window.chrome.storage) return;
              const KEY = '__ygrtm_settings__';
              const listeners = [];
              const readAll = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
              const writeAll = (obj) => localStorage.setItem(KEY, JSON.stringify(obj));
              window.chrome = window.chrome || {};
              window.chrome.storage = {
                local: {
                  get: (keys, cb) => {
                    const all = readAll();
                    let out;
                    if (keys == null) out = { ...all };
                    else {
                      const list = typeof keys === 'string' ? [keys] : Array.isArray(keys) ? keys : Object.keys(keys);
                      out = {};
                      for (const k of list) if (Object.hasOwn(all, k)) out[k] = all[k];
                    }
                    if (cb) cb(out); else return Promise.resolve(out);
                  },
                  set: (obj, cb) => {
                    const all = readAll();
                    for (const [k, v] of Object.entries(obj)) all[k] = v;
                    writeAll(all);
                    for (const l of listeners) l(obj, 'local');
                    if (cb) cb(); else return Promise.resolve();
                  },
                },
                onChanged: { addListener: (cb) => listeners.push((obj, area) => {
                  const changes = {};
                  for (const [k, v] of Object.entries(obj)) changes[k] = { newValue: v };
                  cb(changes, area);
                }) },
              };
              window.chrome.runtime = window.chrome.runtime || { id: 'ygrtm-native-shell' };
            })();
            """;

        string cssInjector = $$"""
            (() => {
              const style = document.createElement('style');
              style.textContent = {{System.Text.Json.JsonSerializer.Serialize(filterCss)}};
              (document.head || document.documentElement).appendChild(style);
            })();
            """;

        // Order matters: shim before the content script, same as a real extension's
        // injected APIs being present before any content_script runs.
        await Browser.CoreWebView2.AddScriptToExecuteOnDocumentCreatedAsync(shim);
        await Browser.CoreWebView2.AddScriptToExecuteOnDocumentCreatedAsync(cssInjector);
        await Browser.CoreWebView2.AddScriptToExecuteOnDocumentCreatedAsync(contentJs);

        Browser.CoreWebView2.Navigate(HomeUrl);
    }
}