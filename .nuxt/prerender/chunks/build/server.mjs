import { unref, inject, hasInjectionContext, getCurrentInstance, version, createApp, provide, toRef, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, shallowReactive, reactive, effectScope, computed, defineComponent, h, isReadonly, isRef, isShallow, isReactive, toRaw, defineAsyncComponent, mergeProps, ref, getCurrentScope, useSSRContext } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/vue/index.mjs';
import { $fetch } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/ofetch/dist/node.mjs';
import { b as baseURL } from '../_/renderer.mjs';
import { createHooks } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/hookable/dist/index.mjs';
import { getContext } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/unctx/dist/index.mjs';
import { sanitizeStatusCode, createError as createError$1 } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/h3/dist/index.mjs';
import { hasProtocol, isScriptProtocol, joinURL, withQuery, isEqual, stringifyParsedURL, stringifyQuery, parseQuery } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/ufo/dist/index.mjs';
import { getActiveHead, CapoPlugin } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/@unhead/shared/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/radix3/dist/index.mjs';
import { defu } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/defu/dist/defu.mjs';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttr } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/vue/server-renderer/index.mjs';
import TurndownService from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/turndown/lib/turndown.cjs.js';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/devalue/index.js';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/@unhead/ssr/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/unenv/runtime/fetch/index.mjs';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/scule/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/unstorage/drivers/fs-lite.mjs';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.15.4";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.push(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin);
  }
  for (const plugin of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "prerender" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  manifest_45route_45rule
];
function getRouteFromPath(fullPath) {
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = new URL(fullPath.toString(), "http://localhost");
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: fullPath
  };
}
const router_CaKIoANnI2 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      "error": []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false) ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const currentRoute = computed(() => route);
    const router = {
      currentRoute,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => (void 0).history.go(-1),
      go: (delta) => (void 0).history.go(delta),
      forward: () => (void 0).history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", defineComponent({
      functional: true,
      props: {
        to: {
          type: String,
          required: true
        },
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    }));
    nuxtApp._route = route;
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const initialLayout = nuxtApp.payload.state._layout;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        var _a;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          {
            const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
            if (routeRules.appMiddleware) {
              for (const key in routeRules.appMiddleware) {
                const guard = nuxtApp._middleware.named[key];
                if (!guard) {
                  return;
                }
                if (routeRules.appMiddleware[key]) {
                  middlewareEntries.add(guard);
                } else {
                  middlewareEntries.delete(guard);
                }
              }
            }
          }
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`,
                  data: {
                    path: initialURL
                  }
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_KgADcZ0jPj,
  router_CaKIoANnI2,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY
];
const progressPercentage = 30;
const currentPhase = "Recherche";
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const messageText = ref("");
    const messages = ref([]);
    const synthesis = ref("");
    const isAnalyzing = ref(false);
    ref(null);
    const parsedSynthesis = computed(() => {
      var _a;
      if (!synthesis.value) return null;
      try {
        const jsonStr = (_a = synthesis.value.match(/\{[\s\S]*\}/)) == null ? void 0 : _a[0];
        if (!jsonStr) return null;
        return JSON.parse(jsonStr);
      } catch (err) {
        console.error("JSON parse error:", err);
        return null;
      }
    });
    ref(null);
    const showOptions = ref(false);
    const currentView = ref("chat");
    const currentDiagTab = ref("progress");
    new TurndownService();
    const diagTabs = [
      { id: "progress", name: "Avancement" },
      { id: "synthesis", name: "Synthèse" },
      { id: "strengths", name: "Forces & Risques" },
      { id: "method", name: "Méthode" },
      { id: "graph", name: "Graphe" }
    ];
    const projectPhases = [
      { name: "Vision" },
      { name: "Recherche" },
      { name: "Conception" },
      { name: "Test" },
      { name: "Lancement" }
    ];
    const defaultQuickActions = [
      "Évalue mon projet",
      "J'ai une question précise",
      "Aide moi à avancer",
      "Dis m'en plus sur CoachApp"
    ];
    const projectQuickActions = [
      "Télécharger une présentation",
      "Pose moi des questions plus précises"
    ];
    const diagQuickActions = [
      "Segmenter les clients",
      "Affiner le besoin",
      "Je ne suis pas d'accord"
    ];
    const currentQuickActions = computed(() => {
      if (currentView.value === "diag") {
        return diagQuickActions;
      }
      const lastBotMessage = [...messages.value].reverse().find((m) => m.type === "bot" && !m.loading);
      if ((lastBotMessage == null ? void 0 : lastBotMessage.text) === "Pour que j'évalue ton projet, présente-le moi (tu peux uploader une présentation)") {
        return projectQuickActions;
      }
      return defaultQuickActions;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-container" }, _attrs))}><div class="app-wrapper"><header class="app-header"><h1 class="app-title">${ssrInterpolate(currentView.value === "diag" ? "Diagnostic" : "CoachApp")}</h1>`);
      if (currentView.value !== "diag") {
        _push(`<p class="app-subtitle"> Ton assistant IA de création d&#39;entreprise </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      if (currentView.value === "diag") {
        _push(`<nav class="secondary-nav"><!--[-->`);
        ssrRenderList(diagTabs, (tab) => {
          _push(`<button class="${ssrRenderClass(["secondary-nav-item", { active: currentDiagTab.value === tab.id }])}">${ssrInterpolate(tab.name)}</button>`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="app-main">`);
      if (currentView.value === "chat") {
        _push(`<div class="chat-view"><p class="help-text"> En quoi puis-je t&#39;aider ? </p><div class="chat-messages"><!--[-->`);
        ssrRenderList(messages.value, (message, index) => {
          _push(`<div class="${ssrRenderClass(message.type === "user" ? "user-message" : "bot-message")}">`);
          if (message.type === "bot" && message.loading) {
            _push(`<div class="loading-dots"><span></span><span></span><span></span></div>`);
          } else {
            _push(`<!--[-->${ssrInterpolate(message.text)}<!--]-->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (currentView.value === "diag") {
        _push(`<div class="diag-view">`);
        if (currentDiagTab.value === "progress") {
          _push(`<div class="subtab-container"><section class="sub-tab"><h2 class="section-title">📈 Avancement</h2>`);
          if (currentDiagTab.value === "progress") {
            _push(`<div class="project-phases"><!--[-->`);
            ssrRenderList(projectPhases, (phase, index) => {
              _push(`<div class="phase-item"><span class="${ssrRenderClass([{ active: index === 1 }, "phase-name"])}">${ssrInterpolate(phase.name)}</span></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="progress-percentage">${ssrInterpolate(progressPercentage)}%</p><p> Tu es à ${ssrInterpolate(progressPercentage)}% de la phase ${ssrInterpolate(currentPhase)}. </p><p> L&#39;objectif de cette phase est de comprendre suffisamment le marché et les clients pour commencer la phase suivante de conception </p><h3 class="section-title mt-8">🎯 Par domaine</h3><div class="domains-grid"><div class="domain-item"><div class="domain-header"><h4>Segmentation client</h4><div class="domain-progress"><div class="progress-bar"><div class="progress-fill" style="${ssrRenderStyle({ "width": "60%" })}"></div></div><span class="progress-text">60%</span></div></div></div><div class="domain-item"><div class="domain-header"><h4>Compréhension besoin</h4><div class="domain-progress"><div class="progress-bar"><div class="progress-fill" style="${ssrRenderStyle({ "width": "30%" })}"></div></div><span class="progress-text">30%</span></div></div></div><div class="domain-item"><div class="domain-header"><h4>Etude concurrence</h4><div class="domain-progress"><div class="progress-bar"><div class="progress-fill" style="${ssrRenderStyle({ "width": "30%" })}"></div></div><span class="progress-text">20%</span></div></div><div class="domain-header"><h4>Faisabilité économique</h4><div class="domain-progress"><div class="progress-bar"><div class="progress-fill" style="${ssrRenderStyle({ "width": "30%" })}"></div></div><span class="progress-text">10%</span></div></div></div></div></section></div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentDiagTab.value === "synthesis") {
          _push(`<div class="subtab-container"><section class="sub-tab"><h2 class="section-title">🎤 Pitch</h2><p class="pitch-text"> Recupack est une plateforme permettant aux restaurants traiteurs et aux clients livrés de faciliter la récupération des emballages consignés grâce à la mutualisation entre restaurants et livreurs par QRcode </p><button class="action-button"> Voir la synthèse </button></section><section class="sub-tab"><h2 class="section-title">📝 Synthèse</h2>`);
          if (!synthesis.value) {
            _push(`<div class="pitch-text"> Aucun document analysé pour le moment. </div>`);
          } else {
            _push(`<div class="synthesis-content">`);
            if (parsedSynthesis.value) {
              _push(`<div class="synthesis-section"><h3 class="synthesis-subtitle">🎯 ${ssrInterpolate(parsedSynthesis.value.business_model.name)}</h3><p class="synthesis-description">${ssrInterpolate(parsedSynthesis.value.business_model.description)}</p><div class="mt-4"><h4 class="synthesis-label">👥 Acteurs clés</h4><ul class="synthesis-list"><!--[-->`);
              ssrRenderList(parsedSynthesis.value.business_model.actors, (actor) => {
                _push(`<li><strong>${ssrInterpolate(actor.role)}:</strong> ${ssrInterpolate(actor.contribution)}</li>`);
              });
              _push(`<!--]--></ul></div><div class="mt-4"><h4 class="synthesis-label">💫 Flux de valeur</h4><!--[-->`);
              ssrRenderList(parsedSynthesis.value.business_model.value_flows, (flow, actor) => {
                _push(`<div class="value-flow"><h5 class="actor-name">${ssrInterpolate(actor)}</h5><div class="flow-details"><!--[-->`);
                ssrRenderList(flow.items, (item) => {
                  _push(`<div class="flow-item">${ssrInterpolate(item.value)}</div>`);
                });
                _push(`<!--]--><div class="flow-metrics"><span class="completion">Avancement: ${ssrInterpolate(flow["phase-completion"])}%</span><span class="risk">Risque: ${ssrInterpolate(flow["risk-level"])}/5</span></div><div class="flow-analysis">`);
                if (flow.strength) {
                  _push(`<p class="strength">✅ ${ssrInterpolate(flow.strength)}</p>`);
                } else {
                  _push(`<!---->`);
                }
                if (flow.warning) {
                  _push(`<p class="warning">⚠️ ${ssrInterpolate(flow.warning)}</p>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div></div></div>`);
              });
              _push(`<!--]--></div><div class="mt-4"><h4 class="synthesis-label">🎯 Problématiques</h4><!--[-->`);
              ssrRenderList(parsedSynthesis.value.business_model.problem, (problem, actor) => {
                _push(`<div class="problem-section"><h5 class="actor-name">${ssrInterpolate(actor)}</h5><ul class="synthesis-list"><!--[-->`);
                ssrRenderList(problem.items, (item) => {
                  _push(`<li>${ssrInterpolate(item)}</li>`);
                });
                _push(`<!--]--></ul><div class="problem-metrics"><span class="completion">Validation: ${ssrInterpolate(problem["phase-completion"])}%</span><span class="risk">Criticité: ${ssrInterpolate(problem["risk-level"])}/5</span></div></div>`);
              });
              _push(`<!--]--></div></div>`);
            } else {
              _push(`<div class="pitch-text">${ssrInterpolate(synthesis.value)}</div>`);
            }
            _push(`</div>`);
          }
          _push(`<div class="flex justify-center gap-4"><button class="action-button"${ssrIncludeBooleanAttr(isAnalyzing.value || !synthesis.value) ? " disabled" : ""}>`);
          if (isAnalyzing.value) {
            _push(`<span>Analyse en cours...</span>`);
          } else {
            _push(`<span>Relancer l&#39;analyse</span>`);
          }
          _push(`</button></div></section><section class="sub-tab"><h2 class="section-title">🔍 A clarifier</h2><p>Modèle économique, prospects principaux, bénéfice pour les livreurs,... ?</p><button class="action-button"> Préciser </button></section></div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentDiagTab.value === "strengths") {
          _push(`<div class="subtab-container"><section class="sub-tab"><h2 class="section-title">⚖️ Forces &amp; Risques</h2><div class="two-col"><div class="strengths"><h3>✅ Forces</h3><ul><li>Marché porteur</li><li>Besoin réel</li><li>Avantage concurrentiel</li></ul></div><div class="risks"><h3>⚠️ Risques</h3><ul><li>Dépendance à un acteur clé</li><li>Difficulté d&#39;acquisition</li><li>Problème d&#39;échelle</li></ul></div></div><button class="action-button"> En savoir plus </button></section></div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentDiagTab.value === "method") {
          _push(`<div class="subtab-container"><section class="sub-tab"><h2 class="section-title">🪛 Méthode</h2><div class="two-col"><p> 👏 Bravo, tu as déjà formalisé une présentation, et réfléchis sur une solution possible. </p><p> ⚠️ Attention : Tu travailles trop sur la solution. Arrête-toi là et valide d&#39;abord les besoins des clients. </p></div><button class="action-button"> En savoir plus </button></section></div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentDiagTab.value === "graph") {
          _push(`<div class="subtab-container"><section class="sub-tab"><h2 class="section-title">📊 Graphe</h2><p>Visualisation du projet en cours de développement...</p><button class="action-button"> Voir le détail </button></section></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main><nav class="nav-menu"><button class="nav-item"><svg class="nav-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path></svg><span>Plus</span></button><button class="nav-item"><svg class="nav-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"></path></svg><span>Diagnostic</span></button><button class="nav-item"><svg class="nav-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12,8A3,3 0 0,0 15,5A3,3 0 0,0 12,2A3,3 0 0,0 9,5A3,3 0 0,0 12,8M12,11.54C9.64,9.35 6.5,8 3,8V19C6.5,19 9.64,20.35 12,22.54C14.36,20.35 17.5,19 21,19V8C17.5,8 14.36,9.35 12,11.54Z"></path></svg><span>Ressources</span></button><button class="nav-item"><svg class="nav-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"></path></svg><span>Communauté</span></button><button class="nav-item"><svg class="nav-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path></svg><span>Actions</span></button><button class="nav-item chat-button"><svg class="nav-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18"></path></svg><span>Chat</span></button></nav>`);
      if (showOptions.value) {
        _push(`<div class="menu-options"><button class="menu-item">Mon compte</button><button class="menu-item">Paramètres</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<footer class="app-footer"><div class="quick-actions"><!--[-->`);
      ssrRenderList(currentQuickActions.value, (action) => {
        _push(`<button class="secondary-button">${ssrInterpolate(action)}</button>`);
      });
      _push(`<!--]--></div>`);
      if (currentView.value === "chat") {
        _push(`<div class="input-container"><input type="file" class="hidden"><button class="icon-button"><svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"></path></svg></button><input${ssrRenderAttr("value", messageText.value)} type="text" placeholder="Écris ou parle..." class="message-input"><button class="icon-button"><svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"></path></svg></button><button class="icon-button"><svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-BaEiiuXO.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-mOlxh9ml.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { useNuxtApp as a, useRuntimeConfig as b, nuxtLinkDefaults as c, resolveUnrefHeadInput as d, entry$1 as default, injectHead as i, navigateTo as n, resolveRouteObject as r, useRouter as u };
//# sourceMappingURL=server.mjs.map
