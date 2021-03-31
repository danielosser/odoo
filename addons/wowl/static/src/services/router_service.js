/** @odoo-module **/

import { browser } from "../core/browser";
import { serviceRegistry } from "../webclient/service_registry";
import { shallowEqual } from "../utils/objects";
import { objectToUrlEncodedString } from "../utils/urls";

function parseString(str) {
  const parts = str.split("&");
  const result = {};
  for (let part of parts) {
    const [key, value] = part.split("=");
    result[key] = decodeURIComponent(value || "");
  }
  return result;
}

function sanitizeHash(hash) {
  return Object.fromEntries(Object.entries(hash).filter(([_, v]) => v !== undefined));
}

export function parseHash(hash) {
  return hash === "#" || hash === "" ? {} : parseString(hash.slice(1));
}

export function parseSearchQuery(search) {
  return search === "" ? {} : parseString(search.slice(1));
}

export function routeToUrl(route) {
  const search = objectToUrlEncodedString(route.search);
  const hash = objectToUrlEncodedString(route.hash);
  return route.pathname + (search ? "?" + search : "") + (hash ? "#" + hash : "");
}

export function redirect(env, url, wait) {
  const load = () => browser.location.assign(url);
  if (wait) {
    const wait_server = function () {
      env.services
        .rpc("/web/webclient/version_info", {})
        .then(load)
        .catch(() => browser.setTimeout(wait_server, 250));
    };
    browser.setTimeout(wait_server, 1000);
  } else {
    load();
  }
}

function getRoute() {
  const { pathname, search, hash } = window.location;
  const searchQuery = parseSearchQuery(search);
  const hashQuery = parseHash(hash);
  return { pathname, search: searchQuery, hash: hashQuery };
}

/**
 * @param {function} getCurrent function that returns the current route
 * @returns {function} function to compute the next hash
 */
function applyLocking(lockedKeys, hash, currentRoute) {
  const newHash = {};
  Object.keys(hash).forEach((key) => {
    if (lockedKeys.has(key)) {
      return;
    }
    const k = key.split(" ");
    let value;
    if (k.length === 2) {
      value = hash[key];
      key = k[1];
      if (k[0] === "lock") {
        lockedKeys.add(key);
      } else if (k[0] === "unlock") {
        lockedKeys.delete(key);
      } else {
        return;
      }
    }
    newHash[key] = value || hash[key];
  });

  Object.keys(currentRoute.hash).forEach((key) => {
    if (lockedKeys.has(key) && !(key in newHash)) {
      newHash[key] = currentRoute.hash[key];
    }
  });
  return newHash;
}

function routerSkeleton(env, privateBus, getRoute, historyObj) {
  let bus = env.bus;
  let current = getRoute();
  const lockedKeys = new Set();

  privateBus.on('hashchange', null, () => {
    current = getRoute();
    bus.trigger('ROUTE_CHANGE');
  });

  function accumulatePushs(acc={}, hash, replace) {
    hash = applyLocking(lockedKeys, hash, current);
    replace = acc.replace || replace;
    hash = Object.assign(acc.hash || {}, hash);
    return { hash, replace };
  }

  function computeNewRoute(hash, replace, currentRoute) {
    hash = sanitizeHash(hash);
    if (!replace) {
      hash = Object.assign({}, currentRoute.hash, hash);
    }
    const newRoute = Object.assign({}, currentRoute, { hash });
    if (!shallowEqual(newRoute.hash, currentRoute.hash)) {
      return newRoute;
    }
    return false;
  }

  return {
    pushState: accumulatingFunctionTimeout(accumulatePushs, (acc) => {
      const newRoute = computeNewRoute(acc.hash, acc.replace, current);
      if (newRoute) {
        const url = routeToUrl(newRoute);
        historyObj.pushState({}, url, url);
      }
      current  = getRoute();
    }),
    replaceState: accumulatingFunctionTimeout(accumulatePushs, (acc) => {
      const newRoute = computeNewRoute(acc.hash, acc.replace, current);
      if (newRoute) {
        const url = routeToUrl(newRoute);
        historyObj.replaceState({}, url, url);
      }
      current  = getRoute();
    }),
    get current() {
      return current;
    },
    redirect: (url, wait) => redirect(env, url, wait),
  };
}

function accumulatingFunctionTimeout(accumulate, execute) {
  let timeoutId;
  let acc = undefined;
  return (...args) => {
    clearTimeout(timeoutId);
    acc = accumulate(acc, ...args);
    timeoutId = setTimeout(() => {
      execute(acc);
      acc = undefined;
      timeoutId = undefined;
    });
  };
}

export const routerService = {
  deploy(env) {
    const privateBus = new owl.core.EventBus();
    window.addEventListener("hashchange", () => privateBus.trigger("hashchange"));
    return routerSkeleton(env, privateBus, getRoute, window.history);
  },
};

export function objectToQuery(obj) {
  const query = {};
  Object.entries(obj).forEach(([k, v]) => {
    query[k] = v ? `${v}` : v;
  });
  return query;
}

serviceRegistry.add("router", routerService);
