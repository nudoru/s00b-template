// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/nudoru/util/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.centerElementInViewPort = exports.querySelectorAllAsArray = exports.computeWindowScale = exports.applyCSS = exports.toggleClass = exports.removeClass = exports.addClass = exports.hasClass = exports.closest = exports.wrapElement = exports.HTMLStrToNode = exports.escapeHTML = exports.replaceElementWith = exports.replaceElement = exports.appendElement = exports.removeElement = exports.removeAllElements = exports.offset = exports.position = exports.isDomObj = exports.isElementInViewport = exports.isElementEntirelyInViewport = exports.pxToInt = exports.getElStyle = exports.$$ = exports.$ = void 0;

var _this = void 0;

// TODO REFACTOR memoize replaced with memoizeWith
//import {curry, memoize} from 'ramda';
//export const getElStyleProp = memoize(curry((el, prop) => getElStyle(el).getPropertyValue(prop)));
var $ = function $(selector, context) {
  return (context || document).querySelector(selector);
};

exports.$ = $;

var $$ = function $$(selector, context) {
  return (context || document).querySelectorAll(selector);
};

exports.$$ = $$;

var getElStyle = function getElStyle(el) {
  return window.getComputedStyle(el);
}; // converts a style value from '##px' to '##'


exports.getElStyle = getElStyle;

var pxToInt = function pxToInt(str) {
  return parseInt(str.substr(0, str.length - 2));
}; // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
// element must be entirely on screen


exports.pxToInt = pxToInt;

var isElementEntirelyInViewport = function isElementEntirelyInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}; // element may be partially on screen


exports.isElementEntirelyInViewport = isElementEntirelyInViewport;

var isElementInViewport = function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
};

exports.isElementInViewport = isElementInViewport;

var isDomObj = function isDomObj(obj) {
  return !!(obj.nodeType || obj === window);
};

exports.isDomObj = isDomObj;

var position = function position(el) {
  return {
    left: el.offsetLeft,
    top: el.offsetTop
  };
}; // from http://jsperf.com/jquery-offset-vs-offsetparent-loop


exports.position = position;

var offset = function offset(el) {
  var ol = 0,
      ot = 0;

  if (el.offsetParent) {
    do {
      ol += el.offsetLeft;
      ot += el.offsetTop;
      el = el.offsetParent;
    } while (el); // jshint ignore:line

  }

  return {
    left: ol,
    top: ot
  };
};

exports.offset = offset;

var removeAllElements = function removeAllElements(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

exports.removeAllElements = removeAllElements;

var removeElement = function removeElement(el) {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
};

exports.removeElement = removeElement;

var appendElement = function appendElement(root, el) {
  var parent = isDomObj(root) ? root : document.querySelector(root);

  if (parent) {
    parent.appendChild(el);
  } else {
    console.warn('Can\'t append element, selector not found: ', root);
  }
};

exports.appendElement = appendElement;

var replaceElement = function replaceElement(root, el) {
  if (el.parentElement) {
    var parent = isDomObj(root) ? root : document.querySelector(root),
        nextSibling = el.nextSibling;

    if (parent) {
      parent.removeChild(el);
      parent.insertBefore(el, nextSibling);
    } else {
      console.warn('Can\'t append element, selector not found: ', root);
    }
  } else {
    appendElement(el, root);
  }

  return el;
};

exports.replaceElement = replaceElement;

var replaceElementWith = function replaceElementWith(oldEl, newEl, parentEl) {
  var parent = parentEl || oldEl.parentElement;

  if (parent) {
    var nextSibling = oldEl.nextSibling;
    parent.removeChild(oldEl);
    parent.insertBefore(newEl, nextSibling);
    return newEl;
  }

  console.warn('Can\'t replace element, no parent found', parent);
  return false;
};

exports.replaceElementWith = replaceElementWith;

var escapeHTML = function escapeHTML(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}; //https://davidwalsh.name/convert-html-stings-dom-nodes


exports.escapeHTML = escapeHTML;

var HTMLStrToNode = function HTMLStrToNode(str) {
  return document.createRange().createContextualFragment(str);
};

exports.HTMLStrToNode = HTMLStrToNode;

var wrapElement = function wrapElement(wrapperStr, el) {
  var wrapperEl = HTMLStrToNode(wrapperStr),
      elParent = el.parentNode;
  wrapperEl.appendChild(el);
  elParent.appendChild(wrapperEl);
  return wrapperEl;
}; // http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom


exports.wrapElement = wrapElement;

var closest = function closest(root, el) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.bind(el)(root)) {
      return el;
    } else {
      el = el.parentElement;
    }
  }

  return false;
}; // from youmightnotneedjquery.com


exports.closest = closest;

var hasClass = function hasClass(className, el) {
  if (el.classList) {
    el.classList.contains(className);
  } else {
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

exports.hasClass = hasClass;

var addClass = function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
};

exports.addClass = addClass;

var removeClass = function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

exports.removeClass = removeClass;

var toggleClass = function toggleClass(el, className) {
  if (_this.hasClass(el, className)) {
    _this.removeClass(el, className);
  } else {
    _this.addClass(el, className);
  }
}; // From impress.js


exports.toggleClass = toggleClass;

var applyCSS = function applyCSS(el, props) {
  var key;

  for (key in props) {
    if (props.hasOwnProperty(key)) {
      el.style[key] = props[key];
    }
  }

  return el;
}; // from impress.js
// `computeWindowScale` counts the scale factor between window size and size
// defined for the presentation in the config.


exports.applyCSS = applyCSS;

var computeWindowScale = function computeWindowScale(config) {
  var hScale = window.innerHeight / config.height,
      wScale = window.innerWidth / config.width,
      scale = hScale > wScale ? wScale : hScale;

  if (config.maxScale && scale > config.maxScale) {
    scale = config.maxScale;
  }

  if (config.minScale && scale < config.minScale) {
    scale = config.minScale;
  }

  return scale;
};
/**
 * Get an array of elements in the container returned as Array instead of a Node list
 */


exports.computeWindowScale = computeWindowScale;

var querySelectorAllAsArray = function querySelectorAllAsArray(el, cls) {
  return Array.prototype.slice.call(el.querySelectorAll(cls), 0);
};

exports.querySelectorAllAsArray = querySelectorAllAsArray;

var centerElementInViewPort = function centerElementInViewPort(el) {
  var vpH = window.innerHeight,
      vpW = window.innerWidth,
      elR = el.getBoundingClientRect(),
      elH = elR.height,
      elW = elR.width;
  el.style.left = vpW / 2 - elW / 2 + 'px';
  el.style.top = vpH / 2 - elH / 2 + 'px';
};

exports.centerElementInViewPort = centerElementInViewPort;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _dom = require("./nudoru/util/dom");

window.onload = function (_) {
  showJsApp();
  window.onload = null;
};

var showJsApp = function showJsApp(_) {
  (0, _dom.removeClass)((0, _dom.$)("#js-application"), 'hidden');
};
},{"./nudoru/util/dom":"js/nudoru/util/dom.js"}],"../../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56412" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map