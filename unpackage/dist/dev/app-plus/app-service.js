if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  var _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X;
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  function formatAppLog(type2, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type2, filename, ...args);
    } else {
      console[type2].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$I = {
    name: "UniCard",
    emits: ["click"],
    props: {
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      },
      padding: {
        type: String,
        default: "10px"
      },
      margin: {
        type: String,
        default: "15px"
      },
      spacing: {
        type: String,
        default: "0 10px"
      },
      extra: {
        type: String,
        default: ""
      },
      cover: {
        type: String,
        default: ""
      },
      thumbnail: {
        type: String,
        default: ""
      },
      isFull: {
        // 内容区域是否通栏
        type: Boolean,
        default: false
      },
      isShadow: {
        // 是否开启阴影
        type: Boolean,
        default: true
      },
      shadow: {
        type: String,
        default: "0px 0px 3px 1px rgba(0, 0, 0, 0.08)"
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClick(type2) {
        this.$emit("click", type2);
      }
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-card", { "uni-card--full": $props.isFull, "uni-card--shadow": $props.isShadow, "uni-card--border": $props.border }]),
        style: vue.normalizeStyle({ "margin": $props.isFull ? 0 : $props.margin, "padding": $props.spacing, "box-shadow": $props.isShadow ? $props.shadow : "" })
      },
      [
        vue.createCommentVNode(" 封面 "),
        vue.renderSlot(_ctx.$slots, "cover", {}, () => [
          $props.cover ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__cover"
          }, [
            vue.createElementVNode("image", {
              class: "uni-card__cover-image",
              mode: "widthFix",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick("cover")),
              src: $props.cover
            }, null, 8, ["src"])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          $props.title || $props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__header"
          }, [
            vue.createCommentVNode(" 卡片标题 "),
            vue.createElementVNode("view", {
              class: "uni-card__header-box",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.onClick("title"))
            }, [
              $props.thumbnail ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-card__header-avatar"
              }, [
                vue.createElementVNode("image", {
                  class: "uni-card__header-avatar-image",
                  src: $props.thumbnail,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "uni-card__header-content" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-card__header-content-title uni-ellipsis" },
                  vue.toDisplayString($props.title),
                  1
                  /* TEXT */
                ),
                $props.title && $props.subTitle ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-card__header-content-subtitle uni-ellipsis"
                  },
                  vue.toDisplayString($props.subTitle),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            vue.createElementVNode("view", {
              class: "uni-card__header-extra",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick("extra"))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-card__header-extra-text" },
                vue.toDisplayString($props.extra),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.createCommentVNode(" 卡片内容 "),
        vue.createElementVNode(
          "view",
          {
            class: "uni-card__content",
            style: vue.normalizeStyle({ padding: $props.padding }),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.onClick("content"))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", {
          class: "uni-card__actions",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.onClick("actions"))
        }, [
          vue.renderSlot(_ctx.$slots, "actions", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$a = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$z], ["__scopeId", "data-v-ae4bee67"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  const LOGIN_STATUS = "LOGIN_STATUS_TOKEN";
  const USER_INFO = "USER_INFO";
  let httpApi = "";
  const HEADER = {
    "content-type": "application/json",
    "Form-type": "app"
  };
  const HTTP_REQUEST_URL = httpApi;
  const TOKENNAME = "authorization";
  class Cache {
    constructor(handler) {
      this.cacheSetHandler = uni.setStorageSync;
      this.cacheGetHandler = uni.getStorageSync;
      this.cacheClearHandler = uni.removeStorageSync;
      this.cacheExpire = "UNI-APP-CRMEB:TAG";
      this.clearOverdue();
    }
    /**
     * 获取当前时间戳
     */
    time() {
      return Date.now();
    }
    /**
     * 字符串转时间戳
     * @param {Object} expiresTime
     */
    strTotime(expiresTime) {
      let expires_time = expiresTime.substring(0, 19);
      expires_time = expires_time.replace(/-/g, "/");
      return Math.round(new Date(expires_time).getTime() / 1e3);
    }
    /**
     * 设置过期时间缓存
     * @param {string} key - 缓存的键
     * @param {number} expire - 过期时间（绝对时间戳，单位为毫秒）
     */
    setExpireCaheTag(key, expire) {
      if (typeof expire === "number") {
        let tag = this.cacheGetHandler(this.cacheExpire), newTag = [], newKeys = [];
        if (typeof tag === "object" && Array.isArray(tag)) {
          newTag = tag.map((item) => {
            newKeys.push(item.key);
            if (item.key === key) {
              item.expire = expire;
            }
            return item;
          });
        }
        if (!newKeys.length || newKeys.indexOf(key) === -1) {
          newTag.push({
            key,
            expire
            // 直接设置为绝对时间戳
          });
        }
        this.cacheSetHandler(this.cacheExpire, newTag);
      }
    }
    /**
     * 缓存是否过期,过期自动删除
     * @param {Object} key
     * @param {Object} $bool true = 删除,false = 不删除
     */
    getExpireCahe(key, $bool) {
      try {
        let tag = this.cacheGetHandler(this.cacheExpire), time = 0, index2 = false;
        if (typeof tag === "object" && tag.length) {
          tag.map((item, i) => {
            if (item.key === key) {
              time = item.expire;
              index2 = i;
            }
          });
          if (time) {
            let newTime = parseInt(time);
            if (time && time < this.time() && !Number.isNaN(newTime)) {
              if ($bool === void 0 || $bool === true) {
                this.cacheClearHandler(key);
                if (index2 !== false) {
                  tag.splice(index2, 1);
                  this.cacheSetHandler(this.cacheExpire, tag);
                }
              }
              return false;
            } else
              return true;
          } else {
            return !!this.cacheGetHandler(key);
          }
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    /**
     * 设置缓存
     * @param {Object} key
     * @param {Object} data
     */
    set(key, data, expire) {
      if (data === void 0) {
        return true;
      }
      try {
        this.setExpireCaheTag(key, expire);
        return this.cacheSetHandler(key, data);
      } catch (e) {
        return false;
      }
    }
    /**
     * 检测缓存是否存在
     * @param {Object} key
     */
    has(checkwhethethecacheexists, isDel) {
      this.clearOverdue();
      return this.getExpireCahe(checkwhethethecacheexists, isDel);
    }
    /**
     * 获取缓存
     * @param {Object} key
     * @param {Object} $default
     * @param {Object} expire
     */
    get(key, $default, expire) {
      this.clearOverdue();
      try {
        let isBe = this.getExpireCahe(key);
        let data = this.cacheGetHandler(key);
        if (data && isBe) {
          if (typeof $default === "boolean")
            return JSON.parse(data);
          else
            return data;
        } else {
          if (typeof $default === "function") {
            let value2 = $default();
            this.set(key, value2, expire);
            return value2;
          } else {
            this.set(key, $default, expire);
            return $default;
          }
        }
      } catch (e) {
        return null;
      }
    }
    /**
     * 删除缓存
     * @param {Object} key
     */
    clear(key) {
      try {
        let cahceValue = this.cacheGetHandler(this.cacheExpire), index2 = false;
        if (cahceValue && typeof cahceValue === "object" && cahceValue.length) {
          cahceValue.map((item, i) => {
            if (item.key === key) {
              index2 = i;
            }
          });
          if (index2 !== false) {
            cahceValue.splice(index2, 1);
          }
          this.cacheSetHandler(this.cacheExpire, cahceValue);
        }
        return this.cacheClearHandler(key);
      } catch (e) {
        return false;
      }
    }
    /**
     * 清除过期缓存
     */
    clearOverdue() {
      let cahceValue = this.cacheGetHandler(this.cacheExpire), time = this.time(), newBeOverdueValue = [], newTagValue = [];
      if (cahceValue && typeof cahceValue === "object" && cahceValue.length) {
        cahceValue.map((item) => {
          if (item) {
            if (item.expire !== void 0 && item.expire > time || item.expire === 0) {
              newTagValue.push(item);
            } else {
              newBeOverdueValue.push(item.key);
            }
          }
        });
      }
      if (newTagValue.length !== cahceValue.length) {
        this.cacheSetHandler(this.cacheExpire, newTagValue);
      }
      newBeOverdueValue.forEach((k) => {
        this.cacheClearHandler(k);
      });
    }
  }
  const Cache$1 = new Cache();
  /*!
    * @intlify/shared v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const inBrowser = typeof window !== "undefined";
  let mark;
  let measure;
  {
    const perf = inBrowser && window.performance;
    if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
      mark = (tag) => perf.mark(tag);
      measure = (name, startTag, endTag) => {
        perf.measure(name, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
      };
    }
  }
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format$1(message, ...args) {
    if (args.length === 1 && isObject$1(args[0])) {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
      return args.hasOwnProperty(identifier) ? args[identifier] : "";
    });
  }
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber$1 = (val) => typeof val === "number" && isFinite(val);
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const assign = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn$1(obj, key) {
    return hasOwnProperty$1.call(obj, key);
  }
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isBoolean$1 = (val) => typeof val === "boolean";
  const isObject$1 = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const objectToString = Object.prototype.toString;
  const toTypeString = (value2) => objectToString.call(value2);
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString = (val) => {
    return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function createEmitter() {
    const events = /* @__PURE__ */ new Map();
    const emitter = {
      events,
      on(event, handler) {
        const handlers = events.get(event);
        const added = handlers && handlers.push(handler);
        if (!added) {
          events.set(event, [handler]);
        }
      },
      off(event, handler) {
        const handlers = events.get(event);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },
      emit(event, payload) {
        (events.get(event) || []).slice().map((handler) => handler(payload));
        (events.get("*") || []).slice().map((handler) => handler(event, payload));
      }
    };
    return emitter;
  }
  /*!
    * @intlify/message-resolver v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  const isObject = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const pathStateMachine = [];
  pathStateMachine[
    0
    /* BEFORE_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      0
      /* BEFORE_PATH */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    1
    /* IN_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      1
      /* IN_PATH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    2
    /* BEFORE_IDENT */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    3
    /* IN_IDENT */
  ] = {
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "w"
      /* WORKSPACE */
    ]: [
      1,
      1
      /* PUSH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2,
      1
      /* PUSH */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      1
      /* PUSH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7,
      1
      /* PUSH */
    ]
  };
  pathStateMachine[
    4
    /* IN_SUB_PATH */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      5,
      0
      /* APPEND */
    ],
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      6,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      2
      /* INC_SUB_PATH_DEPTH */
    ],
    [
      "]"
      /* RIGHT_BRACKET */
    ]: [
      1,
      3
      /* PUSH_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      4,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    5
    /* IN_SINGLE_QUOTE */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      5,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    6
    /* IN_DOUBLE_QUOTE */
  ] = {
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      6,
      0
      /* APPEND */
    ]
  };
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
    if (ch === void 0 || ch === null) {
      return "o";
    }
    const code2 = ch.charCodeAt(0);
    switch (code2) {
      case 91:
      case 93:
      case 46:
      case 34:
      case 39:
        return ch;
      case 95:
      case 36:
      case 45:
        return "i";
      case 9:
      case 10:
      case 13:
      case 160:
      case 65279:
      case 8232:
      case 8233:
        return "w";
    }
    return "i";
  }
  function formatSubPath(path) {
    const trimmed = path.trim();
    if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
      return false;
    }
    return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
  }
  function parse(path) {
    const keys = [];
    let index2 = -1;
    let mode = 0;
    let subPathDepth = 0;
    let c;
    let key;
    let newChar;
    let type2;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[
      0
      /* APPEND */
    ] = () => {
      if (key === void 0) {
        key = newChar;
      } else {
        key += newChar;
      }
    };
    actions[
      1
      /* PUSH */
    ] = () => {
      if (key !== void 0) {
        keys.push(key);
        key = void 0;
      }
    };
    actions[
      2
      /* INC_SUB_PATH_DEPTH */
    ] = () => {
      actions[
        0
        /* APPEND */
      ]();
      subPathDepth++;
    };
    actions[
      3
      /* PUSH_SUB_PATH */
    ] = () => {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = 4;
        actions[
          0
          /* APPEND */
        ]();
      } else {
        subPathDepth = 0;
        if (key === void 0) {
          return false;
        }
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[
            1
            /* PUSH */
          ]();
        }
      }
    };
    function maybeUnescapeQuote() {
      const nextChar = path[index2 + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
        index2++;
        newChar = "\\" + nextChar;
        actions[
          0
          /* APPEND */
        ]();
        return true;
      }
    }
    while (mode !== null) {
      index2++;
      c = path[index2];
      if (c === "\\" && maybeUnescapeQuote()) {
        continue;
      }
      type2 = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type2] || typeMap[
        "l"
        /* ELSE */
      ] || 8;
      if (transition === 8) {
        return;
      }
      mode = transition[0];
      if (transition[1] !== void 0) {
        action = actions[transition[1]];
        if (action) {
          newChar = c;
          if (action() === false) {
            return;
          }
        }
      }
      if (mode === 7) {
        return keys;
      }
    }
  }
  const cache = /* @__PURE__ */ new Map();
  function resolveValue(obj, path) {
    if (!isObject(obj)) {
      return null;
    }
    let hit = cache.get(path);
    if (!hit) {
      hit = parse(path);
      if (hit) {
        cache.set(path, hit);
      }
    }
    if (!hit) {
      return null;
    }
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
      const val = last[hit[i]];
      if (val === void 0) {
        return null;
      }
      last = val;
      i++;
    }
    return last;
  }
  function handleFlatJson(obj) {
    if (!isObject(obj)) {
      return obj;
    }
    for (const key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }
      if (!key.includes(
        "."
        /* DOT */
      )) {
        if (isObject(obj[key])) {
          handleFlatJson(obj[key]);
        }
      } else {
        const subKeys = key.split(
          "."
          /* DOT */
        );
        const lastIndex = subKeys.length - 1;
        let currentObj = obj;
        for (let i = 0; i < lastIndex; i++) {
          if (!(subKeys[i] in currentObj)) {
            currentObj[subKeys[i]] = {};
          }
          currentObj = currentObj[subKeys[i]];
        }
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
        if (isObject(currentObj[subKeys[lastIndex]])) {
          handleFlatJson(currentObj[subKeys[lastIndex]]);
        }
      }
    }
    return obj;
  }
  /*!
    * @intlify/runtime v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => "";
  const DEFAULT_MESSAGE_DATA_TYPE = "text";
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
      return choice ? choice > 1 ? 1 : 0 : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
    const index2 = isNumber$1(options.pluralIndex) ? options.pluralIndex : -1;
    return options.named && (isNumber$1(options.named.count) || isNumber$1(options.named.n)) ? isNumber$1(options.named.count) ? options.named.count : isNumber$1(options.named.n) ? options.named.n : index2 : index2;
  }
  function normalizeNamed(pluralIndex, props2) {
    if (!props2.count) {
      props2.count = pluralIndex;
    }
    if (!props2.n) {
      props2.n = pluralIndex;
    }
  }
  function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
    const orgPluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
    const plural = (messages2) => messages2[pluralRule(pluralIndex, messages2.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index2) => _list[index2];
    const _named = options.named || {};
    isNumber$1(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message(key) {
      const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
      return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
    const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type2 = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
      [
        "list"
        /* LIST */
      ]: list,
      [
        "named"
        /* NAMED */
      ]: named,
      [
        "plural"
        /* PLURAL */
      ]: plural,
      [
        "linked"
        /* LINKED */
      ]: (key, modifier) => {
        const msg = message(key)(ctx);
        return isString(modifier) ? _modifier(modifier)(msg) : msg;
      },
      [
        "message"
        /* MESSAGE */
      ]: message,
      [
        "type"
        /* TYPE */
      ]: type2,
      [
        "interpolate"
        /* INTERPOLATE */
      ]: interpolate,
      [
        "normalize"
        /* NORMALIZE */
      ]: normalize
    };
    return ctx;
  }
  /*!
    * @intlify/message-compiler v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const errorMessages$2 = {
    // tokenizer error messages
    [
      0
      /* EXPECTED_TOKEN */
    ]: `Expected token: '{0}'`,
    [
      1
      /* INVALID_TOKEN_IN_PLACEHOLDER */
    ]: `Invalid token in placeholder: '{0}'`,
    [
      2
      /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */
    ]: `Unterminated single quote in placeholder`,
    [
      3
      /* UNKNOWN_ESCAPE_SEQUENCE */
    ]: `Unknown escape sequence: \\{0}`,
    [
      4
      /* INVALID_UNICODE_ESCAPE_SEQUENCE */
    ]: `Invalid unicode escape sequence: {0}`,
    [
      5
      /* UNBALANCED_CLOSING_BRACE */
    ]: `Unbalanced closing brace`,
    [
      6
      /* UNTERMINATED_CLOSING_BRACE */
    ]: `Unterminated closing brace`,
    [
      7
      /* EMPTY_PLACEHOLDER */
    ]: `Empty placeholder`,
    [
      8
      /* NOT_ALLOW_NEST_PLACEHOLDER */
    ]: `Not allowed nest placeholder`,
    [
      9
      /* INVALID_LINKED_FORMAT */
    ]: `Invalid linked format`,
    // parser error messages
    [
      10
      /* MUST_HAVE_MESSAGES_IN_PLURAL */
    ]: `Plural must have messages`,
    [
      11
      /* UNEXPECTED_EMPTY_LINKED_MODIFIER */
    ]: `Unexpected empty linked modifier`,
    [
      12
      /* UNEXPECTED_EMPTY_LINKED_KEY */
    ]: `Unexpected empty linked key`,
    [
      13
      /* UNEXPECTED_LEXICAL_ANALYSIS */
    ]: `Unexpected lexical analysis in token: '{0}'`
  };
  function createCompileError(code2, loc, options = {}) {
    const { domain, messages: messages2, args } = options;
    const msg = format$1((messages2 || errorMessages$2)[code2] || "", ...args || []);
    const error2 = new SyntaxError(String(msg));
    error2.code = code2;
    if (loc) {
      error2.location = loc;
    }
    error2.domain = domain;
    return error2;
  }
  /*!
    * @intlify/devtools-if v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const IntlifyDevToolsHooks = {
    I18nInit: "i18n:init",
    FunctionTranslate: "function:translate"
  };
  /*!
    * @intlify/core-base v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  let devtools = null;
  function setDevToolsHook(hook) {
    devtools = hook;
  }
  function initI18nDevTools(i18n2, version, meta) {
    devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
      timestamp: Date.now(),
      i18n: i18n2,
      version,
      meta
    });
  }
  const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
  function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
  }
  const warnMessages$1 = {
    [
      0
      /* NOT_FOUND_KEY */
    ]: `Not found '{key}' key in '{locale}' locale messages.`,
    [
      1
      /* FALLBACK_TO_TRANSLATE */
    ]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [
      2
      /* CANNOT_FORMAT_NUMBER */
    ]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [
      3
      /* FALLBACK_TO_NUMBER_FORMAT */
    ]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [
      4
      /* CANNOT_FORMAT_DATE */
    ]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [
      5
      /* FALLBACK_TO_DATE_FORMAT */
    ]: `Fall back to datetime format '{key}' key with '{target}' locale.`
  };
  function getWarnMessage$1(code2, ...args) {
    return format$1(warnMessages$1[code2], ...args);
  }
  const VERSION$1 = "9.1.9";
  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = "";
  function getDefaultLinkedModifiers() {
    return {
      upper: (val) => isString(val) ? val.toUpperCase() : val,
      lower: (val) => isString(val) ? val.toLowerCase() : val,
      // prettier-ignore
      capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
    };
  }
  let _compiler;
  let _additionalMeta = null;
  const setAdditionalMeta = (meta) => {
    _additionalMeta = meta;
  };
  const getAdditionalMeta = () => _additionalMeta;
  let _cid = 0;
  function createCoreContext(options = {}) {
    const version = isString(options.version) ? options.version : VERSION$1;
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const messages2 = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
    const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
    const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
    const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = isFunction(options.missing) ? options.missing : null;
    const missingWarn = isBoolean$1(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    const fallbackWarn = isBoolean$1(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    const processor = isPlainObject(options.processor) ? options.processor : null;
    const warnHtmlMessage = isBoolean$1(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
    const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
    const internalOptions = options;
    const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
    const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
    const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
      version,
      cid: _cid,
      locale,
      fallbackLocale,
      messages: messages2,
      datetimeFormats,
      numberFormats,
      modifiers,
      pluralRules,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackFormat,
      unresolving,
      postTranslation,
      processor,
      warnHtmlMessage,
      escapeParameter,
      messageCompiler,
      onWarn,
      __datetimeFormatters,
      __numberFormatters,
      __meta
    };
    {
      context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
    }
    {
      initI18nDevTools(context, version, __meta);
    }
    return context;
  }
  function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
  }
  function handleMissing(context, key, locale, missingWarn, type2) {
    const { missing, onWarn } = context;
    {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("missing", {
          locale,
          key,
          type: type2,
          groupId: `${type2}:${key}`
        });
      }
    }
    if (missing !== null) {
      const ret = missing(context, locale, key, type2);
      return isString(ret) ? ret : key;
    } else {
      if (isTranslateMissingWarn(missingWarn, key)) {
        onWarn(getWarnMessage$1(0, { key, locale }));
      }
      return key;
    }
  }
  function getLocaleChain(ctx, fallback, start) {
    const context = ctx;
    if (!context.__localeChainCache) {
      context.__localeChainCache = /* @__PURE__ */ new Map();
    }
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
      chain = [];
      let block = [start];
      while (isArray(block)) {
        block = appendBlockToChain(chain, block, fallback);
      }
      const defaults = isArray(fallback) ? fallback : isPlainObject(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
      block = isString(defaults) ? [defaults] : defaults;
      if (isArray(block)) {
        appendBlockToChain(chain, block, false);
      }
      context.__localeChainCache.set(start, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean$1(follow); i++) {
      const locale = block[i];
      if (isString(locale)) {
        follow = appendLocaleToChain(chain, block[i], blocks);
      }
    }
    return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split("-");
    do {
      const target = tokens.join("-");
      follow = appendItemToChain(chain, target, blocks);
      tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
  }
  function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
      follow = true;
      if (target) {
        follow = target[target.length - 1] !== "!";
        const locale = target.replace(/!/g, "");
        chain.push(locale);
        if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
          follow = blocks[locale];
        }
      }
    }
    return follow;
  }
  function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = /* @__PURE__ */ new Map();
    getLocaleChain(ctx, fallback, locale);
  }
  function createCoreError(code2) {
    return createCompileError(code2, null, { messages: errorMessages$1 });
  }
  const errorMessages$1 = {
    [
      14
      /* INVALID_ARGUMENT */
    ]: "Invalid arguments",
    [
      15
      /* INVALID_DATE_ARGUMENT */
    ]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
    [
      16
      /* INVALID_ISO_DATE_ARGUMENT */
    ]: "The argument provided is not a valid ISO date string"
  };
  const NOOP_MESSAGE_FUNCTION = () => "";
  const isMessageFunction = (val) => isFunction(val);
  function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages: messages2 } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean$1(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean$1(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = isBoolean$1(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    const defaultMsgOrKey = isString(options.default) || isBoolean$1(options.default) ? !isBoolean$1(options.default) ? options.default : key : fallbackFormat ? key : "";
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
    const locale = isString(options.locale) ? options.locale : context.locale;
    escapeParameter && escapeParams(options);
    let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
      key,
      locale,
      messages2[locale] || {}
    ];
    let cacheBaseKey = key;
    if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
      if (enableDefaultMsg) {
        format2 = defaultMsgOrKey;
        cacheBaseKey = format2;
      }
    }
    if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
      return unresolving ? NOT_REOSLVED : key;
    }
    if (isString(format2) && context.messageCompiler == null) {
      warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
      return key;
    }
    let occurred = false;
    const errorDetector = () => {
      occurred = true;
    };
    const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
    if (occurred) {
      return format2;
    }
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    const ret = postTranslation ? postTranslation(messaged) : messaged;
    {
      const payloads = {
        timestamp: Date.now(),
        key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
      translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    if (isArray(options.list)) {
      options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
    } else if (isObject$1(options.named)) {
      Object.keys(options.named).forEach((key) => {
        if (isString(options.named[key])) {
          options.named[key] = escapeHtml(options.named[key]);
        }
      });
    }
  }
  function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages: messages2, onWarn } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    let message = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type2 = "translate";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(1, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type: type2,
            key,
            from,
            to,
            groupId: `${type2}:${key}`
          });
        }
      }
      message = messages2[targetLocale] || {};
      let start = null;
      let startTag;
      let endTag;
      if (inBrowser) {
        start = window.performance.now();
        startTag = "intlify-message-resolve-start";
        endTag = "intlify-message-resolve-end";
        mark && mark(startTag);
      }
      if ((format2 = resolveValue(message, key)) === null) {
        format2 = message[key];
      }
      if (inBrowser) {
        const end = window.performance.now();
        const emitter = context.__v_emitter;
        if (emitter && start && format2) {
          emitter.emit("message-resolve", {
            type: "message-resolve",
            key,
            message: format2,
            time: end - start,
            groupId: `${type2}:${key}`
          });
        }
        if (startTag && endTag && mark && measure) {
          mark(endTag);
          measure("intlify message resolve", startTag, endTag);
        }
      }
      if (isString(format2) || isFunction(format2))
        break;
      const missingRet = handleMissing(context, key, targetLocale, missingWarn, type2);
      if (missingRet !== key) {
        format2 = missingRet;
      }
      from = to;
    }
    return [format2, targetLocale, message];
  }
  function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format2)) {
      const msg2 = format2;
      msg2.locale = msg2.locale || targetLocale;
      msg2.key = msg2.key || key;
      return msg2;
    }
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-compilation-start";
      endTag = "intlify-message-compilation-end";
      mark && mark(startTag);
    }
    const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-compilation", {
          type: "message-compilation",
          message: format2,
          time: end - start,
          groupId: `${"translate"}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message compilation", startTag, endTag);
      }
    }
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format2;
    return msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-evaluation-start";
      endTag = "intlify-message-evaluation-end";
      mark && mark(startTag);
    }
    const messaged = msg(msgCtx);
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-evaluation", {
          type: "message-evaluation",
          value: messaged,
          time: end - start,
          groupId: `${"translate"}:${msg.key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message evaluation", startTag, endTag);
      }
    }
    return messaged;
  }
  function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!isString(arg1) && !isNumber$1(arg1) && !isMessageFunction(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const key = isNumber$1(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (isNumber$1(arg2)) {
      options.plural = arg2;
    } else if (isString(arg2)) {
      options.default = arg2;
    } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
      options.named = arg2;
    } else if (isArray(arg2)) {
      options.list = arg2;
    }
    if (isNumber$1(arg3)) {
      options.plural = arg3;
    } else if (isString(arg3)) {
      options.default = arg3;
    } else if (isPlainObject(arg3)) {
      assign(options, arg3);
    }
    return [key, options];
  }
  function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
    return {
      warnHtmlMessage,
      onError: (err) => {
        errorDetector && errorDetector(err);
        {
          const message = `Message compilation error: ${err.message}`;
          const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
          const emitter = context.__v_emitter;
          if (emitter) {
            emitter.emit("compile-error", {
              message: source,
              error: err.message,
              start: err.location && err.location.start.offset,
              end: err.location && err.location.end.offset,
              groupId: `${"translate"}:${key}`
            });
          }
          console.error(codeFrame ? `${message}
${codeFrame}` : message);
        }
      },
      onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
    };
  }
  function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules } = context;
    const resolveMessage = (key) => {
      const val = resolveValue(message, key);
      if (isString(val)) {
        let occurred = false;
        const errorDetector = () => {
          occurred = true;
        };
        const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
        return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
      } else if (isMessageFunction(val)) {
        return val;
      } else {
        return NOOP_MESSAGE_FUNCTION;
      }
    };
    const ctxOptions = {
      locale,
      modifiers,
      pluralRules,
      messages: resolveMessage
    };
    if (context.processor) {
      ctxOptions.processor = context.processor;
    }
    if (options.list) {
      ctxOptions.list = options.list;
    }
    if (options.named) {
      ctxOptions.named = options.named;
    }
    if (isNumber$1(options.plural)) {
      ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
  }
  const intlDefined = typeof Intl !== "undefined";
  const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
    numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
  };
  function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __datetimeFormatters } = context;
    if (!Availabilities.dateTimeFormat) {
      onWarn(getWarnMessage$1(
        4
        /* CANNOT_FORMAT_DATE */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value2, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = isBoolean$1(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean$1(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.DateTimeFormat(locale).format(value2);
    }
    let datetimeFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type2 = "datetime format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(5, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type: type2,
            key,
            from,
            to,
            groupId: `${type2}:${key}`
          });
        }
      }
      datetimeFormat = datetimeFormats[targetLocale] || {};
      format2 = datetimeFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type2);
      from = to;
    }
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
      __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value2) : formatter.formatToParts(value2);
  }
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    let value2;
    if (isString(arg1)) {
      if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
      value2 = new Date(arg1);
      try {
        value2.toISOString();
      } catch (e) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
    } else if (isDate(arg1)) {
      if (isNaN(arg1.getTime())) {
        throw createCoreError(
          15
          /* INVALID_DATE_ARGUMENT */
        );
      }
      value2 = arg1;
    } else if (isNumber$1(arg1)) {
      value2 = arg1;
    } else {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value2, options, overrides];
  }
  function clearDateTimeFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__datetimeFormatters.has(id)) {
        continue;
      }
      context.__datetimeFormatters.delete(id);
    }
  }
  function number$1(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __numberFormatters } = context;
    if (!Availabilities.numberFormat) {
      onWarn(getWarnMessage$1(
        2
        /* CANNOT_FORMAT_NUMBER */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value2, options, overrides] = parseNumberArgs(...args);
    const missingWarn = isBoolean$1(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean$1(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.NumberFormat(locale).format(value2);
    }
    let numberFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type2 = "number format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(3, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type: type2,
            key,
            from,
            to,
            groupId: `${type2}:${key}`
          });
        }
      }
      numberFormat = numberFormats[targetLocale] || {};
      format2 = numberFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type2);
      from = to;
    }
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
      __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value2) : formatter.formatToParts(value2);
  }
  function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    if (!isNumber$1(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const value2 = arg1;
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value2, options, overrides];
  }
  function clearNumberFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__numberFormatters.has(id)) {
        continue;
      }
      context.__numberFormatters.delete(id);
    }
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value2) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value2));
          } catch (e) {
          }
          currentSettings = value2;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value2) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value2);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * @intlify/vue-devtools v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VueDevToolsLabels = {
    [
      "vue-devtools-plugin-vue-i18n"
      /* PLUGIN */
    ]: "Vue I18n devtools",
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "I18n Resources",
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: "Vue I18n"
  };
  const VueDevToolsPlaceholders = {
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "Search for scopes ..."
  };
  const VueDevToolsTimelineColors = {
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: 16764185
  };
  /*!
    * vue-i18n v9.1.9
    * (c) 2022 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VERSION = "9.1.9";
  function initFeatureFlags() {
    let needWarn = false;
    {
      needWarn = true;
    }
    if (needWarn) {
      console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
    }
  }
  const warnMessages = {
    [
      6
      /* FALLBACK_TO_ROOT */
    ]: `Fall back to {type} '{key}' with root locale.`,
    [
      7
      /* NOT_SUPPORTED_PRESERVE */
    ]: `Not supported 'preserve'.`,
    [
      8
      /* NOT_SUPPORTED_FORMATTER */
    ]: `Not supported 'formatter'.`,
    [
      9
      /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
    ]: `Not supported 'preserveDirectiveContent'.`,
    [
      10
      /* NOT_SUPPORTED_GET_CHOICE_INDEX */
    ]: `Not supported 'getChoiceIndex'.`,
    [
      11
      /* COMPONENT_NAME_LEGACY_COMPATIBLE */
    ]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [
      12
      /* NOT_FOUND_PARENT_SCOPE */
    ]: `Not found parent scope. use the global scope.`
  };
  function getWarnMessage(code2, ...args) {
    return format$1(warnMessages[code2], ...args);
  }
  function createI18nError(code2, ...args) {
    return createCompileError(code2, null, { messages: errorMessages, args });
  }
  const errorMessages = {
    [
      14
      /* UNEXPECTED_RETURN_TYPE */
    ]: "Unexpected return type in composer",
    [
      15
      /* INVALID_ARGUMENT */
    ]: "Invalid argument",
    [
      16
      /* MUST_BE_CALL_SETUP_TOP */
    ]: "Must be called at the top of a `setup` function",
    [
      17
      /* NOT_INSLALLED */
    ]: "Need to install with `app.use` function",
    [
      22
      /* UNEXPECTED_ERROR */
    ]: "Unexpected error",
    [
      18
      /* NOT_AVAILABLE_IN_LEGACY_MODE */
    ]: "Not available in legacy mode",
    [
      19
      /* REQUIRED_VALUE */
    ]: `Required in value: {0}`,
    [
      20
      /* INVALID_VALUE */
    ]: `Invalid value`,
    [
      21
      /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
    ]: `Cannot setup vue-devtools plugin`
  };
  const DEVTOOLS_META = "__INTLIFY_META__";
  const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
  const DatetimePartsSymbol = makeSymbol("__datetimeParts");
  const NumberPartsSymbol = makeSymbol("__numberParts");
  const EnableEmitter = makeSymbol("__enableEmitter");
  const DisableEmitter = makeSymbol("__disableEmitter");
  const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
  const InejctWithOption = makeSymbol("__injectWithOption");
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type2) => {
      return missing(locale, key, vue.getCurrentInstance() || void 0, type2);
    };
  }
  function getLocaleMessages(locale, options) {
    const { messages: messages2, __i18n } = options;
    const ret = isPlainObject(messages2) ? messages2 : isArray(__i18n) ? {} : { [locale]: {} };
    if (isArray(__i18n)) {
      __i18n.forEach(({ locale: locale2, resource }) => {
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy$1(resource, ret[locale2]);
        } else {
          deepCopy$1(resource, ret);
        }
      });
    }
    if (options.flatJson) {
      for (const key in ret) {
        if (hasOwn$1(ret, key)) {
          handleFlatJson(ret[key]);
        }
      }
    }
    return ret;
  }
  const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
  function deepCopy$1(src, des) {
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
    for (const key in src) {
      if (hasOwn$1(src, key)) {
        if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
          des[key] = src[key];
        } else {
          deepCopy$1(src[key], des[key]);
        }
      }
    }
  }
  const getMetaInfo = () => {
    const instance = vue.getCurrentInstance();
    return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
  };
  function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === void 0;
    let _inheritLocale = isBoolean$1(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US"
    );
    const _fallbackLocale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
    );
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
    const _numberFormats = vue.ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
    let _missingWarn = __root ? __root.missingWarn : isBoolean$1(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean$1(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean$1(options.fallbackRoot) ? options.fallbackRoot : true;
    let _fallbackFormat = !!options.fallbackFormat;
    let _missing = isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
    let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    let _warnHtmlMessage = isBoolean$1(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    let _escapeParameter = !!options.escapeParameter;
    const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
    let _pluralRules = options.pluralRules || __root && __root.pluralRules;
    let _context;
    function getCoreContext() {
      return createCoreContext({
        version: VERSION,
        locale: _locale.value,
        fallbackLocale: _fallbackLocale.value,
        messages: _messages.value,
        messageCompiler: function compileToFunction(source) {
          return (ctx) => {
            return ctx.normalize([source]);
          };
        },
        datetimeFormats: _datetimeFormats.value,
        numberFormats: _numberFormats.value,
        modifiers: _modifiers,
        pluralRules: _pluralRules,
        missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
        missingWarn: _missingWarn,
        fallbackWarn: _fallbackWarn,
        fallbackFormat: _fallbackFormat,
        unresolving: true,
        postTranslation: _postTranslation === null ? void 0 : _postTranslation,
        warnHtmlMessage: _warnHtmlMessage,
        escapeParameter: _escapeParameter,
        __datetimeFormatters: isPlainObject(_context) ? _context.__datetimeFormatters : void 0,
        __numberFormatters: isPlainObject(_context) ? _context.__numberFormatters : void 0,
        __v_emitter: isPlainObject(_context) ? _context.__v_emitter : void 0,
        __meta: { framework: "vue" }
      });
    }
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    function trackReactivityValues() {
      return [
        _locale.value,
        _fallbackLocale.value,
        _messages.value,
        _datetimeFormats.value,
        _numberFormats.value
      ];
    }
    const locale = vue.computed({
      get: () => _locale.value,
      set: (val) => {
        _locale.value = val;
        _context.locale = _locale.value;
      }
    });
    const fallbackLocale = vue.computed({
      get: () => _fallbackLocale.value,
      set: (val) => {
        _fallbackLocale.value = val;
        _context.fallbackLocale = _fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, val);
      }
    });
    const messages2 = vue.computed(() => _messages.value);
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    const numberFormats = vue.computed(() => _numberFormats.value);
    function getPostTranslationHandler() {
      return isFunction(_postTranslation) ? _postTranslation : null;
    }
    function setPostTranslationHandler(handler) {
      _postTranslation = handler;
      _context.postTranslation = handler;
    }
    function getMissingHandler() {
      return _missing;
    }
    function setMissingHandler(handler) {
      if (handler !== null) {
        _runtimeMissing = defineCoreMissingHandler(handler);
      }
      _missing = handler;
      _context.missing = _runtimeMissing;
    }
    function isResolvedTranslateMessage(type2, arg) {
      return type2 !== "translate" || !!arg.resolvedMessage === false;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
      trackReactivityValues();
      let ret;
      {
        try {
          setAdditionalMeta(getMetaInfo());
          ret = fn(_context);
        } finally {
          setAdditionalMeta(null);
        }
      }
      if (isNumber$1(ret) && ret === NOT_REOSLVED) {
        const [key, arg2] = argumentParser();
        if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
          if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
            warn(getWarnMessage(6, {
              key,
              type: warnType
            }));
          }
          {
            const { __v_emitter: emitter } = _context;
            if (emitter && _fallbackRoot) {
              emitter.emit("fallback", {
                type: warnType,
                key,
                to: "global",
                groupId: `${warnType}:${key}`
              });
            }
          }
        }
        return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
      } else if (successCondition(ret)) {
        return ret;
      } else {
        throw createI18nError(
          14
          /* UNEXPECTED_RETURN_TYPE */
        );
      }
    }
    function t(...args) {
      return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val) => isString(val));
    }
    function rt(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject$1(arg3)) {
        throw createI18nError(
          15
          /* INVALID_ARGUMENT */
        );
      }
      return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
    }
    function d(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function n(...args) {
      return wrapWithDeps((context) => number$1(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function normalize(values) {
      return values.map((val) => isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
    }
    const interpolate = (val) => val;
    const processor = {
      normalize,
      interpolate,
      type: "vnode"
    };
    function transrateVNode(...args) {
      return wrapWithDeps(
        (context) => {
          let ret;
          const _context2 = context;
          try {
            _context2.processor = processor;
            ret = translate(_context2, ...args);
          } finally {
            _context2.processor = null;
          }
          return ret;
        },
        () => parseTranslateArgs(...args),
        "translate",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[TransrateVNodeSymbol](...args),
        (key) => [vue.createVNode(vue.Text, null, key, 0)],
        (val) => isArray(val)
      );
    }
    function numberParts(...args) {
      return wrapWithDeps(
        (context) => number$1(context, ...args),
        () => parseNumberArgs(...args),
        "number format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[NumberPartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray(val)
      );
    }
    function datetimeParts(...args) {
      return wrapWithDeps(
        (context) => datetime(context, ...args),
        () => parseDateTimeArgs(...args),
        "datetime format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[DatetimePartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray(val)
      );
    }
    function setPluralRules(rules2) {
      _pluralRules = rules2;
      _context.pluralRules = _pluralRules;
    }
    function te(key, locale2) {
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      return resolveValue(message, key) !== null;
    }
    function resolveMessages(key) {
      let messages22 = null;
      const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i = 0; i < locales.length; i++) {
        const targetLocaleMessages = _messages.value[locales[i]] || {};
        const messageValue = resolveValue(targetLocaleMessages, key);
        if (messageValue != null) {
          messages22 = messageValue;
          break;
        }
      }
      return messages22;
    }
    function tm(key) {
      const messages22 = resolveMessages(key);
      return messages22 != null ? messages22 : __root ? __root.tm(key) || {} : {};
    }
    function getLocaleMessage(locale2) {
      return _messages.value[locale2] || {};
    }
    function setLocaleMessage(locale2, message) {
      _messages.value[locale2] = message;
      _context.messages = _messages.value;
    }
    function mergeLocaleMessage(locale2, message) {
      _messages.value[locale2] = _messages.value[locale2] || {};
      deepCopy$1(message, _messages.value[locale2]);
      _context.messages = _messages.value;
    }
    function getDateTimeFormat(locale2) {
      return _datetimeFormats.value[locale2] || {};
    }
    function setDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = format2;
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function mergeDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function getNumberFormat(locale2) {
      return _numberFormats.value[locale2] || {};
    }
    function setNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = format2;
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    function mergeNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    composerID++;
    if (__root) {
      vue.watch(__root.locale, (val) => {
        if (_inheritLocale) {
          _locale.value = val;
          _context.locale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
      vue.watch(__root.fallbackLocale, (val) => {
        if (_inheritLocale) {
          _fallbackLocale.value = val;
          _context.fallbackLocale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
    }
    const composer = {
      id: composerID,
      locale,
      fallbackLocale,
      get inheritLocale() {
        return _inheritLocale;
      },
      set inheritLocale(val) {
        _inheritLocale = val;
        if (val && __root) {
          _locale.value = __root.locale.value;
          _fallbackLocale.value = __root.fallbackLocale.value;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      },
      get availableLocales() {
        return Object.keys(_messages.value).sort();
      },
      messages: messages2,
      datetimeFormats,
      numberFormats,
      get modifiers() {
        return _modifiers;
      },
      get pluralRules() {
        return _pluralRules || {};
      },
      get isGlobal() {
        return _isGlobal;
      },
      get missingWarn() {
        return _missingWarn;
      },
      set missingWarn(val) {
        _missingWarn = val;
        _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val) {
        _fallbackWarn = val;
        _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val) {
        _fallbackRoot = val;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val) {
        _fallbackFormat = val;
        _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val) {
        _warnHtmlMessage = val;
        _context.warnHtmlMessage = val;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val) {
        _escapeParameter = val;
        _context.escapeParameter = val;
      },
      t,
      rt,
      d,
      n,
      te,
      tm,
      getLocaleMessage,
      setLocaleMessage,
      mergeLocaleMessage,
      getDateTimeFormat,
      setDateTimeFormat,
      mergeDateTimeFormat,
      getNumberFormat,
      setNumberFormat,
      mergeNumberFormat,
      getPostTranslationHandler,
      setPostTranslationHandler,
      getMissingHandler,
      setMissingHandler,
      [TransrateVNodeSymbol]: transrateVNode,
      [NumberPartsSymbol]: numberParts,
      [DatetimePartsSymbol]: datetimeParts,
      [SetPluralRulesSymbol]: setPluralRules,
      [InejctWithOption]: options.__injectWithOption
      // eslint-disable-line @typescript-eslint/no-explicit-any
    };
    {
      composer[EnableEmitter] = (emitter) => {
        _context.__v_emitter = emitter;
      };
      composer[DisableEmitter] = () => {
        _context.__v_emitter = void 0;
      };
    }
    return composer;
  }
  function convertComposerOptions(options) {
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const missing = isFunction(options.missing) ? options.missing : void 0;
    const missingWarn = isBoolean$1(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
    const fallbackWarn = isBoolean$1(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
    const fallbackRoot = isBoolean$1(options.fallbackRoot) ? options.fallbackRoot : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
    const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = isBoolean$1(options.sync) ? options.sync : true;
    if (options.formatter) {
      warn(getWarnMessage(
        8
        /* NOT_SUPPORTED_FORMATTER */
      ));
    }
    if (options.preserveDirectiveContent) {
      warn(getWarnMessage(
        9
        /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
      ));
    }
    let messages2 = options.messages;
    if (isPlainObject(options.sharedMessages)) {
      const sharedMessages = options.sharedMessages;
      const locales = Object.keys(sharedMessages);
      messages2 = locales.reduce((messages22, locale2) => {
        const message = messages22[locale2] || (messages22[locale2] = {});
        assign(message, sharedMessages[locale2]);
        return messages22;
      }, messages2 || {});
    }
    const { __i18n, __root, __injectWithOption } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    return {
      locale,
      fallbackLocale,
      messages: messages2,
      flatJson,
      datetimeFormats,
      numberFormats,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackRoot,
      fallbackFormat,
      modifiers,
      pluralRules: pluralizationRules,
      postTranslation,
      warnHtmlMessage,
      escapeParameter,
      inheritLocale,
      __i18n,
      __root,
      __injectWithOption
    };
  }
  function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    const vueI18n = {
      // id
      id: composer.id,
      // locale
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      // fallbackLocale
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      // messages
      get messages() {
        return composer.messages.value;
      },
      // datetimeFormats
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      // numberFormats
      get numberFormats() {
        return composer.numberFormats.value;
      },
      // availableLocales
      get availableLocales() {
        return composer.availableLocales;
      },
      // formatter
      get formatter() {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(val) {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
      },
      // missing
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      // silentTranslationWarn
      get silentTranslationWarn() {
        return isBoolean$1(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean$1(val) ? !val : val;
      },
      // silentFallbackWarn
      get silentFallbackWarn() {
        return isBoolean$1(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean$1(val) ? !val : val;
      },
      // modifiers
      get modifiers() {
        return composer.modifiers;
      },
      // formatFallbackMessages
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      // postTranslation
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      // sync
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      // warnInHtmlMessage
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      // escapeParameterHtml
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      // preserveDirectiveContent
      get preserveDirectiveContent() {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
        return true;
      },
      set preserveDirectiveContent(val) {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
      },
      // pluralizationRules
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      // for internal
      __composer: composer,
      // t
      t(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = {};
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      rt(...args) {
        return composer.rt(...args);
      },
      // tc
      tc(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = { plural: 1 };
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isNumber$1(arg2)) {
          options2.plural = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isString(arg3)) {
          options2.locale = arg3;
        } else if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      // te
      te(key, locale) {
        return composer.te(key, locale);
      },
      // tm
      tm(key) {
        return composer.tm(key);
      },
      // getLocaleMessage
      getLocaleMessage(locale) {
        return composer.getLocaleMessage(locale);
      },
      // setLocaleMessage
      setLocaleMessage(locale, message) {
        composer.setLocaleMessage(locale, message);
      },
      // mergeLocaleMessage
      mergeLocaleMessage(locale, message) {
        composer.mergeLocaleMessage(locale, message);
      },
      // d
      d(...args) {
        return composer.d(...args);
      },
      // getDateTimeFormat
      getDateTimeFormat(locale) {
        return composer.getDateTimeFormat(locale);
      },
      // setDateTimeFormat
      setDateTimeFormat(locale, format2) {
        composer.setDateTimeFormat(locale, format2);
      },
      // mergeDateTimeFormat
      mergeDateTimeFormat(locale, format2) {
        composer.mergeDateTimeFormat(locale, format2);
      },
      // n
      n(...args) {
        return composer.n(...args);
      },
      // getNumberFormat
      getNumberFormat(locale) {
        return composer.getNumberFormat(locale);
      },
      // setNumberFormat
      setNumberFormat(locale, format2) {
        composer.setNumberFormat(locale, format2);
      },
      // mergeNumberFormat
      mergeNumberFormat(locale, format2) {
        composer.mergeNumberFormat(locale, format2);
      },
      // getChoiceIndex
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getChoiceIndex(choice, choicesLength) {
        warn(getWarnMessage(
          10
          /* NOT_SUPPORTED_GET_CHOICE_INDEX */
        ));
        return -1;
      },
      // for internal
      __onComponentInstanceCreated(target) {
        const { componentInstanceCreatedListener } = options;
        if (componentInstanceCreatedListener) {
          componentInstanceCreatedListener(target, vueI18n);
        }
      }
    };
    {
      vueI18n.__enableEmitter = (emitter) => {
        const __composer = composer;
        __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
      };
      vueI18n.__disableEmitter = () => {
        const __composer = composer;
        __composer[DisableEmitter] && __composer[DisableEmitter]();
      };
    }
    return vueI18n;
  }
  const baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: (val) => val === "parent" || val === "global",
      default: "parent"
    },
    i18n: {
      type: Object
    }
  };
  const Translation = {
    /* eslint-disable */
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (val) => isNumber$1(val) || !isNaN(val)
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props2, context) {
      const { slots, attrs } = context;
      const i18n2 = props2.i18n || useI18n({
        useScope: props2.scope,
        __useComponent: true
      });
      const keys = Object.keys(slots).filter((key) => key !== "_");
      return () => {
        const options = {};
        if (props2.locale) {
          options.locale = props2.locale;
        }
        if (props2.plural !== void 0) {
          options.plural = isString(props2.plural) ? +props2.plural : props2.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n2[TransrateVNodeSymbol](props2.keypath, arg, options);
        const assignedAttrs = assign({}, attrs);
        return isString(props2.tag) ? vue.h(props2.tag, assignedAttrs, children) : isObject$1(props2.tag) ? vue.h(props2.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
      };
    }
  };
  function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === "default") {
      return slots.default ? slots.default() : [];
    } else {
      return keys.reduce((arg, key) => {
        const slot = slots[key];
        if (slot) {
          arg[key] = slot();
        }
        return arg;
      }, {});
    }
  }
  function renderFormatter(props2, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
      const options = { part: true };
      let overrides = {};
      if (props2.locale) {
        options.locale = props2.locale;
      }
      if (isString(props2.format)) {
        options.key = props2.format;
      } else if (isObject$1(props2.format)) {
        if (isString(props2.format.key)) {
          options.key = props2.format.key;
        }
        overrides = Object.keys(props2.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props2.format[prop] }) : options2;
        }, {});
      }
      const parts = partFormatter(...[props2.value, options, overrides]);
      let children = [options.key];
      if (isArray(parts)) {
        children = parts.map((part, index2) => {
          const slot = slots[part.type];
          return slot ? slot({ [part.type]: part.value, index: index2, parts }) : [part.value];
        });
      } else if (isString(parts)) {
        children = [parts];
      }
      const assignedAttrs = assign({}, attrs);
      return isString(props2.tag) ? vue.h(props2.tag, assignedAttrs, children) : isObject$1(props2.tag) ? vue.h(props2.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
    };
  }
  const NUMBER_FORMAT_KEYS = [
    "localeMatcher",
    "style",
    "unit",
    "unitDisplay",
    "currency",
    "currencyDisplay",
    "useGrouping",
    "numberingSystem",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
    "notation",
    "formatMatcher"
  ];
  const NumberFormat = {
    /* eslint-disable */
    name: "i18n-n",
    props: assign({
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props2, context) {
      const i18n2 = props2.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props2, context, NUMBER_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[NumberPartsSymbol](...args)
      ));
    }
  };
  const DATETIME_FORMAT_KEYS = [
    "dateStyle",
    "timeStyle",
    "fractionalSecondDigits",
    "calendar",
    "dayPeriod",
    "numberingSystem",
    "localeMatcher",
    "timeZone",
    "hour12",
    "hourCycle",
    "formatMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName"
  ];
  const DatetimeFormat = {
    /* eslint-disable */
    name: "i18n-d",
    props: assign({
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props2, context) {
      const i18n2 = props2.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props2, context, DATETIME_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[DatetimePartsSymbol](...args)
      ));
    }
  };
  function getComposer$2(i18n2, instance) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      return i18nInternal.__getInstance(instance) || i18n2.global;
    } else {
      const vueI18n = i18nInternal.__getInstance(instance);
      return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
    }
  }
  function vTDirective(i18n2) {
    const bind = (el, { instance, value: value2, modifiers }) => {
      if (!instance || !instance.$) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const composer = getComposer$2(i18n2, instance.$);
      if (modifiers.preserve) {
        warn(getWarnMessage(
          7
          /* NOT_SUPPORTED_PRESERVE */
        ));
      }
      const parsedValue = parseValue(value2);
      el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
      beforeMount: bind,
      beforeUpdate: bind
    };
  }
  function parseValue(value2) {
    if (isString(value2)) {
      return { path: value2 };
    } else if (isPlainObject(value2)) {
      if (!("path" in value2)) {
        throw createI18nError(19, "path");
      }
      return value2;
    } else {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
  }
  function makeParams(value2) {
    const { path, locale, args, choice, plural } = value2;
    const options = {};
    const named = args || {};
    if (isString(locale)) {
      options.locale = locale;
    }
    if (isNumber$1(choice)) {
      options.plural = choice;
    }
    if (isNumber$1(plural)) {
      options.plural = plural;
    }
    return [path, named, options];
  }
  function apply(app, i18n2, ...options) {
    const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = isBoolean$1(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
    if (globalInstall && useI18nComponentName) {
      warn(getWarnMessage(11, {
        name: Translation.name
      }));
    }
    if (globalInstall) {
      app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
      app.component(NumberFormat.name, NumberFormat);
      app.component(DatetimeFormat.name, DatetimeFormat);
    }
    app.directive("t", vTDirective(i18n2));
  }
  const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
  let devtoolsApi;
  async function enableDevTools(app, i18n2) {
    return new Promise((resolve, reject) => {
      try {
        setupDevtoolsPlugin({
          id: "vue-devtools-plugin-vue-i18n",
          label: VueDevToolsLabels[
            "vue-devtools-plugin-vue-i18n"
            /* PLUGIN */
          ],
          packageName: "vue-i18n",
          homepage: "https://vue-i18n.intlify.dev",
          logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
          componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
          app
        }, (api) => {
          devtoolsApi = api;
          api.on.visitComponentTree(({ componentInstance, treeNode }) => {
            updateComponentTreeTags(componentInstance, treeNode, i18n2);
          });
          api.on.inspectComponent(({ componentInstance, instanceData }) => {
            if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
              if (i18n2.mode === "legacy") {
                if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                  inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                }
              } else {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            }
          });
          api.addInspector({
            id: "vue-i18n-resource-inspector",
            label: VueDevToolsLabels[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ],
            icon: "language",
            treeFilterPlaceholder: VueDevToolsPlaceholders[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ]
          });
          api.on.getInspectorTree((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              registerScope(payload, i18n2);
            }
          });
          api.on.getInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              inspectScope(payload, i18n2);
            }
          });
          api.on.editInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              editScope(payload, i18n2);
            }
          });
          api.addTimelineLayer({
            id: "vue-i18n-timeline",
            label: VueDevToolsLabels[
              "vue-i18n-timeline"
              /* TIMELINE */
            ],
            color: VueDevToolsTimelineColors[
              "vue-i18n-timeline"
              /* TIMELINE */
            ]
          });
          resolve(true);
        });
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
  }
  function updateComponentTreeTags(instance, treeNode, i18n2) {
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    if (instance && instance.vnode.el.__VUE_I18N__) {
      if (instance.vnode.el.__VUE_I18N__ !== global2) {
        const label = instance.type.name || instance.type.displayName || instance.type.__file;
        const tag = {
          label: `i18n (${label} Scope)`,
          textColor: 0,
          backgroundColor: 16764185
        };
        treeNode.tags.push(tag);
      }
    }
  }
  function inspectComposer(instanceData, composer) {
    const type2 = VUE_I18N_COMPONENT_TYPES;
    instanceData.state.push({
      type: type2,
      key: "locale",
      editable: true,
      value: composer.locale.value
    });
    instanceData.state.push({
      type: type2,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    });
    instanceData.state.push({
      type: type2,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    });
    instanceData.state.push({
      type: type2,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    });
    instanceData.state.push({
      type: type2,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    });
    instanceData.state.push({
      type: type2,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type: type2,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
  function getLocaleMessageValue(messages2) {
    const value2 = {};
    Object.keys(messages2).forEach((key) => {
      const v = messages2[key];
      if (isFunction(v) && "source" in v) {
        value2[key] = getMessageFunctionDetails(v);
      } else if (isObject$1(v)) {
        value2[key] = getLocaleMessageValue(v);
      } else {
        value2[key] = v;
      }
    });
    return value2;
  }
  const ESC = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "&": "&amp;"
  };
  function escape(s) {
    return s.replace(/[<>"&]/g, escapeChar);
  }
  function escapeChar(a) {
    return ESC[a] || a;
  }
  function getMessageFunctionDetails(func2) {
    const argString = func2.source ? `("${escape(func2.source)}")` : `(?)`;
    return {
      _custom: {
        type: "function",
        display: `<span>ƒ</span> ${argString}`
      }
    };
  }
  function registerScope(payload, i18n2) {
    payload.rootNodes.push({
      id: "global",
      label: "Global Scope"
    });
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    for (const [keyInstance, instance] of i18n2.__instances) {
      const composer = i18n2.mode === "composition" ? instance : instance.__composer;
      if (global2 === composer) {
        continue;
      }
      const label = keyInstance.type.name || keyInstance.type.displayName || keyInstance.type.__file;
      payload.rootNodes.push({
        id: composer.id.toString(),
        label: `${label} Scope`
      });
    }
  }
  function getComposer$1(nodeId, i18n2) {
    if (nodeId === "global") {
      return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    } else {
      const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
      if (instance) {
        return i18n2.mode === "composition" ? instance : instance.__composer;
      } else {
        return null;
      }
    }
  }
  function inspectScope(payload, i18n2) {
    const composer = getComposer$1(payload.nodeId, i18n2);
    if (composer) {
      payload.state = makeScopeInspectState(composer);
    }
  }
  function makeScopeInspectState(composer) {
    const state = {};
    const localeType = "Locale related info";
    const localeStates = [
      {
        type: localeType,
        key: "locale",
        editable: true,
        value: composer.locale.value
      },
      {
        type: localeType,
        key: "fallbackLocale",
        editable: true,
        value: composer.fallbackLocale.value
      },
      {
        type: localeType,
        key: "availableLocales",
        editable: false,
        value: composer.availableLocales
      },
      {
        type: localeType,
        key: "inheritLocale",
        editable: true,
        value: composer.inheritLocale
      }
    ];
    state[localeType] = localeStates;
    const localeMessagesType = "Locale messages info";
    const localeMessagesStates = [
      {
        type: localeMessagesType,
        key: "messages",
        editable: false,
        value: getLocaleMessageValue(composer.messages.value)
      }
    ];
    state[localeMessagesType] = localeMessagesStates;
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
    return state;
  }
  function addTimelineEvent(event, payload) {
    if (devtoolsApi) {
      let groupId;
      if (payload && "groupId" in payload) {
        groupId = payload.groupId;
        delete payload.groupId;
      }
      devtoolsApi.addTimelineEvent({
        layerId: "vue-i18n-timeline",
        event: {
          title: event,
          groupId,
          time: Date.now(),
          meta: {},
          data: payload || {},
          logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
        }
      });
    }
  }
  function editScope(payload, i18n2) {
    const composer = getComposer$1(payload.nodeId, i18n2);
    if (composer) {
      const [field] = payload.path;
      if (field === "locale" && isString(payload.state.value)) {
        composer.locale.value = payload.state.value;
      } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject$1(payload.state.value))) {
        composer.fallbackLocale.value = payload.state.value;
      } else if (field === "inheritLocale" && isBoolean$1(payload.state.value)) {
        composer.inheritLocale = payload.state.value;
      }
    }
  }
  function defineMixin(vuei18n, composer, i18n2) {
    return {
      beforeCreate() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        const options = this.$options;
        if (options.i18n) {
          const optionsI18n = options.i18n;
          if (options.__i18n) {
            optionsI18n.__i18n = options.__i18n;
          }
          optionsI18n.__root = composer;
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, optionsI18n);
          } else {
            optionsI18n.__injectWithOption = true;
            this.$i18n = createVueI18n(optionsI18n);
          }
        } else if (options.__i18n) {
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, options);
          } else {
            this.$i18n = createVueI18n({
              __i18n: options.__i18n,
              __injectWithOption: true,
              __root: composer
            });
          }
        } else {
          this.$i18n = vuei18n;
        }
        vuei18n.__onComponentInstanceCreated(this.$i18n);
        i18n2.__setInstance(instance, this.$i18n);
        this.$t = (...args) => this.$i18n.t(...args);
        this.$rt = (...args) => this.$i18n.rt(...args);
        this.$tc = (...args) => this.$i18n.tc(...args);
        this.$te = (key, locale) => this.$i18n.te(key, locale);
        this.$d = (...args) => this.$i18n.d(...args);
        this.$n = (...args) => this.$i18n.n(...args);
        this.$tm = (key) => this.$i18n.tm(key);
      },
      mounted() {
        {
          this.$el.__VUE_I18N__ = this.$i18n.__composer;
          const emitter = this.__v_emitter = createEmitter();
          const _vueI18n = this.$i18n;
          _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          emitter.on("*", addTimelineEvent);
        }
      },
      beforeUnmount() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        {
          if (this.__v_emitter) {
            this.__v_emitter.off("*", addTimelineEvent);
            delete this.__v_emitter;
          }
          const _vueI18n = this.$i18n;
          _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
          delete this.$el.__VUE_I18N__;
        }
        delete this.$t;
        delete this.$rt;
        delete this.$tc;
        delete this.$te;
        delete this.$d;
        delete this.$n;
        delete this.$tm;
        i18n2.__deleteInstance(instance);
        delete this.$i18n;
      }
    };
  }
  function mergeToRoot(root, options) {
    root.locale = options.locale || root.locale;
    root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
    root.missing = options.missing || root.missing;
    root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = options.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = options.sync || root.sync;
    root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
    const messages2 = getLocaleMessages(root.locale, {
      messages: options.messages,
      __i18n: options.__i18n
    });
    Object.keys(messages2).forEach((locale) => root.mergeLocaleMessage(locale, messages2[locale]));
    if (options.datetimeFormats) {
      Object.keys(options.datetimeFormats).forEach((locale) => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
    }
    if (options.numberFormats) {
      Object.keys(options.numberFormats).forEach((locale) => root.mergeNumberFormat(locale, options.numberFormats[locale]));
    }
    return root;
  }
  function createI18n(options = {}) {
    const __legacyMode = isBoolean$1(options.legacy) ? options.legacy : true;
    const __globalInjection = !!options.globalInjection;
    const __instances = /* @__PURE__ */ new Map();
    const __global = __legacyMode ? createVueI18n(options) : createComposer(options);
    const symbol = makeSymbol("vue-i18n");
    const i18n2 = {
      // mode
      get mode() {
        return __legacyMode ? "legacy" : "composition";
      },
      // install plugin
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (!__legacyMode && __globalInjection) {
          injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        if (__legacyMode) {
          app.mixin(defineMixin(__global, __global.__composer, i18n2));
        }
        {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(
              21
              /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
            );
          }
          const emitter = createEmitter();
          if (__legacyMode) {
            const _vueI18n = __global;
            _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          } else {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      // global accessor
      get global() {
        return __global;
      },
      // @internal
      __instances,
      // @internal
      __getInstance(component) {
        return __instances.get(component) || null;
      },
      // @internal
      __setInstance(component, instance) {
        __instances.set(component, instance);
      },
      // @internal
      __deleteInstance(component) {
        __instances.delete(component);
      }
    };
    return i18n2;
  }
  function useI18n(options = {}) {
    const instance = vue.getCurrentInstance();
    if (instance == null) {
      throw createI18nError(
        16
        /* MUST_BE_CALL_SETUP_TOP */
      );
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
      throw createI18nError(
        17
        /* NOT_INSLALLED */
      );
    }
    const i18n2 = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    if (!i18n2) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
    if (scope === "global") {
      let messages2 = isObject$1(options.messages) ? options.messages : {};
      if ("__i18nGlobal" in instance.type) {
        messages2 = getLocaleMessages(global2.locale.value, {
          messages: messages2,
          __i18n: instance.type.__i18nGlobal
        });
      }
      const locales = Object.keys(messages2);
      if (locales.length) {
        locales.forEach((locale) => {
          global2.mergeLocaleMessage(locale, messages2[locale]);
        });
      }
      if (isObject$1(options.datetimeFormats)) {
        const locales2 = Object.keys(options.datetimeFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
          });
        }
      }
      if (isObject$1(options.numberFormats)) {
        const locales2 = Object.keys(options.numberFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeNumberFormat(locale, options.numberFormats[locale]);
          });
        }
      }
      return global2;
    }
    if (scope === "parent") {
      let composer2 = getComposer(i18n2, instance, options.__useComponent);
      if (composer2 == null) {
        {
          warn(getWarnMessage(
            12
            /* NOT_FOUND_PARENT_SCOPE */
          ));
        }
        composer2 = global2;
      }
      return composer2;
    }
    if (i18n2.mode === "legacy") {
      throw createI18nError(
        18
        /* NOT_AVAILABLE_IN_LEGACY_MODE */
      );
    }
    const i18nInternal = i18n2;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
      const type2 = instance.type;
      const composerOptions = assign({}, options);
      if (type2.__i18n) {
        composerOptions.__i18n = type2.__i18n;
      }
      if (global2) {
        composerOptions.__root = global2;
      }
      composer = createComposer(composerOptions);
      setupLifeCycle(i18nInternal, instance, composer);
      i18nInternal.__setInstance(instance, composer);
    }
    return composer;
  }
  function getComposer(i18n2, target, useComponent = false) {
    let composer = null;
    const root = target.root;
    let current = target.parent;
    while (current != null) {
      const i18nInternal = i18n2;
      if (i18n2.mode === "composition") {
        composer = i18nInternal.__getInstance(current);
      } else {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
        }
        if (useComponent && composer && !composer[InejctWithOption]) {
          composer = null;
        }
      }
      if (composer != null) {
        break;
      }
      if (root === current) {
        break;
      }
      current = current.parent;
    }
    return composer;
  }
  function setupLifeCycle(i18n2, target, composer) {
    let emitter = null;
    vue.onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    vue.onUnmounted(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
    }, target);
  }
  const globalExportProps = [
    "locale",
    "fallbackLocale",
    "availableLocales"
  ];
  const globalExportMethods = ["t", "rt", "d", "n", "tm"];
  function injectGlobalFields(app, composer) {
    const i18n2 = /* @__PURE__ */ Object.create(null);
    globalExportProps.forEach((prop) => {
      const desc = Object.getOwnPropertyDescriptor(composer, prop);
      if (!desc) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const wrap = vue.isRef(desc.value) ? {
        get() {
          return desc.value.value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(val) {
          desc.value.value = val;
        }
      } : {
        get() {
          return desc.get && desc.get();
        }
      };
      Object.defineProperty(i18n2, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n2;
    globalExportMethods.forEach((method) => {
      const desc = Object.getOwnPropertyDescriptor(composer, method);
      if (!desc || !desc.value) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
  }
  {
    initFeatureFlags();
  }
  {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  const _sfc_main$H = {
    __name: "navBar",
    props: {
      activeIndex: {
        type: Number,
        default: 0
      }
    },
    emits: ["update:activeIndex"],
    setup(__props, { emit: __emit }) {
      const {
        t,
        locale
      } = useI18n();
      const props2 = __props;
      const emit = __emit;
      const navList = [
        {
          icon: "/static/navBar/home.png",
          path: "/pages/home/index",
          activeIcon: "/static/navBar/activeHome.png",
          auth: false
        },
        {
          icon: "/static/navBar/booking.png",
          path: "/pages/appointment/index",
          activeIcon: "/static/navBar/activeBooking.png",
          auth: true
        },
        {
          icon: "/static/navBar/user.png",
          path: "/pages/user/index",
          activeIcon: "/static/navBar/activeuser.png",
          auth: true
        }
      ];
      const handleClick = (index2) => {
        emit("update:activeIndex", index2);
        if (props2.activeIndex === index2)
          return;
        if (navList[index2].auth) {
          if (!Cache$1.has(LOGIN_STATUS, false)) {
            uni.showToast({
              title: t("login.prompt"),
              icon: "none",
              duration: 1e3
            });
            setTimeout(function() {
              uni.navigateTo({
                url: "/pages/login/index",
                animationType: "none"
              });
            }, 1e3);
            return;
          }
        }
        uni.navigateTo({
          url: navList[index2].path,
          animationType: "none"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
          vue.createElementVNode("view", { class: "navBar" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(navList, (item, index2) => {
                return vue.createElementVNode("view", {
                  key: index2,
                  onClick: ($event) => handleClick(index2),
                  class: "navItem"
                }, [
                  vue.createElementVNode("image", {
                    src: __props.activeIndex === index2 ? item.activeIcon : item.icon,
                    class: "icon"
                  }, null, 8, ["src"])
                ], 8, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "navHeight" })
        ]);
      };
    }
  };
  const navBar = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-3075e18a"], ["__file", "C:/Users/Aibol/Desktop/work/host/components/navBar.vue"]]);
  const _sfc_main$G = {
    props: {
      // 父组件通过该参数决定背景颜色
      useThemeColor: {
        type: Boolean,
        default: false
        // 默认背景为白色
      }
    },
    data() {
      return {
        statusBarHeight: "",
        // 系统状态栏高度
        themeColor: "#6AE75A"
        // 主题颜色
      };
    },
    created() {
      this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
      this.themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme-color") || "#000000";
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "statusBar",
        style: vue.normalizeStyle({
          height: $data.statusBarHeight + "px",
          backgroundColor: $props.useThemeColor ? $data.themeColor : "#ffffff"
        })
      },
      null,
      4
      /* STYLE */
    );
  }
  const statusBar = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$y], ["__scopeId", "data-v-826a6678"], ["__file", "C:/Users/Aibol/Desktop/work/host/components/statusBar.vue"]]);
  function toLogin() {
    const {
      t,
      locale
    } = useI18n();
    uni.showToast({
      title: t("login.prompt"),
      icon: "none",
      duration: 1e3
    });
    setTimeout(function() {
      uni.navigateTo({
        url: "/pages/login/index",
        animationType: "none"
      });
    }, 2e3);
  }
  function baseRequest(url2, method, data, {
    noAuth = false,
    noVerify = false
  }) {
    let Url = HTTP_REQUEST_URL, header = HEADER;
    if (!data) {
      data = {};
    }
    let user = uni.getStorageSync("USER_INFO");
    if (user && user.token)
      header[TOKENNAME] = "Bearer " + user.token;
    return new Promise((reslove, reject) => {
      uni.request({
        url: Url + url2,
        method: method || "GET",
        header,
        data: data || {},
        success: (res) => {
          if (res.statusCode === 401) {
            formatAppLog("log", "at utils/request.js:71", "未授权，请重新登录");
            toLogin();
            reject({
              message: "未授权，请重新登录",
              data: res.data
            });
            return;
          }
          formatAppLog("log", "at utils/request.js:79", Url + url2, data, res.data);
          if (noVerify) {
            formatAppLog("log", "at utils/request.js:81", Url + url2, data, res.data);
            reslove(res.data, res);
          }
          reslove(res.data, res);
        }
      });
    });
  }
  const request = {};
  ["options", "get", "post", "put", "head", "delete", "trace", "connect"].forEach((method) => {
    request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {});
  });
  function swiperList(data) {
    return request.post("/mms-api/swiper/list", data, { noAuth: true });
  }
  function newsList(data) {
    return request.post("/mms-api/news/list", data, { noAuth: true });
  }
  function getNews(data) {
    return request.post("/mms-api/news", data, { noAuth: true });
  }
  const _sfc_main$F = {
    __name: "index",
    setup(__props) {
      const {
        t,
        locale
      } = useI18n();
      const userName = vue.ref("");
      const languageList = [
        t("locale.kk"),
        t("locale.zh-hans"),
        t("locale.ru"),
        t("locale.en")
      ];
      const languageCodes = ["kk", "zh-Hans", "ru", "en"];
      const currentLanguageIndex = vue.ref(0);
      const selectedLocale = vue.ref("");
      const swiperData = vue.ref([]);
      const newsData = vue.ref([]);
      const menuList = vue.computed(() => [
        {
          name: t("home.booking"),
          path: "/pages/appointment/index",
          img: "/static/booking.png"
        },
        {
          name: t("home.medicine"),
          path: "/pages/medicine/index",
          img: "/static/pharmacy.png"
        },
        {
          name: t("home.video"),
          path: "/static/video.png",
          img: "/static/video.png"
        },
        {
          name: t("home.news"),
          path: "/pages/news/index",
          img: "/static/news.png"
        },
        {
          name: t("home.question"),
          path: "/static/question.png",
          img: "/static/question.png"
        }
      ]);
      const menuClick = (path) => {
        uni.navigateTo({
          url: path,
          animationType: "none"
        });
      };
      const bindPickerChange = (e) => {
        const selectedIndex = e.detail.value;
        currentLanguageIndex.value = selectedIndex;
        selectedLocale.value = languageCodes[selectedIndex];
        uni.showModal({
          content: t("index.language-change-confirm"),
          success: (res) => {
            if (res.confirm) {
              uni.setLocale(selectedLocale.value);
              locale.value = selectedLocale.value;
              getSwiperList();
              getNewsList();
            }
          }
        });
      };
      const getSwiperList = () => {
        const data = {
          page: 1,
          pageSize: 50
        };
        swiperList(data).then((res) => {
          if (res.code === 0) {
            const currentLocale = uni.getLocale();
            const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
            const bannerKey = `banner${languageKey}`;
            swiperData.value = res.data.data.map((item) => ({
              id: item.id,
              title: item[`title${languageKey}`],
              banner: item[bannerKey],
              jumpUrl: item.jumpUrl
            })).filter((item) => item.banner);
          }
        }).catch((err) => {
          formatAppLog("error", "at pages/home/index.vue:183", err);
        });
      };
      const getNewsList = () => {
        const data = {
          page: 1,
          pageSize: 50
        };
        newsList(data).then((res) => {
          if (res.code === 0) {
            formatAppLog("log", "at pages/home/index.vue:194", res.data);
            const currentLocale = uni.getLocale();
            const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
            newsData.value = res.data.data.map((item) => ({
              id: item.id,
              title: item[`title${languageKey}`],
              converUrl: item.coverUrl
            }));
            formatAppLog("log", "at pages/home/index.vue:204", newsData.value);
          }
        }).catch((err) => {
          formatAppLog("error", "at pages/home/index.vue:207", err);
        });
      };
      const gotoDetail = (id) => {
        formatAppLog("log", "at pages/home/index.vue:212", id);
        uni.navigateTo({
          url: "/pages/news/components/details?id=" + id,
          animationType: "none"
        });
      };
      onLoad(() => {
        getSwiperList();
        getNewsList();
      });
      onShow(() => {
        if (Cache$1.has(USER_INFO, false)) {
          userName.value = Cache$1.get(USER_INFO).nickname;
          formatAppLog("log", "at pages/home/index.vue:227", userName.value);
          formatAppLog("log", "at pages/home/index.vue:228", Cache$1.has(USER_INFO, false));
        }
      });
      return (_ctx, _cache) => {
        const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0$a);
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
          vue.createVNode(statusBar, { useThemeColor: true }),
          vue.createElementVNode("view", { class: "topBar" }, [
            vue.createElementVNode("view", { class: "globalLanguage" }, [
              vue.createElementVNode("picker", {
                onChange: bindPickerChange,
                value: currentLanguageIndex.value,
                range: languageList
              }, [
                vue.createElementVNode("view", { class: "uni-input" }, [
                  vue.createElementVNode("image", {
                    class: "globalSvg",
                    src: "/static/global.svg"
                  })
                ])
              ], 40, ["value"])
            ]),
            vue.createElementVNode("view", { class: "helloTag" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(vue.unref(t)("home.hello")),
                1
                /* TEXT */
              ),
              !vue.unref(Cache$1).has(vue.unref(USER_INFO), false) ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  class: "logIn",
                  onClick: _cache[0] || (_cache[0] = ($event) => menuClick("/pages/login/index"))
                },
                vue.toDisplayString(vue.unref(t)("login.login")) + " / " + vue.toDisplayString(vue.unref(t)("login.register")),
                1
                /* TEXT */
              )) : (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 1,
                  class: "userName"
                },
                vue.toDisplayString(userName.value) + " 👋",
                1
                /* TEXT */
              ))
            ]),
            vue.createElementVNode("view", { class: "swiperContent" }, [
              vue.createElementVNode("view", { class: "uni-margin-wrap" }, [
                vue.createElementVNode("swiper", {
                  class: "swiper",
                  circular: "",
                  "indicator-dots": true,
                  autoplay: false,
                  interval: 3e3
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(swiperData.value, (item, index2) => {
                      return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index2 }, [
                        vue.createElementVNode("view", { class: "swiper-item" }, [
                          vue.createElementVNode("image", {
                            class: "swiperImage",
                            src: item.banner
                          }, null, 8, ["src"])
                        ])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "menuContent" }, [
            vue.createElementVNode("view", { class: "menuBox" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(menuList.value, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "menuList",
                    key: index2,
                    onClick: ($event) => menuClick(item.path)
                  }, [
                    vue.createElementVNode("image", {
                      class: "menuImage",
                      src: item.img,
                      mode: ""
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      { class: "menuText" },
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("view", { class: "newsContent" }, [
            vue.createElementVNode(
              "text",
              { class: "newsTitle" },
              vue.toDisplayString(vue.unref(t)("home.news")),
              1
              /* TEXT */
            ),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(newsData.value, (item, index2) => {
                return vue.openBlock(), vue.createBlock(
                  _component_uni_card,
                  {
                    padding: "0",
                    spacing: "0",
                    key: index2
                  },
                  {
                    cover: vue.withCtx(() => [
                      vue.createElementVNode("view", {
                        class: "custom-cover",
                        onClick: ($event) => gotoDetail(item.id)
                      }, [
                        vue.createElementVNode("image", {
                          class: "cover-image",
                          src: item.converUrl
                        }, null, 8, ["src"]),
                        vue.createElementVNode("view", { class: "cover-content" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "uni-subtitle uni-white" },
                            vue.toDisplayString(item.title),
                            1
                            /* TEXT */
                          )
                        ])
                      ], 8, ["onClick"])
                    ]),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createVNode(navBar, { activeIndex: 0 })
        ]);
      };
    }
  };
  const PagesHomeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/home/index.vue"]]);
  const mpMixin = {};
  function email(value2) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value2);
  }
  function mobile(value2) {
    return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value2);
  }
  function url(value2) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value2);
  }
  function date(value2) {
    if (!value2)
      return false;
    if (number(value2))
      value2 = +value2;
    return !/Invalid|NaN/.test(new Date(value2).toString());
  }
  function dateISO(value2) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value2);
  }
  function number(value2) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value2);
  }
  function string$1(value2) {
    return typeof value2 === "string";
  }
  function digits(value2) {
    return /^\d+$/.test(value2);
  }
  function idCard(value2) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value2
    );
  }
  function carNo(value2) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value2.length === 7) {
      return creg.test(value2);
    }
    if (value2.length === 8) {
      return xreg.test(value2);
    }
    return false;
  }
  function amount(value2) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value2);
  }
  function chinese(value2) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value2);
  }
  function letter(value2) {
    return /^[a-zA-Z]*$/.test(value2);
  }
  function enOrNum(value2) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value2);
  }
  function contains(value2, param) {
    return value2.indexOf(param) >= 0;
  }
  function range$2(value2, param) {
    return value2 >= param[0] && value2 <= param[1];
  }
  function rangeLength(value2, param) {
    return value2.length >= param[0] && value2.length <= param[1];
  }
  function landline(value2) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value2);
  }
  function empty(value2) {
    switch (typeof value2) {
      case "undefined":
        return true;
      case "string":
        if (value2.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value2)
          return true;
        break;
      case "number":
        if (value2 === 0 || isNaN(value2))
          return true;
        break;
      case "object":
        if (value2 === null || value2.length === 0)
          return true;
        for (const i in value2) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value2) {
    if (typeof value2 === "string") {
      try {
        const obj = JSON.parse(value2);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value2) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value2);
    }
    return Object.prototype.toString.call(value2) === "[object Array]";
  }
  function object(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  function code(value2, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value2);
  }
  function func(value2) {
    return typeof value2 === "function";
  }
  function promise(value2) {
    return object(value2) && func(value2.then) && func(value2.catch);
  }
  function image(value2) {
    const newValue = value2.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value2) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value2);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    amount,
    array,
    carNo,
    chinese,
    code,
    contains,
    date,
    dateISO,
    digits,
    email,
    empty,
    enOrNum,
    func,
    idCard,
    image,
    jsonString,
    landline,
    letter,
    mobile,
    number,
    object,
    promise,
    range: range$2,
    rangeLength,
    regExp,
    string: string$1,
    url,
    video
  }, Symbol.toStringTag, { value: "Module" }));
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uv-ui-tools/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times$1(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times$1);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times$1(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times$1(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times$1(result, -1);
    }
    return result;
  }
  function range$1(min = 0, max = 0, value2 = 0) {
    return Math.max(min, Math.min(max, Number(value2)));
  }
  function getPx(value2, unit = false) {
    if (number(value2)) {
      return unit ? `${value2}px` : Number(value2);
    }
    if (/(rpx|upx)$/.test(value2)) {
      return unit ? `${uni.upx2px(parseInt(value2))}px` : Number(uni.upx2px(parseInt(value2)));
    }
    return unit ? `${parseInt(value2)}px` : parseInt(value2);
  }
  function sleep(value2 = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value2);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  function addUnit(value2 = "auto", unit = ((_b) => (_b = ((_a) => (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config)()) == null ? void 0 : _b.unit)() ? ((_d) => (_d = ((_c) => (_c = uni == null ? void 0 : uni.$uv) == null ? void 0 : _c.config)()) == null ? void 0 : _d.unit)() : "px") {
    value2 = String(value2);
    return number(value2) ? `${value2}${unit}` : value2;
  }
  function deepClone(obj, cache2 = /* @__PURE__ */ new WeakMap()) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (cache2.has(obj))
      return cache2.get(obj);
    let clone;
    if (obj instanceof Date) {
      clone = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      clone = new RegExp(obj);
    } else if (obj instanceof Map) {
      clone = new Map(Array.from(obj, ([key, value2]) => [key, deepClone(value2, cache2)]));
    } else if (obj instanceof Set) {
      clone = new Set(Array.from(obj, (value2) => deepClone(value2, cache2)));
    } else if (Array.isArray(obj)) {
      clone = obj.map((value2) => deepClone(value2, cache2));
    } else if (Object.prototype.toString.call(obj) === "[object Object]") {
      clone = Object.create(Object.getPrototypeOf(obj));
      cache2.set(obj, clone);
      for (const [key, value2] of Object.entries(obj)) {
        clone[key] = deepClone(value2, cache2);
      }
    } else {
      clone = Object.assign({}, obj);
    }
    cache2.set(obj, clone);
    return clone;
  }
  function deepMerge$1(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || target === null || typeof source !== "object" || source === null)
      return target;
    const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      const sourceValue = source[prop];
      const targetValue = merged[prop];
      if (sourceValue instanceof Date) {
        merged[prop] = new Date(sourceValue);
      } else if (sourceValue instanceof RegExp) {
        merged[prop] = new RegExp(sourceValue);
      } else if (sourceValue instanceof Map) {
        merged[prop] = new Map(sourceValue);
      } else if (sourceValue instanceof Set) {
        merged[prop] = new Set(sourceValue);
      } else if (typeof sourceValue === "object" && sourceValue !== null) {
        merged[prop] = deepMerge$1(targetValue, sourceValue);
      } else {
        merged[prop] = sourceValue;
      }
    }
    return merged;
  }
  function error(err) {
    {
      formatAppLog("error", "at uni_modules/uv-ui-tools/libs/function/index.js:250", `uvui提示：${err}`);
    }
  }
  function randomArray(array3 = []) {
    return array3.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date3;
    if (!dateTime) {
      date3 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime == null ? void 0 : dateTime.toString().trim())) {
      date3 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date3 = new Date(Number(dateTime));
    } else if (typeof dateTime === "string" && dateTime.includes("-") && !dateTime.includes("T")) {
      date3 = new Date(dateTime.replace(/-/g, "/"));
    } else {
      date3 = new Date(dateTime);
    }
    const timeSource = {
      "y": date3.getFullYear().toString(),
      // 年
      "m": (date3.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date3.getDate().toString().padStart(2, "0"),
      // 日
      "h": date3.getHours().toString().padStart(2, "0"),
      // 时
      "M": date3.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date3.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format2 = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value2 = data[key];
      if (["", void 0, null].indexOf(value2) >= 0) {
        continue;
      }
      if (value2.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value2.length; i++) {
              _result.push(`${key}[${i}]=${value2[i]}`);
            }
            break;
          case "brackets":
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value2.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value2.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value2}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type2 = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
      type2 = "success";
    let iconName = "";
    switch (type2) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number22, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number22 = `${number22}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number22) ? 0 : +number22;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value2, unit = true) {
    const valueNum = parseInt(value2);
    if (unit) {
      if (/s$/.test(value2))
        return value2;
      return value2 > 30 ? `${value2}ms` : `${value2}s`;
    }
    if (/ms$/.test(value2))
      return valueNum;
    if (/s$/.test(value2))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value2) {
    return `00${value2}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = $parent.call(instance, "uv-form-item");
    const form = $parent.call(instance, "uv-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value2) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value2);
    } else {
      obj[key] = value2;
    }
  }
  function page() {
    var _a;
    const pages2 = getCurrentPages();
    const route2 = (_a = pages2[pages2.length - 1]) == null ? void 0 : _a.route;
    return `/${route2 ? route2 : ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function getHistoryPage(back = 0) {
    const pages2 = getCurrentPages();
    const len = pages2.length;
    return pages2[len - 1 + back];
  }
  function setConfig({
    props: props2 = {},
    config = {},
    color = {},
    zIndex = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$uv;
    uni.$uv.config = deepMerge2(uni.$uv.config, config);
    uni.$uv.props = deepMerge2(uni.$uv.props, props2);
    uni.$uv.color = deepMerge2(uni.$uv.color, color);
    uni.$uv.zIndex = deepMerge2(uni.$uv.zIndex, zIndex);
  }
  const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge: deepMerge$1,
    error,
    formValidate,
    getDuration,
    getHistoryPage,
    getProperty,
    getPx,
    guid,
    os,
    padZero,
    page,
    pages,
    priceFormat,
    queryParams,
    random,
    randomArray,
    range: range$1,
    setConfig,
    setProperty,
    sleep,
    sys,
    timeFormat,
    timeFrom,
    toast,
    trim,
    type2icon
  }, Symbol.toStringTag, { value: "Module" }));
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false,
        // 是否需要拦截
        events: {}
        // 页面间通信接口，用于监听被打开页面发送到当前页面的数据。hbuilderx 2.8.9+ 开始支持。
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = deepMerge$1(this.config, options);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig.url === page())
        return;
      if (params.intercept) {
        mergeConfig.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = deepMerge$1(this.config, mergeConfig);
      if (typeof mergeConfig.intercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          mergeConfig.intercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config) {
      const {
        url: url2,
        type: type2,
        delta,
        animationType,
        animationDuration,
        events
      } = config;
      if (config.type == "navigateTo" || config.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration,
          events
        });
      }
      if (config.type == "redirectTo" || config.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config.type == "switchTab" || config.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config.type == "reLaunch" || config.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config.type == "navigateBack" || config.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$uv.getRect = this.$uvGetRect;
    },
    created() {
      this.$uv.getRect = this.$uvGetRect;
    },
    computed: {
      $uv() {
        var _a, _b;
        return {
          ...index,
          test,
          route,
          debounce,
          throttle,
          unit: (_b = (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config) == null ? void 0 : _b.unit
        };
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `uv-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          uni[this.linkType]({
            url: url2
          });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uvGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = this.$uv.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uvOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    },
    // 兼容vue3
    unmounted() {
      if (this.parent && array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const icons = {
    "uvicon-level": "e68f",
    "uvicon-checkbox-mark": "e659",
    "uvicon-folder": "e694",
    "uvicon-movie": "e67c",
    "uvicon-star-fill": "e61e",
    "uvicon-star": "e618",
    "uvicon-phone-fill": "e6ac",
    "uvicon-phone": "e6ba",
    "uvicon-apple-fill": "e635",
    "uvicon-backspace": "e64d",
    "uvicon-attach": "e640",
    "uvicon-empty-data": "e671",
    "uvicon-empty-address": "e68a",
    "uvicon-empty-favor": "e662",
    "uvicon-empty-car": "e657",
    "uvicon-empty-order": "e66b",
    "uvicon-empty-list": "e672",
    "uvicon-empty-search": "e677",
    "uvicon-empty-permission": "e67d",
    "uvicon-empty-news": "e67e",
    "uvicon-empty-history": "e685",
    "uvicon-empty-coupon": "e69b",
    "uvicon-empty-page": "e60e",
    "uvicon-empty-wifi-off": "e6cc",
    "uvicon-reload": "e627",
    "uvicon-order": "e695",
    "uvicon-server-man": "e601",
    "uvicon-search": "e632",
    "uvicon-more-dot-fill": "e66f",
    "uvicon-scan": "e631",
    "uvicon-map": "e665",
    "uvicon-map-fill": "e6a8",
    "uvicon-tags": "e621",
    "uvicon-tags-fill": "e613",
    "uvicon-eye": "e664",
    "uvicon-eye-fill": "e697",
    "uvicon-eye-off": "e69c",
    "uvicon-eye-off-outline": "e688",
    "uvicon-mic": "e66d",
    "uvicon-mic-off": "e691",
    "uvicon-calendar": "e65c",
    "uvicon-trash": "e623",
    "uvicon-trash-fill": "e6ce",
    "uvicon-play-left": "e6bf",
    "uvicon-play-right": "e6b3",
    "uvicon-minus": "e614",
    "uvicon-plus": "e625",
    "uvicon-info-circle": "e69f",
    "uvicon-info-circle-fill": "e6a7",
    "uvicon-question-circle": "e622",
    "uvicon-question-circle-fill": "e6bc",
    "uvicon-close": "e65a",
    "uvicon-checkmark": "e64a",
    "uvicon-checkmark-circle": "e643",
    "uvicon-checkmark-circle-fill": "e668",
    "uvicon-setting": "e602",
    "uvicon-setting-fill": "e6d0",
    "uvicon-heart": "e6a2",
    "uvicon-heart-fill": "e68b",
    "uvicon-camera": "e642",
    "uvicon-camera-fill": "e650",
    "uvicon-more-circle": "e69e",
    "uvicon-more-circle-fill": "e684",
    "uvicon-chat": "e656",
    "uvicon-chat-fill": "e63f",
    "uvicon-bag": "e647",
    "uvicon-error-circle": "e66e",
    "uvicon-error-circle-fill": "e655",
    "uvicon-close-circle": "e64e",
    "uvicon-close-circle-fill": "e666",
    "uvicon-share": "e629",
    "uvicon-share-fill": "e6bb",
    "uvicon-share-square": "e6c4",
    "uvicon-shopping-cart": "e6cb",
    "uvicon-shopping-cart-fill": "e630",
    "uvicon-bell": "e651",
    "uvicon-bell-fill": "e604",
    "uvicon-list": "e690",
    "uvicon-list-dot": "e6a9",
    "uvicon-zhifubao-circle-fill": "e617",
    "uvicon-weixin-circle-fill": "e6cd",
    "uvicon-weixin-fill": "e620",
    "uvicon-qq-fill": "e608",
    "uvicon-qq-circle-fill": "e6b9",
    "uvicon-moments-circel-fill": "e6c2",
    "uvicon-moments": "e6a0",
    "uvicon-car": "e64f",
    "uvicon-car-fill": "e648",
    "uvicon-warning-fill": "e6c7",
    "uvicon-warning": "e6c1",
    "uvicon-clock-fill": "e64b",
    "uvicon-clock": "e66c",
    "uvicon-edit-pen": "e65d",
    "uvicon-edit-pen-fill": "e679",
    "uvicon-email": "e673",
    "uvicon-email-fill": "e683",
    "uvicon-minus-circle": "e6a5",
    "uvicon-plus-circle": "e603",
    "uvicon-plus-circle-fill": "e611",
    "uvicon-file-text": "e687",
    "uvicon-file-text-fill": "e67f",
    "uvicon-pushpin": "e6d1",
    "uvicon-pushpin-fill": "e6b6",
    "uvicon-grid": "e68c",
    "uvicon-grid-fill": "e698",
    "uvicon-play-circle": "e6af",
    "uvicon-play-circle-fill": "e62a",
    "uvicon-pause-circle-fill": "e60c",
    "uvicon-pause": "e61c",
    "uvicon-pause-circle": "e696",
    "uvicon-gift-fill": "e6b0",
    "uvicon-gift": "e680",
    "uvicon-kefu-ermai": "e660",
    "uvicon-server-fill": "e610",
    "uvicon-coupon-fill": "e64c",
    "uvicon-coupon": "e65f",
    "uvicon-integral": "e693",
    "uvicon-integral-fill": "e6b1",
    "uvicon-home-fill": "e68e",
    "uvicon-home": "e67b",
    "uvicon-account": "e63a",
    "uvicon-account-fill": "e653",
    "uvicon-thumb-down-fill": "e628",
    "uvicon-thumb-down": "e60a",
    "uvicon-thumb-up": "e612",
    "uvicon-thumb-up-fill": "e62c",
    "uvicon-lock-fill": "e6a6",
    "uvicon-lock-open": "e68d",
    "uvicon-lock-opened-fill": "e6a1",
    "uvicon-lock": "e69d",
    "uvicon-red-packet": "e6c3",
    "uvicon-photo-fill": "e6b4",
    "uvicon-photo": "e60d",
    "uvicon-volume-off-fill": "e6c8",
    "uvicon-volume-off": "e6bd",
    "uvicon-volume-fill": "e624",
    "uvicon-volume": "e605",
    "uvicon-download": "e670",
    "uvicon-arrow-up-fill": "e636",
    "uvicon-arrow-down-fill": "e638",
    "uvicon-play-left-fill": "e6ae",
    "uvicon-play-right-fill": "e6ad",
    "uvicon-arrow-downward": "e634",
    "uvicon-arrow-leftward": "e63b",
    "uvicon-arrow-rightward": "e644",
    "uvicon-arrow-upward": "e641",
    "uvicon-arrow-down": "e63e",
    "uvicon-arrow-right": "e63c",
    "uvicon-arrow-left": "e646",
    "uvicon-arrow-up": "e633",
    "uvicon-skip-back-left": "e6c5",
    "uvicon-skip-forward-right": "e61f",
    "uvicon-arrow-left-double": "e637",
    "uvicon-man": "e675",
    "uvicon-woman": "e626",
    "uvicon-en": "e6b8",
    "uvicon-twitte": "e607",
    "uvicon-twitter-circle-fill": "e6cf"
  };
  const props$m = {
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: "#606266"
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: "16px"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: null
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uvicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "15px"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: "3px"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "aspectFit"
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: false
      },
      ...(_f = (_e = uni.$uv) == null ? void 0 : _e.props) == null ? void 0 : _f.icon
    }
  };
  const _sfc_main$E = {
    name: "uv-icon",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$m],
    data() {
      return {
        colorType: [
          "primary",
          "success",
          "info",
          "error",
          "warning"
        ]
      };
    },
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix);
        classes.push(this.customPrefix + "-" + this.name);
        if (this.color && this.colorType.includes(this.color))
          classes.push("uv-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.$uv.addUnit(this.size),
          lineHeight: this.$uv.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$uv.addUnit(this.top)
        };
        if (this.color && !this.colorType.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        const isBase64 = this.name.indexOf("data:") > -1 && this.name.indexOf("base64") > -1;
        return this.name.indexOf("/") !== -1 || isBase64;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$uv.addUnit(this.width) : this.$uv.addUnit(this.size);
        style.height = this.height ? this.$uv.addUnit(this.height) : this.$uv.addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        const code2 = icons["uvicon-" + this.name];
        return code2 ? unescape(`%u${code2}`) : ["uvicon"].indexOf(this.customPrefix) > -1 ? this.name : "";
      }
    },
    methods: {
      clickHandler(e) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-icon", ["uv-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "uv-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["uv-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "uv-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: _ctx.$uv.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? _ctx.$uv.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$x], ["__scopeId", "data-v-b7a6dd5d"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-icon/components/uv-icon/uv-icon.vue"]]);
  const props$l = {
    props: {
      bgColor: {
        type: String,
        default: "transparent"
      }
    }
  };
  const _sfc_main$D = {
    name: "uv-status-bar",
    mixins: [mpMixin, mixin, props$l],
    data() {
      return {};
    },
    computed: {
      style() {
        const style = {};
        style.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight, "px");
        if (this.bgColor) {
          if (this.bgColor.indexOf("gradient") > -1) {
            style.backgroundImage = this.bgColor;
          } else {
            style.background = this.bgColor;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$options.style]),
        class: "uv-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$w], ["__scopeId", "data-v-f5bd6f5a"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-status-bar/components/uv-status-bar/uv-status-bar.vue"]]);
  const props$k = {
    props: {
      // 是否开启顶部安全区适配
      safeAreaInsetTop: {
        type: Boolean,
        default: true
      },
      // 固定在顶部时，是否生成一个等高元素，以防止塌陷
      placeholder: {
        type: Boolean,
        default: false
      },
      // 是否固定在顶部
      fixed: {
        type: Boolean,
        default: true
      },
      // 是否显示下边框
      border: {
        type: Boolean,
        default: false
      },
      // 左边的图标
      leftIcon: {
        type: String,
        default: "arrow-left"
      },
      // 左边的提示文字
      leftText: {
        type: String,
        default: ""
      },
      // 左右的提示文字
      rightText: {
        type: String,
        default: ""
      },
      // 右边的图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 标题
      title: {
        type: [String, Number],
        default: ""
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      imgMode: {
        type: String,
        default: "aspectFill"
      },
      // 标题的宽度
      titleWidth: {
        type: [String, Number],
        default: "400rpx"
      },
      // 导航栏高度
      height: {
        type: [String, Number],
        default: "44px"
      },
      // 左侧返回图标的大小
      leftIconSize: {
        type: [String, Number],
        default: 20
      },
      // 左侧返回图标的颜色
      leftIconColor: {
        type: String,
        default: "#303133"
      },
      // 点击左侧区域(返回图标)，是否自动返回上一页
      autoBack: {
        type: Boolean,
        default: false
      },
      // 标题的样式，对象或字符串
      titleStyle: {
        type: [String, Object],
        default: ""
      },
      ...(_h = (_g = uni.$uv) == null ? void 0 : _g.props) == null ? void 0 : _h.navbar
    }
  };
  const _sfc_main$C = {
    name: "uv-navbar",
    mixins: [mpMixin, mixin, props$k],
    data() {
      return {};
    },
    computed: {
      getBgColor() {
        const style = {};
        if (this.bgColor) {
          if (this.bgColor.indexOf("gradient") > -1) {
            style.backgroundImage = this.bgColor;
          } else if (this.isImg) {
            style.background = "transparent";
          } else {
            style.background = this.bgColor;
          }
        }
        return style;
      },
      getStatusbgColor() {
        if (this.bgColor) {
          if (this.isImg) {
            return "transparent";
          } else {
            return this.bgColor;
          }
        }
      },
      // 判断传入的bgColor属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        const isBase64 = this.bgColor.indexOf("data:") > -1 && this.bgColor.indexOf("base64") > -1;
        return this.bgColor.indexOf("/") !== -1 || isBase64;
      },
      bgImgStyle() {
        const style = {};
        if (this.safeAreaInsetTop) {
          style.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight + 44, "px");
        } else {
          style.height = "44px";
        }
        return style;
      }
    },
    methods: {
      // 点击左侧区域
      leftClick() {
        this.$emit("leftClick");
        if (this.autoBack) {
          uni.navigateBack();
        }
      },
      // 点击右侧区域
      rightClick() {
        this.$emit("rightClick");
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_status_bar = resolveEasycom(vue.resolveDynamicComponent("uv-status-bar"), __easycom_1$4);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-navbar" }, [
      _ctx.fixed && _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "uv-navbar__placeholder",
          style: vue.normalizeStyle({
            height: _ctx.$uv.addUnit(_ctx.$uv.getPx(_ctx.height) + _ctx.$uv.sys().statusBarHeight, "px")
          })
        },
        null,
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass([_ctx.fixed && "uv-navbar--fixed"])
        },
        [
          $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            class: "uv-navbar--bgimg",
            src: _ctx.bgColor,
            mode: _ctx.imgMode,
            style: vue.normalizeStyle([$options.bgImgStyle])
          }, null, 12, ["src", "mode"])) : vue.createCommentVNode("v-if", true),
          _ctx.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_uv_status_bar, {
            key: 1,
            bgColor: $options.getStatusbgColor
          }, null, 8, ["bgColor"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uv-navbar__content", [_ctx.border && "uv-border-bottom"]]),
              style: vue.normalizeStyle([{
                height: _ctx.$uv.addUnit(_ctx.height)
              }, $options.getBgColor])
            },
            [
              vue.createElementVNode("view", {
                class: "uv-navbar__content__left",
                "hover-class": "uv-navbar__content__left--hover",
                "hover-start-time": "150",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.leftClick && $options.leftClick(...args))
              }, [
                vue.renderSlot(_ctx.$slots, "left", {}, () => [
                  _ctx.leftIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                    key: 0,
                    name: _ctx.leftIcon,
                    size: _ctx.leftIconSize,
                    color: _ctx.leftIconColor
                  }, null, 8, ["name", "size", "color"])) : vue.createCommentVNode("v-if", true),
                  _ctx.leftText ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 1,
                      style: vue.normalizeStyle({
                        color: _ctx.leftIconColor
                      }),
                      class: "uv-navbar__content__left__text"
                    },
                    vue.toDisplayString(_ctx.leftText),
                    5
                    /* TEXT, STYLE */
                  )) : vue.createCommentVNode("v-if", true)
                ], true)
              ]),
              vue.renderSlot(_ctx.$slots, "center", {}, () => [
                vue.createElementVNode(
                  "text",
                  {
                    class: "uv-line-1 uv-navbar__content__title",
                    style: vue.normalizeStyle([{
                      width: _ctx.$uv.addUnit(_ctx.titleWidth),
                      flex: "0 1 auto"
                    }, _ctx.$uv.addStyle(_ctx.titleStyle)])
                  },
                  vue.toDisplayString(_ctx.title),
                  5
                  /* TEXT, STYLE */
                )
              ], true),
              vue.createElementVNode("view", {
                class: "uv-navbar__content__right",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.rightClick && $options.rightClick(...args))
              }, [
                vue.renderSlot(_ctx.$slots, "right", {}, () => [
                  _ctx.rightIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                    key: 0,
                    name: _ctx.rightIcon,
                    size: "20"
                  }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true),
                  _ctx.rightText ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 1,
                      class: "uv-navbar__content__right__text"
                    },
                    vue.toDisplayString(_ctx.rightText),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ], true)
              ])
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$v], ["__scopeId", "data-v-16f3e502"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-navbar/components/uv-navbar/uv-navbar.vue"]]);
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
      if (i === 0)
        hex = rgbToHex(startColor);
      if (i === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  const props$j = {
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: true
      },
      // 颜色
      color: {
        type: String,
        default: "#909193"
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: "#909193"
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: false
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: "spinner"
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: 24
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: 15
      },
      // 文字样式
      textStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: ""
      },
      // 动画模式 https://www.runoob.com/cssref/css3-pr-animation-timing-function.html
      timingFunction: {
        type: String,
        default: "linear"
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: 1200
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: ""
      },
      ...(_j = (_i = uni.$uv) == null ? void 0 : _i.props) == null ? void 0 : _j.loadingIcon
    }
  };
  const _sfc_main$B = {
    name: "uv-loading-icon",
    mixins: [mpMixin, mixin, props$j],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-loading-icon", [_ctx.vertical && "uv-loading-icon--vertical"]]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uv-loading-icon__spinner", [`uv-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "uv-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "uv-loading-icon__text",
            style: vue.normalizeStyle([{
              fontSize: _ctx.$uv.addUnit(_ctx.textSize),
              color: _ctx.textColor
            }, _ctx.$uv.addStyle(_ctx.textStyle)])
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$u], ["__scopeId", "data-v-29b619ea"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.vue"]]);
  const button = {
    props: {
      lang: String,
      sessionFrom: String,
      sendMessageTitle: String,
      sendMessagePath: String,
      sendMessageImg: String,
      showMessageCard: Boolean,
      appParameter: String,
      formType: String,
      openType: String
    }
  };
  const openType = {
    props: {
      openType: String
    },
    emits: ["getphonenumber", "getuserinfo", "error", "opensetting", "launchapp", "contact", "chooseavatar", "addgroupapp", "chooseaddress", "subscribe", "login", "im"],
    methods: {
      onGetPhoneNumber(event) {
        this.$emit("getphonenumber", event.detail);
      },
      onGetUserInfo(event) {
        this.$emit("getuserinfo", event.detail);
      },
      onError(event) {
        this.$emit("error", event.detail);
      },
      onOpenSetting(event) {
        this.$emit("opensetting", event.detail);
      },
      onLaunchApp(event) {
        this.$emit("launchapp", event.detail);
      },
      onContact(event) {
        this.$emit("contact", event.detail);
      },
      onChooseavatar(event) {
        this.$emit("chooseavatar", event.detail);
      },
      onAgreeprivacyauthorization(event) {
        this.$emit("agreeprivacyauthorization", event.detail);
      },
      onAddgroupapp(event) {
        this.$emit("addgroupapp", event.detail);
      },
      onChooseaddress(event) {
        this.$emit("chooseaddress", event.detail);
      },
      onSubscribe(event) {
        this.$emit("subscribe", event.detail);
      },
      onLogin(event) {
        this.$emit("login", event.detail);
      },
      onIm(event) {
        this.$emit("im", event.detail);
      }
    }
  };
  const props$i = {
    props: {
      // 是否细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 按钮的预置样式，info，primary，error，warning，success
      type: {
        type: String,
        default: "info"
      },
      // 按钮尺寸，large，normal，small，mini
      size: {
        type: String,
        default: "normal"
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: "square"
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 加载中提示文字
      loadingText: {
        type: [String, Number],
        default: ""
      },
      // 加载状态图标类型
      loadingMode: {
        type: String,
        default: "spinner"
      },
      // 加载图标大小
      loadingSize: {
        type: [String, Number],
        default: 14
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: ""
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: ""
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: ""
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: true
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: "en"
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: ""
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: ""
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: ""
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: ""
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: true
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: ""
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: 0
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: 0
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: 200
      },
      // 按钮文字，之所以通过props传入，是因为slot传入的话
      // nvue中无法控制文字的样式
      text: {
        type: [String, Number],
        default: ""
      },
      // 按钮图标
      icon: {
        type: String,
        default: ""
      },
      // 按钮图标大小
      iconSize: {
        type: [String, Number],
        default: ""
      },
      // 按钮图标颜色
      iconColor: {
        type: String,
        default: "#000000"
      },
      // 按钮颜色，支持传入linear-gradient渐变色
      color: {
        type: String,
        default: ""
      },
      // 自定义按钮文本样式
      customTextStyle: {
        type: [Object, String],
        default: ""
      },
      ...(_l = (_k = uni.$uv) == null ? void 0 : _k.props) == null ? void 0 : _l.button
    }
  };
  const _sfc_main$A = {
    name: "uv-button",
    mixins: [mpMixin, mixin, props$i],
    emits: ["click"],
    data() {
      return {};
    },
    computed: {
      // 生成bem风格的类名
      bemClass() {
        if (!this.color) {
          return this.bem(
            "button",
            ["type", "shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        } else {
          return this.bem(
            "button",
            ["shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        }
      },
      loadingColor() {
        if (this.plain) {
          return this.color ? this.color : "#3c9cff";
        }
        if (this.type === "info") {
          return "#c9c9c9";
        }
        return "rgb(200, 200, 200)";
      },
      iconColorCom() {
        if (this.iconColor)
          return this.iconColor;
        if (this.plain) {
          return this.color ? this.color : this.type;
        } else {
          return this.type === "info" ? "#000000" : "#ffffff";
        }
      },
      baseColor() {
        let style = {};
        if (this.color) {
          style.color = this.plain ? this.color : "white";
          if (!this.plain) {
            style["background-color"] = this.color;
          }
          if (this.color.indexOf("gradient") !== -1) {
            style.borderTopWidth = 0;
            style.borderRightWidth = 0;
            style.borderBottomWidth = 0;
            style.borderLeftWidth = 0;
            if (!this.plain) {
              style.backgroundImage = this.color;
            }
          } else {
            style.borderColor = this.color;
            style.borderWidth = "1px";
            style.borderStyle = "solid";
          }
        }
        return style;
      },
      // nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
      nvueTextStyle() {
        let style = {};
        if (this.type === "info") {
          style.color = "#323233";
        }
        if (this.color) {
          style.color = this.plain ? this.color : "white";
        }
        style.fontSize = this.textSize + "px";
        return style;
      },
      // 字体大小
      textSize() {
        let fontSize = 14, { size } = this;
        if (size === "large")
          fontSize = 16;
        if (size === "normal")
          fontSize = 14;
        if (size === "small")
          fontSize = 12;
        if (size === "mini")
          fontSize = 10;
        return fontSize;
      },
      // 设置图标大小
      getIconSize() {
        const size = this.iconSize ? this.iconSize : this.textSize * 1.35;
        return this.$uv.addUnit(size);
      },
      // 设置外层盒子的宽度，其他样式不需要
      btnWrapperStyle() {
        const style = {};
        const customStyle = this.$uv.addStyle(this.customStyle);
        if (customStyle.width)
          style.width = customStyle.width;
        return style;
      }
    },
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          throttle(() => {
            this.$emit("click");
          }, this.throttleTime);
        }
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$7);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-button-wrapper",
        style: vue.normalizeStyle([$options.btnWrapperStyle])
      },
      [
        vue.createElementVNode("button", {
          "hover-start-time": Number(_ctx.hoverStartTime),
          "hover-stay-time": Number(_ctx.hoverStayTime),
          "form-type": _ctx.formType,
          "open-type": _ctx.openType,
          "app-parameter": _ctx.appParameter,
          "hover-stop-propagation": _ctx.hoverStopPropagation,
          "send-message-title": _ctx.sendMessageTitle,
          "send-message-path": _ctx.sendMessagePath,
          lang: _ctx.lang,
          "data-name": _ctx.dataName,
          "session-from": _ctx.sessionFrom,
          "send-message-img": _ctx.sendMessageImg,
          "show-message-card": _ctx.showMessageCard,
          "hover-class": !_ctx.disabled && !_ctx.loading ? "uv-button--active" : "",
          class: vue.normalizeClass(["uv-button uv-reset-button", $options.bemClass]),
          style: vue.normalizeStyle([$options.baseColor, _ctx.$uv.addStyle(_ctx.customStyle)]),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
        }, [
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createVNode(_component_uv_loading_icon, {
                mode: _ctx.loadingMode,
                size: _ctx.loadingSize * 1.15,
                color: $options.loadingColor
              }, null, 8, ["mode", "size", "color"]),
              vue.createElementVNode(
                "text",
                {
                  class: "uv-button__loading-text",
                  style: vue.normalizeStyle([
                    { fontSize: $options.textSize + "px" },
                    _ctx.$uv.addStyle(_ctx.customTextStyle)
                  ])
                },
                vue.toDisplayString(_ctx.loadingText || _ctx.text),
                5
                /* TEXT, STYLE */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.icon,
                color: $options.iconColorCom,
                size: $options.getIconSize,
                customStyle: { marginRight: "2px" }
              }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true),
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createElementVNode(
                  "text",
                  {
                    class: "uv-button__text",
                    style: vue.normalizeStyle([
                      { fontSize: $options.textSize + "px" },
                      _ctx.$uv.addStyle(_ctx.customTextStyle)
                    ])
                  },
                  vue.toDisplayString(_ctx.text),
                  5
                  /* TEXT, STYLE */
                )
              ], true),
              vue.renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ], 14, ["hover-start-time", "hover-stay-time", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "send-message-path", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_4$2 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$t], ["__scopeId", "data-v-ae8e42c7"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-button/components/uv-button/uv-button.vue"]]);
  const props$h = {
    props: {
      // 内置图标名称，或图片路径，建议绝对路径
      icon: {
        type: String,
        default: ""
      },
      // 提示文字
      text: {
        type: String,
        default: ""
      },
      // 文字颜色
      textColor: {
        type: String,
        default: "#c0c4cc"
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: 14
      },
      // 图标的颜色
      iconColor: {
        type: String,
        default: "#c0c4cc"
      },
      // 图标的大小
      iconSize: {
        type: [String, Number],
        default: 90
      },
      // 选择预置的图标类型
      mode: {
        type: String,
        default: "data"
      },
      //  图标宽度，单位px
      width: {
        type: [String, Number],
        default: 160
      },
      // 图标高度，单位px
      height: {
        type: [String, Number],
        default: 160
      },
      // 是否显示组件
      show: {
        type: Boolean,
        default: true
      },
      // 组件距离上一个元素之间的距离，默认px单位
      marginTop: {
        type: [String, Number],
        default: 0
      },
      ...(_n = (_m = uni.$uv) == null ? void 0 : _m.props) == null ? void 0 : _n.empty
    }
  };
  const _sfc_main$z = {
    name: "uv-empty",
    mixins: [mpMixin, mixin, props$h],
    data() {
      return {
        icons: {
          car: "购物车为空",
          page: "页面不存在",
          search: "没有搜索结果",
          address: "没有收货地址",
          "wifi-off": "没有WiFi",
          order: "订单为空",
          coupon: "没有优惠券",
          favor: "暂无收藏",
          permission: "无权限",
          history: "无历史记录",
          news: "无新闻列表",
          message: "消息列表为空",
          list: "列表为空",
          data: "数据为空",
          comment: "暂无评论"
        }
      };
    },
    computed: {
      // 组件样式
      emptyStyle() {
        const style = {};
        style.marginTop = this.$uv.addUnit(this.marginTop);
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      // 文本样式
      textStyle() {
        const style = {};
        style.color = this.textColor;
        style.fontSize = this.$uv.addUnit(this.textSize);
        return style;
      },
      // 判断icon是否图片路径
      isImg() {
        const isBase64 = this.icon.indexOf("data:") > -1 && this.icon.indexOf("base64") > -1;
        return this.icon.indexOf("/") !== -1 || isBase64;
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "uv-empty",
        style: vue.normalizeStyle([$options.emptyStyle])
      },
      [
        !$options.isImg ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
          key: 0,
          name: _ctx.mode === "message" ? "chat" : `empty-${_ctx.mode}`,
          size: _ctx.iconSize,
          color: _ctx.iconColor,
          "margin-top": "14"
        }, null, 8, ["name", "size", "color"])) : (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          style: vue.normalizeStyle({
            width: _ctx.$uv.addUnit(_ctx.width),
            height: _ctx.$uv.addUnit(_ctx.height)
          }),
          src: _ctx.icon,
          mode: "widthFix"
        }, null, 12, ["src"])),
        vue.createElementVNode(
          "text",
          {
            class: "uv-empty__text",
            style: vue.normalizeStyle([$options.textStyle])
          },
          vue.toDisplayString(_ctx.text ? _ctx.text : $data.icons[_ctx.mode]),
          5
          /* TEXT, STYLE */
        ),
        vue.createElementVNode("view", { class: "uv-empty__wrap" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$s], ["__scopeId", "data-v-6efcec67"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-empty/components/uv-empty/uv-empty.vue"]]);
  const props$g = {
    props: {
      // 文字颜色
      color: {
        type: String,
        default: ""
      },
      // 字体大小，单位px
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 是否显示下划线
      underLine: {
        type: Boolean,
        default: false
      },
      // 要跳转的链接
      href: {
        type: String,
        default: ""
      },
      // 小程序中复制到粘贴板的提示语
      mpTips: {
        type: String,
        default: "链接已复制，请在浏览器打开"
      },
      // 下划线颜色
      lineColor: {
        type: String,
        default: ""
      },
      // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
      text: {
        type: String,
        default: ""
      },
      ...(_p = (_o = uni.$uv) == null ? void 0 : _o.props) == null ? void 0 : _p.link
    }
  };
  const _sfc_main$y = {
    name: "uv-link",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$g],
    computed: {
      linkStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          // line-height设置为比字体大小多2px
          lineHeight: this.$uv.addUnit(this.$uv.getPx(this.fontSize) + 2),
          textDecoration: this.underLine ? "underline" : "none"
        };
        return style;
      }
    },
    methods: {
      openLink() {
        plus.runtime.openURL(this.href);
        this.$emit("click");
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        class: "uv-link",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.openLink && $options.openLink(...args), ["stop"])),
        style: vue.normalizeStyle([$options.linkStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
      },
      vue.toDisplayString(_ctx.text),
      5
      /* TEXT, STYLE */
    );
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$r], ["__scopeId", "data-v-86e87617"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-link/components/uv-link/uv-link.vue"]]);
  const value = {
    computed: {
      // 经处理后需要显示的值
      value() {
        const {
          text,
          mode,
          format: format2,
          href
        } = this;
        if (mode === "price") {
          if (!/^\d+(\.\d+)?$/.test(text)) {
            error("金额模式下，text参数需要为金额格式");
          }
          if (func(format2)) {
            return format2(text);
          }
          return priceFormat(text, 2);
        }
        if (mode === "date") {
          !date(text) && error("日期模式下，text参数需要为日期或时间戳格式");
          if (func(format2)) {
            return format2(text);
          }
          if (format2) {
            return timeFormat(text, format2);
          }
          return timeFormat(text, "yyyy-mm-dd");
        }
        if (mode === "phone") {
          if (func(format2)) {
            return format2(text);
          }
          if (format2 === "encrypt") {
            return `${text.substr(0, 3)}****${text.substr(7)}`;
          }
          return text;
        }
        if (mode === "name") {
          !(typeof text === "string") && error("姓名模式下，text参数需要为字符串格式");
          if (func(format2)) {
            return format2(text);
          }
          if (format2 === "encrypt") {
            return this.formatName(text);
          }
          return text;
        }
        if (mode === "link") {
          !url(href) && error("超链接模式下，href参数需要为URL格式");
          return text;
        }
        return text;
      }
    },
    methods: {
      // 默认的姓名脱敏规则
      formatName(name) {
        let value2 = "";
        if (name.length === 2) {
          value2 = name.substr(0, 1) + "*";
        } else if (name.length > 2) {
          let char = "";
          for (let i = 0, len = name.length - 2; i < len; i++) {
            char += "*";
          }
          value2 = name.substr(0, 1) + char + name.substr(-1, 1);
        } else {
          value2 = name;
        }
        return value2;
      }
    }
  };
  const props$f = {
    props: {
      // 主题颜色
      type: {
        type: String,
        default: ""
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 显示的值
      text: {
        type: [String, Number],
        default: ""
      },
      // 前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 文本处理的匹配模式
      // text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
      mode: {
        type: String,
        default: ""
      },
      // mode=link下，配置的链接
      href: {
        type: String,
        default: ""
      },
      // 格式化规则
      format: {
        type: [String, Function],
        default: ""
      },
      // mode=phone时，点击文本是否拨打电话
      call: {
        type: Boolean,
        default: true
      },
      // 小程序的打开方式
      openType: {
        type: String,
        default: ""
      },
      // 是否粗体，默认normal
      bold: {
        type: Boolean,
        default: false
      },
      // 是否块状
      block: {
        type: Boolean,
        default: false
      },
      // 文本显示的行数，如果设置，超出此行数，将会显示省略号
      lines: {
        type: [String, Number],
        default: ""
      },
      // 文本颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 字体大小
      size: {
        type: [String, Number],
        default: 15
      },
      // 图标的样式
      iconStyle: {
        type: [Object, String],
        default: () => ({
          fontSize: "15px"
        })
      },
      // 文字装饰，下划线，中划线等，可选值 none|underline|line-through
      decoration: {
        type: String,
        default: "none"
      },
      // 外边距，对象、字符串，数值形式均可
      margin: {
        type: [Object, String, Number],
        default: 0
      },
      // 文本行高
      lineHeight: {
        type: [String, Number],
        default: ""
      },
      // 文本对齐方式，可选值left|center|right
      align: {
        type: String,
        default: "left"
      },
      // 文字换行，可选值break-word|normal|anywhere
      wordWrap: {
        type: String,
        default: "normal"
      },
      ...(_r = (_q = uni.$uv) == null ? void 0 : _q.props) == null ? void 0 : _r.text
    }
  };
  const _sfc_main$x = {
    name: "uv-text",
    emits: ["click"],
    mixins: [mpMixin, mixin, value, props$f],
    computed: {
      valueStyle() {
        const style = {
          textDecoration: this.decoration,
          fontWeight: this.bold ? "bold" : "normal",
          wordWrap: this.wordWrap,
          fontSize: this.$uv.addUnit(this.size)
        };
        !this.type && (style.color = this.color);
        this.isNvue && this.lines && (style.lines = this.lines);
        if (this.isNvue && this.mode != "price" && !this.prefixIcon && !this.suffixIcon) {
          style.flex = 1;
          style.textAlign = this.align === "left" ? "flex-start" : this.align === "center" ? "center" : "right";
        }
        this.lineHeight && (style.lineHeight = this.$uv.addUnit(this.lineHeight));
        !this.isNvue && this.block && (style.display = "block");
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      isNvue() {
        let nvue = false;
        return nvue;
      },
      isMp() {
        let mp = false;
        return mp;
      }
    },
    data() {
      return {};
    },
    methods: {
      clickHandler() {
        if (this.call && this.mode === "phone") {
          uni.makePhoneCall({
            phoneNumber: this.text
          });
        }
        this.$emit("click");
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_link = resolveEasycom(vue.resolveDynamicComponent("uv-link"), __easycom_1$3);
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-text", []]),
        style: vue.normalizeStyle({
          margin: _ctx.margin,
          justifyContent: _ctx.align === "left" ? "flex-start" : _ctx.align === "center" ? "center" : "flex-end"
        }),
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        _ctx.mode === "price" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: vue.normalizeClass(["uv-text__price", _ctx.type && `uv-text__value--${_ctx.type}`]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          "￥",
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "uv-text__prefix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.prefixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true),
        _ctx.mode === "link" ? (vue.openBlock(), vue.createBlock(_component_uv_link, {
          key: 2,
          text: _ctx.value,
          href: _ctx.href,
          underLine: ""
        }, null, 8, ["text", "href"])) : _ctx.openType && $options.isMp ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 3,
          class: "uv-reset-button uv-text__value",
          style: vue.normalizeStyle([$options.valueStyle]),
          openType: _ctx.openType,
          onGetuserinfo: _cache[0] || (_cache[0] = (...args) => _ctx.onGetUserInfo && _ctx.onGetUserInfo(...args)),
          onContact: _cache[1] || (_cache[1] = (...args) => _ctx.onContact && _ctx.onContact(...args)),
          onGetphonenumber: _cache[2] || (_cache[2] = (...args) => _ctx.onGetPhoneNumber && _ctx.onGetPhoneNumber(...args)),
          onError: _cache[3] || (_cache[3] = (...args) => _ctx.onError && _ctx.onError(...args)),
          onLaunchapp: _cache[4] || (_cache[4] = (...args) => _ctx.onLaunchApp && _ctx.onLaunchApp(...args)),
          onOpensetting: _cache[5] || (_cache[5] = (...args) => _ctx.onOpenSetting && _ctx.onOpenSetting(...args)),
          lang: _ctx.lang,
          "session-from": _ctx.sessionFrom,
          "send-message-title": _ctx.sendMessageTitle,
          "send-message-path": _ctx.sendMessagePath,
          "send-message-img": _ctx.sendMessageImg,
          "show-message-card": _ctx.showMessageCard,
          "app-parameter": _ctx.appParameter
        }, vue.toDisplayString(_ctx.value), 45, ["openType", "lang", "session-from", "send-message-title", "send-message-path", "send-message-img", "show-message-card", "app-parameter"])) : (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 4,
            class: vue.normalizeClass(["uv-text__value", [
              _ctx.type && `uv-text__value--${_ctx.type}`,
              _ctx.lines && `uv-line-${_ctx.lines}`
            ]]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          vue.toDisplayString(_ctx.value),
          7
          /* TEXT, CLASS, STYLE */
        )),
        _ctx.suffixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 5,
          class: "uv-text__suffix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.suffixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$q], ["__scopeId", "data-v-8da47eb3"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-text/components/uv-text/uv-text.vue"]]);
  const props$e = {
    props: {
      // 标题
      title: {
        type: [String, Number],
        default: ""
      },
      // 描述文本
      desc: {
        type: [String, Number],
        default: ""
      },
      // 图标大小
      iconSize: {
        type: [String, Number],
        default: 17
      },
      // 当前步骤是否处于失败状态
      error: {
        type: Boolean,
        default: false
      },
      ...(_t = (_s = uni.$uv) == null ? void 0 : _s.props) == null ? void 0 : _t.stepsItem
    }
  };
  const _sfc_main$w = {
    name: "uv-steps-item",
    mixins: [mpMixin, mixin, props$e],
    data() {
      return {
        index: 0,
        childLength: 0,
        showLine: false,
        size: {
          height: 0,
          width: 0
        },
        parentData: {
          direction: "row",
          current: 0,
          activeColor: "",
          inactiveColor: "",
          activeIcon: "",
          inactiveIcon: "",
          dot: false
        }
      };
    },
    watch: {
      "parentData"(newValue, oldValue) {
      }
    },
    created() {
      this.init();
    },
    computed: {
      lineStyle() {
        var _a, _b;
        const style = {};
        if (this.parentData.direction === "row") {
          style.width = this.size.width + "px";
          style.left = this.size.width / 2 + "px";
        } else {
          style.height = this.size.height + "px";
        }
        style.backgroundColor = ((_b = (_a = this.parent.children) == null ? void 0 : _a[this.index + 1]) == null ? void 0 : _b.error) ? "#f56c6c" : this.index < this.parentData.current ? this.parentData.activeColor : this.parentData.inactiveColor;
        return style;
      },
      statusClass() {
        const {
          index: index2,
          error: error2
        } = this;
        const {
          current
        } = this.parentData;
        if (current == index2) {
          return error2 === true ? "error" : "process";
        } else if (error2) {
          return "error";
        } else if (current > index2) {
          return "finish";
        } else {
          return "wait";
        }
      },
      statusColor() {
        let color = "";
        switch (this.statusClass) {
          case "finish":
            color = this.parentData.activeColor;
            break;
          case "error":
            color = "#f56c6c";
            break;
          case "process":
            color = this.parentData.dot ? this.parentData.activeColor : "transparent";
            break;
          default:
            color = this.parentData.inactiveColor;
            break;
        }
        return color;
      },
      contentStyle() {
        const style = {};
        if (this.parentData.direction === "column") {
          style.marginLeft = this.parentData.dot ? "2px" : "6px";
          style.marginTop = this.parentData.dot ? "0px" : "6px";
        } else {
          style.marginTop = this.parentData.dot ? "2px" : "6px";
          style.marginLeft = this.parentData.dot ? "2px" : "6px";
        }
        return style;
      }
    },
    mounted() {
      this.parent && this.parent.updateFromChild();
      this.$uv.sleep().then(() => {
        this.getStepsItemRect();
      });
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          return this.$uv.error("uv-steps-item必须要搭配uv-steps组件使用");
        }
        this.index = this.parent.children.indexOf(this);
        this.childLength = this.parent.children.length;
      },
      updateParentData() {
        this.getParentData("uv-steps");
      },
      // 父组件数据发生变化
      updateFromParent() {
        this.init();
      },
      // 获取组件的尺寸，用于设置横线的位置
      getStepsItemRect() {
        this.$uvGetRect(".uv-steps-item").then((size) => {
          this.size = size;
        });
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_text = resolveEasycom(vue.resolveDynamicComponent("uv-text"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-steps-item", [`uv-steps-item--${$data.parentData.direction}`]]),
        ref: "uv-steps-item",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        $data.index + 1 < $data.childLength ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uv-steps-item__line", [`uv-steps-item__line--${$data.parentData.direction}`]]),
            style: vue.normalizeStyle([$options.lineStyle])
          },
          null,
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([
              "uv-steps-item__wrapper",
              `uv-steps-item__wrapper--${$data.parentData.direction}`,
              $data.parentData.dot && `uv-steps-item__wrapper--${$data.parentData.direction}--dot`
            ])
          },
          [
            vue.renderSlot(_ctx.$slots, "icon", {}, () => [
              $data.parentData.dot ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "uv-steps-item__wrapper__dot",
                  style: vue.normalizeStyle({
                    backgroundColor: $options.statusColor
                  })
                },
                null,
                4
                /* STYLE */
              )) : $data.parentData.activeIcon || $data.parentData.inactiveIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uv-steps-item__wrapper__icon"
              }, [
                vue.createVNode(_component_uv_icon, {
                  name: $data.index <= $data.parentData.current ? $data.parentData.activeIcon : $data.parentData.inactiveIcon,
                  size: _ctx.iconSize,
                  color: $data.index <= $data.parentData.current ? $data.parentData.activeColor : $data.parentData.inactiveColor
                }, null, 8, ["name", "size", "color"])
              ])) : (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 2,
                  style: vue.normalizeStyle({
                    backgroundColor: $options.statusClass === "process" ? $data.parentData.activeColor : "transparent",
                    borderColor: $options.statusColor
                  }),
                  class: "uv-steps-item__wrapper__circle"
                },
                [
                  $options.statusClass === "process" || $options.statusClass === "wait" ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "uv-steps-item__wrapper__circle__text",
                      style: vue.normalizeStyle({
                        color: $data.index == $data.parentData.current ? "#ffffff" : $data.parentData.inactiveColor
                      })
                    },
                    vue.toDisplayString($data.index + 1),
                    5
                    /* TEXT, STYLE */
                  )) : (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                    key: 1,
                    color: $options.statusClass === "error" ? "error" : $data.parentData.activeColor,
                    size: "12",
                    name: $options.statusClass === "error" ? "close" : "checkmark"
                  }, null, 8, ["color", "name"]))
                ],
                4
                /* STYLE */
              ))
            ], true)
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([
              "uv-steps-item__content",
              `uv-steps-item__content--${$data.parentData.direction}`
            ]),
            style: vue.normalizeStyle([$options.contentStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createVNode(_component_uv_text, {
                text: _ctx.title,
                type: $data.parentData.current == $data.index ? "main" : "content",
                lineHeight: "20px",
                size: $data.parentData.current == $data.index ? 14 : 13
              }, null, 8, ["text", "type", "size"])
            ], true),
            vue.renderSlot(_ctx.$slots, "desc", {}, () => [
              vue.createVNode(_component_uv_text, {
                text: _ctx.desc,
                type: "tips",
                size: "12"
              }, null, 8, ["text"])
            ], true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$p], ["__scopeId", "data-v-87a44040"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-steps/components/uv-steps-item/uv-steps-item.vue"]]);
  const props$d = {
    props: {
      // 排列方向
      direction: {
        type: String,
        default: "row"
      },
      // 设置第几个步骤
      current: {
        type: [String, Number],
        default: 0
      },
      // 激活状态颜色
      activeColor: {
        type: String,
        default: "#3c9cff"
      },
      // 未激活状态颜色
      inactiveColor: {
        type: String,
        default: "#969799"
      },
      // 激活状态的图标
      activeIcon: {
        type: String,
        default: ""
      },
      // 未激活状态图标
      inactiveIcon: {
        type: String,
        default: ""
      },
      // 是否显示点类型
      dot: {
        type: Boolean,
        default: false
      },
      ...(_v = (_u = uni.$uv) == null ? void 0 : _u.props) == null ? void 0 : _v.steps
    }
  };
  const _sfc_main$v = {
    name: "uv-steps",
    mixins: [mpMixin, mixin, props$d],
    data() {
      return {};
    },
    watch: {
      children() {
        this.updateChildData();
      },
      parentData() {
        this.updateChildData();
      }
    },
    computed: {
      // 监听参数的变化，通过watch中，手动去更新子组件的数据，否则子组件不会自动变化
      parentData() {
        return [this.current, this.direction, this.activeColor, this.inactiveColor, this.activeIcon, this.inactiveIcon, this.dot];
      }
    },
    methods: {
      // 更新子组件的数据
      updateChildData() {
        this.children.map((child) => {
          func((child || {}).updateFromParent()) && child.updateFromParent();
        });
      },
      // 接受子组件的通知，去修改其他子组件的数据
      updateFromChild() {
        this.updateChildData();
      }
    },
    created() {
      this.children = [];
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-steps", `uv-steps--${_ctx.direction}`]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$o], ["__scopeId", "data-v-f7a17f77"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-steps/components/uv-steps/uv-steps.vue"]]);
  const props$c = {
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框类型
      // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
      // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
      // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
      // text-文本输入键盘
      type: {
        type: String,
        default: "text"
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 禁用状态时的背景色
      disabledColor: {
        type: String,
        default: "#f5f7fa"
      },
      // 是否显示清除控件
      clearable: {
        type: Boolean,
        default: false
      },
      // 是否密码类型
      password: {
        type: Boolean,
        default: false
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: -1
      },
      // 	输入框为空时的占位符
      placeholder: {
        type: String,
        default: null
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: "input-placeholder"
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: "color: #c0c4cc"
      },
      // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
      // https://uniapp.dcloud.io/component/input
      // https://uniapp.dcloud.io/component/textarea
      confirmType: {
        type: String,
        default: "done"
      },
      // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
      confirmHold: {
        type: Boolean,
        default: false
      },
      // focus时，点击页面的时候不收起键盘，微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: false
      },
      // 自动获取焦点
      // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
      autoBlur: {
        type: Boolean,
        default: false
      },
      // 指定focus时光标的位置
      cursor: {
        type: [String, Number],
        default: -1
      },
      // 输入框聚焦时底部与键盘的距离
      cursorSpacing: {
        type: [String, Number],
        default: 30
      },
      // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
      selectionStart: {
        type: [String, Number],
        default: -1
      },
      // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [String, Number],
        default: -1
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // 输入框内容对齐方式，可选值为：left|center|right
      inputAlign: {
        type: String,
        default: "left"
      },
      // 输入框字体的大小
      fontSize: {
        type: [String, Number],
        default: "14px"
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 输入框前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 前置图标样式，对象或字符串
      prefixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 输入框后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 后置图标样式，对象或字符串
      suffixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
      border: {
        type: String,
        default: "surround"
      },
      // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
      readonly: {
        type: Boolean,
        default: false
      },
      // 输入框形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "square"
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: null
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      },
      ...(_x = (_w = uni.$uv) == null ? void 0 : _w.props) == null ? void 0 : _x.input
    }
  };
  const _sfc_main$u = {
    name: "uv-input",
    mixins: [mpMixin, mixin, props$c],
    data() {
      return {
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // 过滤处理方法
        innerFormatter: (value2) => value2
      };
    },
    created() {
      this.innerValue = this.modelValue;
    },
    watch: {
      value(newVal) {
        this.innerValue = newVal;
      },
      modelValue(newVal) {
        this.innerValue = newVal;
      }
    },
    computed: {
      // 是否显示清除控件
      isShowClear() {
        const { clearable, readonly, focused, innerValue } = this;
        return !!clearable && !readonly && !!focused && innerValue !== "";
      },
      // 组件的类名
      inputClass() {
        let classes = [], { border, disabled, shape } = this;
        border === "surround" && (classes = classes.concat(["uv-border", "uv-input--radius"]));
        classes.push(`uv-input--${shape}`);
        border === "bottom" && (classes = classes.concat([
          "uv-border-bottom",
          "uv-input--no-radius"
        ]));
        return classes.join(" ");
      },
      // 组件的样式
      wrapperStyle() {
        const style = {};
        if (this.disabled) {
          style.backgroundColor = this.disabledColor;
        }
        if (this.border === "none") {
          style.padding = "0";
        } else {
          style.paddingTop = "6px";
          style.paddingBottom = "6px";
          style.paddingLeft = "9px";
          style.paddingRight = "9px";
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      // 输入框的样式
      inputStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          textAlign: this.inputAlign
        };
        if (this.disabled || this.readonly) {
          style["pointer-events"] = "none";
        }
        return style;
      }
    },
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e) {
        this.innerFormatter = e;
      },
      // 当键盘输入时，触发input事件
      onInput(e) {
        let { value: value2 = "" } = e.detail || {};
        const formatter = this.formatter || this.innerFormatter;
        const formatValue = formatter(value2);
        this.innerValue = value2;
        this.$nextTick(() => {
          this.innerValue = formatValue;
          this.valueChange();
        });
      },
      // 输入框失去焦点时触发
      onBlur(event) {
        this.$emit("blur", event.detail.value);
        this.$uv.sleep(100).then(() => {
          this.focused = false;
        });
        this.$uv.formValidate(this, "blur");
      },
      // 输入框聚焦时触发
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      // 点击完成按钮时触发
      onConfirm(event) {
        this.$emit("confirm", this.innerValue);
      },
      // 键盘高度发生变化的时候触发此事件
      // 兼容性：微信小程序2.7.0+、App 3.1.0+
      onkeyboardheightchange(e) {
        this.$emit("keyboardheightchange", e);
      },
      // 内容发生变化，进行处理
      valueChange() {
        if (this.isClear)
          this.innerValue = "";
        const value2 = this.innerValue;
        this.$nextTick(() => {
          this.$emit("input", value2);
          this.$emit("update:modelValue", value2);
          this.$emit("change", value2);
          this.$uv.formValidate(this, "change");
        });
      },
      // 点击清除控件
      onClear() {
        this.innerValue = "";
        this.isClear = true;
        this.$uv.sleep(200).then((res) => {
          this.isClear = false;
        });
        this.$nextTick(() => {
          this.$emit("clear");
          this.valueChange();
        });
      },
      /**
       * 在安卓nvue上，事件无法冒泡
       * 在某些时间，我们希望监听uv-from-item的点击事件，此时会导致点击uv-form-item内的uv-input后
       * 无法触发uv-form-item的点击事件，这里通过手动调用uv-form-item的方法进行触发
       */
      clickHandler() {
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-input", $options.inputClass]),
        style: vue.normalizeStyle([$options.wrapperStyle])
      },
      [
        vue.createElementVNode("view", { class: "uv-input__content" }, [
          vue.createElementVNode("view", { class: "uv-input__content__prefix-icon" }, [
            vue.renderSlot(_ctx.$slots, "prefix", {}, () => [
              _ctx.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.prefixIcon,
                size: "18",
                customStyle: _ctx.prefixIconStyle
              }, null, 8, ["name", "customStyle"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ]),
          vue.createElementVNode("view", {
            class: "uv-input__content__field-wrapper",
            onClick: _cache[5] || (_cache[5] = (...args) => $options.clickHandler && $options.clickHandler(...args))
          }, [
            vue.createCommentVNode(" 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时\r\n				为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined\r\n			 "),
            vue.createElementVNode("input", {
              class: "uv-input__content__field-wrapper__field",
              style: vue.normalizeStyle([$options.inputStyle]),
              type: _ctx.type,
              focus: _ctx.focus,
              cursor: _ctx.cursor,
              value: $data.innerValue,
              "auto-blur": _ctx.autoBlur,
              disabled: _ctx.disabled || _ctx.readonly,
              maxlength: _ctx.maxlength,
              placeholder: _ctx.placeholder,
              "placeholder-style": _ctx.placeholderStyle,
              "placeholder-class": _ctx.placeholderClass,
              "confirm-type": _ctx.confirmType,
              "confirm-hold": _ctx.confirmHold,
              "hold-keyboard": _ctx.holdKeyboard,
              "cursor-spacing": _ctx.cursorSpacing,
              "adjust-position": _ctx.adjustPosition,
              "selection-end": _ctx.selectionEnd,
              "selection-start": _ctx.selectionStart,
              password: _ctx.password || _ctx.type === "password" || void 0,
              ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
              onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
              onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[4] || (_cache[4] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "focus", "cursor", "value", "auto-blur", "disabled", "maxlength", "placeholder", "placeholder-style", "placeholder-class", "confirm-type", "confirm-hold", "hold-keyboard", "cursor-spacing", "adjust-position", "selection-end", "selection-start", "password", "ignoreCompositionEvent"])
          ]),
          $options.isShowClear ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uv-input__content__clear",
            onClick: _cache[6] || (_cache[6] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_uv_icon, {
              name: "close",
              size: "11",
              color: "#ffffff",
              customStyle: "line-height: 12px"
            })
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uv-input__content__subfix-icon" }, [
            vue.renderSlot(_ctx.$slots, "suffix", {}, () => [
              _ctx.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                name: _ctx.suffixIcon,
                size: "18",
                customStyle: _ctx.suffixIconStyle
              }, null, 8, ["name", "customStyle"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ])
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$n], ["__scopeId", "data-v-651602aa"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-input/components/uv-input/uv-input.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type2, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type2)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type2 === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type2}(${args + unit}) `;
      } else {
        styles.styles[type2] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type2) => {
    MPAnimation.prototype[type2] = function(...args) {
      this.animation[type2](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$t = {
    name: "uv-transition",
    mixins: [mpMixin, mixin],
    emits: ["click", "change"],
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: false
      },
      // 使用的动画模式
      mode: {
        type: [Array, String, null],
        default() {
          return "fade";
        }
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: "ease-out"
      },
      customClass: {
        type: String,
        default: ""
      },
      // nvue模式下 是否直接显示，在uv-list等cell下面使用就需要设置
      cellChild: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 初始化动画条件
      transformStyles() {
        const style = {
          transform: this.transform,
          opacity: this.opacity,
          ...this.$uv.addStyle(this.customStyle),
          "transition-duration": `${this.duration / 1e3}s`
        };
        return this.$uv.addStyle(style, "string");
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: this.timingFunction,
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uv-transition/components/uv-transition/uv-transition.vue:166", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过渡动画
      close(type2) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type2) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type3, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type3)[mode];
          } else {
            styles.transform += this.animationType(type3)[mode] + " ";
          }
        };
        if (typeof this.mode === "string") {
          buildStyle(type2, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildStyle(type2, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type2) {
        let buildTranfrom = (type3, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type3 ? 0 : 1;
          } else {
            aniNum = type3 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type3 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type3 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type3 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type3 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.mode === "string") {
          buildTranfrom(type2, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildTranfrom(type2, mode);
          });
        }
        return this.animation;
      },
      animationType(type2) {
        return {
          fade: type2 ? 1 : 0,
          "slide-top": `translateY(${type2 ? "0" : "-100%"})`,
          "slide-right": `translateX(${type2 ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type2 ? "0" : "100%"})`,
          "slide-left": `translateX(${type2 ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type2 ? 1 : 0.8}) scaleY(${type2 ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type2 ? 1 : 1.2}) scaleY(${type2 ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$m], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-transition/components/uv-transition/uv-transition.vue"]]);
  const props$b = {
    props: {
      color: {
        type: String,
        default: "#d6d7d9"
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: "100%"
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: "row"
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: 0
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: false
      },
      ...(_z = (_y = uni.$uv) == null ? void 0 : _y.props) == null ? void 0 : _z.line
    }
  };
  const _sfc_main$s = {
    name: "uv-line",
    mixins: [mpMixin, mixin, props$b],
    computed: {
      lineStyle() {
        const style = {};
        style.margin = this.margin;
        if (this.direction === "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.dashed ? "dashed" : "solid";
          style.width = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.dashed ? "dashed" : "solid";
          style.height = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$l], ["__scopeId", "data-v-dcf8cb8f"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-line/components/uv-line/uv-line.vue"]]);
  const props$a = {
    props: {
      // input的label提示语
      label: {
        type: String,
        default: ""
      },
      // 绑定的值
      prop: {
        type: String,
        default: ""
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: [Boolean],
        default: false
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: ""
      },
      // label的宽度，单位px
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // 右侧图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 左侧图标
      leftIcon: {
        type: String,
        default: ""
      },
      // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
      required: {
        type: Boolean,
        default: false
      },
      leftIconStyle: {
        type: [String, Object],
        default: ""
      },
      ...(_B = (_A = uni.$uv) == null ? void 0 : _A.props) == null ? void 0 : _B.formItem
    }
  };
  const _sfc_main$r = {
    name: "uv-form-item",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$a],
    data() {
      return {
        // 错误提示语
        message: "",
        parentData: {
          // 提示文本的位置
          labelPosition: "left",
          // 提示文本对齐方式
          labelAlign: "left",
          // 提示文本的样式
          labelStyle: {},
          // 提示文本的宽度
          labelWidth: 45,
          // 错误提示方式
          errorType: "message"
        }
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          this.$uv.error("uv-form-item需要结合uv-form组件使用");
        }
      },
      // 获取父组件的参数
      updateParentData() {
        this.getParentData("uv-form");
      },
      // 移除uv-form-item的校验结果
      clearValidate() {
        this.message = null;
      },
      // 清空当前的组件的校验结果，并重置为初始值
      resetField() {
        const value2 = this.$uv.getProperty(this.parent.originalModel, this.prop);
        this.$uv.setProperty(this.parent.model, this.prop, value2);
        this.message = null;
      },
      // 点击组件
      clickHandler() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_4);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-form-item" }, [
      vue.createElementVNode(
        "view",
        {
          class: "uv-form-item__body",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
          style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle), {
            flexDirection: (_ctx.labelPosition || $data.parentData.labelPosition) === "left" ? "row" : "column"
          }])
        },
        [
          vue.createCommentVNode(' 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" '),
          vue.renderSlot(_ctx.$slots, "label", {}, () => [
            _ctx.required || _ctx.leftIcon || _ctx.label ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "uv-form-item__body__left",
                style: vue.normalizeStyle({
                  width: _ctx.$uv.addUnit(_ctx.labelWidth || $data.parentData.labelWidth),
                  marginBottom: $data.parentData.labelPosition === "left" ? 0 : "5px"
                })
              },
              [
                vue.createCommentVNode(" 为了块对齐 "),
                vue.createElementVNode("view", { class: "uv-form-item__body__left__content" }, [
                  vue.createCommentVNode(" nvue不支持伪元素before "),
                  _ctx.required ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "uv-form-item__body__left__content__required"
                  }, "*")) : vue.createCommentVNode("v-if", true),
                  _ctx.leftIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "uv-form-item__body__left__content__icon"
                  }, [
                    vue.createVNode(_component_uv_icon, {
                      name: _ctx.leftIcon,
                      "custom-style": _ctx.leftIconStyle
                    }, null, 8, ["name", "custom-style"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    {
                      class: "uv-form-item__body__left__content__label",
                      style: vue.normalizeStyle([$data.parentData.labelStyle, {
                        justifyContent: $data.parentData.labelAlign === "left" ? "flex-start" : $data.parentData.labelAlign === "center" ? "center" : "flex-end"
                      }])
                    },
                    vue.toDisplayString(_ctx.label),
                    5
                    /* TEXT, STYLE */
                  )
                ])
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ], true),
          vue.createElementVNode("view", { class: "uv-form-item__body__right" }, [
            vue.createElementVNode("view", { class: "uv-form-item__body__right__content" }, [
              vue.createElementVNode("view", { class: "uv-form-item__body__right__content__slot" }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "item__body__right__content__icon" }, [
                vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
              ])
            ])
          ])
        ],
        4
        /* STYLE */
      ),
      vue.renderSlot(_ctx.$slots, "error", {}, () => [
        !!$data.message && $data.parentData.errorType === "message" ? (vue.openBlock(), vue.createBlock(_component_uv_transition, {
          key: 0,
          show: true,
          duration: 100,
          mode: "fade"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "text",
              {
                class: "uv-form-item__body__right__message",
                style: vue.normalizeStyle({
                  marginLeft: _ctx.$uv.addUnit($data.parentData.labelPosition === "top" ? 0 : _ctx.labelWidth || $data.parentData.labelWidth)
                })
              },
              vue.toDisplayString($data.message),
              5
              /* TEXT, STYLE */
            )
          ]),
          _: 1
          /* STABLE */
        })) : vue.createCommentVNode("v-if", true)
      ], true),
      _ctx.borderBottom ? (vue.openBlock(), vue.createBlock(_component_uv_line, {
        key: 0,
        color: $data.message && $data.parentData.errorType === "border-bottom" ? "#f56c6c" : "#d6d7d9"
      }, null, 8, ["color"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$k], ["__scopeId", "data-v-d1e73275"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-form/components/uv-form-item/uv-form-item.vue"]]);
  const props$9 = {
    props: {
      // 当前form的需要验证字段的集合
      model: {
        type: Object,
        default: () => ({})
      },
      // 验证规则
      rules: {
        type: [Object, Function, Array],
        default: () => ({})
      },
      // 有错误时的提示方式，message-提示信息，toast-进行toast提示
      // border-bottom-下边框呈现红色，none-无提示
      errorType: {
        type: String,
        default: "message"
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: "left"
      },
      // label的宽度，单位px
      labelWidth: {
        type: [String, Number],
        default: 45
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: "left"
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default: () => ({})
      },
      ...(_D = (_C = uni.$uv) == null ? void 0 : _C.props) == null ? void 0 : _D.form
    }
  };
  var define_process_env_default = {};
  const formatRegExp = /%[sdj%]/g;
  let warning = function warning2() {
  };
  if (typeof process !== "undefined" && define_process_env_default && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning3(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every((e) => typeof e === "string")) {
          formatAppLog("warn", "at uni_modules/uv-form/components/uv-form/valid.js:28", type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    const fields = {};
    errors.forEach((error2) => {
      const { field } = error2;
      fields[field] = fields[field] || [];
      fields[field].push(error2);
    });
    return fields;
  }
  function format() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    let i = 1;
    const f = args[0];
    const len = args.length;
    if (typeof f === "function") {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === "string") {
      let str = String(f).replace(formatRegExp, (x) => {
        if (x === "%%") {
          return "%";
        }
        if (i >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (let arg = args[i]; i < len; arg = args[++i]) {
        str += ` ${arg}`;
      }
      return str;
    }
    return f;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
  }
  function isEmptyValue$1(value2, type2) {
    if (value2 === void 0 || value2 === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value2) && !value2.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value2 === "string" && !value2) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func2, callback) {
    const results = [];
    let total = 0;
    const arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach((a) => {
      func2(a, count);
    });
  }
  function asyncSerialArray(arr, func2, callback) {
    let index2 = 0;
    const arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      const original = index2;
      index2 += 1;
      if (original < arrLength) {
        func2(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    const ret = [];
    Object.keys(objArr).forEach((k) => {
      ret.push.apply(ret, objArr[k]);
    });
    return ret;
  }
  function asyncMap(objArr, option, func2, callback) {
    if (option.first) {
      const _pending = new Promise((resolve, reject) => {
        const next = function next2(errors) {
          callback(errors);
          return errors.length ? reject({
            errors,
            fields: convertFieldsError(errors)
          }) : resolve();
        };
        const flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func2, next);
      });
      _pending.catch((e) => e);
      return _pending;
    }
    let firstFields = option.firstFields || [];
    if (firstFields === true) {
      firstFields = Object.keys(objArr);
    }
    const objArrKeys = Object.keys(objArr);
    const objArrLength = objArrKeys.length;
    let total = 0;
    const results = [];
    const pending = new Promise((resolve, reject) => {
      const next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject({
            errors: results,
            fields: convertFieldsError(results)
          }) : resolve();
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve();
      }
      objArrKeys.forEach((key) => {
        const arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func2, next);
        } else {
          asyncParallelArray(arr, func2, next);
        }
      });
    });
    pending.catch((e) => e);
    return pending;
  }
  function complementError(rule) {
    return function(oe) {
      if (oe && oe.message) {
        oe.field = oe.field || rule.fullField;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge(target, source) {
    if (source) {
      for (const s in source) {
        if (source.hasOwnProperty(s)) {
          const value2 = source[s];
          if (typeof value2 === "object" && typeof target[s] === "object") {
            target[s] = { ...target[s], ...value2 };
          } else {
            target[s] = value2;
          }
        }
      }
    }
    return target;
  }
  function required(rule, value2, source, errors, options, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue$1(value2, type2 || rule.type))) {
      errors.push(format(options.messages.required, rule.fullField));
    }
  }
  function whitespace(rule, value2, source, errors, options) {
    if (/^\s+$/.test(value2) || value2 === "") {
      errors.push(format(options.messages.whitespace, rule.fullField));
    }
  }
  const pattern$1 = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types$1 = {
    integer: function integer(value2) {
      return /^(-)?\d+$/.test(value2);
    },
    float: function float(value2) {
      return /^(-)?\d+(\.\d+)?$/.test(value2);
    },
    array: function array3(value2) {
      return Array.isArray(value2);
    },
    regexp: function regexp(value2) {
      if (value2 instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value2);
      } catch (e) {
        return false;
      }
    },
    date: function date3(value2) {
      return typeof value2.getTime === "function" && typeof value2.getMonth === "function" && typeof value2.getYear === "function";
    },
    number: function number3(value2) {
      if (isNaN(value2)) {
        return false;
      }
      return typeof +value2 === "number";
    },
    object: function object3(value2) {
      return typeof value2 === "object" && !types$1.array(value2);
    },
    method: function method(value2) {
      return typeof value2 === "function";
    },
    email: function email2(value2) {
      return typeof value2 === "string" && !!value2.match(pattern$1.email) && value2.length < 255;
    },
    url: function url2(value2) {
      return typeof value2 === "string" && !!value2.match(pattern$1.url);
    },
    hex: function hex(value2) {
      return typeof value2 === "string" && !!value2.match(pattern$1.hex);
    }
  };
  function type(rule, value2, source, errors, options) {
    if (rule.required && value2 === void 0) {
      required(rule, value2, source, errors, options);
      return;
    }
    const custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    const ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types$1[ruleType](value2)) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value2 !== rule.type) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  }
  function range(rule, value2, source, errors, options) {
    const len = typeof rule.len === "number";
    const min = typeof rule.min === "number";
    const max = typeof rule.max === "number";
    const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    let val = value2;
    let key = null;
    const num = typeof value2 === "number";
    const str = typeof value2 === "string";
    const arr = Array.isArray(value2);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value2.length;
    }
    if (str) {
      val = value2.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format(options.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format(options.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  }
  const ENUM = "enum";
  function enumerable(rule, value2, source, errors, options) {
    rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
    if (rule[ENUM].indexOf(value2) === -1) {
      errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
    }
  }
  function pattern$1$1(rule, value2, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value2)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        const _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value2)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
        }
      }
    }
  }
  const rules = {
    required,
    whitespace,
    type,
    range,
    enum: enumerable,
    pattern: pattern$1$1
  };
  function string(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, "string");
      if (!isEmptyValue$1(value2, "string")) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
        rules.pattern(rule, value2, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value2, source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function method2(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function number2(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (value2 === "") {
        value2 = void 0;
      }
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function _boolean(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function regexp2(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue$1(value2)) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function integer2(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function floatFn(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function array2(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2, "array") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, "array");
      if (!isEmptyValue$1(value2, "array")) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function object2(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  const ENUM$1 = "enum";
  function enumerable$1(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules[ENUM$1](rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function pattern$2(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue$1(value2, "string")) {
        rules.pattern(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function date2(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue$1(value2)) {
        let dateObject;
        if (typeof value2 === "number") {
          dateObject = new Date(value2);
        } else {
          dateObject = value2;
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function required$1(rule, value2, callback, source, options) {
    const errors = [];
    const type2 = Array.isArray(value2) ? "array" : typeof value2;
    rules.required(rule, value2, source, errors, options, type2);
    callback(errors);
  }
  function type$1(rule, value2, callback, source, options) {
    const ruleType = rule.type;
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, ruleType);
      if (!isEmptyValue$1(value2, ruleType)) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function any(rule, value2, callback, source, options) {
    const errors = [];
    const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue$1(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
    }
    callback(errors);
  }
  const validators = {
    string,
    method: method2,
    number: number2,
    boolean: _boolean,
    regexp: regexp2,
    integer: integer2,
    float: floatFn,
    array: array2,
    object: object2,
    enum: enumerable$1,
    pattern: pattern$2,
    date: date2,
    url: type$1,
    hex: type$1,
    email: type$1,
    required: required$1,
    any
  };
  function newMessages() {
    return {
      default: "Validation error on field %s",
      required: "%s is required",
      enum: "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        boolean: "%s is not a %s",
        integer: "%s is not an %s",
        float: "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        const cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  const messages$1 = newMessages();
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages$1;
    this.define(descriptor);
  }
  Schema.prototype = {
    messages: function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge(newMessages(), _messages);
      }
      return this._messages;
    },
    define: function define2(rules2) {
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      let z;
      let item;
      for (z in rules2) {
        if (rules2.hasOwnProperty(z)) {
          item = rules2[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o, oc) {
      const _this = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      let source = source_;
      let options = o;
      let callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback();
        }
        return Promise.resolve();
      }
      function complete(results) {
        let i;
        let errors = [];
        let fields = {};
        function add(e) {
          if (Array.isArray(e)) {
            let _errors;
            errors = (_errors = errors).concat.apply(_errors, e);
          } else {
            errors.push(e);
          }
        }
        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          fields = convertFieldsError(errors);
        }
        callback(errors, fields);
      }
      if (options.messages) {
        let messages$1$1 = this.messages();
        if (messages$1$1 === messages$1) {
          messages$1$1 = newMessages();
        }
        deepMerge(messages$1$1, options.messages);
        options.messages = messages$1$1;
      } else {
        options.messages = this.messages();
      }
      let arr;
      let value2;
      const series = {};
      const keys = options.keys || Object.keys(this.rules);
      keys.forEach((z) => {
        arr = _this.rules[z];
        value2 = source[z];
        arr.forEach((r) => {
          let rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = { ...source };
            }
            value2 = source[z] = rule.transform(value2);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = { ...rule };
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value: value2,
            source,
            field: z
          });
        });
      });
      const errorFields = {};
      return asyncMap(series, options, (data, doIt) => {
        const { rule } = data;
        let deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullfield(key, schema) {
          return { ...schema, fullField: `${rule.fullField}.${key}` };
        }
        function cb(e) {
          if (e === void 0) {
            e = [];
          }
          let errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (!options.suppressWarning && errors.length) {
            Schema.warning("async-validator:", errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }
          errors = errors.map(complementError(rule));
          if (options.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options.error) {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }
            let fieldsSchema = {};
            if (rule.defaultField) {
              for (const k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = { ...fieldsSchema, ...data.rule.fields };
            for (const f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                const fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
                fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
              }
            }
            const schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, (errs) => {
              const finalErrors = [];
              if (errors && errors.length) {
                finalErrors.push.apply(finalErrors, errors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        let res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          res = rule.validator(rule, data.value, cb, data.source, options);
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(rule.message || `${rule.field} fails`);
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(() => cb(), (e) => cb(e));
        }
      }, (results) => {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      const keys = Object.keys(rule);
      const messageIndex = keys.indexOf("message");
      if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
      }
      if (keys.length === 1 && keys[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || false;
    }
  };
  Schema.register = function register(type2, validator) {
    if (typeof validator !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type2] = validator;
  };
  Schema.warning = warning;
  Schema.messages = messages$1;
  Schema.warning = function() {
  };
  const _sfc_main$q = {
    name: "uv-form",
    mixins: [mpMixin, mixin, props$9],
    provide() {
      return {
        uForm: this
      };
    },
    data() {
      return {
        formRules: {},
        // 规则校验器
        validator: {},
        // 原始的model快照，用于resetFields方法重置表单时使用
        originalModel: null
      };
    },
    watch: {
      // 监听规则的变化
      rules: {
        immediate: true,
        handler(n) {
          this.setRules(n);
        }
      },
      // 监听属性的变化，通知子组件uv-form-item重新获取信息
      propsChange(n) {
        var _a;
        if ((_a = this.children) == null ? void 0 : _a.length) {
          this.children.map((child) => {
            typeof child.updateParentData == "function" && child.updateParentData();
          });
        }
      },
      // 监听model的初始值作为重置表单的快照
      model: {
        immediate: true,
        handler(n) {
          if (!this.originalModel) {
            this.originalModel = this.$uv.deepClone(n);
          }
        }
      }
    },
    computed: {
      propsChange() {
        return [
          this.errorType,
          this.borderBottom,
          this.labelPosition,
          this.labelWidth,
          this.labelAlign,
          this.labelStyle
        ];
      }
    },
    created() {
      this.children = [];
    },
    methods: {
      // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
      setRules(rules2) {
        if (Object.keys(rules2).length === 0)
          return;
        if (Object.keys(this.model).length === 0) {
          this.$uv.error("设置rules，model必须设置！如果已经设置，请刷新页面。");
          return;
        }
        this.formRules = rules2;
        this.validator = new Schema(rules2);
      },
      // 清空所有uv-form-item组件的内容，本质上是调用了uv-form-item组件中的resetField()方法
      resetFields() {
        this.resetModel();
      },
      // 重置model为初始值的快照
      resetModel(obj) {
        this.children.map((child) => {
          const prop = child == null ? void 0 : child.prop;
          const value2 = this.$uv.getProperty(this.originalModel, prop);
          this.$uv.setProperty(this.model, prop, value2);
        });
      },
      // 清空校验结果
      clearValidate(props2) {
        props2 = [].concat(props2);
        this.children.map((child) => {
          if (props2[0] === void 0 || props2.includes(child.prop)) {
            child.message = null;
          }
        });
      },
      // 对部分表单字段进行校验
      async validateField(value2, callback, event = null) {
        this.$nextTick(() => {
          const errorsRes = [];
          value2 = [].concat(value2);
          this.children.map((child) => {
            const childErrors = [];
            if (value2.includes(child.prop)) {
              const propertyVal = this.$uv.getProperty(
                this.model,
                child.prop
              );
              const propertyChain = child.prop.split(".");
              const propertyName = propertyChain[propertyChain.length - 1];
              const rule = this.formRules[child.prop];
              if (!rule)
                return;
              const rules2 = [].concat(rule);
              for (let i = 0; i < rules2.length; i++) {
                const ruleItem = rules2[i];
                const trigger = [].concat(ruleItem == null ? void 0 : ruleItem.trigger);
                if (event && !trigger.includes(event))
                  continue;
                const validator = new Schema({
                  [propertyName]: ruleItem
                });
                validator.validate(
                  {
                    [propertyName]: propertyVal
                  },
                  (errors, fields) => {
                    if (this.$uv.test.array(errors)) {
                      errorsRes.push(...errors);
                      childErrors.push(...errors);
                    }
                    this.$nextTick(() => {
                      var _a, _b;
                      child.message = ((_a = childErrors[0]) == null ? void 0 : _a.message) ? (_b = childErrors[0]) == null ? void 0 : _b.message : null;
                    });
                  }
                );
              }
            }
          });
          typeof callback === "function" && callback(errorsRes);
        });
      },
      // 校验全部数据
      validate(callback) {
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            const formItemProps = this.children.map(
              (item) => item.prop
            );
            this.validateField(formItemProps, (errors) => {
              if (errors.length) {
                this.errorType === "toast" && this.$uv.toast(errors[0].message);
                reject(errors);
              } else {
                resolve(true);
              }
            });
          });
        });
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-form" }, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$j], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-form/components/uv-form/uv-form.vue"]]);
  const props$8 = {
    props: {
      // 背景颜色（默认transparent）
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 分割槽高度，单位px（默认20）
      height: {
        type: [String, Number],
        default: 20
      },
      // 与上一个组件的距离
      marginTop: {
        type: [String, Number],
        default: 0
      },
      // 与下一个组件的距离
      marginBottom: {
        type: [String, Number],
        default: 0
      },
      ...(_F = (_E = uni.$uv) == null ? void 0 : _E.props) == null ? void 0 : _F.gap
    }
  };
  const _sfc_main$p = {
    name: "uv-gap",
    mixins: [mpMixin, mixin, props$8],
    computed: {
      gapStyle() {
        const style = {
          backgroundColor: this.bgColor,
          height: this.$uv.addUnit(this.height),
          marginTop: this.$uv.addUnit(this.marginTop),
          marginBottom: this.$uv.addUnit(this.marginBottom)
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-gap",
        style: vue.normalizeStyle([$options.gapStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$i], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-gap/components/uv-gap/uv-gap.vue"]]);
  const props$7 = {
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [String, Number],
        default: 10070
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 不透明度值，当做rgba的第四个参数
      opacity: {
        type: [String, Number],
        default: 0.5
      },
      ...(_H = (_G = uni.$uv) == null ? void 0 : _G.props) == null ? void 0 : _H.overlay
    }
  };
  const _sfc_main$o = {
    name: "uv-overlay",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$7],
    watch: {
      show(newVal) {
      }
    },
    computed: {
      overlayStyle() {
        const style = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": `rgba(0, 0, 0, ${this.opacity})`
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler() {
        this.$emit("click");
      },
      clear() {
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_4);
    return vue.openBlock(), vue.createBlock(_component_uv_transition, {
      show: _ctx.show,
      mode: "fade",
      "custom-class": "uv-overlay",
      duration: _ctx.duration,
      "custom-style": $options.overlayStyle,
      onClick: $options.clickHandler,
      onTouchmove: vue.withModifiers($options.clear, ["stop", "prevent"])
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style", "onClick", "onTouchmove"]);
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$h], ["__scopeId", "data-v-7303e1aa"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-overlay/components/uv-overlay/uv-overlay.vue"]]);
  const _sfc_main$n = {
    name: "uv-safe-bottom",
    mixins: [mpMixin, mixin],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-safe-bottom", [!$data.isNvue && "uv-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$g], ["__scopeId", "data-v-560f16b2"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-safe-bottom/components/uv-safe-bottom/uv-safe-bottom.vue"]]);
  const _sfc_main$m = {
    name: "uv-popup",
    components: {},
    mixins: [mpMixin, mixin],
    emits: ["change", "maskClick"],
    props: {
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      mode: {
        type: String,
        default: "center"
      },
      // 动画时长，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: 10075
      },
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      // 是否显示遮罩
      overlay: {
        type: Boolean,
        default: true
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 遮罩的透明度，0-1之间
      overlayOpacity: {
        type: [Number, String],
        default: 0.4
      },
      // 自定义遮罩的样式
      overlayStyle: {
        type: [Object, String],
        default: ""
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: false
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: false
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      // mode=center，也即中部弹出时，是否使用缩放模式
      zoom: {
        type: Boolean,
        default: true
      },
      round: {
        type: [Number, String],
        default: 0
      },
      ...(_J = (_I = uni.$uv) == null ? void 0 : _I.props) == null ? void 0 : _J.popup
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type2) {
          if (!this.config[type2])
            return;
          this[this.config[type2]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.mode]](true);
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        transitionStyle: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupClass: this.isDesktop ? "fixforpc-top" : "top",
        direction: ""
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.bgColor === "" || this.bgColor === "none" || this.$uv.getPx(this.round) > 0) {
          return "transparent";
        }
        return this.bgColor;
      },
      contentStyle() {
        const style = {};
        if (this.bgColor) {
          style.backgroundColor = this.bg;
        }
        if (this.round) {
          const value2 = this.$uv.addUnit(this.round);
          const mode = this.direction ? this.direction : this.mode;
          style.backgroundColor = this.bgColor;
          if (mode === "top") {
            style.borderBottomLeftRadius = value2;
            style.borderBottomRightRadius = value2;
          } else if (mode === "bottom") {
            style.borderTopLeftRadius = value2;
            style.borderTopRightRadius = value2;
          } else if (mode === "center") {
            style.borderRadius = value2;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      this.messageChild = null;
      this.clearPropagation = false;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.mode;
        } else {
          this.direction = direction;
        }
        if (!this.config[direction]) {
          return this.$uv.error(`缺少类型：${direction}`);
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type2) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.mode
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.closeOnClickOverlay)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type2) {
        this.popupClass = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.mode === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type2) {
        this.popupClass = "bottom";
        this.ani = ["slide-bottom"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: this.bg
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type2) {
        this.popupClass = "center";
        this.ani = this.zoom ? ["zoom-in", "fade"] : ["fade"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type2) {
        this.popupClass = "left";
        this.ani = ["slide-left"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type2) {
        this.popupClass = "right";
        this.ani = ["slide-right"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type2)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_overlay = resolveEasycom(vue.resolveDynamicComponent("uv-overlay"), __easycom_0$5);
    const _component_uv_status_bar = resolveEasycom(vue.resolveDynamicComponent("uv-status-bar"), __easycom_1$4);
    const _component_uv_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("uv-safe-bottom"), __easycom_2$2);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_4);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-popup", [$data.popupClass, $options.isDesktop ? "fixforpc-z-index" : ""]]),
        style: vue.normalizeStyle([{ zIndex: $props.zIndex }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            vue.createCommentVNode(" 遮罩层 "),
            $data.maskShow && $props.overlay ? (vue.openBlock(), vue.createBlock(_component_uv_overlay, {
              key: "1",
              show: $data.showTrans,
              duration: $props.duration,
              "custom-style": $props.overlayStyle,
              opacity: $props.overlayOpacity,
              zIndex: $props.zIndex,
              onClick: $options.onTap
            }, null, 8, ["show", "duration", "custom-style", "opacity", "zIndex", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uv_transition, {
              key: "2",
              mode: $data.ani,
              name: "content",
              "custom-style": $data.transitionStyle,
              duration: $props.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uv-popup__content", [$data.popupClass]]),
                    style: vue.normalizeStyle([$options.contentStyle]),
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    $props.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_uv_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
                    $props.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_uv_safe_bottom, { key: 1 })) : vue.createCommentVNode("v-if", true),
                    $props.closeable ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 2,
                        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"])),
                        class: vue.normalizeClass(["uv-popup__content__close", ["uv-popup__content__close--" + $props.closeIconPos]]),
                        "hover-class": "uv-popup__content__close--hover",
                        "hover-stay-time": "150"
                      },
                      [
                        vue.createVNode(_component_uv_icon, {
                          name: "close",
                          color: "#909399",
                          size: "18",
                          bold: ""
                        })
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode", "custom-style", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_11 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$f], ["__scopeId", "data-v-01a3ad6e"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-popup/components/uv-popup/uv-popup.vue"]]);
  const props$6 = {
    props: {
      // 标题，有值则显示，同时会显示关闭按钮
      title: {
        type: String,
        default: ""
      },
      // 选项上方的描述信息
      description: {
        type: String,
        default: ""
      },
      // 数据
      actions: {
        type: Array,
        default: () => []
      },
      // 取消按钮的文字，不为空时显示按钮
      cancelText: {
        type: String,
        default: ""
      },
      // 点击某个菜单项时是否关闭弹窗
      closeOnClickAction: {
        type: Boolean,
        default: true
      },
      // 处理底部安全区（默认true）
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 小程序的打开方式
      openType: {
        type: String,
        default: ""
      },
      // 点击遮罩是否允许关闭 (默认true)
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 圆角值
      round: {
        type: [Boolean, String, Number],
        default: 0
      },
      ...(_L = (_K = uni.$uv) == null ? void 0 : _K.props) == null ? void 0 : _L.actionSheet
    }
  };
  const _sfc_main$l = {
    name: "uv-action-sheet",
    mixins: [openType, button, mpMixin, mixin, props$6],
    emits: ["close", "select"],
    computed: {
      // 操作项目的样式
      itemStyle() {
        return (index2) => {
          let style = {};
          if (this.actions[index2].color)
            style.color = this.actions[index2].color;
          if (this.actions[index2].fontSize)
            style.fontSize = this.$uv.addUnit(this.actions[index2].fontSize);
          if (this.actions[index2].disabled)
            style.color = "#c0c4cc";
          return style;
        };
      }
    },
    methods: {
      open() {
        this.$refs.popup.open();
      },
      close() {
        this.$refs.popup.close();
      },
      popupChange(e) {
        if (!e.show)
          this.$emit("close");
      },
      // 点击取消按钮
      cancel() {
        this.close();
      },
      selectHandler(index2) {
        const item = this.actions[index2];
        if (item && !item.disabled && !item.loading) {
          this.$emit("select", item);
          if (this.closeOnClickAction) {
            this.close();
          }
        }
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$6);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$7);
    const _component_uv_gap = resolveEasycom(vue.resolveDynamicComponent("uv-gap"), __easycom_3$1);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_11);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "popup",
      mode: "bottom",
      safeAreaInsetBottom: _ctx.safeAreaInsetBottom,
      round: _ctx.round,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      onChange: $options.popupChange
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "uv-action-sheet" }, [
          _ctx.title ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uv-action-sheet__header"
          }, [
            vue.createElementVNode(
              "text",
              { class: "uv-action-sheet__header__title uv-line-1" },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", {
              class: "uv-action-sheet__header__icon-wrap",
              onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.cancel && $options.cancel(...args), ["stop"]))
            }, [
              vue.createVNode(_component_uv_icon, {
                name: "close",
                size: "17",
                color: "#c8c9cc",
                bold: ""
              })
            ])
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.description ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 1,
              class: "uv-action-sheet__description",
              style: vue.normalizeStyle([{
                marginTop: `${_ctx.title && _ctx.description ? 0 : "18px"}`
              }])
            },
            vue.toDisplayString(_ctx.description),
            5
            /* TEXT, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            _ctx.description ? (vue.openBlock(), vue.createBlock(_component_uv_line, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "uv-action-sheet__item-wrap" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.actions, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", { key: index2 }, [
                    vue.createElementVNode("view", {
                      class: "uv-action-sheet__item-wrap__item",
                      onClick: vue.withModifiers(($event) => $options.selectHandler(index2), ["stop"]),
                      "hover-class": !item.disabled && !item.loading ? "uv-action-sheet--hover" : "",
                      "hover-stay-time": 150
                    }, [
                      !item.loading ? (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        { key: 0 },
                        [
                          vue.createElementVNode(
                            "text",
                            {
                              class: "uv-action-sheet__item-wrap__item__name",
                              style: vue.normalizeStyle([$options.itemStyle(index2)])
                            },
                            vue.toDisplayString(item.name),
                            5
                            /* TEXT, STYLE */
                          ),
                          item.subname ? (vue.openBlock(), vue.createElementBlock(
                            "text",
                            {
                              key: 0,
                              class: "uv-action-sheet__item-wrap__item__subname"
                            },
                            vue.toDisplayString(item.subname),
                            1
                            /* TEXT */
                          )) : vue.createCommentVNode("v-if", true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : (vue.openBlock(), vue.createBlock(_component_uv_loading_icon, {
                        key: 1,
                        "custom-class": "van-action-sheet__loading",
                        size: "18",
                        mode: "circle"
                      }))
                    ], 8, ["onClick", "hover-class"]),
                    index2 !== _ctx.actions.length - 1 ? (vue.openBlock(), vue.createBlock(_component_uv_line, { key: 0 })) : vue.createCommentVNode("v-if", true)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ], true),
          _ctx.cancelText ? (vue.openBlock(), vue.createBlock(_component_uv_gap, {
            key: 2,
            bgColor: "#eaeaec",
            height: "6"
          })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { "hover-class": "uv-action-sheet--hover" }, [
            _ctx.cancelText ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                "hover-stay-time": 150,
                class: "uv-action-sheet__cancel-text",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.cancel && $options.cancel(...args))
              },
              vue.toDisplayString(_ctx.cancelText),
              33
              /* TEXT, NEED_HYDRATION */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["safeAreaInsetBottom", "round", "close-on-click-overlay", "onChange"]);
  }
  const __easycom_9 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$e], ["__scopeId", "data-v-39528ed0"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.vue"]]);
  const props$5 = {
    props: {
      // 是否展示工具条
      show: {
        type: Boolean,
        default: true
      },
      // 是否显示下边框
      showBorder: {
        type: Boolean,
        default: false
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 标题文字
      title: {
        type: String,
        default: ""
      },
      ...(_N = (_M = uni.$uv) == null ? void 0 : _M.props) == null ? void 0 : _N.toolbar
    }
  };
  const _sfc_main$k = {
    name: "uv-toolbar",
    emits: ["confirm", "cancel"],
    mixins: [mpMixin, mixin, props$5],
    methods: {
      // 点击取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击确定按钮
      confirm() {
        this.$emit("confirm");
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-toolbar", { "uv-border-bottom": _ctx.showBorder }]),
        onTouchmove: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"]))
      },
      [
        vue.createElementVNode("view", {
          class: "uv-toolbar__cancel__wrapper",
          "hover-class": "uv-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "uv-toolbar__wrapper__cancel",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.cancel && $options.cancel(...args)),
              style: vue.normalizeStyle({
                color: _ctx.cancelColor
              })
            },
            vue.toDisplayString(_ctx.cancelText),
            5
            /* TEXT, STYLE */
          )
        ]),
        _ctx.title ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "uv-toolbar__title uv-line-1"
          },
          vue.toDisplayString(_ctx.title),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "uv-toolbar__confirm__wrapper",
          "hover-class": "uv-hover-class"
        }, [
          vue.createElementVNode(
            "text",
            {
              class: "uv-toolbar__wrapper__confirm",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
              style: vue.normalizeStyle({
                color: _ctx.confirmColor
              })
            },
            vue.toDisplayString(_ctx.confirmText),
            5
            /* TEXT, STYLE */
          )
        ])
      ],
      34
      /* CLASS, NEED_HYDRATION */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$d], ["__scopeId", "data-v-298cf9e4"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-toolbar/components/uv-toolbar/uv-toolbar.vue"]]);
  const props$4 = {
    props: {
      // 是否展示顶部的操作栏
      showToolbar: {
        type: Boolean,
        default: true
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 弹窗圆角
      round: {
        type: [String, Number],
        default: 0
      },
      // 对象数组，设置每一列的数据
      columns: {
        type: Array,
        default: () => []
      },
      // 是否显示加载中状态
      loading: {
        type: Boolean,
        default: false
      },
      // 各列中，单个选项的高度
      itemHeight: {
        type: [String, Number],
        default: 44
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确定"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 文字颜色
      color: {
        type: String,
        default: ""
      },
      // 选中文字的颜色
      activeColor: {
        type: String,
        default: ""
      },
      // 每列中可见选项的数量
      visibleItemCount: {
        type: [String, Number],
        default: 5
      },
      // 选项对象中，需要展示的属性键名
      keyName: {
        type: String,
        default: "text"
      },
      // 是否允许点击遮罩关闭选择器
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 是否允许点击确认关闭选择器
      closeOnClickConfirm: {
        type: Boolean,
        default: true
      },
      // 各列的默认索引
      defaultIndex: {
        type: Array,
        default: () => []
      },
      // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
      immediateChange: {
        type: Boolean,
        default: true
      },
      ...(_P = (_O = uni.$uv) == null ? void 0 : _O.props) == null ? void 0 : _P.picker
    }
  };
  const _sfc_main$j = {
    name: "uv-picker",
    emits: ["confirm", "cancel", "close", "change"],
    mixins: [mpMixin, mixin, props$4],
    computed: {
      // 为了解决支付宝不生效
      textStyle() {
        return (index2, index1) => {
          const style = {};
          style.display = "block";
          if (this.color) {
            style.color = this.color;
          }
          if (this.activeColor && index1 === this.innerIndex[index2]) {
            style.color = this.activeColor;
          }
          return style;
        };
      }
    },
    data() {
      return {
        // 上一次选择的列索引
        lastIndex: [],
        // 索引值 ，对应picker-view的value
        innerIndex: [],
        // 各列的值
        innerColumns: [],
        // 上一次的变化列索引
        columnIndex: 0
      };
    },
    watch: {
      // 监听默认索引的变化，重新设置对应的值
      defaultIndex: {
        immediate: true,
        handler(n) {
          this.setIndexs(n, true);
        }
      },
      // 监听columns参数的变化
      columns: {
        deep: true,
        immediate: true,
        handler(n) {
          this.setColumns(n);
        }
      }
    },
    methods: {
      open() {
        this.$refs.pickerPopup.open();
      },
      close() {
        this.$refs.pickerPopup.close();
      },
      popupChange(e) {
        if (!e.show)
          this.$emit("close");
      },
      // 获取item需要显示的文字，判别为对象还是文本
      getItemText(item) {
        if (this.$uv.test.object(item)) {
          return item[this.keyName];
        } else {
          return item;
        }
      },
      // 点击工具栏的取消按钮
      cancel() {
        this.$emit("cancel");
        this.close();
      },
      // 点击工具栏的确定按钮
      confirm() {
        this.$emit("confirm", this.$uv.deepClone({
          indexs: this.innerIndex,
          value: this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]),
          values: this.innerColumns
        }));
        if (this.closeOnClickConfirm) {
          this.close();
        }
      },
      // 选择器某一列的数据发生变化时触发
      changeHandler(e) {
        const {
          value: value2
        } = e.detail;
        let index2 = 0, columnIndex = 0;
        for (let i = 0; i < value2.length; i++) {
          let item = value2[i];
          if (item !== (this.lastIndex[i] || 0)) {
            columnIndex = i;
            index2 = item;
            break;
          }
        }
        this.columnIndex = columnIndex;
        const values = this.innerColumns;
        this.setLastIndex(value2);
        this.setIndexs(value2);
        this.$emit("change", {
          value: this.innerColumns.map((item, index3) => item[value2[index3]]),
          index: index2,
          indexs: value2,
          // values为当前变化列的数组内容
          values,
          columnIndex
        });
      },
      // 设置index索引，此方法可被外部调用设置
      setIndexs(index2, setLastIndex) {
        this.innerIndex = this.$uv.deepClone(index2);
        if (setLastIndex) {
          this.setLastIndex(index2);
        }
      },
      // 记录上一次的各列索引位置
      setLastIndex(index2) {
        this.lastIndex = this.$uv.deepClone(index2);
      },
      // 设置对应列选项的所有值
      setColumnValues(columnIndex, values) {
        this.innerColumns.splice(columnIndex, 1, values);
        let tmpIndex = this.$uv.deepClone(this.innerIndex);
        for (let i = 0; i < this.innerColumns.length; i++) {
          if (i > this.columnIndex) {
            tmpIndex[i] = 0;
          }
        }
        this.setIndexs(tmpIndex);
      },
      // 获取对应列的所有选项
      getColumnValues(columnIndex) {
        (async () => {
          await this.$uv.sleep();
        })();
        return this.innerColumns[columnIndex];
      },
      // 设置整体各列的columns的值
      setColumns(columns) {
        this.innerColumns = this.$uv.deepClone(columns);
        if (this.innerIndex.length === 0) {
          this.innerIndex = new Array(columns.length).fill(0);
        }
      },
      // 获取各列选中值对应的索引
      getIndexs() {
        return this.innerIndex;
      },
      // 获取各列选中的值
      getValues() {
        (async () => {
          await this.$uv.sleep();
        })();
        return this.innerColumns.map((item, index2) => item[this.innerIndex[index2]]);
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_toolbar = resolveEasycom(vue.resolveDynamicComponent("uv-toolbar"), __easycom_0$4);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$7);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_11);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "pickerPopup",
      mode: "bottom",
      round: _ctx.round,
      "close-on-click-overlay": _ctx.closeOnClickOverlay,
      onChange: $options.popupChange
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "uv-picker" }, [
          _ctx.showToolbar ? (vue.openBlock(), vue.createBlock(_component_uv_toolbar, {
            key: 0,
            cancelColor: _ctx.cancelColor,
            confirmColor: _ctx.confirmColor,
            cancelText: _ctx.cancelText,
            confirmText: _ctx.confirmText,
            title: _ctx.title,
            onCancel: $options.cancel,
            onConfirm: $options.confirm
          }, null, 8, ["cancelColor", "confirmColor", "cancelText", "confirmText", "title", "onCancel", "onConfirm"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("picker-view", {
            class: "uv-picker__view",
            indicatorStyle: `height: ${_ctx.$uv.addUnit(_ctx.itemHeight)}`,
            value: $data.innerIndex,
            immediateChange: _ctx.immediateChange,
            style: vue.normalizeStyle({
              height: `${_ctx.$uv.addUnit(_ctx.visibleItemCount * _ctx.itemHeight)}`
            }),
            onChange: _cache[0] || (_cache[0] = (...args) => $options.changeHandler && $options.changeHandler(...args))
          }, [
            vue.createCommentVNode(" @pickend在这里为了解决抖音等滚到底不触发change兼容性问题 "),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.innerColumns, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("picker-view-column", {
                  key: index2,
                  class: "uv-picker__view__column"
                }, [
                  _ctx.$uv.test.array(item) ? (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    vue.renderList(item, (item1, index1) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          class: "uv-picker__view__column__item uv-line-1",
                          key: index1,
                          style: vue.normalizeStyle([{
                            height: _ctx.$uv.addUnit(_ctx.itemHeight),
                            lineHeight: _ctx.$uv.addUnit(_ctx.itemHeight),
                            fontWeight: index1 === $data.innerIndex[index2] ? "bold" : "normal"
                          }, $options.textStyle(index2, index1)])
                        },
                        vue.toDisplayString($options.getItemText(item1)),
                        5
                        /* TEXT, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true)
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 44, ["indicatorStyle", "value", "immediateChange"]),
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uv-picker--loading"
          }, [
            vue.createVNode(_component_uv_loading_icon, { mode: "circle" })
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["round", "close-on-click-overlay", "onChange"]);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$c], ["__scopeId", "data-v-f74a1703"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-picker/components/uv-picker/uv-picker.vue"]]);
  const props$3 = {
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 是否打开组件
      show: {
        type: Boolean,
        default: false
      },
      // 是否展示顶部的操作栏
      showToolbar: {
        type: Boolean,
        default: true
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 展示格式，mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择
      mode: {
        type: String,
        default: "datetime"
      },
      // 可选的最大时间
      maxDate: {
        type: Number,
        // 最大默认值为后10年
        default: new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 0, 1).getTime()
      },
      // 可选的最小时间
      minDate: {
        type: Number,
        // 最小默认值为前10年
        default: new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime()
      },
      // 可选的最小小时，仅mode=time有效
      minHour: {
        type: Number,
        default: 0
      },
      // 可选的最大小时，仅mode=time有效
      maxHour: {
        type: Number,
        default: 23
      },
      // 可选的最小分钟，仅mode=time有效
      minMinute: {
        type: Number,
        default: 0
      },
      // 可选的最大分钟，仅mode=time有效
      maxMinute: {
        type: Number,
        default: 59
      },
      // 选项过滤函数
      filter: {
        type: [Function, null],
        default: null
      },
      // 选项格式化函数
      formatter: {
        type: [Function, null],
        default: null
      },
      // 是否显示加载中状态
      loading: {
        type: Boolean,
        default: false
      },
      // 各列中，单个选项的高度
      itemHeight: {
        type: [String, Number],
        default: 44
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 取消按钮的颜色
      cancelColor: {
        type: String,
        default: "#909193"
      },
      // 确认按钮的颜色
      confirmColor: {
        type: String,
        default: "#3c9cff"
      },
      // 每列中可见选项的数量
      visibleItemCount: {
        type: [String, Number],
        default: 5
      },
      // 是否允许点击遮罩关闭选择器
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 是否允许点击确认关闭选择器
      closeOnClickConfirm: {
        type: Boolean,
        default: true
      },
      // 是否清空上次选择内容
      clearDate: {
        type: Boolean,
        default: false
      },
      // 圆角
      round: {
        type: [String, Number],
        default: 0
      },
      ...(_R = (_Q = uni.$uv) == null ? void 0 : _Q.props) == null ? void 0 : _R.datetimePicker
    }
  };
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var require_dayjs_min = __commonJS({
    "uvuidayjs"(exports, module) {
      !function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
      }(exports, function() {
        var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
          var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
          return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
        } }, m = function(t2, e2, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
        }, v = { s: m, z: function(t2) {
          var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
          return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
        }, m: function t2(e2, n2) {
          if (e2.date() < n2.date())
            return -t2(n2, e2);
          var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
          return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
        }, a: function(t2) {
          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
        }, p: function(t2) {
          return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t2) {
          return void 0 === t2;
        } }, g = "en", D = {};
        D[g] = M;
        var p = function(t2) {
          return t2 instanceof _;
        }, S = function t2(e2, n2, r2) {
          var i2;
          if (!e2)
            return g;
          if ("string" == typeof e2) {
            var s2 = e2.toLowerCase();
            D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
            var u2 = e2.split("-");
            if (!i2 && u2.length > 1)
              return t2(u2[0]);
          } else {
            var a2 = e2.name;
            D[a2] = e2, i2 = a2;
          }
          return !r2 && i2 && (g = i2), i2 || !r2 && g;
        }, w = function(t2, e2) {
          if (p(t2))
            return t2.clone();
          var n2 = "object" == typeof e2 ? e2 : {};
          return n2.date = t2, n2.args = arguments, new _(n2);
        }, O = v;
        O.l = S, O.i = p, O.w = function(t2, e2) {
          return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        };
        var _ = function() {
          function M2(t2) {
            this.$L = S(t2.locale, null, true), this.parse(t2);
          }
          var m2 = M2.prototype;
          return m2.parse = function(t2) {
            this.$d = function(t3) {
              var e2 = t3.date, n2 = t3.utc;
              if (null === e2)
                return /* @__PURE__ */ new Date(NaN);
              if (O.u(e2))
                return /* @__PURE__ */ new Date();
              if (e2 instanceof Date)
                return new Date(e2);
              if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                var r2 = e2.match($);
                if (r2) {
                  var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e2);
            }(t2), this.$x = t2.x || {}, this.init();
          }, m2.init = function() {
            var t2 = this.$d;
            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
          }, m2.$utils = function() {
            return O;
          }, m2.isValid = function() {
            return !(this.$d.toString() === l);
          }, m2.isSame = function(t2, e2) {
            var n2 = w(t2);
            return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
          }, m2.isAfter = function(t2, e2) {
            return w(t2) < this.startOf(e2);
          }, m2.isBefore = function(t2, e2) {
            return this.endOf(e2) < w(t2);
          }, m2.$g = function(t2, e2, n2) {
            return O.u(t2) ? this[e2] : this.set(n2, t2);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t2, e2) {
            var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), l2 = function(t3, e3) {
              var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
              return r2 ? i2 : i2.endOf(a);
            }, $2 = function(t3, e3) {
              return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
            switch (h2) {
              case c:
                return r2 ? l2(1, 0) : l2(31, 11);
              case f:
                return r2 ? l2(1, M3) : l2(0, M3 + 1);
              case o:
                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a:
              case d:
                return $2(v2 + "Hours", 0);
              case u:
                return $2(v2 + "Minutes", 1);
              case s:
                return $2(v2 + "Seconds", 2);
              case i:
                return $2(v2 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t2) {
            return this.startOf(t2, false);
          }, m2.$set = function(t2, e2) {
            var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
            if (o2 === f || o2 === c) {
              var y2 = this.clone().set(d, 1);
              y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
            } else
              l2 && this.$d[l2]($2);
            return this.init(), this;
          }, m2.set = function(t2, e2) {
            return this.clone().$set(t2, e2);
          }, m2.get = function(t2) {
            return this[O.p(t2)]();
          }, m2.add = function(r2, h2) {
            var d2, l2 = this;
            r2 = Number(r2);
            var $2 = O.p(h2), y2 = function(t2) {
              var e2 = w(l2);
              return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
            };
            if ($2 === f)
              return this.set(f, this.$M + r2);
            if ($2 === c)
              return this.set(c, this.$y + r2);
            if ($2 === a)
              return y2(1);
            if ($2 === o)
              return y2(7);
            var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
            return O.w(m3, this);
          }, m2.subtract = function(t2, e2) {
            return this.add(-1 * t2, e2);
          }, m2.format = function(t2) {
            var e2 = this, n2 = this.$locale();
            if (!this.isValid())
              return n2.invalidDate || l;
            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
              return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
            }, c2 = function(t3) {
              return O.s(s2 % 12 || 12, t3, "0");
            }, d2 = n2.meridiem || function(t3, e3, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            }, $2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
            return r2.replace(y, function(t3, e3) {
              return e3 || $2[t3] || i2.replace(":", "");
            });
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d2, l2) {
            var $2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, v2 = this - M3, g2 = O.m(this, M3);
            return g2 = ($2 = {}, $2[c] = g2 / 12, $2[f] = g2, $2[h] = g2 / 3, $2[o] = (v2 - m3) / 6048e5, $2[a] = (v2 - m3) / 864e5, $2[u] = v2 / n, $2[s] = v2 / e, $2[i] = v2 / t, $2)[y2] || v2, l2 ? g2 : O.a(g2);
          }, m2.daysInMonth = function() {
            return this.endOf(f).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t2, e2) {
            if (!t2)
              return this.$L;
            var n2 = this.clone(), r2 = S(t2, e2, true);
            return r2 && (n2.$L = r2), n2;
          }, m2.clone = function() {
            return O.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        }(), T = _.prototype;
        return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
          T[t2[1]] = function(e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        }), w.extend = function(t2, e2) {
          return t2.$i || (t2(e2, _, w), t2.$i = true), w;
        }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
          return w(1e3 * t2);
        }, w.en = D[g], w.Ls = D, w.p = {}, w;
      });
    }
  });
  const dayjs = require_dayjs_min();
  function times(n, iteratee) {
    let index2 = -1;
    const result = Array(n < 0 ? 0 : n);
    while (++index2 < n) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  const _sfc_main$i = {
    name: "uv-datetime-picker",
    emits: ["close", "cancel", "confirm", "input", "change", "update:modelValue"],
    mixins: [mpMixin, mixin, props$3],
    data() {
      return {
        columns: [],
        innerDefaultIndex: [],
        innerFormatter: (type2, value2) => value2
      };
    },
    watch: {
      propsChange() {
        this.$uv.sleep(100).then((res) => {
          this.init();
        });
      }
    },
    computed: {
      // 如果以下这些变量发生了变化，意味着需要重新初始化各列的值
      propsChange() {
        const propsValue = this.value || this.modelValue;
        return [this.mode, this.maxDate, this.minDate, this.minHour, this.maxHour, this.minMinute, this.maxMinute, this.filter, propsValue];
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getValue();
        this.updateColumnValue(this.innerValue);
      },
      getValue() {
        const propsValue = this.value || this.modelValue;
        this.innerValue = this.correctValue(propsValue);
      },
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e) {
        this.innerFormatter = e;
      },
      open() {
        this.$refs.picker.open();
        setTimeout(() => {
          this.getValue();
          this.updateColumnValue(this.innerValue);
        }, 10);
      },
      close() {
        this.$emit("close");
      },
      // 点击工具栏的取消按钮
      cancel() {
        this.$emit("cancel");
      },
      // 点击工具栏的确定按钮
      confirm() {
        this.$emit("confirm", {
          value: this.innerValue,
          mode: this.mode
        });
        if (!this.clearDate) {
          this.$emit("input", this.innerValue);
          this.$emit("update:modelValue", this.innerValue);
        }
      },
      //用正则截取输出值,当出现多组数字时,抛出错误
      intercept(e, type2) {
        let judge = e.match(/\d+/g);
        if (judge.length > 1) {
          this.$uv.error("请勿在过滤或格式化函数时添加数字");
          return 0;
        } else if (type2 && judge[0].length == 4) {
          return judge[0];
        } else if (judge[0].length > 2) {
          this.$uv.error("请勿在过滤或格式化函数时添加数字");
          return 0;
        } else {
          return judge[0];
        }
      },
      // 列发生变化时触发
      change(e) {
        const { indexs, values } = e;
        let selectValue = "";
        if (this.mode === "time") {
          selectValue = `${this.intercept(values[0][indexs[0]])}:${this.intercept(values[1][indexs[1]])}`;
        } else if (this.mode === "year") {
          const year = parseInt(this.intercept(values[0][indexs[0]], "year"));
          selectValue = Number(new Date(year, 0));
        } else {
          const year = parseInt(this.intercept(values[0][indexs[0]], "year"));
          const month = parseInt(this.intercept(values[1][indexs[1]]));
          let date3 = parseInt(values[2] ? this.intercept(values[2][indexs[2]]) : 1);
          let hour = 0, minute = 0;
          const maxDate = dayjs(`${year}-${month}`).daysInMonth();
          if (this.mode === "year-month") {
            date3 = 1;
          }
          date3 = Math.min(maxDate, date3);
          if (this.mode === "datetime") {
            hour = parseInt(this.intercept(values[3][indexs[3]]));
            minute = parseInt(this.intercept(values[4][indexs[4]]));
          }
          selectValue = Number(new Date(year, month - 1, date3, hour, minute));
        }
        selectValue = this.correctValue(selectValue);
        this.innerValue = selectValue;
        this.updateColumnValue(selectValue);
        this.$emit("change", {
          value: selectValue,
          mode: this.mode
        });
      },
      // 更新各列的值，进行补0、格式化等操作
      updateColumnValue(value2) {
        this.innerValue = value2;
        this.updateColumns();
        this.updateIndexs(value2);
      },
      // 更新索引
      updateIndexs(value2) {
        let values = [];
        const formatter = this.formatter || this.innerFormatter;
        if (this.mode === "time") {
          const timeArr = value2.split(":");
          values = [formatter("hour", timeArr[0]), formatter("minute", timeArr[1])];
        } else {
          values = [
            formatter("year", `${dayjs(value2).year()}`),
            // 月份补0
            formatter("month", this.$uv.padZero(dayjs(value2).month() + 1))
          ];
          if (this.mode === "date") {
            values.push(formatter("day", this.$uv.padZero(dayjs(value2).date())));
          }
          if (this.mode === "datetime") {
            values.push(formatter("day", this.$uv.padZero(dayjs(value2).date())), formatter("hour", this.$uv.padZero(dayjs(value2).hour())), formatter("minute", this.$uv.padZero(dayjs(value2).minute())));
          }
        }
        const indexs = this.columns.map((column, index2) => {
          return Math.max(0, column.findIndex((item) => item === values[index2]));
        });
        this.$nextTick(() => {
          this.$uv.sleep(100).then((res) => {
            this.$refs.picker.setIndexs(indexs, true);
          });
        });
      },
      // 更新各列的值
      updateColumns() {
        const formatter = this.formatter || this.innerFormatter;
        const results = this.getOriginColumns().map((column) => column.values.map((value2) => formatter(column.type, value2)));
        this.columns = results;
      },
      getOriginColumns() {
        const results = this.getRanges().map(({ type: type2, range: range2 }) => {
          let values = times(range2[1] - range2[0] + 1, (index2) => {
            let value2 = range2[0] + index2;
            value2 = type2 === "year" ? `${value2}` : this.$uv.padZero(value2);
            return value2;
          });
          if (this.filter) {
            values = this.filter(type2, values);
          }
          return { type: type2, values };
        });
        return results;
      },
      // 通过最大值和最小值生成数组
      generateArray(start, end) {
        return Array.from(new Array(end + 1).keys()).slice(start);
      },
      // 得出合法的时间
      correctValue(value2) {
        const isDateMode = this.mode !== "time";
        if (isDateMode && !this.$uv.test.date(value2)) {
          value2 = this.minDate;
        } else if (!isDateMode && !value2) {
          value2 = `${this.$uv.padZero(this.minHour)}:${this.$uv.padZero(this.minMinute)}`;
        }
        if (!isDateMode) {
          if (String(value2).indexOf(":") === -1)
            return this.$uv.error("时间错误，请传递如12:24的格式");
          let [hour, minute] = value2.split(":");
          hour = this.$uv.padZero(this.$uv.range(this.minHour, this.maxHour, Number(hour)));
          minute = this.$uv.padZero(this.$uv.range(this.minMinute, this.maxMinute, Number(minute)));
          return `${hour}:${minute}`;
        } else {
          value2 = dayjs(value2).isBefore(dayjs(this.minDate)) ? this.minDate : value2;
          value2 = dayjs(value2).isAfter(dayjs(this.maxDate)) ? this.maxDate : value2;
          return value2;
        }
      },
      // 获取每列的最大和最小值
      getRanges() {
        if (this.mode === "time") {
          return [{
            type: "hour",
            range: [this.minHour, this.maxHour]
          }, {
            type: "minute",
            range: [this.minMinute, this.maxMinute]
          }];
        }
        const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary("max", this.innerValue);
        const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary("min", this.innerValue);
        const result = [{
          type: "year",
          range: [minYear, maxYear]
        }, {
          type: "month",
          range: [minMonth, maxMonth]
        }, {
          type: "day",
          range: [minDate, maxDate]
        }, {
          type: "hour",
          range: [minHour, maxHour]
        }, {
          type: "minute",
          range: [minMinute, maxMinute]
        }];
        if (this.mode === "date")
          result.splice(3, 2);
        if (this.mode === "year-month")
          result.splice(2, 3);
        if (this.mode === "year")
          result.splice(1, 4);
        return result;
      },
      // 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
      getBoundary(type2, innerValue) {
        const value2 = new Date(innerValue);
        const boundary = new Date(this[`${type2}Date`]);
        const year = dayjs(boundary).year();
        let month = 1;
        let date3 = 1;
        let hour = 0;
        let minute = 0;
        if (type2 === "max") {
          month = 12;
          date3 = dayjs(value2).daysInMonth();
          hour = 23;
          minute = 59;
        }
        if (dayjs(value2).year() === year) {
          month = dayjs(boundary).month() + 1;
          if (dayjs(value2).month() + 1 === month) {
            date3 = dayjs(boundary).date();
            if (dayjs(value2).date() === date3) {
              hour = dayjs(boundary).hour();
              if (dayjs(value2).hour() === hour) {
                minute = dayjs(boundary).minute();
              }
            }
          }
        }
        return {
          [`${type2}Year`]: year,
          [`${type2}Month`]: month,
          [`${type2}Date`]: date3,
          [`${type2}Hour`]: hour,
          [`${type2}Minute`]: minute
        };
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_picker = resolveEasycom(vue.resolveDynamicComponent("uv-picker"), __easycom_0$3);
    return vue.openBlock(), vue.createBlock(_component_uv_picker, {
      ref: "picker",
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      closeOnClickConfirm: _ctx.closeOnClickConfirm,
      columns: $data.columns,
      title: _ctx.title,
      itemHeight: _ctx.itemHeight,
      showToolbar: _ctx.showToolbar,
      visibleItemCount: _ctx.visibleItemCount,
      defaultIndex: $data.innerDefaultIndex,
      cancelText: _ctx.cancelText,
      confirmText: _ctx.confirmText,
      cancelColor: _ctx.cancelColor,
      confirmColor: _ctx.confirmColor,
      round: _ctx.round,
      onClose: $options.close,
      onCancel: $options.cancel,
      onConfirm: $options.confirm,
      onChange: $options.change
    }, null, 8, ["closeOnClickOverlay", "closeOnClickConfirm", "columns", "title", "itemHeight", "showToolbar", "visibleItemCount", "defaultIndex", "cancelText", "confirmText", "cancelColor", "confirmColor", "round", "onClose", "onCancel", "onConfirm", "onChange"]);
  }
  const __easycom_10 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$b], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.vue"]]);
  function createAppointment(data) {
    return request.post("/mms-api/appointment/create", data);
  }
  function getAppointmentList(data) {
    return request.post("/mms-api/appointment/list", data);
  }
  const _sfc_main$h = {
    __name: "index",
    setup(__props) {
      const {
        t,
        locale
      } = useI18n();
      const popupRefs = vue.ref();
      const openPopup = () => {
        popupRefs.value.open();
      };
      const closePopup = () => {
        popupRefs.value.close();
      };
      const now = Date.now();
      const oneMonthLater = (/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() + 1);
      const bookingDate = vue.ref();
      const model1 = vue.reactive({
        userInfo: {
          name: "",
          mobile: "",
          sex: "",
          sexValue: 0,
          idCard: "",
          age: null,
          appointmentTime: null,
          symptoms: "",
          remarks: ""
        }
      });
      const appointmentList = vue.ref([]);
      const stepsList = vue.ref([
        {
          title: t("appointment.pending"),
          value: 1,
          error: false
        },
        {
          title: t("appointment.confirmed"),
          value: 2,
          error: true
        },
        {
          title: t("appointment.completed"),
          value: 3,
          error: true
        },
        {
          title: t("appointment.canceled"),
          value: 4,
          error: false
        },
        {
          title: t("appointment.expired"),
          value: 5,
          error: false
        }
      ]);
      const rules2 = {
        "userInfo.name": {
          type: "string",
          required: true,
          message: t("appointment.fillName"),
          trigger: ["blur", "change"]
        },
        "userInfo.mobile": {
          type: "number",
          required: true,
          min: 8,
          max: 15,
          message: t("appointment.correctPhone"),
          trigger: ["blur", "change"]
        },
        "userInfo.sex": {
          type: "string",
          max: 1,
          required: true,
          message: t("appointment.selectGenderOption"),
          trigger: ["blur", "change"]
        },
        "userInfo.age": {
          type: "number",
          required: true,
          message: t("appointment.fillAge"),
          trigger: ["blur", "change"]
        },
        "userInfo.appointmentTime": {
          type: "string",
          required: true,
          message: t("appointment.selectDateTimeOption"),
          trigger: ["blur", "change"]
        }
      };
      const actions = [
        {
          name: t("appointment.male"),
          value: 1
        },
        {
          name: t("appointment.female"),
          value: 2
        }
      ];
      const form = vue.ref(null);
      const sexSelectRefs = vue.ref(null);
      const datetimePicker = vue.ref(null);
      const timePicker = vue.ref(null);
      const userId = vue.ref("");
      if (Cache$1.has(LOGIN_STATUS, false)) {
        uni.getStorage({
          key: "USER_INFO",
          success: function(res) {
            userId.value = res.data.userId;
            formatAppLog("log", "at pages/appointment/index.vue:242", userId.value);
          },
          fail: function(err) {
            formatAppLog("error", "at pages/appointment/index.vue:245", "获取 USER_INFO 失败:", err);
          }
        });
      }
      const submit = () => {
        form.value.validate().then((res) => {
          uni.showToast({
            icon: "success",
            title: t("appointment.validationPassed")
          });
          const data = {
            patientName: model1.userInfo.name,
            phoneNumber: model1.userInfo.mobile,
            idCard: model1.userInfo.idCard,
            gender: model1.userInfo.sexValue,
            age: Number(model1.userInfo.age),
            appointmentTime: bookingDate.value,
            symptoms: model1.userInfo.symptoms,
            remarks: model1.userInfo.remarks,
            userId: userId.value,
            id: "1"
          };
          createAppointment(data).then((res2) => {
            if (res2.code === 0) {
              formatAppLog("log", "at pages/appointment/index.vue:271", res2);
              uni.showToast({
                title: t("appointment.success"),
                icon: "none",
                duration: 2e3
              });
              closePopup();
              getAppointmentData();
            }
          }).catch((err) => {
            formatAppLog("error", "at pages/appointment/index.vue:281", err);
          });
        }).catch((errors) => {
          uni.showToast({
            icon: "error",
            title: t("appointment.validationFailed")
          });
        });
      };
      const changePopup = (e) => {
        if (!e.show) {
          form.value.resetFields();
          form.value.clearValidate();
        }
      };
      const showSexSelect = () => {
        sexSelectRefs.value.open();
        hideKeyboard();
      };
      const sexSelect = (e) => {
        model1.userInfo.sex = e.name;
        model1.userInfo.sexValue = e.value;
        formatAppLog("log", "at pages/appointment/index.vue:313", model1.userInfo.sex);
        form.value.validateField("userInfo.sex", (err) => {
        });
      };
      const hideKeyboard = () => {
        uni.hideKeyboard();
      };
      const showDataPicker = () => {
        datetimePicker.value.open();
      };
      const showTimePicker = () => {
        timePicker.value.open();
      };
      const confirmDate = (e) => {
        formatAppLog("log", "at pages/appointment/index.vue:333", e);
        bookingDate.value = e.value;
        showTimePicker();
      };
      const confirmTime = (e) => {
        formatAppLog("log", "at pages/appointment/index.vue:339", e);
        const dateTimestamp = bookingDate.value;
        const timeString = e.value;
        if (!dateTimestamp || !timeString) {
          formatAppLog("error", "at pages/appointment/index.vue:345", "日期或时间数据不完整");
          return;
        }
        const date3 = new Date(dateTimestamp);
        const year = date3.getFullYear();
        const month = date3.getMonth();
        const day = date3.getDate();
        const localDate = new Date(year, month, day);
        const [hours, minutes] = timeString.split(":").map(Number);
        localDate.setHours(hours, minutes);
        bookingDate.value = localDate.getTime();
        model1.userInfo.appointmentTime = localDate.toLocaleString();
        formatAppLog("log", "at pages/appointment/index.vue:368", "合并后的时间戳:", bookingDate.value);
        formatAppLog("log", "at pages/appointment/index.vue:369", "合并后的时间:", model1.userInfo.appointmentTime);
      };
      const filter = (type2, options) => {
        if (type2 === "minute") {
          return options.filter((minute) => [0, 10, 20, 30, 40, 50].includes(Number(minute)));
        }
        return options;
      };
      const getAppointmentData = () => {
        const data = {
          page: 1,
          pageSize: 50,
          userId: userId.value
        };
        getAppointmentList(data).then((res) => {
          if (res.code === 0) {
            appointmentList.value = res.data.data;
            formatAppLog("log", "at pages/appointment/index.vue:395", res.data.data);
          }
        }).catch((err) => {
          formatAppLog("error", "at pages/appointment/index.vue:398", err);
        });
      };
      function formatToDate(timestamp) {
        const date3 = new Date(timestamp);
        const year = date3.getFullYear();
        const month = String(date3.getMonth() + 1).padStart(2, "0");
        const day = String(date3.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
      function formatToTime(timestamp) {
        const date3 = new Date(timestamp);
        const hours = String(date3.getHours()).padStart(2, "0");
        const minutes = String(date3.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      }
      onShow(() => {
        getAppointmentData();
      });
      return (_ctx, _cache) => {
        const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
        const _component_uv_navbar = resolveEasycom(vue.resolveDynamicComponent("uv-navbar"), __easycom_0$8);
        const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_4$2);
        const _component_uv_empty = resolveEasycom(vue.resolveDynamicComponent("uv-empty"), __easycom_3$2);
        const _component_uv_steps_item = resolveEasycom(vue.resolveDynamicComponent("uv-steps-item"), __easycom_4$1);
        const _component_uv_steps = resolveEasycom(vue.resolveDynamicComponent("uv-steps"), __easycom_5);
        const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_6);
        const _component_uv_form_item = resolveEasycom(vue.resolveDynamicComponent("uv-form-item"), __easycom_7);
        const _component_uv_form = resolveEasycom(vue.resolveDynamicComponent("uv-form"), __easycom_8);
        const _component_uv_action_sheet = resolveEasycom(vue.resolveDynamicComponent("uv-action-sheet"), __easycom_9);
        const _component_uv_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uv-datetime-picker"), __easycom_10);
        const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_11);
        return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
          vue.createCommentVNode(' <statusBar :useThemeColor="false"></statusBar> '),
          vue.createVNode(_component_uv_navbar, {
            title: vue.unref(t)("appointment.booking"),
            placeholder: true,
            leftIcon: ""
          }, {
            right: vue.withCtx(() => [
              vue.createVNode(_component_uv_icon, {
                name: "calendar",
                size: "28",
                onClick: _cache[0] || (_cache[0] = ($event) => openPopup())
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["title"]),
          appointmentList.value.length === 0 ? (vue.openBlock(), vue.createBlock(_component_uv_empty, {
            key: 0,
            mode: "history",
            textSize: "18",
            text: vue.unref(t)("appointment.noRecord"),
            width: "200",
            height: "200"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { style: { "margin-top": "30rpx" } }, [
                vue.createVNode(_component_uv_button, {
                  type: "success",
                  size: "large",
                  text: vue.unref(t)("appointment.bookNow"),
                  onClick: _cache[1] || (_cache[1] = ($event) => openPopup())
                }, null, 8, ["text"])
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["text"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "bookingContent" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(appointmentList.value, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "bookingList" }, [
                  vue.createElementVNode("view", { class: "bookingTop" }, [
                    vue.createElementVNode("view", { class: "bookingDate" }, [
                      vue.createVNode(_component_uv_icon, { name: "calendar" }),
                      vue.createTextVNode(
                        " " + vue.toDisplayString(formatToDate(item.appointmentTime)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "bookingTime" }, [
                      vue.createVNode(_component_uv_icon, { name: "clock" }),
                      vue.createTextVNode(
                        " " + vue.toDisplayString(formatToTime(item.appointmentTime)),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createVNode(_component_uv_steps, {
                    current: item.status - 1
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(stepsList.value, (data, stepIndex) => {
                          return vue.openBlock(), vue.createBlock(_component_uv_steps_item, {
                            key: stepIndex,
                            customStyle: "text-align: center;",
                            title: data.title
                          }, null, 8, ["title"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["current"])
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ]),
          vue.createVNode(
            _component_uv_popup,
            {
              ref_key: "popupRefs",
              ref: popupRefs,
              mode: "bottom",
              onChange: changePopup,
              "close-on-click-overlay": false,
              closeable: true,
              round: 20
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "popupContent" }, [
                  vue.createVNode(_component_uv_form, {
                    "label-position": "left",
                    model: model1,
                    rules: rules2,
                    ref_key: "form",
                    ref: form,
                    labelPosition: "top",
                    labelWidth: "250rpx"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uv_form_item, {
                        label: vue.unref(t)("appointment.name"),
                        prop: "userInfo.name",
                        "border-bottom": "",
                        required: true
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uv_input, {
                            modelValue: model1.userInfo.name,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => model1.userInfo.name = $event),
                            border: "none"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      vue.createVNode(_component_uv_form_item, {
                        label: vue.unref(t)("appointment.phone"),
                        prop: "userInfo.mobile",
                        "border-bottom": "",
                        required: true
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uv_input, {
                            modelValue: model1.userInfo.mobile,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => model1.userInfo.mobile = $event),
                            border: "none",
                            type: "number",
                            maxlength: 15
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      vue.createVNode(_component_uv_form_item, {
                        label: vue.unref(t)("appointment.gender"),
                        prop: "userInfo.sex",
                        "border-bottom": "",
                        onClick: showSexSelect,
                        required: true
                      }, {
                        right: vue.withCtx(() => [
                          vue.createVNode(_component_uv_icon, { name: "arrow-right" })
                        ]),
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uv_input, {
                            modelValue: model1.userInfo.sex,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => model1.userInfo.sex = $event),
                            disabled: "",
                            "disabled-color": "#ffffff",
                            placeholder: vue.unref(t)("appointment.selectGender"),
                            border: "none"
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      vue.createVNode(_component_uv_form_item, {
                        label: vue.unref(t)("appointment.idCard"),
                        prop: "userInfo.idCard",
                        "border-bottom": ""
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uv_input, {
                            modelValue: model1.userInfo.idCard,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => model1.userInfo.idCard = $event),
                            border: "none",
                            maxlength: 20,
                            type: "number"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      vue.createVNode(_component_uv_form_item, {
                        label: vue.unref(t)("appointment.age"),
                        prop: "userInfo.age",
                        "border-bottom": "",
                        required: true
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uv_input, {
                            modelValue: model1.userInfo.age,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => model1.userInfo.age = $event),
                            border: "none",
                            maxlength: 3,
                            type: "number"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      vue.createVNode(_component_uv_form_item, {
                        label: vue.unref(t)("appointment.dateTime"),
                        prop: "userInfo.appointmentTime",
                        "border-bottom": "",
                        onClick: showDataPicker,
                        required: true
                      }, {
                        right: vue.withCtx(() => [
                          vue.createVNode(_component_uv_icon, { name: "arrow-right" })
                        ]),
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uv_input, {
                            modelValue: model1.userInfo.appointmentTime,
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => model1.userInfo.appointmentTime = $event),
                            disabled: "",
                            "disabled-color": "#ffffff",
                            placeholder: vue.unref(t)("appointment.selectDateTime"),
                            border: "none"
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      vue.createVNode(_component_uv_form_item, {
                        label: vue.unref(t)("appointment.symptoms"),
                        prop: "userInfo.symptoms",
                        "border-bottom": ""
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uv_input, {
                            modelValue: model1.userInfo.symptoms,
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => model1.userInfo.symptoms = $event),
                            border: "none"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      vue.createVNode(_component_uv_form_item, {
                        label: vue.unref(t)("appointment.remarks"),
                        prop: "userInfo.remarks",
                        "border-bottom": ""
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uv_input, {
                            modelValue: model1.userInfo.remarks,
                            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => model1.userInfo.remarks = $event),
                            border: "none"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      vue.createVNode(_component_uv_button, {
                        type: "primary",
                        text: vue.unref(t)("appointment.submit"),
                        "custom-style": "margin-top: 10px",
                        onClick: submit
                      }, null, 8, ["text"]),
                      vue.createCommentVNode(' <uv-button type="error" text="重置" custom-style="margin-top: 10px" @click="reset"></uv-button> ')
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["model"]),
                  vue.createVNode(_component_uv_action_sheet, {
                    ref_key: "sexSelectRefs",
                    ref: sexSelectRefs,
                    actions,
                    title: vue.unref(t)("appointment.selectGender"),
                    onSelect: sexSelect
                  }, null, 8, ["title"]),
                  vue.createVNode(_component_uv_datetime_picker, {
                    ref_key: "datetimePicker",
                    ref: datetimePicker,
                    mode: "date",
                    minDate: vue.unref(now),
                    maxDate: vue.unref(oneMonthLater),
                    cancelText: vue.unref(t)("uni.showModal.cancel"),
                    confirmText: vue.unref(t)("uni.showModal.confirm"),
                    onConfirm: confirmDate
                  }, null, 8, ["minDate", "maxDate", "cancelText", "confirmText"]),
                  vue.createVNode(_component_uv_datetime_picker, {
                    ref_key: "timePicker",
                    ref: timePicker,
                    mode: "time",
                    minHour: 9,
                    maxHour: 20,
                    filter,
                    cancelText: vue.unref(t)("uni.showModal.cancel"),
                    confirmText: vue.unref(t)("uni.showModal.confirm"),
                    onConfirm: confirmTime
                  }, null, 8, ["cancelText", "confirmText"])
                ])
              ]),
              _: 1
              /* STABLE */
            },
            512
            /* NEED_PATCH */
          ),
          vue.createVNode(navBar, { activeIndex: 1 })
        ]);
      };
    }
  };
  const PagesAppointmentIndex = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/appointment/index.vue"]]);
  const _sfc_main$g = {
    __name: "index",
    setup(__props) {
      const newsData = vue.ref([]);
      const getNewsList = () => {
        const data = {
          page: 1,
          pageSize: 50
        };
        newsList(data).then((res) => {
          if (res.code === 0) {
            formatAppLog("log", "at pages/news/index.vue:41", res.data);
            const currentLocale = uni.getLocale();
            const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
            newsData.value = res.data.data.map((item) => ({
              id: item.id,
              title: item[`title${languageKey}`],
              converUrl: item.coverUrl
            }));
            formatAppLog("log", "at pages/news/index.vue:51", newsData.value);
          }
        }).catch((err) => {
          formatAppLog("error", "at pages/news/index.vue:54", err);
        });
      };
      const gotoDetail = (id) => {
        formatAppLog("log", "at pages/news/index.vue:59", id);
        uni.navigateTo({
          url: "/pages/news/components/details?id=" + id,
          animationType: "none"
        });
      };
      onLoad(() => {
        getNewsList();
      });
      return (_ctx, _cache) => {
        const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0$a);
        return vue.openBlock(), vue.createElementBlock("view", { class: "newsContent" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(newsData.value, (item, index2) => {
              return vue.openBlock(), vue.createBlock(
                _component_uni_card,
                {
                  padding: "0",
                  spacing: "0",
                  key: index2
                },
                {
                  cover: vue.withCtx(() => [
                    vue.createElementVNode("view", {
                      class: "custom-cover",
                      onClick: ($event) => gotoDetail(item.id)
                    }, [
                      vue.createElementVNode("image", {
                        class: "cover-image",
                        src: item.converUrl
                      }, null, 8, ["src"]),
                      vue.createElementVNode("view", { class: "cover-content" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "uni-subtitle uni-white" },
                          vue.toDisplayString(item.title),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 8, ["onClick"])
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesNewsIndex = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/news/index.vue"]]);
  const _sfc_main$f = {
    name: "UniSegmentedControl",
    emits: ["clickItem"],
    props: {
      current: {
        type: Number,
        default: 0
      },
      values: {
        type: Array,
        default() {
          return [];
        }
      },
      activeColor: {
        type: String,
        default: "#2979FF"
      },
      inActiveColor: {
        type: String,
        default: "transparent"
      },
      styleType: {
        type: String,
        default: "button"
      }
    },
    data() {
      return {
        currentIndex: 0
      };
    },
    watch: {
      current(val) {
        if (val !== this.currentIndex) {
          this.currentIndex = val;
        }
      }
    },
    computed: {},
    created() {
      this.currentIndex = this.current;
    },
    methods: {
      _onClick(index2) {
        if (this.currentIndex !== index2) {
          this.currentIndex = index2;
          this.$emit("clickItem", {
            currentIndex: index2
          });
        }
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass([[$props.styleType === "text" ? "segmented-control--text" : "segmented-control--button"], "segmented-control"]),
        style: vue.normalizeStyle({ borderColor: $props.styleType === "text" ? "" : $props.activeColor })
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.values, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass([[
                $props.styleType === "text" ? "" : "segmented-control__item--button",
                index2 === 0 && $props.styleType === "button" ? "segmented-control__item--button--first" : "",
                index2 === $props.values.length - 1 && $props.styleType === "button" ? "segmented-control__item--button--last" : ""
              ], "segmented-control__item"]),
              key: index2,
              style: vue.normalizeStyle({ backgroundColor: index2 === $data.currentIndex && $props.styleType === "button" ? $props.activeColor : $props.styleType === "button" ? $props.inActiveColor : "transparent", borderColor: index2 === $data.currentIndex && $props.styleType === "text" || $props.styleType === "button" ? $props.activeColor : $props.inActiveColor }),
              onClick: ($event) => $options._onClick(index2)
            }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "text",
                  {
                    style: vue.normalizeStyle({ color: index2 === $data.currentIndex ? $props.styleType === "text" ? $props.activeColor : "#fff" : $props.styleType === "text" ? "#000" : $props.activeColor }),
                    class: vue.normalizeClass(["segmented-control__text", $props.styleType === "text" && index2 === $data.currentIndex ? "segmented-control__item--text" : ""])
                  },
                  vue.toDisplayString(item),
                  7
                  /* TEXT, CLASS, STYLE */
                )
              ])
            ], 14, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$a], ["__scopeId", "data-v-86aa1171"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$e = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code2 = this.icons.find((v) => v.font_class === this.type);
        if (code2) {
          return code2.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$9], ["__scopeId", "data-v-d31e1c47"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$d = {
    name: "uni-easyinput",
    emits: [
      "click",
      "iconClick",
      "update:modelValue",
      "input",
      "focus",
      "blur",
      "confirm",
      "clear",
      "eyes",
      "change",
      "keyboardheightchange"
    ],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      modelValue(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = "";
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type2) {
        this.$emit("iconClick", type2);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value2 = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value2 = this.trimStr(value2);
          }
          if (typeof this.trim === "string") {
            value2 = this.trimStr(value2, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value2;
        this.$emit("input", value2);
        this.$emit("update:modelValue", value2);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("blur", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "adjust-position"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$8], ["__scopeId", "data-v-09fd5285"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$c = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      // 表单校验规则
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      // 表单域的属性名，在使用校验规则时必填
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      // label的宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: ""
      },
      // 强制显示错误信息
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      // 1.4.0 弃用，统一使用 form 的校验时机
      // validateTrigger: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 弃用，统一使用 form 的label 位置
      // labelPosition: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 以下属性已经废弃，请使用  #label 插槽代替
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "70px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      // 处理错误信息
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      // 规则发生变化通知子组件更新
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(
          () => {
            const val = this.form._getDataValue(this.name, this.form.localData);
            return val;
          },
          (value2, oldVal) => {
            const isEqual2 = this.form._isEqual(value2, oldVal);
            if (!isEqual2) {
              const val = this.itemSetValue(value2);
              this.onFieldChange(val, false);
            }
          },
          {
            immediate: false
          }
        );
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules2 = null) {
        this.userRules = rules2;
        this.init(false);
      },
      // 兼容老版本表单组件
      setValue() {
      },
      /**
       * 外部调用方法
       * 校验数据
       * @param {any} value 需要校验的数据
       * @param {boolean} 是否立即校验
       * @return {Array|null} 校验内容
       */
      async onFieldChange(value2, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value2) {
          value2 = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate(
            {
              [name]: value2
            },
            formData
          );
          if (!isRequiredField2 && (value2 === void 0 || value2 === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "校验错误",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "提示",
                content: result.errorMessage || "校验错误"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      /**
       * 初始组件数据
       */
      init(type2 = false) {
        const {
          validator,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.form && type2 && childrens.push(this);
        if (!validator || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator;
        this.itemSetValue(_getDataValue(this.name, localData));
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index2) => {
            if (item === this) {
              this.form.childrens.splice(index2, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      // 设置item 的值
      itemSetValue(value2) {
        const name = this.form._realName(this.name);
        const rules2 = this.itemRules.rules || [];
        const val = this.form._getValue(name, value2, rules2);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      /**
       * 移除该表单项的校验结果
       */
      clearValidate() {
        this.errMsg = "";
      },
      // 是否显示星号
      _isRequired() {
        return this.required;
      },
      // 处理对齐方式
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      // 处理 label宽度单位 ,继承父元素的值
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 70 : "auto"));
      },
      // 处理 label 位置
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      /**
       * 触发时机
       * @param {Object} rule 当前规则内时机
       * @param {Object} itemRlue 当前组件时机
       * @param {Object} parentRule 父组件时机
       */
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
      },
      [
        vue.renderSlot(_ctx.$slots, "label", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$props.required }]),
              style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
            },
            [
              $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "is-required"
              }, "*")) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.label),
                1
                /* TEXT */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ], true),
        vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
            },
            [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($options.msg),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$7], ["__scopeId", "data-v-462874dd"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
    // "fileurls": 'array'
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value2, type2) {
    if (value2 === void 0 || value2 === null) {
      return true;
    }
    if (typeof value2 === "string" && !value2) {
      return true;
    }
    if (Array.isArray(value2) && !value2.length) {
      return true;
    }
    if (type2 === "object" && !Object.keys(value2).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value2) {
      return types.number(value2) && parseInt(value2, 10) === value2;
    },
    string(value2) {
      return typeof value2 === "string";
    },
    number(value2) {
      if (isNaN(value2)) {
        return false;
      }
      return typeof value2 === "number";
    },
    "boolean": function(value2) {
      return typeof value2 === "boolean";
    },
    "float": function(value2) {
      return types.number(value2) && !types.integer(value2);
    },
    array(value2) {
      return Array.isArray(value2);
    },
    object(value2) {
      return typeof value2 === "object" && !types.array(value2);
    },
    date(value2) {
      return value2 instanceof Date;
    },
    timestamp(value2) {
      if (!this.integer(value2) || Math.abs(value2).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value2) {
      return typeof value2.url === "string";
    },
    email(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.email) && value2.length < 255;
    },
    url(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.url);
    },
    pattern(reg, value2) {
      try {
        return new RegExp(reg).test(value2);
      } catch (e) {
        return false;
      }
    },
    method(value2) {
      return typeof value2 === "function";
    },
    idcard(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.idcard);
    },
    "url-https"(value2) {
      return this.url(value2) && value2.startsWith("https://");
    },
    "url-scheme"(value2) {
      return value2.startsWith("://");
    },
    "url-web"(value2) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value2, data, allData) {
      var result = null;
      let rules2 = fieldValue.rules;
      let hasRequired = rules2.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value2 === null || value2 === void 0) {
          return result;
        }
        if (typeof value2 === "string" && !value2.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules2 === void 0) {
        return message["default"];
      }
      for (var i = 0; i < rules2.length; i++) {
        let rule = rules2[i];
        let vt = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt]) {
          result = RuleValidatorHelper[vt](rule, value2, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now = Date.now();
          let resultExpr = rule.validateExpr(value2, allData, now);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value2, data, allData, vt);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value2, data, allData, vt) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value2, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt);
      }
      return result;
    }
    _getMessage(rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value2, message) {
      if (rule.required && isEmptyValue(value2, rule.format || typeof value2)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value2, message) {
      const {
        range: range2,
        errorMessage
      } = rule;
      let list = new Array(range2.length);
      for (let i = 0; i < range2.length; i++) {
        const item = range2[i];
        if (types.object(item) && item.value !== void 0) {
          list[i] = item.value;
        } else {
          list[i] = item;
        }
      }
      let result = false;
      if (Array.isArray(value2)) {
        result = new Set(value2.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value2) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value2, message) {
      if (!types.number(value2)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value2 <= minimum : value2 < minimum;
      let max = exclusiveMaximum ? value2 >= maximum : value2 > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value2, message) {
      if (!types.string(value2) && !types.array(value2)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value2.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value2, message) {
      if (!types["pattern"](rule.pattern, value2)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value2, message) {
      var customTypes = Object.keys(types);
      var format2 = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format2) > -1) {
        if (!types[format2](value2)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value2, message) {
      if (!Array.isArray(value2)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i = 0; i < value2.length; i++) {
        const element = value2[i];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value2 = schema[key];
        let errorMessage = await this.validateRule(key, value2, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "验证错误",
      defaultInvalid: "提交的字段{field}在数据库中并不存在",
      validateFunction: "验证无效",
      required: "{label}必填",
      "enum": "{label}超出范围",
      timestamp: "{label}格式无效",
      whitespace: "{label}不能为空",
      typeError: "{label}类型无效",
      date: {
        format: "{label}日期{value}格式无效",
        parse: "{label}日期无法解析,{value}无效",
        invalid: "{label}日期{value}无效"
      },
      length: {
        minLength: "{label}长度不能少于{minLength}",
        maxLength: "{label}长度不能超过{maxLength}",
        range: "{label}必须介于{minLength}和{maxLength}之间"
      },
      number: {
        minimum: "{label}不能小于{minimum}",
        maximum: "{label}不能大于{maximum}",
        exclusiveMinimum: "{label}不能小于等于{minimum}",
        exclusiveMaximum: "{label}不能大于等于{maximum}",
        range: "{label}必须介于{minimum}and{maximum}之间"
      },
      pattern: {
        mismatch: "{label}格式不匹配"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format2) => {
    return format2 === "int" || format2 === "double" || format2 === "number" || format2 === "timestamp";
  };
  const getValue = (key, value2, rules2) => {
    const isRuleNumType = rules2.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules2.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value2 && value2 !== 0) {
        value2 = null;
      } else {
        value2 = isNumber(Number(value2)) ? Number(value2) : value2;
      }
    }
    if (!!isRuleBoolType) {
      value2 = isBoolean(value2) ? value2 : false;
    }
    return value2;
  };
  const setDataValue = (field, formdata, value2) => {
    formdata[field] = value2;
    return value2 || "";
  };
  const getDataValue = (field, data) => {
    return objGet(data, field);
  };
  const realName = (name, data = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a, b) => a += `#${b}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object3 = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object3));
    let formData = {};
    for (let i in newData) {
      let path = name2arr(i);
      objSet(formData, path, newData[i]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v) => isNumber(v) ? Number(v) : v);
    return field;
  };
  const objSet = (object3, path, value2) => {
    if (typeof object3 !== "object")
      return object3;
    _basePath(path).reduce((o, k, i, _) => {
      if (i === _.length - 1) {
        o[k] = value2;
        return null;
      } else if (k in o) {
        return o[k];
      } else {
        o[k] = /^[0-9]{1,}$/.test(_[i + 1]) ? [] : {};
        return o[k];
      }
    }, object3);
    return object3;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object3, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o, k) => {
      return (o || {})[k];
    }, object3);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules2) => {
    let isNoField = false;
    for (let i = 0; i < rules2.length; i++) {
      const ruleData = rules2[i];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a, b) => {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    }
    if (a == null || b == null) {
      return a === b;
    }
    var classNameA = toString.call(a), classNameB = toString.call(b);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a) {
          return +b !== +b;
        }
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a), propsB = Object.getOwnPropertyNames(b);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i = 0; i < propsA.length; i++) {
        var propName = propsA[i];
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a.toString() == b.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$b = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      // 即将弃用
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      // vue3 替换 value 属性
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      // 1.4.0 开始将不支持 v-model ，且废弃 value 和 modelValue
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      // 表单校验规则
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      //校验错误信息提示方式 默认 undertext 取值 [undertext|toast|modal]
      errShowType: {
        type: String,
        default: "undertext"
      },
      // 校验触发器方式 默认 bind 取值 [bind|submit]
      validateTrigger: {
        type: String,
        default: "submit"
      },
      // label 位置，默认 left 取值  top/left
      labelPosition: {
        type: String,
        default: "left"
      },
      // label 宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        // 表单本地值的记录，不应该与传如的值进行关联
        formData: {},
        formRules: {}
      };
    },
    computed: {
      // 计算数据源变化的
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      // 监听数据变化 ,暂时不使用，需要单独赋值
      // localData: {},
      // 监听规则变化
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value2, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value2);
          } else {
            let formVm;
            for (let i in this.$refs) {
              const vm = this.$refs[i];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:187", "当前 uni-froms 组件缺少 ref 属性");
            if (formVm.model)
              formVm.model[name] = value2;
            if (formVm.modelValue)
              formVm.modelValue[name] = value2;
            if (formVm.value)
              formVm.value[name] = value2;
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules2) {
        this.formRules = Object.assign({}, this.formRules, rules2);
        this.validator = new SchemaValidator(rules2);
      },
      /**
       * 外部调用方法
       * 设置数据，用于设置表单数据，公开给用户使用 ， 不支持在动态表单中使用
       * @param {Object} key
       * @param {Object} value
       */
      setValue(key, value2) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value2, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      /**
       * 外部调用方法
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      /**
       * 外部调用方法
       * 部分表单校验
       * @param {Array|String} props 需要校验的字段
       * @param {Function} 回调函数
       */
      validateField(props2 = [], callback) {
        props2 = [].concat(props2);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props2.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      /**
       * 外部调用方法
       * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
       * @param {Array|String} props 需要移除校验的字段 ，不填为所有
       */
      clearValidate(props2 = []) {
        props2 = [].concat(props2);
        this.childrens.forEach((item) => {
          if (props2.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props2.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      /**
       * 外部调用方法 ，即将废弃
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      submit(keepitem, callback, type2) {
        for (let i in this.dataValue) {
          const itemData = this.childrens.find((v) => v.name === i);
          if (itemData) {
            if (this.formData[i] === void 0) {
              this.formData[i] = this._getValue(i, this.dataValue[i]);
            }
          }
        }
        if (!type2) {
          formatAppLog("warn", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:296", "submit 方法即将废弃，请使用validate方法代替！");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      // 校验所有
      async checkAll(invalidFields, keepitem, callback, type2) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i in invalidFields) {
          const item = this.childrens.find((v) => realName(v.name) === i);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise2;
        if (!callback && typeof callback !== "function" && Promise) {
          promise2 = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i in childrens) {
          const child = childrens[i];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v) => {
            let vName = realName(v);
            let value2 = getDataValue(v, this.localData);
            if (value2 !== void 0) {
              tempFormData[vName] = value2;
            }
          });
        }
        if (type2 === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise2 && callback) {
          return promise2;
        } else {
          return null;
        }
      },
      /**
       * 返回validate事件
       * @param {Object} result
       */
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$6], ["__scopeId", "data-v-9a1e3c32"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
  function loginMobile(data) {
    return request.post("/mms-api/member/login_by_mobile", data, {
      noAuth: true
    });
  }
  function getCaptcha() {
    return request.get("/mms-api/captcha", { noAuth: true });
  }
  function getLogout() {
    return request.get("/mms-api/member/logout");
  }
  const _sfc_main$a = {
    data() {
      return {
        formData: {
          phoneNumber: "",
          password: "",
          captcha: "",
          captchaId: ""
        },
        captcha: {
          id: "",
          image: ""
        },
        rules: {
          phoneNumber: {
            rules: [
              {
                required: true,
                errorMessage: this.$t("login.phone.input")
              },
              {
                minLength: 10,
                maxLength: 10,
                errorMessage: this.$t("login.phone.length.error")
              }
            ]
          },
          password: {
            rules: [
              {
                required: true,
                errorMessage: this.$t("login.password.input")
              },
              {
                minLength: 6,
                maxLength: 16,
                errorMessage: this.$t("login.password.length.error")
              }
            ]
          },
          captcha: {
            rules: [
              {
                required: true,
                errorMessage: this.$t("login.verification.input")
              },
              {
                minLength: 5,
                maxLength: 5,
                errorMessage: this.$t("login.verification.error")
              }
            ]
          }
        }
      };
    },
    mounted() {
      this.getCaptchaApi();
      formatAppLog("log", "at pages/login/components/login.vue:94", "getCaptchaApi has been called");
    },
    methods: {
      onClickItem(e) {
        if (this.current != e.currentIndex) {
          this.current = e.currentIndex;
        }
      },
      submit() {
        this.$refs.valiForm.validate().then((res) => {
          formatAppLog("log", "at pages/login/components/login.vue:105", "表单数据信息：", res);
          this.formData.captchaId = this.captcha.id;
          loginMobile(this.formData).then((res2) => {
            if (res2.code === 0) {
              formatAppLog("log", "at pages/login/components/login.vue:109", res2);
              Cache$1.set(USER_INFO, res2.data, res2.data.expire);
              Cache$1.set(LOGIN_STATUS, res2.data.token, res2.data.expire);
              uni.showToast({
                title: "登录成功！",
                icon: "none",
                duration: 2e3
              });
              setTimeout(function() {
                uni.navigateTo({
                  url: "/pages/home/index",
                  animationType: "none"
                });
              }, 1e3);
            } else if (res2.code === 3) {
              uni.showToast({
                title: "手机号密码或验证码错误",
                icon: "none",
                duration: 3e3
              });
            }
          });
        }).catch((err) => {
          formatAppLog("log", "at pages/login/components/login.vue:132", "表单错误信息：", err);
        });
      },
      getCaptchaApi() {
        getCaptcha().then((res) => {
          formatAppLog("log", "at pages/login/components/login.vue:139", res);
          this.captcha.image = res.data.imgPath;
          this.captcha.id = res.data.captchaId;
          formatAppLog("log", "at pages/login/components/login.vue:142", res, "res");
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "loginContent" }, [
      vue.createVNode(_component_uni_forms, {
        ref: "valiForm",
        rules: $data.rules,
        modelValue: $data.formData,
        "label-position": "top",
        "label-width": "70"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, {
            required: "",
            label: _ctx.$t("login.phone.number"),
            name: "phoneNumber"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                type: "number",
                modelValue: $data.formData.phoneNumber,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.phoneNumber = $event),
                placeholder: _ctx.$t("login.phone.input")
              }, {
                left: vue.withCtx(() => [
                  vue.createElementVNode("text", { style: { "margin-left": "10rpx" } }, "+7")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue", "placeholder"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["label"]),
          vue.createVNode(_component_uni_forms_item, {
            required: "",
            label: _ctx.$t("login.password"),
            name: "password"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                type: "password",
                modelValue: $data.formData.password,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.password = $event),
                placeholder: _ctx.$t("login.password.input")
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["label"]),
          vue.createVNode(_component_uni_forms_item, {
            required: "",
            label: _ctx.$t("login.verification.code"),
            name: "captcha"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                type: "text",
                modelValue: $data.formData.captcha,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.captcha = $event),
                placeholder: _ctx.$t("login.verification.input")
              }, {
                left: vue.withCtx(() => [
                  vue.createElementVNode("image", {
                    onClick: _cache[2] || (_cache[2] = ($event) => $options.getCaptchaApi()),
                    style: { "width": "160rpx", "height": "60rpx" },
                    src: $data.captcha.image,
                    mode: ""
                  }, null, 8, ["src"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue", "placeholder"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["label"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["rules", "modelValue"]),
      vue.createElementVNode(
        "button",
        {
          type: "default",
          style: { "color": "#ffffff", "backgroundColor": "#6AE75A" },
          onClick: _cache[4] || (_cache[4] = ($event) => $options.submit())
        },
        vue.toDisplayString(_ctx.$t("login.login")),
        1
        /* TEXT */
      )
    ]);
  }
  const loginPage = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$5], ["__scopeId", "data-v-0e24102f"], ["__file", "C:/Users/Aibol/Desktop/work/host/pages/login/components/login.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {
        formData: {
          userName: "",
          password: ""
        },
        rules: {
          userName: {
            rules: [
              {
                required: true,
                errorMessage: "请输入用户名"
              },
              {
                minLength: 3,
                maxLength: 5,
                errorMessage: "用户名长度在 {minLength} 到 {maxLength} 个字符"
              }
            ]
          },
          password: {
            rules: [
              {
                required: true,
                errorMessage: "请输入密码"
              },
              {
                minLength: 6,
                maxLength: 16,
                errorMessage: "密码长度在 {minLength} 到 {maxLength} 个字符"
              }
            ]
          }
        }
      };
    },
    methods: {
      onClickItem(e) {
        if (this.current != e.currentIndex) {
          this.current = e.currentIndex;
        }
      },
      submit() {
        this.$refs.valiForm.validate().then((res) => {
          formatAppLog("log", "at pages/login/components/register.vue:62", "表单数据信息：", res);
        }).catch((err) => {
          formatAppLog("log", "at pages/login/components/register.vue:64", "表单错误信息：", err);
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "loginContent" }, [
      vue.createVNode(_component_uni_forms, {
        ref: "valiForm",
        rules: $data.rules,
        modelValue: $data.formData,
        "label-position": "top"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, {
            required: "",
            label: "用户名",
            name: "userName"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                type: "text",
                modelValue: $data.formData.userName,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.userName = $event),
                placeholder: "请输入用户名"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            required: "",
            label: "密码",
            name: "password"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                type: "password",
                modelValue: $data.formData.password,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.password = $event),
                placeholder: "请输入密码"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["rules", "modelValue"]),
      vue.createElementVNode("button", {
        type: "default",
        style: { "color": "#ffffff", "backgroundColor": "#6AE75A" },
        onClick: _cache[2] || (_cache[2] = ($event) => $options.submit())
      }, "注册")
    ]);
  }
  const registerPage = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$4], ["__scopeId", "data-v-857120ea"], ["__file", "C:/Users/Aibol/Desktop/work/host/pages/login/components/register.vue"]]);
  const _sfc_main$8 = {
    components: {
      loginPage,
      registerPage
    },
    data() {
      return {
        items: [this.$t("login.login"), this.$t("login.register")],
        current: 0
      };
    },
    methods: {
      onClickItem(e) {
        if (this.current != e.currentIndex) {
          this.current = e.currentIndex;
        }
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_segmented_control = resolveEasycom(vue.resolveDynamicComponent("uni-segmented-control"), __easycom_0$2);
    const _component_loginPage = vue.resolveComponent("loginPage");
    const _component_registerPage = vue.resolveComponent("registerPage");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "segment" }, [
        vue.createVNode(_component_uni_segmented_control, {
          current: $data.current,
          values: $data.items,
          onClickItem: $options.onClickItem,
          styleType: "button",
          activeColor: "#4cd964"
        }, null, 8, ["current", "values", "onClickItem"])
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.withDirectives(vue.createElementVNode(
          "view",
          null,
          [
            vue.createVNode(_component_loginPage)
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.current === 0]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          null,
          [
            vue.createVNode(_component_registerPage)
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.current === 1]
        ])
      ])
    ]);
  }
  const PagesLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$3], ["__file", "C:/Users/Aibol/Desktop/work/host/pages/login/index.vue"]]);
  const _sfc_main$7 = {
    __name: "details",
    setup(__props) {
      const newsData = vue.ref({
        title: "",
        content: ""
      });
      const loadingState = vue.ref(true);
      const getNewsData = async (id) => {
        try {
          const data = {
            id: Number(id)
          };
          const res = await getNews(data);
          if (res.code === 0 && res.data) {
            const currentLocale = uni.getLocale();
            const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
            const titleKey = `title${languageKey}`;
            const contentKey = `content${languageKey}`;
            newsData.value = {
              title: res.data[titleKey] || "",
              content: res.data[contentKey] || ""
            };
            Promise.resolve().then(() => {
              loadingState.value = false;
            });
          } else {
            formatAppLog("error", "at pages/news/components/details.vue:67", "Failed to fetch news data");
            uni.showToast({
              title: "Failed to load news",
              icon: "none"
            });
            loadingState.value = false;
          }
        } catch (err) {
          formatAppLog("error", "at pages/news/components/details.vue:75", "Error fetching news:", err);
          uni.showToast({
            title: "Network error",
            icon: "none"
          });
          loadingState.value = false;
        }
      };
      onLoad((option) => {
        if (option && option.id) {
          getNewsData(option.id);
        } else {
          loadingState.value = false;
          uni.showToast({
            title: "Missing news ID",
            icon: "none"
          });
        }
      });
      return (_ctx, _cache) => {
        const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock("view", { class: "news-container" }, [
          loadingState.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            style: { "margin-top": "50rpx" }
          }, [
            vue.createVNode(_component_uv_loading_icon, {
              show: true,
              mode: "spinner",
              text: "加载中...",
              "text-color": "#999999",
              "text-size": "14"
            })
          ])) : newsData.value.content ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "news-content",
            innerHTML: newsData.value.content
          }, null, 8, ["innerHTML"])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "no-content"
          }, "暂无内容"))
        ]);
      };
    }
  };
  const PagesNewsComponentsDetails = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/news/components/details.vue"]]);
  const props$2 = {
    props: {
      // 头像图片路径(不能为相对路径)
      src: {
        type: String,
        default: ""
      },
      // 头像形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "circle"
      },
      // 头像尺寸
      size: {
        type: [String, Number],
        default: 40
      },
      // 裁剪模式
      mode: {
        type: String,
        default: "scaleToFill"
      },
      // 显示的文字
      text: {
        type: String,
        default: ""
      },
      // 背景色
      bgColor: {
        type: String,
        default: "#c0c4cc"
      },
      // 文字颜色
      color: {
        type: String,
        default: "#fff"
      },
      // 文字大小
      fontSize: {
        type: [String, Number],
        default: 18
      },
      // 显示的图标
      icon: {
        type: String,
        default: ""
      },
      // 显示小程序头像，只对百度，微信，QQ小程序有效
      mpAvatar: {
        type: Boolean,
        default: false
      },
      // 是否使用随机背景色
      randomBgColor: {
        type: Boolean,
        default: false
      },
      // 加载失败的默认头像(组件有内置默认图片)
      defaultUrl: {
        type: String,
        default: ""
      },
      // 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
      colorIndex: {
        type: [String, Number],
        // 校验参数规则，索引在0-19之间
        validator(n) {
          return range$2(n, [0, 19]) || n === "";
        },
        default: ""
      },
      // 组件标识符
      name: {
        type: String,
        default: ""
      },
      ...(_T = (_S = uni.$uv) == null ? void 0 : _S.props) == null ? void 0 : _T.avatar
    }
  };
  const base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
  const _sfc_main$6 = {
    name: "uv-avatar",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$2],
    data() {
      return {
        // 如果配置randomBgColor参数为true，在图标或者文字的模式下，会随机从中取出一个颜色值当做背景色
        colors: [
          "#ffb34b",
          "#f2bba9",
          "#f7a196",
          "#f18080",
          "#88a867",
          "#bfbf39",
          "#89c152",
          "#94d554",
          "#f19ec2",
          "#afaae4",
          "#e1b0df",
          "#c38cc1",
          "#72dcdc",
          "#9acdcb",
          "#77b1cc",
          "#448aca",
          "#86cefa",
          "#98d1ee",
          "#73d1f1",
          "#80a7dc"
        ],
        avatarUrl: this.src,
        allowMp: false
      };
    },
    watch: {
      // 监听头像src的变化，赋值给内部的avatarUrl变量，因为图片加载失败时，需要修改图片的src为默认值
      // 而组件内部不能直接修改props的值，所以需要一个中间变量
      src: {
        immediate: true,
        handler(newVal) {
          this.avatarUrl = newVal;
          if (!newVal) {
            this.errorHandler();
          }
        }
      }
    },
    computed: {
      imageStyle() {
        const style = {};
        return style;
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.src.indexOf("/") !== -1;
      },
      // 图片加载时失败时触发
      errorHandler() {
        this.avatarUrl = this.defaultUrl || base64Avatar;
      },
      clickHandler() {
        this.$emit("click", this.name);
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_text = resolveEasycom(vue.resolveDynamicComponent("uv-text"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-avatar", [`uv-avatar--${_ctx.shape}`]]),
        style: vue.normalizeStyle([{
          backgroundColor: _ctx.text || _ctx.icon ? _ctx.randomBgColor ? $data.colors[_ctx.colorIndex !== "" ? _ctx.colorIndex : _ctx.$uv.random(0, 19)] : _ctx.bgColor : "transparent",
          width: _ctx.$uv.addUnit(_ctx.size),
          height: _ctx.$uv.addUnit(_ctx.size)
        }, _ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          _ctx.mpAvatar && $data.allowMp ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [],
            64
            /* STABLE_FRAGMENT */
          )) : _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 1,
            name: _ctx.icon,
            size: _ctx.fontSize,
            color: _ctx.color
          }, null, 8, ["name", "size", "color"])) : _ctx.text ? (vue.openBlock(), vue.createBlock(_component_uv_text, {
            key: 2,
            text: _ctx.text,
            size: _ctx.fontSize,
            color: _ctx.color,
            align: "center",
            customStyle: "justify-content: center"
          }, null, 8, ["text", "size", "color"])) : (vue.openBlock(), vue.createElementBlock("image", {
            key: 3,
            class: vue.normalizeClass(["uv-avatar__image", [`uv-avatar__image--${_ctx.shape}`]]),
            src: $data.avatarUrl || _ctx.defaultUrl,
            mode: _ctx.mode,
            onError: _cache[0] || (_cache[0] = (...args) => $options.errorHandler && $options.errorHandler(...args)),
            style: vue.normalizeStyle([{
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size)
            }])
          }, null, 46, ["src", "mode"]))
        ], true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$2], ["__scopeId", "data-v-fa9b0ca7"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-avatar/components/uv-avatar/uv-avatar.vue"]]);
  const props$1 = {
    props: {
      // 标题
      title: {
        type: [String, Number],
        default: ""
      },
      // 标题下方的描述信息
      label: {
        type: [String, Number],
        default: ""
      },
      // 右侧的内容
      value: {
        type: [String, Number],
        default: ""
      },
      // 左侧图标名称，或者图片链接(本地文件建议使用绝对地址)
      icon: {
        type: String,
        default: ""
      },
      // 是否禁用cell
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示下边框
      border: {
        type: Boolean,
        default: true
      },
      // 内容是否垂直居中(主要是针对右侧的value部分)
      center: {
        type: Boolean,
        default: true
      },
      // 点击后跳转的URL地址
      url: {
        type: String,
        default: ""
      },
      // 链接跳转的方式，内部使用的是uvui封装的route方法，可能会进行拦截操作
      linkType: {
        type: String,
        default: "navigateTo"
      },
      // 是否开启点击反馈(表现为点击时加上灰色背景)
      clickable: {
        type: Boolean,
        default: false
      },
      // 是否展示右侧箭头并开启点击反馈
      isLink: {
        type: Boolean,
        default: false
      },
      // 是否显示表单状态下的必填星号(此组件可能会内嵌入input组件)
      required: {
        type: Boolean,
        default: false
      },
      // 右侧的图标箭头
      rightIcon: {
        type: String,
        default: "arrow-right"
      },
      // 右侧箭头的方向，可选值为：left，up，down
      arrowDirection: {
        type: String,
        default: ""
      },
      // 左侧图标样式
      iconStyle: {
        type: [Object, String],
        default: () => {
          return {};
        }
      },
      // 右侧箭头图标的样式
      rightIconStyle: {
        type: [Object, String],
        default: () => {
          return {};
        }
      },
      // 标题的样式
      titleStyle: {
        type: [Object, String],
        default: () => {
          return {};
        }
      },
      // 单位元的大小，可选值为large
      size: {
        type: String,
        default: ""
      },
      // 点击cell是否阻止事件传播
      stop: {
        type: Boolean,
        default: true
      },
      // 标识符，cell被点击时返回
      name: {
        type: [Number, String],
        default: ""
      },
      // 单元格自定义样式
      cellStyle: {
        type: [Object, String],
        default: () => {
        }
      },
      ...(_V = (_U = uni.$uv) == null ? void 0 : _U.props) == null ? void 0 : _V.cell
    }
  };
  const _sfc_main$5 = {
    name: "uv-cell",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$1],
    computed: {
      titleTextStyle() {
        return this.$uv.addStyle(this.titleStyle);
      }
    },
    methods: {
      // 点击cell
      clickHandler(e) {
        if (this.disabled)
          return;
        this.$emit("click", {
          name: this.name
        });
        this.openPage();
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uv-cell", [_ctx.customClass]]),
      style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)]),
      "hover-class": !_ctx.disabled && (_ctx.clickable || _ctx.isLink) ? "uv-cell--clickable" : "",
      "hover-stay-time": 250,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uv-cell__body", [_ctx.center && "uv-cell--center", _ctx.size === "large" && "uv-cell__body--large"]]),
          style: vue.normalizeStyle([_ctx.cellStyle])
        },
        [
          vue.createElementVNode("view", { class: "uv-cell__body__content" }, [
            vue.createElementVNode("view", { class: "uv-cell__left-icon-wrap" }, [
              vue.renderSlot(_ctx.$slots, "icon", {}, () => [
                _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                  key: 0,
                  name: _ctx.icon,
                  "custom-style": _ctx.iconStyle,
                  size: _ctx.size === "large" ? 22 : 18
                }, null, 8, ["name", "custom-style", "size"])) : vue.createCommentVNode("v-if", true)
              ], true)
            ]),
            vue.createElementVNode("view", { class: "uv-cell__title" }, [
              vue.renderSlot(_ctx.$slots, "title", {}, () => [
                _ctx.title ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uv-cell__title-text", [_ctx.disabled && "uv-cell--disabled", _ctx.size === "large" && "uv-cell__title-text--large"]]),
                    style: vue.normalizeStyle([$options.titleTextStyle])
                  },
                  vue.toDisplayString(_ctx.title),
                  7
                  /* TEXT, CLASS, STYLE */
                )) : vue.createCommentVNode("v-if", true)
              ], true),
              vue.renderSlot(_ctx.$slots, "label", {}, () => [
                _ctx.label ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uv-cell__label", [_ctx.disabled && "uv-cell--disabled", _ctx.size === "large" && "uv-cell__label--large"]])
                  },
                  vue.toDisplayString(_ctx.label),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true)
              ], true)
            ])
          ]),
          vue.renderSlot(_ctx.$slots, "value", {}, () => [
            !_ctx.$uv.test.empty(_ctx.value) ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: vue.normalizeClass(["uv-cell__value", [_ctx.disabled && "uv-cell--disabled", _ctx.size === "large" && "uv-cell__value--large"]])
              },
              vue.toDisplayString(_ctx.value),
              3
              /* TEXT, CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uv-cell__right-icon-wrap", [`uv-cell__right-icon-wrap--${_ctx.arrowDirection}`]])
            },
            [
              vue.renderSlot(_ctx.$slots, "right-icon", {}, () => [
                _ctx.isLink ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                  key: 0,
                  name: _ctx.rightIcon,
                  "custom-style": _ctx.rightIconStyle,
                  color: _ctx.disabled ? "#c8c9cc" : "info",
                  size: _ctx.size === "large" ? 18 : 16
                }, null, 8, ["name", "custom-style", "color", "size"])) : vue.createCommentVNode("v-if", true)
              ], true)
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      ),
      _ctx.border ? (vue.openBlock(), vue.createBlock(_component_uv_line, { key: 0 })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1], ["__scopeId", "data-v-565cfae0"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-cell/components/uv-cell/uv-cell.vue"]]);
  const props = {
    props: {
      // 分组标题
      title: {
        type: String,
        default: ""
      },
      // 是否显示外边框
      border: {
        type: Boolean,
        default: true
      },
      ...(_X = (_W = uni.$uv) == null ? void 0 : _W.props) == null ? void 0 : _X.cellGroup
    }
  };
  const _sfc_main$4 = {
    name: "uv-cell-group",
    mixins: [mpMixin, mixin, props]
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)]),
        class: vue.normalizeClass([[_ctx.customClass], "uv-cell-group"])
      },
      [
        _ctx.title ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uv-cell-group__title"
        }, [
          vue.renderSlot(_ctx.$slots, "title", {}, () => [
            vue.createElementVNode(
              "text",
              { class: "uv-cell-group__title__text" },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )
          ], true)
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "uv-cell-group__wrapper" }, [
          _ctx.border ? (vue.openBlock(), vue.createBlock(_component_uv_line, { key: 0 })) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render], ["__scopeId", "data-v-400210fd"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-cell/components/uv-cell-group/uv-cell-group.vue"]]);
  const _sfc_main$3 = {
    __name: "index",
    setup(__props) {
      const {
        t,
        locale
      } = useI18n();
      const cellList = [
        {
          title: "个人设置",
          icon: "setting-fill",
          isLink: true,
          value: ""
        },
        {
          title: "我的病历",
          icon: "empty-search",
          isLink: true,
          value: ""
        },
        {
          title: "版本更新",
          icon: "integral-fill",
          isLink: true,
          value: "已是新版本"
        }
      ];
      const logOut = () => {
        getLogout().then((res) => {
          if (res.code === 0) {
            formatAppLog("log", "at pages/user/index.vue:65", res);
            Cache$1.clear(USER_INFO);
            Cache$1.clear(LOGIN_STATUS);
            uni.showToast({
              title: t("user.logOutSuccess"),
              icon: "none",
              duration: 2e3
            });
            setTimeout(function() {
              uni.navigateTo({
                url: "/pages/home/index",
                animationType: "none"
              });
            }, 1e3);
          }
        }).catch((err) => {
          formatAppLog("error", "at pages/user/index.vue:81", err);
        });
      };
      return (_ctx, _cache) => {
        const _component_uv_navbar = resolveEasycom(vue.resolveDynamicComponent("uv-navbar"), __easycom_0$8);
        const _component_uv_avatar = resolveEasycom(vue.resolveDynamicComponent("uv-avatar"), __easycom_1);
        const _component_uv_cell = resolveEasycom(vue.resolveDynamicComponent("uv-cell"), __easycom_2);
        const _component_uv_cell_group = resolveEasycom(vue.resolveDynamicComponent("uv-cell-group"), __easycom_3);
        const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_4$2);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_uv_navbar, {
            title: "个人中心",
            placeholder: true,
            leftIcon: ""
          }),
          vue.createElementVNode("view", { class: "userContent" }, [
            vue.createElementVNode("view", { class: "userTop" }, [
              vue.createVNode(_component_uv_avatar, { size: 60 }),
              vue.createElementVNode("text", null, "Aibol")
            ]),
            vue.createElementVNode("view", { class: "userCell" }, [
              vue.createVNode(_component_uv_cell_group, null, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(cellList, (item, index2) => {
                      return vue.createVNode(_component_uv_cell, {
                        icon: item.icon,
                        title: item.title,
                        isLink: item.isLink,
                        value: item.value
                      }, null, 8, ["icon", "title", "isLink", "value"]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            vue.createElementVNode("view", { class: "logOutBtn" }, [
              vue.createVNode(_component_uv_button, {
                type: "error",
                text: vue.unref(t)("user.logOut"),
                onClick: _cache[0] || (_cache[0] = ($event) => logOut())
              }, null, 8, ["text"])
            ])
          ]),
          vue.createVNode(navBar, { activeIndex: 2 })
        ]);
      };
    }
  };
  const PagesUserIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/user/index.vue"]]);
  function medicineList(data) {
    return request.post("/mms-api/medicine/list", data, { noAuth: true });
  }
  function getMedicine(data) {
    return request.post("/mms-api/medicine", data, { noAuth: true });
  }
  const _sfc_main$2 = {
    __name: "index",
    setup(__props) {
      const medicineData = vue.ref([]);
      const getMedicineList = () => {
        const data = {
          page: 1,
          pageSize: 50
        };
        medicineList(data).then((res) => {
          if (res.code === 0) {
            const currentLocale = uni.getLocale();
            const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
            const nameKey = `name${languageKey}`;
            const descriptionKey = `description${languageKey}`;
            formatAppLog("log", "at pages/medicine/index.vue:42", "原始数据:", res.data.data);
            medicineData.value = res.data.data.map((item) => ({
              id: item.id,
              name: item[nameKey],
              description: item[descriptionKey],
              images: item.images,
              status: item.status,
              quantity: item.quantity
            })).filter((item) => item.status === 1);
            formatAppLog("log", "at pages/medicine/index.vue:54", "处理后的数据:", medicineData.value);
          } else {
            formatAppLog("error", "at pages/medicine/index.vue:56", "接口返回错误:", res.msg);
          }
        }).catch((err) => {
          formatAppLog("error", "at pages/medicine/index.vue:60", "请求失败:", err);
        });
      };
      const gotoDetail = (id) => {
        formatAppLog("log", "at pages/medicine/index.vue:65", id);
        uni.navigateTo({
          url: "/pages/medicine/components/details?id=" + id,
          animationType: "none"
        });
      };
      onLoad(() => {
        getMedicineList();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "product-grid" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(medicineData.value, (product, index2) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "product-item",
                key: index2,
                onClick: ($event) => gotoDetail(product.id)
              }, [
                vue.createElementVNode("image", {
                  class: "product-image",
                  src: product.images,
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "text",
                  { class: "product-name" },
                  vue.toDisplayString(product.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "product-price" },
                  "库存" + vue.toDisplayString(product.quantity),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesMedicineIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/medicine/index.vue"]]);
  const _sfc_main$1 = {
    __name: "details",
    setup(__props) {
      const medicineData = vue.ref({
        name: "",
        description: ""
      });
      const loadingState = vue.ref(true);
      const getMedicineData = async (id) => {
        try {
          const data = {
            id: Number(id)
          };
          const res = await getMedicine(data);
          if (res.code === 0 && res.data) {
            const currentLocale = uni.getLocale();
            const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
            const nameKey = `name${languageKey}`;
            const descriptionKey = `description${languageKey}`;
            medicineData.value = {
              name: res.data[nameKey] || "",
              description: res.data[descriptionKey] || "",
              quantity: res.data.quantity,
              images: res.data.images
            };
            Promise.resolve().then(() => {
              loadingState.value = false;
            });
          } else {
            formatAppLog("error", "at pages/medicine/components/details.vue:82", "Failed to fetch news data");
            uni.showToast({
              title: "Failed to load news",
              icon: "none"
            });
            loadingState.value = false;
          }
        } catch (err) {
          formatAppLog("error", "at pages/medicine/components/details.vue:90", "Error fetching news:", err);
          uni.showToast({
            title: "Network error",
            icon: "none"
          });
          loadingState.value = false;
        }
      };
      onLoad((option) => {
        if (option && option.id) {
          getMedicineData(option.id);
        } else {
          loadingState.value = false;
          uni.showToast({
            title: "Missing news ID",
            icon: "none"
          });
        }
      });
      return (_ctx, _cache) => {
        const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock("view", { class: "medicine-detail-container" }, [
          loadingState.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-wrapper"
          }, [
            vue.createVNode(_component_uv_loading_icon, {
              show: true,
              mode: "spinner",
              text: "加载中...",
              "text-color": "#999999",
              "text-size": "14"
            })
          ])) : medicineData.value.name ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createElementVNode("view", { class: "medicine-image-container" }, [
                vue.createElementVNode("image", {
                  class: "medicine-image",
                  src: medicineData.value.images
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", { class: "medicine-info" }, [
                vue.createElementVNode(
                  "view",
                  { class: "medicine-name" },
                  vue.toDisplayString(medicineData.value.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "medicine-quantity" },
                  "库存：" + vue.toDisplayString(medicineData.value.quantity) + " 件",
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "medicine-description" },
                  vue.toDisplayString(medicineData.value.description),
                  1
                  /* TEXT */
                )
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "no-content"
          }, "暂无内容"))
        ]);
      };
    }
  };
  const PagesMedicineComponentsDetails = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/medicine/components/details.vue"]]);
  __definePage("pages/home/index", PagesHomeIndex);
  __definePage("pages/appointment/index", PagesAppointmentIndex);
  __definePage("pages/news/index", PagesNewsIndex);
  __definePage("pages/login/index", PagesLoginIndex);
  __definePage("pages/news/components/details", PagesNewsComponentsDetails);
  __definePage("pages/user/index", PagesUserIndex);
  __definePage("pages/medicine/index", PagesMedicineIndex);
  __definePage("pages/medicine/components/details", PagesMedicineComponentsDetails);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/App.vue"]]);
  const en = {
    "locale.auto": "System",
    "locale.en": "English",
    "locale.zh-hans": "简体中文",
    "locale.kk": "Қазақ",
    "locale.ru": "Русский",
    "locale.ja": "日语",
    "index.title": "Hello i18n",
    "index.home": "Home",
    "index.component": "Component",
    "index.api": "API",
    "index.schema": "Schema",
    "index.demo": "uni-app globalization",
    "index.demo-description": "Include uni-framework, manifest.json, pages.json, tabbar, Page, Component, API, Schema",
    "index.detail": "Detail",
    "index.language": "Language",
    "index.language-info": "Settings",
    "index.system-language": "System language",
    "index.application-language": "Application language",
    "index.language-change-confirm": "Applying this setting will restart the app",
    "api.message": "Message",
    "schema.name": "Name",
    "schema.add": "Add",
    "schema.add-success": "Add success",
    "home.booking": "Booking",
    "home.medicine": "Medicine",
    "home.video": "Video",
    "home.news": "News",
    "home.question": "Question",
    "home.hello": "Hello",
    "unauthorized.message": "Unauthorized, please log in again",
    "login.prompt": "Please log in",
    "login.login": "Login",
    "login.register": "Register",
    "login.phone.number": "Phone Number",
    "login.phone.input": "Please enter your phone number",
    "login.password": "Password",
    "login.password.input": "Please enter your password",
    "login.verification.code": "Verification Code",
    "login.verification.input": "Please enter the verification code",
    "login.phone.length.error": "The phone number must be 10 characters long",
    "login.password.length.error": "The password must be between {minLength} and {maxLength} characters",
    "login.verification.error": "Please enter the correct verification code",
    "login.login.success": "Login successful",
    "login.login.error": "Phone number, password, or verification code is incorrect",
    "uni.picker.cancel": "Cancel",
    "uni.picker.done": "Done",
    "uni.showModal.cancel": "Cancel",
    "uni.showModal.confirm": "Confirm",
    "appointment.booking": "Booking Appointment",
    "appointment.noRecord": "No appointment records",
    "appointment.bookNow": "Book Now",
    "appointment.name": "Name",
    "appointment.phone": "Phone Number",
    "appointment.gender": "Gender",
    "appointment.selectGender": "Please select gender",
    "appointment.male": "Male",
    "appointment.female": "Female",
    "appointment.idCard": "ID Card",
    "appointment.age": "Age",
    "appointment.dateTime": "Appointment Time",
    "appointment.selectDateTime": "Please select time",
    "appointment.symptoms": "Symptoms Description",
    "appointment.remarks": "Remarks",
    "appointment.submit": "Submit",
    "appointment.pending": "Pending Confirmation",
    "appointment.confirmed": "Confirmed",
    "appointment.completed": "Completed",
    "appointment.canceled": "Canceled",
    "appointment.expired": "Expired",
    "appointment.fillName": "Please fill in your name",
    "appointment.correctPhone": "Please enter a valid phone number",
    "appointment.selectGenderOption": "Please select Male or Female",
    "appointment.fillAge": "Please fill in your age",
    "appointment.selectDateTimeOption": "Please select an appointment time",
    "appointment.validationPassed": "Validation Passed",
    "appointment.success": "Appointment Successful!",
    "appointment.validationFailed": "Validation Failed",
    "user.logOut": "Log out",
    "user.logOutSuccess": "Log out successful!"
  };
  const zhHans = {
    "locale.auto": "系统",
    "locale.en": "English",
    "locale.zh-hans": "简体中文",
    "locale.kk": "Қазақ",
    "locale.ru": "Русский",
    "locale.ja": "日语",
    "index.title": "Hello i18n",
    "index.home": "主页",
    "index.component": "组件",
    "index.api": "API",
    "index.schema": "Schema",
    "index.demo": "uni-app 国际化演示",
    "index.demo-description": "包含 uni-framework、manifest.json、pages.json、tabbar、页面、组件、API、Schema",
    "index.detail": "详情",
    "index.language": "语言",
    "index.language-info": "语言信息",
    "index.system-language": "系统语言",
    "index.application-language": "应用语言",
    "index.language-change-confirm": "应用此设置将重启App",
    "api.message": "提示",
    "schema.name": "姓名",
    "schema.add": "新增",
    "schema.add-success": "新增成功",
    "home.booking": "预约",
    "home.medicine": "药品",
    "home.video": "视频",
    "home.news": "新闻",
    "home.question": "问题",
    "home.hello": "您好",
    "unauthorized.message": "未授权，请重新登录",
    "login.prompt": "请登录",
    "login.login": "登录",
    "login.register": "注册",
    "login.phone.number": "手机号",
    "login.phone.input": "请输入手机号",
    "login.password": "密码",
    "login.password.input": "请输入密码",
    "login.verification.code": "验证码",
    "login.verification.input": "请输入验证码",
    "login.phone.length.error": "手机号长度为 10 个字符",
    "login.password.length.error": "密码长度在 6 到 16 个字符",
    "login.verification.error": "请输入正确验证码",
    "login.login.success": "登录成功",
    "login.login.error": "手机号密码或验证码错误",
    "uni.picker.cancel": "取消",
    "uni.picker.done": "完成",
    "uni.showModal.cancel": "取消",
    "uni.showModal.confirm": "确定",
    "appointment.booking": "预约",
    "appointment.noRecord": "无预约记录",
    "appointment.bookNow": "马上预约",
    "appointment.name": "姓名",
    "appointment.phone": "手机号",
    "appointment.gender": "性别",
    "appointment.selectGender": "请选择性别",
    "appointment.male": "男",
    "appointment.female": "女",
    "appointment.idCard": "身份证",
    "appointment.age": "年龄",
    "appointment.dateTime": "预约时间",
    "appointment.selectDateTime": "请选择时间",
    "appointment.symptoms": "症状描述",
    "appointment.remarks": "备注信息",
    "appointment.submit": "提交",
    "appointment.pending": "待确认",
    "appointment.confirmed": "已确认",
    "appointment.completed": "已完成",
    "appointment.canceled": "已取消",
    "appointment.expired": "已过期",
    "appointment.fillName": "请填写姓名",
    "appointment.correctPhone": "请填写正确手机号码",
    "appointment.selectGenderOption": "请选择男或女",
    "appointment.fillAge": "请填写年龄",
    "appointment.selectDateTimeOption": "请选择预约时间",
    "appointment.validationPassed": "校验通过",
    "appointment.success": "预约成功！",
    "appointment.validationFailed": "校验失败",
    "user.logOut": "退出登录",
    "user.logOutSuccess": "登出成功!"
  };
  const ja = {
    "locale.auto": "システム",
    "locale.en": "英語",
    "locale.zh-hans": "简体中文",
    "locale.zh-hant": "繁体中文",
    "locale.ja": "日语",
    "index.title": "Hello i18n",
    "index.home": "ホーム",
    "index.component": "コンポーネント",
    "index.api": "API",
    "index.schema": "Schema",
    "index.demo": "uni-app globalization",
    "index.demo-description": "ユニフレームワーク、manifest.json、pages.json、タブバー、ページ、コンポーネント、APIを含める、Schema",
    "index.detail": "詳細",
    "index.language": "言語",
    "index.language-info": "設定",
    "index.system-language": "システム言語",
    "index.application-language": "アプリケーション言語",
    "index.language-change-confirm": "この設定を適用すると、アプリが再起動します",
    "api.message": "メッセージ",
    "schema.add": "追加",
    "schema.add-success": "成功を追加"
  };
  const kk = {
    "locale.auto": "系统",
    "locale.en": "English",
    "locale.zh-hans": "简体中文",
    "locale.kk": "Қазақ",
    "locale.ru": "Русский",
    "locale.ja": "日语",
    "index.title": "Hello i18n",
    "index.home": "主页",
    "index.component": "组件",
    "index.api": "API",
    "index.schema": "Schema",
    "index.demo": "uni-app 国际化演示",
    "index.demo-description": "包含 uni-framework、manifest.json、pages.json、tabbar、页面、组件、API、Schema",
    "index.detail": "详情",
    "index.language": "语言",
    "index.language-info": "语言信息",
    "index.system-language": "系统语言",
    "index.application-language": "应用语言",
    "index.language-change-confirm": "Бұл параметрді қолдану қолданбаны қайта іске қосады",
    "api.message": "提示",
    "schema.name": "姓名",
    "schema.add": "新增",
    "schema.add-success": "新增成功",
    "home.booking": "Тіркелу",
    "home.medicine": "Дәрі-дәрмек",
    "home.video": "Бейне",
    "home.news": "Жаңалықтар",
    "home.question": "Сұрақ",
    "home.hello": "Сәлем",
    "unauthorized.message": "Рұқсат жоқ, қайта кіріңіз",
    "login.prompt": "Кіруді сұраймыз",
    "login.login": "Кіру",
    "login.register": "Тіркелу",
    "login.phone.number": "Телефон нөмірі",
    "login.phone.input": "Телефон нөмірін енгізіңіз",
    "login.password": "Құпия сөз",
    "login.password.input": "Құпия сөзді енгізіңіз",
    "login.verification.code": "Тексеру коды",
    "login.verification.input": "Тексеру кодын енгізіңіз",
    "login.phone.length.error": "Телефон нөмірі 10 таңбадан тұруы керек",
    "login.password.length.error": "Құпия сөз ұзындығы 6 пен 16 таңба арасында болуы керек",
    "login.verification.error": "Дұрыс тексеру кодын енгізіңіз",
    "login.login.success": "Кіру сәтті аяқталды",
    "login.login.error": "Телефон нөмірі, құпия сөз немесе тексеру коды қате",
    "uni.picker.cancel": "Бас тарту",
    "uni.picker.done": "Дайын",
    "uni.showModal.cancel": "Бас тарту",
    "uni.showModal.confirm": "Растау",
    "appointment.booking": "Қабылдауға жазылу",
    "appointment.noRecord": "Қабылдау жазбалары жоқ",
    "appointment.bookNow": "Қазір жазылу",
    "appointment.name": "Аты",
    "appointment.phone": "Телефон нөмірі",
    "appointment.gender": "Жыныс",
    "appointment.selectGender": "Жынысты таңдаңыз",
    "appointment.male": "Ер",
    "appointment.female": "Әйел",
    "appointment.idCard": "Жеке куәлік",
    "appointment.age": "Жас",
    "appointment.dateTime": "Қабылдау уақыты",
    "appointment.selectDateTime": "Уақытты таңдаңыз",
    "appointment.symptoms": "Симптомдарды сипаттау",
    "appointment.remarks": "Ескертулер",
    "appointment.submit": "Жіберу",
    "appointment.pending": "Расталуды күтуде",
    "appointment.confirmed": "Расталды",
    "appointment.completed": "Аяқталды",
    "appointment.canceled": "Болдырылмады",
    "appointment.expired": "Мерзімі өтті",
    "appointment.fillName": "Атыңызды енгізіңіз",
    "appointment.correctPhone": "Дұрыс телефон нөмірін енгізіңіз",
    "appointment.selectGenderOption": "Ер немесе Әйелді таңдаңыз",
    "appointment.fillAge": "Жасыңызды енгізіңіз",
    "appointment.selectDateTimeOption": "Қабылдау уақытын таңдаңыз",
    "appointment.validationPassed": "Тексеру сәтті өтті",
    "appointment.success": "Сәтті жазылды!",
    "appointment.validationFailed": "Тексеру сәтсіз аяқталды",
    "user.logOut": "Шығу",
    "user.logOutSuccess": "Шығу сәтті аяқталды!"
  };
  const ru = {
    "locale.auto": "系统",
    "locale.en": "English",
    "locale.zh-hans": "简体中文",
    "locale.kk": "Қазақ",
    "locale.ru": "Русский",
    "locale.ja": "日语",
    "index.title": "Hello i18n",
    "index.home": "主页",
    "index.component": "组件",
    "index.api": "API",
    "index.schema": "Schema",
    "index.demo": "uni-app 国际化演示",
    "index.demo-description": "包含 uni-framework、manifest.json、pages.json、tabbar、页面、组件、API、Schema",
    "index.detail": "详情",
    "index.language": "语言",
    "index.language-info": "语言信息",
    "index.system-language": "系统语言",
    "index.application-language": "应用语言",
    "index.language-change-confirm": "Применение этого настройки перезапустит приложение",
    "api.message": "提示",
    "schema.name": "姓名",
    "schema.add": "新增",
    "schema.add-success": "新增成功",
    "home.booking": "Запись",
    "home.medicine": "Лекарство",
    "home.video": "Видео",
    "home.news": "Новости",
    "home.question": "Вопрос",
    "home.hello": "Привет",
    "unauthorized.message": "Нет авторизации, пожалуйста, войдите снова",
    "login.prompt": "Пожалуйста, войдите",
    "login.login": "Войти",
    "login.register": "Регистрация",
    "login.phone.number": "Номер телефона",
    "login.phone.input": "Пожалуйста, введите номер телефона",
    "login.password": "Пароль",
    "login.password.input": "Пожалуйста, введите пароль",
    "login.verification.code": "Код подтверждения",
    "login.verification.input": "Введите код подтверждения",
    "login.phone.length.error": "Номер телефона должен быть длиной 10 символов",
    "login.password.length.error": "Пароль должен быть от 6 до 16 символов",
    "login.verification.error": "Пожалуйста, введите правильный код подтверждения",
    "login.login.success": "Вход выполнен успешно",
    "login.login.error": "Номер телефона, пароль или код подтверждения введены неверно",
    "uni.picker.cancel": "Отмена",
    "uni.picker.done": "Готово",
    "uni.showModal.cancel": "Отмена",
    "uni.showModal.confirm": "Подтвердить",
    "appointment.booking": "Запись на прием",
    "appointment.noRecord": "Нет записей на прием",
    "appointment.bookNow": "Записаться сейчас",
    "appointment.name": "Имя",
    "appointment.phone": "Номер телефона",
    "appointment.gender": "Пол",
    "appointment.selectGender": "Пожалуйста, выберите пол",
    "appointment.male": "Мужчина",
    "appointment.female": "Женщина",
    "appointment.idCard": "Идентификационная карта",
    "appointment.age": "Возраст",
    "appointment.dateTime": "Время приема",
    "appointment.selectDateTime": "Пожалуйста, выберите время",
    "appointment.symptoms": "Описание симптомов",
    "appointment.remarks": "Примечания",
    "appointment.submit": "Отправить",
    "appointment.pending": "Ожидает подтверждения",
    "appointment.confirmed": "Подтверждено",
    "appointment.completed": "Завершено",
    "appointment.canceled": "Отменено",
    "appointment.expired": "Истекло",
    "appointment.fillName": "Пожалуйста, введите имя",
    "appointment.correctPhone": "Пожалуйста, введите правильный номер телефона",
    "appointment.selectGenderOption": "Пожалуйста, выберите Мужчина или Женщина",
    "appointment.fillAge": "Пожалуйста, введите возраст",
    "appointment.selectDateTimeOption": "Пожалуйста, выберите время приема",
    "appointment.validationPassed": "Проверка пройдена",
    "appointment.success": "Запись прошла успешно!",
    "appointment.validationFailed": "Проверка не пройдена",
    "user.logOut": "Выйти",
    "user.logOutSuccess": "Выход выполнен успешно!"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    ja,
    kk,
    ru
  };
  let i18nConfig = {
    locale: uni.getLocale(),
    messages
  };
  const i18n = createI18n(i18nConfig);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(i18n);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
