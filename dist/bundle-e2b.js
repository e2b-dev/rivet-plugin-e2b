var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/cross-fetch/dist/browser-polyfill.js
var require_browser_polyfill = __commonJS({
  "node_modules/cross-fetch/dist/browser-polyfill.js"(exports) {
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers2(headers) {
          this.map = {};
          if (headers instanceof Headers2) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers2.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers2.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers2.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers2.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers2.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers2.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers2.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve2, reject) {
            reader.onload = function() {
              resolve2(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers2(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers2(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers2();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers2(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers2(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init) {
          return new Promise(function(resolve2, reject) {
            var request = new Request(input, init);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve2(new Response(body, options));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch2;
          self2.Headers = Headers2;
          self2.Request = Request;
          self2.Response = Response;
        }
        exports2.Headers = Headers2;
        exports2.Request = Request;
        exports2.Response = Response;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(typeof self !== "undefined" ? self : exports);
  }
});

// node_modules/platform/platform.js
var require_platform = __commonJS({
  "node_modules/platform/platform.js"(exports, module) {
    (function() {
      "use strict";
      var objectTypes = {
        "function": true,
        "object": true
      };
      var root = objectTypes[typeof window] && window || this;
      var oldRoot = root;
      var freeExports = objectTypes[typeof exports] && exports;
      var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
      var freeGlobal = freeExports && freeModule && typeof global == "object" && global;
      if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
        root = freeGlobal;
      }
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var reOpera = /\bOpera/;
      var thisBinding = this;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var toString = objectProto.toString;
      function capitalize(string) {
        string = String(string);
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      function cleanupOS(os, pattern, label) {
        var data = {
          "10.0": "10",
          "6.4": "10 Technical Preview",
          "6.3": "8.1",
          "6.2": "8",
          "6.1": "Server 2008 R2 / 7",
          "6.0": "Server 2008 / Vista",
          "5.2": "Server 2003 / XP 64-bit",
          "5.1": "XP",
          "5.01": "2000 SP1",
          "5.0": "2000",
          "4.0": "NT",
          "4.90": "ME"
        };
        if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) && (data = data[/[\d.]+$/.exec(os)])) {
          os = "Windows " + data;
        }
        os = String(os);
        if (pattern && label) {
          os = os.replace(RegExp(pattern, "i"), label);
        }
        os = format(
          os.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        );
        return os;
      }
      function each(object, callback) {
        var index = -1, length = object ? object.length : 0;
        if (typeof length == "number" && length > -1 && length <= maxSafeInteger) {
          while (++index < length) {
            callback(object[index], index, object);
          }
        } else {
          forOwn(object, callback);
        }
      }
      function format(string) {
        string = trim(string);
        return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
      }
      function forOwn(object, callback) {
        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            callback(object[key], key, object);
          }
        }
      }
      function getClassOf(value) {
        return value == null ? capitalize(value) : toString.call(value).slice(8, -1);
      }
      function isHostType(object, property) {
        var type = object != null ? typeof object[property] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(type) && (type == "object" ? !!object[property] : true);
      }
      function qualify(string) {
        return String(string).replace(/([ -])(?!$)/g, "$1?");
      }
      function reduce(array, callback) {
        var accumulator = null;
        each(array, function(value, index) {
          accumulator = callback(accumulator, value, index, array);
        });
        return accumulator;
      }
      function trim(string) {
        return String(string).replace(/^ +| +$/g, "");
      }
      function parse(ua) {
        var context = root;
        var isCustomContext = ua && typeof ua == "object" && getClassOf(ua) != "String";
        if (isCustomContext) {
          context = ua;
          ua = null;
        }
        var nav = context.navigator || {};
        var userAgent = nav.userAgent || "";
        ua || (ua = userAgent);
        var isModuleScope = isCustomContext || thisBinding == oldRoot;
        var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
        var objectClass = "Object", airRuntimeClass = isCustomContext ? objectClass : "ScriptBridgingProxyObject", enviroClass = isCustomContext ? objectClass : "Environment", javaClass = isCustomContext && context.java ? "JavaPackage" : getClassOf(context.java), phantomClass = isCustomContext ? objectClass : "RuntimeObject";
        var java = /\bJava/.test(javaClass) && context.java;
        var rhino = java && getClassOf(context.environment) == enviroClass;
        var alpha = java ? "a" : "\u03B1";
        var beta = java ? "b" : "\u03B2";
        var doc = context.document || {};
        var opera = context.operamini || context.opera;
        var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera["[[Class]]"] : getClassOf(opera)) ? operaClass : opera = null;
        var data;
        var arch = ua;
        var description = [];
        var prerelease = null;
        var useFeatures = ua == userAgent;
        var version = useFeatures && opera && typeof opera.version == "function" && opera.version();
        var isSpecialCasedOS;
        var layout = getLayout([
          { "label": "EdgeHTML", "pattern": "Edge" },
          "Trident",
          { "label": "WebKit", "pattern": "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]);
        var name = getName([
          "Adobe AIR",
          "Arora",
          "Avant Browser",
          "Breach",
          "Camino",
          "Electron",
          "Epiphany",
          "Fennec",
          "Flock",
          "Galeon",
          "GreenBrowser",
          "iCab",
          "Iceweasel",
          "K-Meleon",
          "Konqueror",
          "Lunascape",
          "Maxthon",
          { "label": "Microsoft Edge", "pattern": "(?:Edge|Edg|EdgA|EdgiOS)" },
          "Midori",
          "Nook Browser",
          "PaleMoon",
          "PhantomJS",
          "Raven",
          "Rekonq",
          "RockMelt",
          { "label": "Samsung Internet", "pattern": "SamsungBrowser" },
          "SeaMonkey",
          { "label": "Silk", "pattern": "(?:Cloud9|Silk-Accelerated)" },
          "Sleipnir",
          "SlimBrowser",
          { "label": "SRWare Iron", "pattern": "Iron" },
          "Sunrise",
          "Swiftfox",
          "Vivaldi",
          "Waterfox",
          "WebPositive",
          { "label": "Yandex Browser", "pattern": "YaBrowser" },
          { "label": "UC Browser", "pattern": "UCBrowser" },
          "Opera Mini",
          { "label": "Opera Mini", "pattern": "OPiOS" },
          "Opera",
          { "label": "Opera", "pattern": "OPR" },
          "Chromium",
          "Chrome",
          { "label": "Chrome", "pattern": "(?:HeadlessChrome)" },
          { "label": "Chrome Mobile", "pattern": "(?:CriOS|CrMo)" },
          { "label": "Firefox", "pattern": "(?:Firefox|Minefield)" },
          { "label": "Firefox for iOS", "pattern": "FxiOS" },
          { "label": "IE", "pattern": "IEMobile" },
          { "label": "IE", "pattern": "MSIE" },
          "Safari"
        ]);
        var product = getProduct([
          { "label": "BlackBerry", "pattern": "BB10" },
          "BlackBerry",
          { "label": "Galaxy S", "pattern": "GT-I9000" },
          { "label": "Galaxy S2", "pattern": "GT-I9100" },
          { "label": "Galaxy S3", "pattern": "GT-I9300" },
          { "label": "Galaxy S4", "pattern": "GT-I9500" },
          { "label": "Galaxy S5", "pattern": "SM-G900" },
          { "label": "Galaxy S6", "pattern": "SM-G920" },
          { "label": "Galaxy S6 Edge", "pattern": "SM-G925" },
          { "label": "Galaxy S7", "pattern": "SM-G930" },
          { "label": "Galaxy S7 Edge", "pattern": "SM-G935" },
          "Google TV",
          "Lumia",
          "iPad",
          "iPod",
          "iPhone",
          "Kindle",
          { "label": "Kindle Fire", "pattern": "(?:Cloud9|Silk-Accelerated)" },
          "Nexus",
          "Nook",
          "PlayBook",
          "PlayStation Vita",
          "PlayStation",
          "TouchPad",
          "Transformer",
          { "label": "Wii U", "pattern": "WiiU" },
          "Wii",
          "Xbox One",
          { "label": "Xbox 360", "pattern": "Xbox" },
          "Xoom"
        ]);
        var manufacturer = getManufacturer({
          "Apple": { "iPad": 1, "iPhone": 1, "iPod": 1 },
          "Alcatel": {},
          "Archos": {},
          "Amazon": { "Kindle": 1, "Kindle Fire": 1 },
          "Asus": { "Transformer": 1 },
          "Barnes & Noble": { "Nook": 1 },
          "BlackBerry": { "PlayBook": 1 },
          "Google": { "Google TV": 1, "Nexus": 1 },
          "HP": { "TouchPad": 1 },
          "HTC": {},
          "Huawei": {},
          "Lenovo": {},
          "LG": {},
          "Microsoft": { "Xbox": 1, "Xbox One": 1 },
          "Motorola": { "Xoom": 1 },
          "Nintendo": { "Wii U": 1, "Wii": 1 },
          "Nokia": { "Lumia": 1 },
          "Oppo": {},
          "Samsung": { "Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1 },
          "Sony": { "PlayStation": 1, "PlayStation Vita": 1 },
          "Xiaomi": { "Mi": 1, "Redmi": 1 }
        });
        var os = getOS([
          "Windows Phone",
          "KaiOS",
          "Android",
          "CentOS",
          { "label": "Chrome OS", "pattern": "CrOS" },
          "Debian",
          { "label": "DragonFly BSD", "pattern": "DragonFly" },
          "Fedora",
          "FreeBSD",
          "Gentoo",
          "Haiku",
          "Kubuntu",
          "Linux Mint",
          "OpenBSD",
          "Red Hat",
          "SuSE",
          "Ubuntu",
          "Xubuntu",
          "Cygwin",
          "Symbian OS",
          "hpwOS",
          "webOS ",
          "webOS",
          "Tablet OS",
          "Tizen",
          "Linux",
          "Mac OS X",
          "Macintosh",
          "Mac",
          "Windows 98;",
          "Windows "
        ]);
        function getLayout(guesses) {
          return reduce(guesses, function(result, guess) {
            return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
          });
        }
        function getManufacturer(guesses) {
          return reduce(guesses, function(result, value, key) {
            return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp("\\b" + qualify(key) + "(?:\\b|\\w*\\d)", "i").exec(ua)) && key;
          });
        }
        function getName(guesses) {
          return reduce(guesses, function(result, guess) {
            return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
          });
        }
        function getOS(guesses) {
          return reduce(guesses, function(result, guess) {
            var pattern = guess.pattern || qualify(guess);
            if (!result && (result = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua))) {
              result = cleanupOS(result, pattern, guess.label || guess);
            }
            return result;
          });
        }
        function getProduct(guesses) {
          return reduce(guesses, function(result, guess) {
            var pattern = guess.pattern || qualify(guess);
            if (!result && (result = RegExp("\\b" + pattern + " *\\d+[.\\w_]*", "i").exec(ua) || RegExp("\\b" + pattern + " *\\w+-[\\w]*", "i").exec(ua) || RegExp("\\b" + pattern + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(ua))) {
              if ((result = String(guess.label && !RegExp(pattern, "i").test(guess.label) ? guess.label : result).split("/"))[1] && !/[\d.]+/.test(result[0])) {
                result[0] += " " + result[1];
              }
              guess = guess.label || guess;
              result = format(result[0].replace(RegExp(pattern, "i"), guess).replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ").replace(RegExp("(" + guess + ")[-_.]?(\\w)", "i"), "$1 $2"));
            }
            return result;
          });
        }
        function getVersion(patterns) {
          return reduce(patterns, function(result, pattern) {
            return result || (RegExp(pattern + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(ua) || 0)[1] || null;
          });
        }
        function toStringPlatform() {
          return this.description || "";
        }
        layout && (layout = [layout]);
        if (/\bAndroid\b/.test(os) && !product && (data = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(ua))) {
          product = trim(data[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null;
        }
        if (manufacturer && !product) {
          product = getProduct([manufacturer]);
        } else if (manufacturer && product) {
          product = product.replace(RegExp("^(" + qualify(manufacturer) + ")[-_.\\s]", "i"), manufacturer + " ").replace(RegExp("^(" + qualify(manufacturer) + ")[-_.]?(\\w)", "i"), manufacturer + " $2");
        }
        if (data = /\bGoogle TV\b/.exec(product)) {
          product = data[0];
        }
        if (/\bSimulator\b/i.test(ua)) {
          product = (product ? product + " " : "") + "Simulator";
        }
        if (name == "Opera Mini" && /\bOPiOS\b/.test(ua)) {
          description.push("running in Turbo/Uncompressed mode");
        }
        if (name == "IE" && /\blike iPhone OS\b/.test(ua)) {
          data = parse(ua.replace(/like iPhone OS/, ""));
          manufacturer = data.manufacturer;
          product = data.product;
        } else if (/^iP/.test(product)) {
          name || (name = "Safari");
          os = "iOS" + ((data = / OS ([\d_]+)/i.exec(ua)) ? " " + data[1].replace(/_/g, ".") : "");
        } else if (name == "Konqueror" && /^Linux\b/i.test(os)) {
          os = "Kubuntu";
        } else if (manufacturer && manufacturer != "Google" && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) || /\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua)) {
          name = "Android Browser";
          os = /\bAndroid\b/.test(os) ? os : "Android";
        } else if (name == "Silk") {
          if (!/\bMobi/i.test(ua)) {
            os = "Android";
            description.unshift("desktop mode");
          }
          if (/Accelerated *= *true/i.test(ua)) {
            description.unshift("accelerated");
          }
        } else if (name == "UC Browser" && /\bUCWEB\b/.test(ua)) {
          description.push("speed mode");
        } else if (name == "PaleMoon" && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
          description.push("identifying as Firefox " + data[1]);
        } else if (name == "Firefox" && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
          os || (os = "Firefox OS");
          product || (product = data[1]);
        } else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
          if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + "/") + 8))) {
            name = null;
          }
          if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
            name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + " Browser";
          }
        } else if (name == "Electron" && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
          description.push("Chromium " + data);
        }
        if (!version) {
          version = getVersion([
            "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
            "Version",
            qualify(name),
            "(?:Firefox|Minefield|NetFront)"
          ]);
        }
        if (data = layout == "iCab" && parseFloat(version) > 3 && "WebKit" || /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && "WebKit" || !layout && /\bMSIE\b/i.test(ua) && (os == "Mac OS" ? "Tasman" : "Trident") || layout == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(name) && "NetFront") {
          layout = [data];
        }
        if (name == "IE" && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
          name += " Mobile";
          os = "Windows Phone " + (/\+$/.test(data) ? data : data + ".x");
          description.unshift("desktop mode");
        } else if (/\bWPDesktop\b/i.test(ua)) {
          name = "IE Mobile";
          os = "Windows Phone 8.x";
          description.unshift("desktop mode");
          version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
        } else if (name != "IE" && layout == "Trident" && (data = /\brv:([\d.]+)/.exec(ua))) {
          if (name) {
            description.push("identifying as " + name + (version ? " " + version : ""));
          }
          name = "IE";
          version = data[1];
        }
        if (useFeatures) {
          if (isHostType(context, "global")) {
            if (java) {
              data = java.lang.System;
              arch = data.getProperty("os.arch");
              os = os || data.getProperty("os.name") + " " + data.getProperty("os.version");
            }
            if (rhino) {
              try {
                version = context.require("ringo/engine").version.join(".");
                name = "RingoJS";
              } catch (e) {
                if ((data = context.system) && data.global.system == context.system) {
                  name = "Narwhal";
                  os || (os = data[0].os || null);
                }
              }
              if (!name) {
                name = "Rhino";
              }
            } else if (typeof context.process == "object" && !context.process.browser && (data = context.process)) {
              if (typeof data.versions == "object") {
                if (typeof data.versions.electron == "string") {
                  description.push("Node " + data.versions.node);
                  name = "Electron";
                  version = data.versions.electron;
                } else if (typeof data.versions.nw == "string") {
                  description.push("Chromium " + version, "Node " + data.versions.node);
                  name = "NW.js";
                  version = data.versions.nw;
                }
              }
              if (!name) {
                name = "Node.js";
                arch = data.arch;
                os = data.platform;
                version = /[\d.]+/.exec(data.version);
                version = version ? version[0] : null;
              }
            }
          } else if (getClassOf(data = context.runtime) == airRuntimeClass) {
            name = "Adobe AIR";
            os = data.flash.system.Capabilities.os;
          } else if (getClassOf(data = context.phantom) == phantomClass) {
            name = "PhantomJS";
            version = (data = data.version || null) && data.major + "." + data.minor + "." + data.patch;
          } else if (typeof doc.documentMode == "number" && (data = /\bTrident\/(\d+)/i.exec(ua))) {
            version = [version, doc.documentMode];
            if ((data = +data[1] + 4) != version[1]) {
              description.push("IE " + version[1] + " mode");
              layout && (layout[1] = "");
              version[1] = data;
            }
            version = name == "IE" ? String(version[1].toFixed(1)) : version[0];
          } else if (typeof doc.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(name)) {
            description.push("masking as " + name + " " + version);
            name = "IE";
            version = "11.0";
            layout = ["Trident"];
            os = "Windows";
          }
          os = os && format(os);
        }
        if (version && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ";" + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && "a")) {
          prerelease = /b/i.test(data) ? "beta" : "alpha";
          version = version.replace(RegExp(data + "\\+?$"), "") + (prerelease == "beta" ? beta : alpha) + (/\d+\+?/.exec(data) || "");
        }
        if (name == "Fennec" || name == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(os)) {
          name = "Firefox Mobile";
        } else if (name == "Maxthon" && version) {
          version = version.replace(/\.[\d.]+/, ".x");
        } else if (/\bXbox\b/i.test(product)) {
          if (product == "Xbox 360") {
            os = null;
          }
          if (product == "Xbox 360" && /\bIEMobile\b/.test(ua)) {
            description.unshift("mobile mode");
          }
        } else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == "Windows CE" || /Mobi/i.test(ua))) {
          name += " Mobile";
        } else if (name == "IE" && useFeatures) {
          try {
            if (context.external === null) {
              description.unshift("platform preview");
            }
          } catch (e) {
            description.unshift("embedded");
          }
        } else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(ua) || 0)[1] || version)) {
          data = [data, /BB10/.test(ua)];
          os = (data[1] ? (product = null, manufacturer = "BlackBerry") : "Device Software") + " " + data[0];
          version = null;
        } else if (this != forOwn && product != "Wii" && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(os) || name == "IE" && (os && !/^Win/.test(os) && version > 5.5 || /\bWindows XP\b/.test(os) && version > 8 || version == 8 && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, "") + ";")) && data.name) {
          data = "ing as " + data.name + ((data = data.version) ? " " + data : "");
          if (reOpera.test(name)) {
            if (/\bIE\b/.test(data) && os == "Mac OS") {
              os = null;
            }
            data = "identify" + data;
          } else {
            data = "mask" + data;
            if (operaClass) {
              name = format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2"));
            } else {
              name = "Opera";
            }
            if (/\bIE\b/.test(data)) {
              os = null;
            }
            if (!useFeatures) {
              version = null;
            }
          }
          layout = ["Presto"];
          description.push(data);
        }
        if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
          data = [parseFloat(data.replace(/\.(\d)$/, ".0$1")), data];
          if (name == "Safari" && data[1].slice(-1) == "+") {
            name = "WebKit Nightly";
            prerelease = "alpha";
            version = data[1].slice(0, -1);
          } else if (version == data[1] || version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
            version = null;
          }
          data[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(ua) || 0)[1];
          if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == "WebKit") {
            layout = ["Blink"];
          }
          if (!useFeatures || !likeChrome && !data[1]) {
            layout && (layout[1] = "like Safari");
            data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? "4+" : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : "12");
          } else {
            layout && (layout[1] = "like Chrome");
            data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.1 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.3 ? 11 : data < 535.01 ? 12 : data < 535.02 ? "13+" : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.1 ? 19 : data < 537.01 ? 20 : data < 537.11 ? "21+" : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != "Blink" ? "27" : "28");
          }
          layout && (layout[1] += " " + (data += typeof data == "number" ? ".x" : /[.+]/.test(data) ? "" : "+"));
          if (name == "Safari" && (!version || parseInt(version) > 45)) {
            version = data;
          } else if (name == "Chrome" && /\bHeadlessChrome/i.test(ua)) {
            description.unshift("headless");
          }
        }
        if (name == "Opera" && (data = /\bzbov|zvav$/.exec(os))) {
          name += " ";
          description.unshift("desktop mode");
          if (data == "zvav") {
            name += "Mini";
            version = null;
          } else {
            name += "Mobile";
          }
          os = os.replace(RegExp(" *" + data + "$"), "");
        } else if (name == "Safari" && /\bChrome\b/.exec(layout && layout[1])) {
          description.unshift("desktop mode");
          name = "Chrome Mobile";
          version = null;
          if (/\bOS X\b/.test(os)) {
            manufacturer = "Apple";
            os = "iOS 4.3+";
          } else {
            os = null;
          }
        } else if (/\bSRWare Iron\b/.test(name) && !version) {
          version = getVersion("Chrome");
        }
        if (version && version.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf("/" + data + "-") > -1) {
          os = trim(os.replace(data, ""));
        }
        if (os && os.indexOf(name) != -1 && !RegExp(name + " OS").test(os)) {
          os = os.replace(RegExp(" *" + qualify(name) + " *"), "");
        }
        if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || name != "Safari" && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) {
          (data = layout[layout.length - 1]) && description.push(data);
        }
        if (description.length) {
          description = ["(" + description.join("; ") + ")"];
        }
        if (manufacturer && product && product.indexOf(manufacturer) < 0) {
          description.push("on " + manufacturer);
        }
        if (product) {
          description.push((/^on /.test(description[description.length - 1]) ? "" : "on ") + product);
        }
        if (os) {
          data = / ([\d.+]+)$/.exec(os);
          isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == "/";
          os = {
            "architecture": 32,
            "family": data && !isSpecialCasedOS ? os.replace(data[0], "") : os,
            "version": data ? data[1] : null,
            "toString": function() {
              var version2 = this.version;
              return this.family + (version2 && !isSpecialCasedOS ? " " + version2 : "") + (this.architecture == 64 ? " 64-bit" : "");
            }
          };
        }
        if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
          if (os) {
            os.architecture = 64;
            os.family = os.family.replace(RegExp(" *" + data), "");
          }
          if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
            description.unshift("32-bit");
          }
        } else if (os && /^OS X/.test(os.family) && name == "Chrome" && parseFloat(version) >= 39) {
          os.architecture = 64;
        }
        ua || (ua = null);
        var platform3 = {};
        platform3.description = ua;
        platform3.layout = layout && layout[0];
        platform3.manufacturer = manufacturer;
        platform3.name = name;
        platform3.prerelease = prerelease;
        platform3.product = product;
        platform3.ua = ua;
        platform3.version = name && version;
        platform3.os = os || {
          /**
           * The CPU architecture the OS is built for.
           *
           * @memberOf platform.os
           * @type number|null
           */
          "architecture": null,
          /**
           * The family of the OS.
           *
           * Common values include:
           * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
           * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
           * "SuSE", "Android", "iOS" and "Windows Phone"
           *
           * @memberOf platform.os
           * @type string|null
           */
          "family": null,
          /**
           * The version of the OS.
           *
           * @memberOf platform.os
           * @type string|null
           */
          "version": null,
          /**
           * Returns the OS string.
           *
           * @memberOf platform.os
           * @returns {string} The OS string.
           */
          "toString": function() {
            return "null";
          }
        };
        platform3.parse = parse;
        platform3.toString = toStringPlatform;
        if (platform3.version) {
          description.unshift(version);
        }
        if (platform3.name) {
          description.unshift(name);
        }
        if (os && name && !(os == String(os).split(" ")[0] && (os == name.split(" ")[0] || product))) {
          description.push(product ? "(" + os + ")" : "on " + os);
        }
        if (description.length) {
          platform3.description = description.join(" ");
        }
        return platform3;
      }
      var platform2 = parse();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root.platform = platform2;
        define(function() {
          return platform2;
        });
      } else if (freeExports && freeModule) {
        forOwn(platform2, function(value, key) {
          freeExports[key] = value;
        });
      } else {
        root.platform = platform2;
      }
    }).call(exports);
  }
});

// node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "node_modules/normalize-path/index.js"(exports, module) {
    module.exports = function(path2, stripTrailing) {
      if (typeof path2 !== "string") {
        throw new TypeError("expected path to be a string");
      }
      if (path2 === "\\" || path2 === "/")
        return "/";
      var len = path2.length;
      if (len <= 1)
        return path2;
      var prefix = "";
      if (len > 4 && path2[3] === "\\") {
        var ch = path2[2];
        if ((ch === "?" || ch === ".") && path2.slice(0, 2) === "\\\\") {
          path2 = path2.slice(2);
          prefix = "//";
        }
      }
      var segs = path2.split(/[/\\]+/);
      if (stripTrailing !== false && segs[segs.length - 1] === "") {
        segs.pop();
      }
      return prefix + segs.join("/");
    };
  }
});

// node_modules/uuid/lib/rng-browser.js
var require_rng_browser = __commonJS({
  "node_modules/uuid/lib/rng-browser.js"(exports, module) {
    var getRandomValues = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (getRandomValues) {
      rnds8 = new Uint8Array(16);
      module.exports = function whatwgRNG() {
        getRandomValues(rnds8);
        return rnds8;
      };
    } else {
      rnds = new Array(16);
      module.exports = function mathRNG() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 3) === 0)
            r = Math.random() * 4294967296;
          rnds[i] = r >>> ((i & 3) << 3) & 255;
        }
        return rnds;
      };
    }
    var rnds8;
    var rnds;
  }
});

// node_modules/uuid/lib/bytesToUuid.js
var require_bytesToUuid = __commonJS({
  "node_modules/uuid/lib/bytesToUuid.js"(exports, module) {
    var byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 256).toString(16).substr(1);
    }
    var i;
    function bytesToUuid(buf, offset) {
      var i2 = offset || 0;
      var bth = byteToHex;
      return [
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]]
      ].join("");
    }
    module.exports = bytesToUuid;
  }
});

// node_modules/uuid/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/v1.js"(exports, module) {
    var rng = require_rng_browser();
    var bytesToUuid = require_bytesToUuid();
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v12(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];
      options = options || {};
      var node = options.node || _nodeId;
      var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        var seedBytes = rng();
        if (node == null) {
          node = _nodeId = [
            seedBytes[0] | 1,
            seedBytes[1],
            seedBytes[2],
            seedBytes[3],
            seedBytes[4],
            seedBytes[5]
          ];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      var msecs = options.msecs !== void 0 ? options.msecs : (/* @__PURE__ */ new Date()).getTime();
      var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      var tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf ? buf : bytesToUuid(b);
    }
    module.exports = v12;
  }
});

// node_modules/isomorphic-ws/browser.js
var require_browser = __commonJS({
  "node_modules/isomorphic-ws/browser.js"(exports, module) {
    var ws = null;
    if (typeof WebSocket !== "undefined") {
      ws = WebSocket;
    } else if (typeof MozWebSocket !== "undefined") {
      ws = MozWebSocket;
    } else if (typeof global !== "undefined") {
      ws = global.WebSocket || global.MozWebSocket;
    } else if (typeof window !== "undefined") {
      ws = window.WebSocket || window.MozWebSocket;
    } else if (typeof self !== "undefined") {
      ws = self.WebSocket || self.MozWebSocket;
    }
    module.exports = ws;
  }
});

// node_modules/@e2b/sdk/dist/esm/index.js
var import_polyfill = __toESM(require_browser_polyfill());

// node_modules/openapi-typescript-fetch/dist/esm/types.js
var never = Symbol();
var ApiError = class extends Error {
  constructor(response) {
    super(response.statusText);
    Object.defineProperty(this, "headers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "url", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "status", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "statusText", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.setPrototypeOf(this, new.target.prototype);
    this.headers = response.headers;
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.data = response.data;
  }
};

// node_modules/openapi-typescript-fetch/dist/esm/fetcher.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var sendBody = (method) => method === "post" || method === "put" || method === "patch" || method === "delete";
function queryString(params) {
  const qs = [];
  const encode = (key, value) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value != null) {
      if (Array.isArray(value)) {
        value.forEach((value2) => qs.push(encode(key, value2)));
      } else {
        qs.push(encode(key, value));
      }
    }
  });
  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }
  return "";
}
function getPath(path2, payload) {
  return path2.replace(/\{([^}]+)\}/g, (_, key) => {
    const value = encodeURIComponent(payload[key]);
    delete payload[key];
    return value;
  });
}
function getQuery(method, payload, query) {
  let queryObj = {};
  if (sendBody(method)) {
    query.forEach((key) => {
      queryObj[key] = payload[key];
      delete payload[key];
    });
  } else {
    queryObj = Object.assign({}, payload);
  }
  return queryString(queryObj);
}
function getHeaders(body, init) {
  const headers = new Headers(init);
  if (body !== void 0 && !headers.has("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }
  if (!headers.has("Accept")) {
    headers.append("Accept", "application/json");
  }
  return headers;
}
function getBody(method, payload) {
  const body = sendBody(method) ? JSON.stringify(payload) : void 0;
  return method === "delete" && body === "{}" ? void 0 : body;
}
function mergeRequestInit(first, second) {
  const headers = new Headers(first === null || first === void 0 ? void 0 : first.headers);
  const other = new Headers(second === null || second === void 0 ? void 0 : second.headers);
  for (const key of other.keys()) {
    const value = other.get(key);
    if (value != null) {
      headers.set(key, value);
    }
  }
  return Object.assign(Object.assign(Object.assign({}, first), second), { headers });
}
function getFetchParams(request) {
  var _a2;
  const payload = Object.assign(Array.isArray(request.payload) ? [] : {}, request.payload);
  const path2 = getPath(request.path, payload);
  const query = getQuery(request.method, payload, request.queryParams);
  const body = getBody(request.method, payload);
  const headers = getHeaders(body, (_a2 = request.init) === null || _a2 === void 0 ? void 0 : _a2.headers);
  const url = request.baseUrl + path2 + query;
  const init = Object.assign(Object.assign({}, request.init), {
    method: request.method.toUpperCase(),
    headers,
    body
  });
  return { url, init };
}
function getResponseData(response) {
  return __awaiter(this, void 0, void 0, function* () {
    const contentType = response.headers.get("content-type");
    if (response.status === 204) {
      return void 0;
    }
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return yield response.json();
    }
    const text = yield response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  });
}
function fetchJson(url, init) {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(url, init);
    const data = yield getResponseData(response);
    const result = {
      headers: response.headers,
      url: response.url,
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data
    };
    if (result.ok) {
      return result;
    }
    throw new ApiError(result);
  });
}
function wrapMiddlewares(middlewares, fetch2) {
  const handler = (index, url, init) => __awaiter(this, void 0, void 0, function* () {
    if (middlewares == null || index === middlewares.length) {
      return fetch2(url, init);
    }
    const current = middlewares[index];
    return yield current(url, init, (nextUrl, nextInit) => handler(index + 1, nextUrl, nextInit));
  });
  return (url, init) => handler(0, url, init);
}
function fetchUrl(request) {
  return __awaiter(this, void 0, void 0, function* () {
    const { url, init } = getFetchParams(request);
    const response = yield request.fetch(url, init);
    return response;
  });
}
function createFetch(fetch2) {
  const fun = (payload, init) => __awaiter(this, void 0, void 0, function* () {
    try {
      return yield fetch2(payload, init);
    } catch (err) {
      if (err instanceof ApiError) {
        throw new fun.Error(err);
      }
      throw err;
    }
  });
  fun.Error = class extends ApiError {
    constructor(error) {
      super(error);
      Object.setPrototypeOf(this, new.target.prototype);
    }
    getActualType() {
      return {
        status: this.status,
        data: this.data
      };
    }
  };
  return fun;
}
function fetcher() {
  let baseUrl = "";
  let defaultInit = {};
  const middlewares = [];
  const fetch2 = wrapMiddlewares(middlewares, fetchJson);
  return {
    configure: (config) => {
      baseUrl = config.baseUrl || "";
      defaultInit = config.init || {};
      middlewares.splice(0);
      middlewares.push(...config.use || []);
    },
    use: (mw) => middlewares.push(mw),
    path: (path2) => ({
      method: (method) => ({
        create: (queryParams) => createFetch((payload, init) => fetchUrl({
          baseUrl: baseUrl || "",
          path: path2,
          method,
          queryParams: Object.keys(queryParams || {}),
          payload,
          init: mergeRequestInit(defaultInit, init),
          fetch: fetch2
        }))
      })
    })
  };
}
var Fetcher = {
  for: () => fetcher()
};

// node_modules/@e2b/sdk/dist/esm/index.js
var import_platform = __toESM(require_platform());
var import_normalize_path = __toESM(require_normalize_path());

// node_modules/rpc-websocket-client/dist/rpc-websocket-client.es5.js
var v1 = require_v1();
var WebSocket2 = require_browser();
var RpcVersions;
(function(RpcVersions2) {
  RpcVersions2["RPC_VERSION"] = "2.0";
})(RpcVersions || (RpcVersions = {}));
var RpcWebSocketClient = (
  /** @class */
  function() {
    function RpcWebSocketClient2() {
      this.idAwaiter = {};
      this.onOpenHandlers = [];
      this.onAnyMessageHandlers = [];
      this.onNotification = [];
      this.onRequest = [];
      this.onSuccessResponse = [];
      this.onErrorResponse = [];
      this.onErrorHandlers = [];
      this.onCloseHandlers = [];
      this.config = {
        responseTimeout: 1e4
      };
      this.ws = void 0;
    }
    RpcWebSocketClient2.prototype.connect = function(url, protocols) {
      this.ws = new WebSocket2(url, protocols);
      return this.listen();
    };
    RpcWebSocketClient2.prototype.onOpen = function(fn) {
      this.onOpenHandlers.push(fn);
    };
    RpcWebSocketClient2.prototype.onAnyMessage = function(fn) {
      this.onAnyMessageHandlers.push(fn);
    };
    RpcWebSocketClient2.prototype.onError = function(fn) {
      this.onErrorHandlers.push(fn);
    };
    RpcWebSocketClient2.prototype.onClose = function(fn) {
      this.onCloseHandlers.push(fn);
    };
    RpcWebSocketClient2.prototype.listenMessages = function() {
      var _this = this;
      var previousOnMessage;
      if (this.ws.onmessage) {
        previousOnMessage = this.ws.onmessage.bind(this.ws);
      }
      this.ws.onmessage = function(e) {
        if (previousOnMessage) {
          previousOnMessage(e);
        }
        for (var _i = 0, _a2 = _this.onAnyMessageHandlers; _i < _a2.length; _i++) {
          var handler = _a2[_i];
          handler(e);
        }
        var data = JSON.parse(e.data.toString());
        if (_this.isNotification(data)) {
          for (var _b = 0, _c = _this.onNotification; _b < _c.length; _b++) {
            var handler = _c[_b];
            handler(data);
          }
        } else if (_this.isRequest(data)) {
          for (var _d = 0, _e = _this.onRequest; _d < _e.length; _d++) {
            var handler = _e[_d];
            handler(data);
          }
        } else if (_this.isSuccessResponse(data)) {
          for (var _f = 0, _g = _this.onSuccessResponse; _f < _g.length; _f++) {
            var handler = _g[_f];
            handler(data);
          }
          _this.idAwaiter[data.id](data.result);
        } else if (_this.isErrorResponse(data)) {
          for (var _h = 0, _j = _this.onErrorResponse; _h < _j.length; _h++) {
            var handler = _j[_h];
            handler(data);
          }
          _this.idAwaiter[data.id](data.error);
        }
      };
    };
    RpcWebSocketClient2.prototype.call = function(method, params) {
      var _this = this;
      return new Promise(function(resolve2, reject) {
        var data = _this.buildRequest(method, params);
        var timeout;
        if (_this.config.responseTimeout) {
          timeout = setTimeout(function() {
            delete _this.idAwaiter[data.id];
            reject('Awaiting response to "' + method + '" with id: ' + data.id + " timed out.");
          }, _this.config.responseTimeout);
        }
        _this.idAwaiter[data.id] = function(responseData) {
          clearInterval(timeout);
          delete _this.idAwaiter[data.id];
          if (_this.isRpcError(responseData)) {
            reject(responseData);
            return;
          }
          resolve2(responseData);
        };
        var json = JSON.stringify(data);
        _this.ws.send(json);
      });
    };
    RpcWebSocketClient2.prototype.notify = function(method, params) {
      this.ws.send(JSON.stringify(this.buildNotification(method, params)));
    };
    RpcWebSocketClient2.prototype.customId = function(idFn) {
      this.idFn = idFn;
    };
    RpcWebSocketClient2.prototype.noRpc = function() {
      this.buildRequest = this.buildRequestBase;
      this.buildNotification = this.buildNotificationBase;
      this.buildRpcSuccessResponse = this.buildRpcSuccessResponseBase;
      this.buildRpcErrorResponse = this.buildRpcErrorResponseBase;
    };
    RpcWebSocketClient2.prototype.configure = function(options) {
      Object.assign(this.config, options);
    };
    RpcWebSocketClient2.prototype.changeSocket = function(ws) {
      this.ws = ws;
    };
    RpcWebSocketClient2.prototype.listen = function() {
      var _this = this;
      return new Promise(function(resolve2, reject) {
        _this.ws.onopen = function(e) {
          for (var _i = 0, _a2 = _this.onOpenHandlers; _i < _a2.length; _i++) {
            var handler = _a2[_i];
            handler(e);
          }
          resolve2(e);
        };
        _this.listenMessages();
        _this.ws.onerror = function(e) {
          for (var _i = 0, _a2 = _this.onErrorHandlers; _i < _a2.length; _i++) {
            var handler = _a2[_i];
            handler(e);
          }
        };
        _this.ws.onclose = function(e) {
          for (var _i = 0, _a2 = _this.onCloseHandlers; _i < _a2.length; _i++) {
            var handler = _a2[_i];
            handler(e);
          }
          reject(e);
        };
      });
    };
    RpcWebSocketClient2.prototype.buildRequest = function(method, params) {
      var data = this.buildRequestBase(method, params);
      data.jsonrpc = RpcVersions.RPC_VERSION;
      return data;
    };
    RpcWebSocketClient2.prototype.buildRequestBase = function(method, params) {
      var data = {};
      data.id = this.idFn();
      data.method = method;
      if (params) {
        data.params = params;
      }
      return data;
    };
    RpcWebSocketClient2.prototype.buildNotification = function(method, params) {
      var data = this.buildNotificationBase(method, params);
      data.jsonrpc = RpcVersions.RPC_VERSION;
      return data;
    };
    RpcWebSocketClient2.prototype.buildNotificationBase = function(method, params) {
      var data = {};
      data.method = method;
      if (params) {
        data.params = params;
      }
      return data;
    };
    RpcWebSocketClient2.prototype.buildRpcSuccessResponse = function(id2, result) {
      var data = this.buildRpcSuccessResponseBase(id2, result);
      data.jsonrpc = RpcVersions.RPC_VERSION;
      return data;
    };
    RpcWebSocketClient2.prototype.buildRpcSuccessResponseBase = function(id2, result) {
      var data = {};
      data.id = id2;
      data.result = result;
      return data;
    };
    RpcWebSocketClient2.prototype.buildRpcErrorResponse = function(id2, error) {
      var data = this.buildRpcErrorResponseBase(id2, error);
      data.jsonrpc = RpcVersions.RPC_VERSION;
      return data;
    };
    RpcWebSocketClient2.prototype.buildRpcErrorResponseBase = function(id2, error) {
      var data = {};
      data.id = id2;
      data.error = error;
      return data;
    };
    RpcWebSocketClient2.prototype.idFn = function() {
      return v1();
    };
    RpcWebSocketClient2.prototype.isNotification = function(data) {
      return !data.id;
    };
    RpcWebSocketClient2.prototype.isRequest = function(data) {
      return data.method;
    };
    RpcWebSocketClient2.prototype.isSuccessResponse = function(data) {
      return data.hasOwnProperty("result");
    };
    RpcWebSocketClient2.prototype.isErrorResponse = function(data) {
      return data.hasOwnProperty("error");
    };
    RpcWebSocketClient2.prototype.isRpcError = function(data) {
      var _a2;
      return typeof ((_a2 = data) === null || _a2 === void 0 ? void 0 : _a2.code) !== "undefined";
    };
    return RpcWebSocketClient2;
  }()
);

// node_modules/@e2b/sdk/dist/esm/index.js
var SESSION_REFRESH_PERIOD = 5e3;
var WS_RECONNECT_INTERVAL = 600;
var TIMEOUT = 6e4;
var SESSION_DOMAIN = "ondevbook.com";
var WS_PORT = 49982;
var WS_ROUTE = "/ws";
var _a;
var client = Fetcher.for();
client.configure({
  baseUrl: `https://${SESSION_DOMAIN}`,
  init: {
    headers: {
      package_version: "0.5.1",
      lang: "js",
      engine: import_platform.default.name || "unknown",
      lang_version: import_platform.default.version || "unknown",
      system: ((_a = import_platform.default.os) === null || _a === void 0 ? void 0 : _a.family) || "unknown",
      publisher: "e2b"
    }
  }
});
function __awaiter2(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function id(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
var TimeoutError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
};
var AuthenticationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
};
function assertFulfilled(item) {
  return item.status === "fulfilled";
}
function formatSettledErrors(settled) {
  if (settled.every((s) => s.status === "fulfilled"))
    return;
  return settled.reduce((prev, curr, i) => {
    if (curr.status === "rejected") {
      return prev + `
[${i}]: ${JSON.stringify(curr)}`;
    }
    return prev;
  }, "errors:\n");
}
function createDeferredPromise() {
  let resolve2;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve2 = res;
    reject = rej;
  });
  return {
    promise,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    reject,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    resolve: resolve2
  };
}
function withTimeout(fn, timeout = TIMEOUT) {
  if (timeout === void 0 || timeout <= 0 || timeout === Number.POSITIVE_INFINITY) {
    return fn;
  }
  let timerId;
  const timer = new Promise((resolve2, reject) => {
    timerId = setTimeout(() => reject(new TimeoutError(`Calling "${fn.name}" timeouted after ${timeout}ms.`)), timeout);
  });
  return (...args) => {
    const result = Promise.race([timer, fn(...args)]);
    result.finally(() => clearTimeout(timerId));
    return result;
  };
}
var codeSnippetService = "codeSnippet";
var filesystemService = "filesystem";
var FilesystemOperation;
(function(FilesystemOperation2) {
  FilesystemOperation2["Create"] = "Create";
  FilesystemOperation2["Write"] = "Write";
  FilesystemOperation2["Remove"] = "Remove";
  FilesystemOperation2["Rename"] = "Rename";
  FilesystemOperation2["Chmod"] = "Chmod";
})(FilesystemOperation || (FilesystemOperation = {}));
var FilesystemWatcher = class {
  constructor(sessConn, path2) {
    this.sessConn = sessConn;
    this.path = path2;
    this.listeners = /* @__PURE__ */ new Set();
  }
  // Starts watching the path that was passed to the contructor
  start(opts) {
    return __awaiter2(this, void 0, void 0, function* () {
      const start = () => __awaiter2(this, void 0, void 0, function* () {
        if (this.rpcSubscriptionID)
          return;
        this.handleFilesystemEvents = this.handleFilesystemEvents.bind(this);
        this.rpcSubscriptionID = yield this.sessConn.subscribe(filesystemService, this.handleFilesystemEvents, "watchDir", this.path);
      });
      return yield withTimeout(start, opts === null || opts === void 0 ? void 0 : opts.timeout)();
    });
  }
  // Stops watching the path and removes all listeners.
  stop() {
    return __awaiter2(this, void 0, void 0, function* () {
      this.listeners.clear();
      if (this.rpcSubscriptionID) {
        yield this.sessConn.unsubscribe(this.rpcSubscriptionID);
      }
    });
  }
  addEventListener(l) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
  handleFilesystemEvents(fsChange) {
    this.listeners.forEach((l) => {
      l(fsChange);
    });
  }
};
var processService = "process";
var ProcessMessage = class {
  constructor(line, timestamp, error) {
    this.line = line;
    this.timestamp = timestamp;
    this.error = error;
  }
};
var ProcessOutput = class {
  constructor() {
    this.delimiter = "\n";
    this.messages = [];
    this._error = false;
  }
  /**
   * Whether the process has errored.
   */
  get error() {
    return this._error;
  }
  /**
   * The stdout from the process.
   */
  get stdout() {
    return this.messages.filter((out) => !out.error).map((out) => out.line).join(this.delimiter);
  }
  /**
   * The stderr from the process.
   */
  get stderr() {
    return this.messages.filter((out) => out.error).map((out) => out.line).join(this.delimiter);
  }
  addStdout(message) {
    this.insertByTimestamp(message);
  }
  addStderr(message) {
    this._error = true;
    this.insertByTimestamp(message);
  }
  insertByTimestamp(message) {
    let i = this.messages.length - 1;
    while (i >= 0 && this.messages[i].timestamp > message.timestamp) {
      i -= 1;
    }
    this.messages.splice(i + 1, 0, message);
  }
};
var Process = class {
  constructor(processID, session, triggerExit, finished, output) {
    this.processID = processID;
    this.session = session;
    this.triggerExit = triggerExit;
    this.finished = finished;
    this.output = output;
  }
  /**
   * Kills the process.
   */
  kill() {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        yield this.session.call(processService, "kill", [this.processID]);
      } finally {
        this.triggerExit();
        yield this.finished;
      }
    });
  }
  /**
   * Sends data to the process stdin.
   *
   * @param data Data to send
   * @param opts Call options
   * @param {timeout} [opts.timeout] Timeout in milliseconds (default is 60 seconds)
   */
  sendStdin(data, opts) {
    return __awaiter2(this, void 0, void 0, function* () {
      yield this.session.call(processService, "stdin", [this.processID, data], opts);
    });
  }
};
function wait(ms) {
  return new Promise((resolve2) => setTimeout(resolve2, ms));
}
var createSession = client.path("/sessions").method("post").create({ api_key: true });
var refreshSession = client.path("/sessions/{sessionID}/refresh").method("post").create({ api_key: true });
var SessionConnection = class {
  // let's keep opts readonly, but public – for convenience, mainly when debugging
  constructor(opts) {
    var _a2, _b, _c;
    this.opts = opts;
    this.isOpen = false;
    this.rpc = new RpcWebSocketClient();
    this.subscribers = [];
    const apiKey = opts.apiKey || process.env.E2B_API_KEY;
    if (!apiKey) {
      throw new AuthenticationError("API key is required, please visit https://e2b.dev/docs to get your API key");
    }
    this.apiKey = apiKey;
    this.cwd = opts.cwd;
    if (this.cwd && this.cwd.startsWith("~")) {
      this.cwd = this.cwd.replace("~", "/home/user");
    }
    this.envVars = opts.envVars || {};
    this.logger = (_a2 = opts.logger) !== null && _a2 !== void 0 ? _a2 : {
      // by default, we log to the console
      // we don't log debug messages by default
      info: console.info,
      warn: console.warn,
      error: console.error
    };
    (_c = (_b = this.logger).info) === null || _c === void 0 ? void 0 : _c.call(_b, `Session "${opts.id}" initialized`);
  }
  /**
   * Get the hostname for the session or for the specified session's port.
   *
   * `getHostname` method requires `this` context - you may need to bind it.
   *
   * @param port Specify if you want to connect to a specific port of the session
   * @returns Hostname of the session or session's port
   */
  getHostname(port) {
    if (this.opts.__debug_hostname) {
      if (port && this.opts.__debug_devEnv === "remote") {
        return `${port}-${this.opts.__debug_hostname}`;
      } else if (port) {
        return `${this.opts.__debug_hostname}:${port}`;
      } else {
        return this.opts.__debug_hostname;
      }
    }
    if (!this.session) {
      return void 0;
    }
    const hostname = `${this.session.sessionID}-${this.session.clientID}.${SESSION_DOMAIN}`;
    if (port) {
      return `${port}-${hostname}`;
    } else {
      return hostname;
    }
  }
  /**
   * Close the connection to the session
   *
   * `close` method requires `this` context - you may need to bind it.
   */
  close() {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __awaiter2(this, void 0, void 0, function* () {
      if (this.isOpen) {
        (_b = (_a2 = this.logger).debug) === null || _b === void 0 ? void 0 : _b.call(_a2, `Closing session "${(_c = this.session) === null || _c === void 0 ? void 0 : _c.sessionID}"`);
        this.isOpen = false;
        (_e = (_d = this.logger).debug) === null || _e === void 0 ? void 0 : _e.call(_d, "Unsubscribing...");
        const results = yield Promise.allSettled(this.subscribers.map((s) => this.unsubscribe(s.subID)));
        results.forEach((r) => {
          var _a3, _b2;
          if (r.status === "rejected") {
            (_b2 = (_a3 = this.logger).warn) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, `Failed to unsubscribe: "${r.reason}"`);
          }
        });
        (_g = (_f = this.rpc.ws) === null || _f === void 0 ? void 0 : _f.terminate) === null || _g === void 0 ? void 0 : _g.call(_f);
        (_j = (_h = this.rpc.ws) === null || _h === void 0 ? void 0 : _h.close) === null || _j === void 0 ? void 0 : _j.call(_h);
        (_l = (_k = this.logger).info) === null || _l === void 0 ? void 0 : _l.call(_k, "Disconnected from the session");
      }
    });
  }
  /**
   * Open a connection to a new session
   *
   * `open` method requires `this` context - you may need to bind it.
   * @param opts Call options
   * @param {timeout} [opts.timeout] Timeout in milliseconds (default is 60 seconds)
   */
  open(opts) {
    return __awaiter2(this, void 0, void 0, function* () {
      const open = () => __awaiter2(this, void 0, void 0, function* () {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (this.isOpen || !!this.session) {
          throw new Error("Session connect was already called");
        } else {
          this.isOpen = true;
        }
        (_b = (_a2 = this.logger).debug) === null || _b === void 0 ? void 0 : _b.call(_a2, "Opening session...");
        if (!this.opts.__debug_hostname) {
          try {
            const res = yield createSession({
              api_key: this.apiKey,
              codeSnippetID: this.opts.id,
              editEnabled: false
            });
            this.session = res.data;
            (_d = (_c = this.logger).debug) === null || _d === void 0 ? void 0 : _d.call(_c, `Acquired session "${this.session.sessionID}"`);
            this.refresh(this.session.sessionID);
          } catch (e) {
            if (e instanceof createSession.Error) {
              const error = e.getActualType();
              if (error.status === 400) {
                throw new Error(`Error creating session - (${error.status}) bad request: ${error.data.message}`);
              }
              if (error.status === 401) {
                throw new Error(`Error creating session - (${error.status}) unauthenticated: ${error.data.message}`);
              }
              if (error.status === 500) {
                throw new Error(`Error creating session - (${error.status}) server error: ${error.data.message}`);
              }
            }
            throw e;
          }
        }
        const hostname = this.getHostname(this.opts.__debug_port || WS_PORT);
        if (!hostname) {
          throw new Error("Cannot get session's hostname");
        }
        const protocol = this.opts.__debug_devEnv === "local" ? "ws" : "wss";
        const sessionURL = `${protocol}://${hostname}${WS_ROUTE}`;
        this.rpc.onError((err) => {
          var _a3, _b2, _c2, _d2, _e2;
          (_b2 = (_a3 = this.logger).debug) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, `Error in WS session "${(_c2 = this.session) === null || _c2 === void 0 ? void 0 : _c2.sessionID}": ${(_e2 = (_d2 = err.message) !== null && _d2 !== void 0 ? _d2 : err.code) !== null && _e2 !== void 0 ? _e2 : err.toString()}. Trying to reconnect...`);
        });
        let isFinished = false;
        let resolveOpening;
        let rejectOpening;
        const openingPromise = new Promise((resolve2, reject) => {
          resolveOpening = () => {
            if (isFinished)
              return;
            isFinished = true;
            resolve2();
          };
          rejectOpening = () => {
            if (isFinished)
              return;
            isFinished = true;
            reject();
          };
        });
        this.rpc.onOpen(() => {
          var _a3, _b2, _c2;
          (_b2 = (_a3 = this.logger).debug) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, `Connected to session "${(_c2 = this.session) === null || _c2 === void 0 ? void 0 : _c2.sessionID}"`);
          resolveOpening === null || resolveOpening === void 0 ? void 0 : resolveOpening();
        });
        this.rpc.onClose(() => __awaiter2(this, void 0, void 0, function* () {
          var _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
          (_p = (_o = this.logger).debug) === null || _p === void 0 ? void 0 : _p.call(_o, `Closing WS connection to session "${(_q = this.session) === null || _q === void 0 ? void 0 : _q.sessionID}"`);
          if (this.isOpen) {
            yield wait(WS_RECONNECT_INTERVAL);
            (_s = (_r = this.logger).debug) === null || _s === void 0 ? void 0 : _s.call(_r, `Reconnecting to session "${(_t = this.session) === null || _t === void 0 ? void 0 : _t.sessionID}"`);
            try {
              this.subscribers = [];
              yield this.rpc.connect(sessionURL);
              (_v = (_u = this.logger).debug) === null || _v === void 0 ? void 0 : _v.call(_u, `Reconnected to session "${(_w = this.session) === null || _w === void 0 ? void 0 : _w.sessionID}"`);
            } catch (err) {
              (_y = (_x = this.logger).debug) === null || _y === void 0 ? void 0 : _y.call(_x, `Failed reconnecting to session "${(_z = this.session) === null || _z === void 0 ? void 0 : _z.sessionID}": ${(_1 = (_0 = err.message) !== null && _0 !== void 0 ? _0 : err.code) !== null && _1 !== void 0 ? _1 : err.toString()}`);
            }
          } else {
            rejectOpening === null || rejectOpening === void 0 ? void 0 : rejectOpening();
          }
        }));
        this.rpc.onNotification.push(this.handleNotification.bind(this));
        try {
          (_f = (_e = this.logger).debug) === null || _f === void 0 ? void 0 : _f.call(_e, `Connection to session "${(_g = this.session) === null || _g === void 0 ? void 0 : _g.sessionID}"`);
          yield this.rpc.connect(sessionURL);
        } catch (err) {
          (_j = (_h = this.logger).debug) === null || _j === void 0 ? void 0 : _j.call(_h, `Error connecting to session "${(_k = this.session) === null || _k === void 0 ? void 0 : _k.sessionID}": ${(_m = (_l = err.message) !== null && _l !== void 0 ? _l : err.code) !== null && _m !== void 0 ? _m : err.toString()}`);
        }
        yield openingPromise;
        return this;
      });
      return yield withTimeout(open, opts === null || opts === void 0 ? void 0 : opts.timeout)();
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call(service, method, params, opts) {
    var _a2, _b;
    return __awaiter2(this, void 0, void 0, function* () {
      (_b = (_a2 = this.logger).debug) === null || _b === void 0 ? void 0 : _b.call(_a2, `Calling "${service}_${method}" with params:`, params);
      const call = (method2, params2) => __awaiter2(this, void 0, void 0, function* () {
        return yield this.rpc.call(method2, params2);
      });
      return yield withTimeout(call, opts === null || opts === void 0 ? void 0 : opts.timeout)(`${service}_${method}`, params);
    });
  }
  handleSubscriptions(...subs) {
    return __awaiter2(this, void 0, void 0, function* () {
      const results = yield Promise.allSettled(subs);
      if (results.every((r) => r.status === "fulfilled")) {
        return results.map((r) => r.status === "fulfilled" ? r.value : void 0);
      }
      yield Promise.all(results.filter(assertFulfilled).map((r) => r.value ? this.unsubscribe(r.value) : void 0));
      throw new Error(formatSettledErrors(results));
    });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  unsubscribe(subID) {
    var _a2, _b;
    return __awaiter2(this, void 0, void 0, function* () {
      const subscription = this.subscribers.find((s) => s.subID === subID);
      if (!subscription)
        return;
      yield this.call(subscription.service, "unsubscribe", [subscription.subID]);
      this.subscribers = this.subscribers.filter((s) => s !== subscription);
      (_b = (_a2 = this.logger).debug) === null || _b === void 0 ? void 0 : _b.call(_a2, `Unsubscribed '${subID}' from '${subscription.service}'`);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/member-ordering
  subscribe(service, handler, method, ...params) {
    var _a2, _b;
    return __awaiter2(this, void 0, void 0, function* () {
      const subID = yield this.call(service, "subscribe", [method, ...params]);
      if (typeof subID !== "string") {
        throw new Error(
          // eslint-disable-next-line prettier/prettier
          `Cannot subscribe to ${service}_${method}${params.length > 0 ? " with params [" + params.join(", ") + "]" : ""}. Expected response should have been a subscription ID, instead we got ${JSON.stringify(subID)}`
        );
      }
      this.subscribers.push({
        handler,
        service,
        subID
      });
      (_b = (_a2 = this.logger).debug) === null || _b === void 0 ? void 0 : _b.call(
        _a2,
        // eslint-disable-next-line prettier/prettier
        `Subscribed to "${service}_${method}"${params.length > 0 ? " with params [" + params.join(", ") + "] and" : ""} with id "${subID}"`
      );
      return subID;
    });
  }
  handleNotification(data) {
    var _a2, _b;
    (_b = (_a2 = this.logger).debug) === null || _b === void 0 ? void 0 : _b.call(_a2, "Handling notification:", data);
    this.subscribers.filter((s) => {
      var _a3;
      return s.subID === ((_a3 = data.params) === null || _a3 === void 0 ? void 0 : _a3.subscription);
    }).forEach((s) => {
      var _a3;
      return s.handler((_a3 = data.params) === null || _a3 === void 0 ? void 0 : _a3.result);
    });
  }
  refresh(sessionID) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return __awaiter2(this, void 0, void 0, function* () {
      (_b = (_a2 = this.logger).debug) === null || _b === void 0 ? void 0 : _b.call(_a2, `Started refreshing session "${sessionID}"`);
      try {
        while (true) {
          if (!this.isOpen) {
            (_d = (_c = this.logger).debug) === null || _d === void 0 ? void 0 : _d.call(_c, `Cannot refresh session ${(_e = this.session) === null || _e === void 0 ? void 0 : _e.sessionID} - it was closed`);
            return;
          }
          yield wait(SESSION_REFRESH_PERIOD);
          try {
            (_g = (_f = this.logger).debug) === null || _g === void 0 ? void 0 : _g.call(_f, `Refreshed session "${sessionID}"`);
            yield refreshSession({
              api_key: this.apiKey,
              sessionID
            });
          } catch (e) {
            if (e instanceof refreshSession.Error) {
              const error = e.getActualType();
              if (error.status === 404) {
                (_j = (_h = this.logger).warn) === null || _j === void 0 ? void 0 : _j.call(_h, `Error refreshing session - (${error.status}): ${error.data.message}`);
                return;
              }
              (_l = (_k = this.logger).warn) === null || _l === void 0 ? void 0 : _l.call(_k, `Refreshing session "${sessionID}" failed - (${error.status})`);
            }
          }
        }
      } finally {
        (_o = (_m = this.logger).debug) === null || _o === void 0 ? void 0 : _o.call(_m, `Stopped refreshing session "${sessionID}"`);
        yield this.close();
      }
    });
  }
};
var terminalService = "terminal";
var TerminalOutput = class {
  constructor() {
    this._data = "";
  }
  get data() {
    return this._data;
  }
  addData(data) {
    this._data += data;
  }
};
var Terminal = class {
  constructor(terminalID, session, triggerExit, finished, output) {
    this.terminalID = terminalID;
    this.session = session;
    this.triggerExit = triggerExit;
    this.finished = finished;
    this.output = output;
  }
  get data() {
    return this.output.data;
  }
  /**
   * Kills the terminal session.
   */
  kill() {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        yield this.session.call(terminalService, "destroy", [this.terminalID]);
      } finally {
        this.triggerExit();
        yield this.finished;
      }
    });
  }
  /**
   * Sends data to the terminal standard input.
   *
   * @param data Data to send
   */
  sendData(data) {
    return __awaiter2(this, void 0, void 0, function* () {
      yield this.session.call(terminalService, "data", [this.terminalID, data]);
    });
  }
  /**
   * Resizes the terminal tty.
   *
   * @param cols Number of columns
   * @param rows Number of rows
   */
  resize({ cols, rows }) {
    return __awaiter2(this, void 0, void 0, function* () {
      yield this.session.call(terminalService, "resize", [this.terminalID, cols, rows]);
    });
  }
};
function normalizeArray(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === ".") {
      parts.splice(i, 1);
    } else if (last === "..") {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift("..");
    }
  }
  return parts;
}
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};
function resolve() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path2 = i >= 0 ? arguments[i] : "/";
    if (typeof path2 !== "string") {
      throw new TypeError("Arguments to path.resolve must be strings");
    } else if (!path2) {
      continue;
    }
    resolvedPath = path2 + "/" + resolvedPath;
    resolvedAbsolute = path2.charAt(0) === "/";
  }
  resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
    return !!p;
  }), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
}
function normalize(path2) {
  var isPathAbsolute = isAbsolute(path2), trailingSlash = substr(path2, -1) === "/";
  path2 = normalizeArray(filter(path2.split("/"), function(p) {
    return !!p;
  }), !isPathAbsolute).join("/");
  if (!path2 && !isPathAbsolute) {
    path2 = ".";
  }
  if (path2 && trailingSlash) {
    path2 += "/";
  }
  return (isPathAbsolute ? "/" : "") + path2;
}
function isAbsolute(path2) {
  return path2.charAt(0) === "/";
}
function join() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return normalize(filter(paths, function(p, index) {
    if (typeof p !== "string") {
      throw new TypeError("Arguments to path.join must be strings");
    }
    return p;
  }).join("/"));
}
function relative(from, to) {
  from = resolve(from).substr(1);
  to = resolve(to).substr(1);
  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== "")
        break;
    }
    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== "")
        break;
    }
    if (start > end)
      return [];
    return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
}
var sep = "/";
var delimiter = ":";
function dirname(path2) {
  var result = splitPath(path2), root = result[0], dir = result[1];
  if (!root && !dir) {
    return ".";
  }
  if (dir) {
    dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
}
function basename(path2, ext) {
  var f = splitPath(path2)[2];
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}
function extname(path2) {
  return splitPath(path2)[3];
}
var path = {
  extname,
  basename,
  dirname,
  sep,
  delimiter,
  relative,
  join,
  isAbsolute,
  normalize,
  resolve
};
function filter(xs, f) {
  if (xs.filter)
    return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs))
      res.push(xs[i]);
  }
  return res;
}
var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
  return str.substr(start, len);
} : function(str, start, len) {
  if (start < 0)
    start = str.length + start;
  return str.substr(start, len);
};
var resolvePath = (inputPath, cwd, logger) => {
  var _a2, _b, _c;
  let result;
  if (inputPath.startsWith("./")) {
    result = path.posix.join(cwd || "/home/user", inputPath);
    if (!cwd) {
      (_a2 = logger.warn) === null || _a2 === void 0 ? void 0 : _a2.call(logger, `Path starts with './' and cwd isn't set. The path '${inputPath}' will evaluate to '${result}', which may not be what you want.`);
    }
    return result;
  }
  if (inputPath.startsWith("../")) {
    result = path.posix.join(cwd || "/home/user", inputPath);
    if (!cwd) {
      (_b = logger.warn) === null || _b === void 0 ? void 0 : _b.call(logger, `Path starts with '../' and cwd isn't set. The path '${inputPath}' will evaluate to '${result}', which may not be what you want.`);
    }
    return result;
  }
  if (inputPath.startsWith("~/")) {
    result = path.posix.join(cwd || "/home/user", inputPath.substring(2));
    if (!cwd) {
      (_c = logger.warn) === null || _c === void 0 ? void 0 : _c.call(logger, `Path starts with '~/' and cwd isn't set. The path '${inputPath}' will evaluate to '${result}', which may not be what you want.`);
    }
    return result;
  }
  if (!inputPath.startsWith("/") && cwd) {
    return path.posix.join(cwd, inputPath);
  }
  return inputPath;
};
var Session = class _Session extends SessionConnection {
  constructor(opts) {
    super(opts);
    this.onScanPorts = opts.onScanPorts;
    this.filesystem = {
      /**
       * List files in a directory.
       * @param path Path to a directory
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout in milliseconds (default is 60 seconds)
       * @returns Array of files in a directory
       */
      list: (path2, opts2) => __awaiter2(this, void 0, void 0, function* () {
        return yield this.call(filesystemService, "list", [_resolvePath(path2)], opts2);
      }),
      /**
       * Reads the whole content of a file.
       * @param path Path to a file
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout in milliseconds (default is 60 seconds)
       * @returns Content of a file
       */
      read: (path2, opts2) => __awaiter2(this, void 0, void 0, function* () {
        return yield this.call(filesystemService, "read", [_resolvePath(path2)], opts2);
      }),
      /**
       * Removes a file or a directory.
       * @param path Path to a file or a directory
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout in milliseconds (default is 60 seconds)
       */
      remove: (path2, opts2) => __awaiter2(this, void 0, void 0, function* () {
        yield this.call(filesystemService, "remove", [_resolvePath(path2)], opts2);
      }),
      /**
       * Writes content to a new file on path.
       * @param path Path to a new file. For example '/dirA/dirB/newFile.txt' when creating 'newFile.txt'
       * @param content Content to write to a new file
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout in milliseconds (default is 60 seconds)
       */
      write: (path2, content, opts2) => __awaiter2(this, void 0, void 0, function* () {
        yield this.call(filesystemService, "write", [_resolvePath(path2), content], opts2);
      }),
      /**
       * Write array of bytes to a file.
       * This can be used when you cannot represent the data as an UTF-8 string.
       *
       * @param path path to a file
       * @param content byte array representing the content to write
       */
      writeBytes: (path2, content) => __awaiter2(this, void 0, void 0, function* () {
        const base64Content = Buffer.from(content).toString("base64");
        yield this.call(filesystemService, "writeBase64", [
          _resolvePath(path2),
          base64Content
        ]);
      }),
      /**
       * Reads the whole content of a file as an array of bytes.
       * @param path path to a file
       * @returns byte array representing the content of a file
       */
      readBytes: (path2) => __awaiter2(this, void 0, void 0, function* () {
        const base64Content = yield this.call(filesystemService, "readBase64", [
          _resolvePath(path2)
        ]);
        return Buffer.from(base64Content, "base64");
      }),
      /**
       * Creates a new directory and all directories along the way if needed on the specified pth.
       * @param path Path to a new directory. For example '/dirA/dirB' when creating 'dirB'.
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout in milliseconds (default is 60 seconds)
       */
      makeDir: (path2, opts2) => __awaiter2(this, void 0, void 0, function* () {
        yield this.call(filesystemService, "makeDir", [_resolvePath(path2)], opts2);
      }),
      /**
       * Watches directory for filesystem events.
       * @param path Path to a directory that will be watched
       * @returns New watcher
       */
      watchDir: (path2) => {
        var _a2, _b;
        (_b = (_a2 = this.logger).debug) === null || _b === void 0 ? void 0 : _b.call(_a2, `Watching directory "${path2}"`);
        const npath = (0, import_normalize_path.default)(_resolvePath(path2));
        return new FilesystemWatcher(this, npath);
      }
    };
    this.terminal = {
      start: ({ onData, size, onExit, envVars, cmd, cwd = "", terminalID = id(12), timeout = void 0 }) => __awaiter2(this, void 0, void 0, function* () {
        const start = ({ onData: onData2, size: size2, onExit: onExit2, envVars: envVars2, cmd: cmd2, cwd: cwd2 = "", rootDir, terminalID: terminalID2 = id(12) }) => __awaiter2(this, void 0, void 0, function* () {
          var _a2, _b, _c, _d;
          (_b = (_a2 = this.logger).debug) === null || _b === void 0 ? void 0 : _b.call(_a2, `Starting terminal "${terminalID2}"`);
          if (!cwd2 && rootDir) {
            (_d = (_c = this.logger).warn) === null || _d === void 0 ? void 0 : _d.call(_c, "The rootDir parameter is deprecated, use cwd instead.");
            cwd2 = rootDir;
          }
          if (!cwd2 && this.cwd) {
            cwd2 = this.cwd;
          }
          envVars2 = envVars2 || {};
          envVars2 = Object.assign(Object.assign({}, this.envVars), envVars2);
          const { promise: terminalExited, resolve: triggerExit } = createDeferredPromise();
          const output = new TerminalOutput();
          function handleData(data) {
            output.addData(data);
            onData2 === null || onData2 === void 0 ? void 0 : onData2(data);
          }
          const [onDataSubID, onExitSubID] = yield this.handleSubscriptions(this.subscribe(terminalService, handleData, "onData", terminalID2), this.subscribe(terminalService, triggerExit, "onExit", terminalID2));
          const { promise: unsubscribing, resolve: handleFinishUnsubscribing } = createDeferredPromise();
          terminalExited.then(() => __awaiter2(this, void 0, void 0, function* () {
            var _e, _f, _g, _h;
            const results = yield Promise.allSettled([
              this.unsubscribe(onExitSubID),
              this.unsubscribe(onDataSubID)
            ]);
            (_f = (_e = this.logger).debug) === null || _f === void 0 ? void 0 : _f.call(_e, `Terminal "${terminalID2}" exited`);
            const errMsg = formatSettledErrors(results);
            if (errMsg) {
              (_h = (_g = this.logger).error) === null || _h === void 0 ? void 0 : _h.call(_g, errMsg);
            }
            onExit2 === null || onExit2 === void 0 ? void 0 : onExit2();
            handleFinishUnsubscribing(output);
          }));
          try {
            yield this.call(terminalService, "start", [
              terminalID2,
              size2.cols,
              size2.rows,
              // Handle optional args for old devbookd compatibility
              ...cmd2 !== void 0 ? [envVars2, cmd2, cwd2] : []
            ]);
          } catch (err) {
            triggerExit();
            yield unsubscribing;
            throw err;
          }
          return new Terminal(terminalID2, this, triggerExit, unsubscribing, output);
        });
        return yield withTimeout(start, timeout)({
          onData,
          size,
          onExit,
          envVars,
          cmd,
          cwd,
          terminalID
        });
      })
    };
    this.process = {
      start: (opts2) => __awaiter2(this, void 0, void 0, function* () {
        const start = ({ cmd, onStdout, onStderr, onExit, envVars = {}, cwd = "", rootDir, processID = id(12) }) => __awaiter2(this, void 0, void 0, function* () {
          var _j, _k, _l, _m;
          if (!cwd && rootDir) {
            (_k = (_j = this.logger).warn) === null || _k === void 0 ? void 0 : _k.call(_j, "The rootDir parameter is deprecated, use cwd instead.");
            cwd = rootDir;
          }
          if (!cwd && this.cwd) {
            cwd = this.cwd;
          }
          if (!cmd)
            throw new Error("cmd is required");
          envVars = envVars || {};
          envVars = Object.assign(Object.assign({}, this.envVars), envVars);
          (_m = (_l = this.logger).debug) === null || _m === void 0 ? void 0 : _m.call(_l, `Starting process "${processID}", cmd: "${cmd}"`);
          const { promise: processExited, resolve: triggerExit } = createDeferredPromise();
          const output = new ProcessOutput();
          const handleStdout = (data) => {
            const message = new ProcessMessage(data.line, data.timestamp, false);
            output.addStdout(message);
            if (onStdout) {
              onStdout(message);
            } else if (this.opts.onStdout) {
              this.opts.onStdout(message);
            }
          };
          const handleStderr = (data) => {
            const message = new ProcessMessage(data.line, data.timestamp, true);
            output.addStderr(message);
            if (onStderr) {
              onStderr(message);
            } else if (this.opts.onStderr) {
              this.opts.onStderr(message);
            }
          };
          const [onExitSubID, onStdoutSubID, onStderrSubID] = yield this.handleSubscriptions(this.subscribe(processService, triggerExit, "onExit", processID), this.subscribe(processService, handleStdout, "onStdout", processID), this.subscribe(processService, handleStderr, "onStderr", processID));
          const { promise: unsubscribing, resolve: handleFinishUnsubscribing } = createDeferredPromise();
          processExited.then(() => __awaiter2(this, void 0, void 0, function* () {
            var _o, _p, _q, _r;
            const results = yield Promise.allSettled([
              this.unsubscribe(onExitSubID),
              onStdoutSubID ? this.unsubscribe(onStdoutSubID) : void 0,
              onStderrSubID ? this.unsubscribe(onStderrSubID) : void 0
            ]);
            (_p = (_o = this.logger).debug) === null || _p === void 0 ? void 0 : _p.call(_o, `Process "${processID}" exited`);
            const errMsg = formatSettledErrors(results);
            if (errMsg) {
              (_r = (_q = this.logger).error) === null || _r === void 0 ? void 0 : _r.call(_q, errMsg);
            }
            if (onExit) {
              onExit();
            } else if (this.opts.onExit) {
              this.opts.onExit();
            }
            handleFinishUnsubscribing(output);
          }));
          try {
            yield this.call(processService, "start", [processID, cmd, envVars, cwd]);
          } catch (err) {
            triggerExit();
            yield unsubscribing;
            throw err;
          }
          return new Process(processID, this, triggerExit, unsubscribing, output);
        });
        const timeout = opts2.timeout;
        return yield withTimeout(start, timeout)(opts2);
      })
    };
    const _resolvePath = (path2) => resolvePath(path2, this.cwd, this.logger);
  }
  static create(opts) {
    return __awaiter2(this, void 0, void 0, function* () {
      return new _Session(opts).open({ timeout: opts === null || opts === void 0 ? void 0 : opts.timeout }).then((session) => __awaiter2(this, void 0, void 0, function* () {
        if (opts.cwd) {
          console.log(`Custom cwd for Session set: "${opts.cwd}"`);
          yield session.filesystem.makeDir(opts.cwd);
        }
        return session;
      }));
    });
  }
  open(opts) {
    const _super = Object.create(null, {
      open: { get: () => super.open }
    });
    return __awaiter2(this, void 0, void 0, function* () {
      yield _super.open.call(this, opts);
      const portsHandler = this.onScanPorts ? (ports) => {
        var _a2;
        return (_a2 = this.onScanPorts) === null || _a2 === void 0 ? void 0 : _a2.call(this, ports.map((p) => ({ ip: p.Ip, port: p.Port, state: p.State })));
      } : void 0;
      yield this.handleSubscriptions(portsHandler ? this.subscribe(codeSnippetService, portsHandler, "scanOpenedPorts") : void 0);
      return this;
    });
  }
};
var CodeRuntime;
(function(CodeRuntime3) {
  CodeRuntime3["Node16"] = "Node16";
  CodeRuntime3["Python3"] = "Python3";
})(CodeRuntime || (CodeRuntime = {}));
function runCode(runtime, code, opts) {
  return __awaiter2(this, void 0, void 0, function* () {
    let binary = "";
    let filepath = "";
    let envID = "";
    switch (runtime) {
      case CodeRuntime.Node16:
        envID = "Nodejs";
        binary = "node";
        filepath = "/index.js";
        break;
      case CodeRuntime.Python3:
        envID = "Python3";
        binary = "python3";
        filepath = "/main.py";
        break;
      default:
        throw new Error(`The "${runtime}" runtime isn't supported. Please contact us (hello@e2b.dev) if you need support for this runtime`);
    }
    const session = yield Session.create({
      id: envID,
      apiKey: (opts === null || opts === void 0 ? void 0 : opts.apiKey) || process.env.E2B_API_KEY || ""
      // Session.create will throw an error if the API key is not provided so no need to check here
    });
    yield session.filesystem.write(filepath, code);
    const codeProc = yield session.process.start({
      cmd: `${binary} ${filepath}`
    });
    const out = yield codeProc.finished;
    yield session.close();
    return {
      stdout: out.stdout,
      stderr: out.stderr
    };
  });
}

// src/nodes/RunSandboxedPythonScriptNode.ts
function RunSandboxedPythonScriptNode_default(rivet) {
  const nodeImpl = {
    create() {
      return {
        id: rivet.newId(),
        data: {},
        title: "Run Sandboxed Python Script",
        type: "runSandboxedPythonScript",
        // must match the type of your node
        visualData: {
          x: 0,
          y: 0,
          width: 200
        }
      };
    },
    getInputDefinitions(data, _connections, _nodes, _project) {
      return [
        {
          id: "scriptText",
          dataType: "string",
          required: true,
          title: "Script"
        }
      ];
    },
    getOutputDefinitions(_data, _connections, _nodes, _project) {
      return [
        {
          id: "stdout",
          dataType: "string",
          title: "stdout"
        },
        {
          id: "stderr",
          dataType: "string",
          title: "stderr"
        }
      ];
    },
    getUIData() {
      return {
        group: "E2B",
        contextMenuTitle: "Run Sandboxed Python Script",
        infoBoxTitle: "Run Sandboxed Python Script",
        infoBoxBody: "Run a python script in a sandboxed environment."
      };
    },
    getEditors(_data) {
      return [];
    },
    getBody(data) {
      return ``;
    },
    async process(data, inputData, context) {
      let scriptText = rivet.coerceType(
        inputData["scriptText"],
        "string"
      );
      const { stdout, stderr } = await runCode(
        // @ts-ignore
        "Python3",
        scriptText
      );
      return {
        ["stdout"]: {
          type: "string",
          value: stdout
        },
        ["stderr"]: {
          type: "string",
          value: stderr
        }
      };
    }
  };
  return rivet.pluginNodeDefinition(
    nodeImpl,
    "Run Python Script in E2B sandboxed environment"
  );
}

// src/index.ts
var initializer = (rivet) => {
  const plugin = {
    id: "rivet-plugin-e2b",
    name: "E2B Rivet Plugin",
    configSpec: {
      e2bApiKey: {
        type: "secret",
        label: "E2B API Key",
        description: "The API key required to use the E2B. Get your at https://e2b.dev/docs",
        pullEnvironmentVariable: "E2B_API_KEY",
        helperText: "You may also set the E2B_API_KEY environment variable."
      }
    },
    contextMenuGroups: [
      {
        id: "e2b",
        label: "E2B"
      }
    ],
    register: (register) => {
      register(RunSandboxedPythonScriptNode_default(rivet));
    }
  };
  return plugin;
};
var src_default = initializer;
export {
  src_default as default
};
/*! Bundled license information:

platform/platform.js:
  (*!
   * Platform.js v1.3.6
   * Copyright 2014-2020 Benjamin Tan
   * Copyright 2011-2013 John-David Dalton
   * Available under MIT license
   *)

normalize-path/index.js:
  (*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
