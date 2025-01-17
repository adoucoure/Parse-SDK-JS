var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _ParseQuery = _interopRequireDefault(require("./ParseQuery"));

var _LocalDatastoreUtils = require("./LocalDatastoreUtils");

function _regeneratorRuntime() {
  "use strict";

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var LocalDatastore = {
  isEnabled: false,
  isSyncing: false,
  fromPinWithName: function (name) {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.fromPinWithName(name);
  },
  pinWithName: function (name, value) {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.pinWithName(name, value);
  },
  unPinWithName: function (name) {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.unPinWithName(name);
  },
  _getAllContents: function () {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.getAllContents();
  },
  _getRawStorage: function () {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.getRawStorage();
  },
  _clear: function () {
    var controller = _CoreManager.default.getLocalDatastoreController();

    return controller.clear();
  },
  _handlePinAllWithName: function (name, objects) {
    var pinName, toPinPromises, objectKeys, _iterator, _step, parent, children, parentKey, json, objectKey, fromPinPromise, _await$Promise$all, _await$Promise$all2, pinned, toPin;

    return _regeneratorRuntime().async(function (_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pinName = this.getPinName(name);
            toPinPromises = [];
            objectKeys = [];

            for (_iterator = _createForOfIteratorHelperLoose(objects); !(_step = _iterator()).done;) {
              parent = _step.value;
              children = this._getChildren(parent);
              parentKey = this.getKeyForObject(parent);
              json = parent._toFullJSON(undefined, true);

              if (parent._localId) {
                json._localId = parent._localId;
              }

              children[parentKey] = json;

              for (objectKey in children) {
                objectKeys.push(objectKey);
                toPinPromises.push(this.pinWithName(objectKey, [children[objectKey]]));
              }
            }

            fromPinPromise = this.fromPinWithName(pinName);
            _context.next = 7;
            return _regeneratorRuntime().awrap(Promise.all([fromPinPromise, toPinPromises]));

          case 7:
            _await$Promise$all = _context.sent;
            _await$Promise$all2 = (0, _slicedToArray2.default)(_await$Promise$all, 1);
            pinned = _await$Promise$all2[0];
            toPin = (0, _toConsumableArray2.default)(new Set([].concat((0, _toConsumableArray2.default)(pinned || []), objectKeys)));
            return _context.abrupt("return", this.pinWithName(pinName, toPin));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, this, null, Promise);
  },
  _handleUnPinAllWithName: function (name, objects) {
    var localDatastore, pinName, promises, objectKeys, _iterator2, _step2, _objectKeys, parent, children, parentKey, pinned, _iterator3, _step3, objectKey, hasReference, key, pinnedObjects;

    return _regeneratorRuntime().async(function (_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _regeneratorRuntime().awrap(this._getAllContents());

          case 2:
            localDatastore = _context2.sent;
            pinName = this.getPinName(name);
            promises = [];
            objectKeys = [];

            for (_iterator2 = _createForOfIteratorHelperLoose(objects); !(_step2 = _iterator2()).done;) {
              parent = _step2.value;
              children = this._getChildren(parent);
              parentKey = this.getKeyForObject(parent);

              (_objectKeys = objectKeys).push.apply(_objectKeys, [parentKey].concat((0, _toConsumableArray2.default)(Object.keys(children))));
            }

            objectKeys = (0, _toConsumableArray2.default)(new Set(objectKeys));
            pinned = localDatastore[pinName] || [];
            pinned = pinned.filter(function (item) {
              return !objectKeys.includes(item);
            });

            if (pinned.length == 0) {
              promises.push(this.unPinWithName(pinName));
              delete localDatastore[pinName];
            } else {
              promises.push(this.pinWithName(pinName, pinned));
              localDatastore[pinName] = pinned;
            }

            _iterator3 = _createForOfIteratorHelperLoose(objectKeys);

          case 12:
            if ((_step3 = _iterator3()).done) {
              _context2.next = 28;
              break;
            }

            objectKey = _step3.value;
            hasReference = false;
            _context2.t0 = _regeneratorRuntime().keys(localDatastore);

          case 16:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 25;
              break;
            }

            key = _context2.t1.value;

            if (!(key === _LocalDatastoreUtils.DEFAULT_PIN || key.startsWith(_LocalDatastoreUtils.PIN_PREFIX))) {
              _context2.next = 23;
              break;
            }

            pinnedObjects = localDatastore[key] || [];

            if (!pinnedObjects.includes(objectKey)) {
              _context2.next = 23;
              break;
            }

            hasReference = true;
            return _context2.abrupt("break", 25);

          case 23:
            _context2.next = 16;
            break;

          case 25:
            if (!hasReference) {
              promises.push(this.unPinWithName(objectKey));
            }

          case 26:
            _context2.next = 12;
            break;

          case 28:
            return _context2.abrupt("return", Promise.all(promises));

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this, null, Promise);
  },
  _getChildren: function (object) {
    var encountered = {};

    var json = object._toFullJSON(undefined, true);

    for (var key in json) {
      if (json[key] && json[key].__type && json[key].__type === 'Object') {
        this._traverse(json[key], encountered);
      }
    }

    return encountered;
  },
  _traverse: function (object, encountered) {
    if (!object.objectId) {
      return;
    } else {
      var objectKey = this.getKeyForObject(object);

      if (encountered[objectKey]) {
        return;
      }

      encountered[objectKey] = object;
    }

    for (var key in object) {
      var json = object[key];

      if (!object[key]) {
        json = object;
      }

      if (json.__type && json.__type === 'Object') {
        this._traverse(json, encountered);
      }
    }
  },
  _serializeObjectsFromPinName: function (name) {
    var _this = this,
        _ref;

    var localDatastore, allObjects, key, pinName, pinned, promises, objects;
    return _regeneratorRuntime().async(function (_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _regeneratorRuntime().awrap(this._getAllContents());

          case 2:
            localDatastore = _context3.sent;
            allObjects = [];

            for (key in localDatastore) {
              if (key.startsWith(_LocalDatastoreUtils.OBJECT_PREFIX)) {
                allObjects.push(localDatastore[key][0]);
              }
            }

            if (name) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", allObjects);

          case 7:
            pinName = this.getPinName(name);
            pinned = localDatastore[pinName];

            if (Array.isArray(pinned)) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", []);

          case 11:
            promises = pinned.map(function (objectKey) {
              return _this.fromPinWithName(objectKey);
            });
            _context3.next = 14;
            return _regeneratorRuntime().awrap(Promise.all(promises));

          case 14:
            objects = _context3.sent;
            objects = (_ref = []).concat.apply(_ref, (0, _toConsumableArray2.default)(objects));
            return _context3.abrupt("return", objects.filter(function (object) {
              return object != null;
            }));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this, null, Promise);
  },
  _serializeObject: function (objectKey, localDatastore) {
    var LDS, root, queue, meta, uniqueId, nodeId, subTreeRoot, field, value, key, pointer;
    return _regeneratorRuntime().async(function (_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            LDS = localDatastore;

            if (LDS) {
              _context4.next = 5;
              break;
            }

            _context4.next = 4;
            return _regeneratorRuntime().awrap(this._getAllContents());

          case 4:
            LDS = _context4.sent;

          case 5:
            if (!(!LDS[objectKey] || LDS[objectKey].length === 0)) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", null);

          case 7:
            root = LDS[objectKey][0];
            queue = [];
            meta = {};
            uniqueId = 0;
            meta[uniqueId] = root;
            queue.push(uniqueId);

            while (queue.length !== 0) {
              nodeId = queue.shift();
              subTreeRoot = meta[nodeId];

              for (field in subTreeRoot) {
                value = subTreeRoot[field];

                if (value.__type && value.__type === 'Object') {
                  key = this.getKeyForObject(value);

                  if (LDS[key] && LDS[key].length > 0) {
                    pointer = LDS[key][0];
                    uniqueId++;
                    meta[uniqueId] = pointer;
                    subTreeRoot[field] = pointer;
                    queue.push(uniqueId);
                  }
                }
              }
            }

            return _context4.abrupt("return", root);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this, null, Promise);
  },
  _updateObjectIfPinned: function (object) {
    var objectKey, pinned;
    return _regeneratorRuntime().async(function (_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (this.isEnabled) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return");

          case 2:
            objectKey = this.getKeyForObject(object);
            _context5.next = 5;
            return _regeneratorRuntime().awrap(this.fromPinWithName(objectKey));

          case 5:
            pinned = _context5.sent;

            if (!(!pinned || pinned.length === 0)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return");

          case 8:
            return _context5.abrupt("return", this.pinWithName(objectKey, [object._toFullJSON()]));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this, null, Promise);
  },
  _destroyObjectIfPinned: function (object) {
    var localDatastore, objectKey, pin, promises, key, pinned;
    return _regeneratorRuntime().async(function (_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (this.isEnabled) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt("return");

          case 2:
            _context6.next = 4;
            return _regeneratorRuntime().awrap(this._getAllContents());

          case 4:
            localDatastore = _context6.sent;
            objectKey = this.getKeyForObject(object);
            pin = localDatastore[objectKey];

            if (pin) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return");

          case 9:
            promises = [this.unPinWithName(objectKey)];
            delete localDatastore[objectKey];

            for (key in localDatastore) {
              if (key === _LocalDatastoreUtils.DEFAULT_PIN || key.startsWith(_LocalDatastoreUtils.PIN_PREFIX)) {
                pinned = localDatastore[key] || [];

                if (pinned.includes(objectKey)) {
                  pinned = pinned.filter(function (item) {
                    return item !== objectKey;
                  });

                  if (pinned.length == 0) {
                    promises.push(this.unPinWithName(key));
                    delete localDatastore[key];
                  } else {
                    promises.push(this.pinWithName(key, pinned));
                    localDatastore[key] = pinned;
                  }
                }
              }
            }

            return _context6.abrupt("return", Promise.all(promises));

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, null, this, null, Promise);
  },
  _updateLocalIdForObject: function (localId, object) {
    var localKey, objectKey, unsaved, promises, localDatastore, key, pinned;
    return _regeneratorRuntime().async(function (_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (this.isEnabled) {
              _context7.next = 2;
              break;
            }

            return _context7.abrupt("return");

          case 2:
            localKey = "" + _LocalDatastoreUtils.OBJECT_PREFIX + object.className + "_" + localId;
            objectKey = this.getKeyForObject(object);
            _context7.next = 6;
            return _regeneratorRuntime().awrap(this.fromPinWithName(localKey));

          case 6:
            unsaved = _context7.sent;

            if (!(!unsaved || unsaved.length === 0)) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return");

          case 9:
            promises = [this.unPinWithName(localKey), this.pinWithName(objectKey, unsaved)];
            _context7.next = 12;
            return _regeneratorRuntime().awrap(this._getAllContents());

          case 12:
            localDatastore = _context7.sent;

            for (key in localDatastore) {
              if (key === _LocalDatastoreUtils.DEFAULT_PIN || key.startsWith(_LocalDatastoreUtils.PIN_PREFIX)) {
                pinned = localDatastore[key] || [];

                if (pinned.includes(localKey)) {
                  pinned = pinned.filter(function (item) {
                    return item !== localKey;
                  });
                  pinned.push(objectKey);
                  promises.push(this.pinWithName(key, pinned));
                  localDatastore[key] = pinned;
                }
              }
            }

            return _context7.abrupt("return", Promise.all(promises));

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, null, this, null, Promise);
  },
  updateFromServer: function () {
    var _this2 = this;

    var localDatastore, keys, key, pointersHash, _i, _keys, _key, _key$split, _key$split2, className, objectId, queryPromises, responses, objects, pinPromises;

    return _regeneratorRuntime().async(function (_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!(!this.checkIfEnabled() || this.isSyncing)) {
              _context8.next = 2;
              break;
            }

            return _context8.abrupt("return");

          case 2:
            _context8.next = 4;
            return _regeneratorRuntime().awrap(this._getAllContents());

          case 4:
            localDatastore = _context8.sent;
            keys = [];

            for (key in localDatastore) {
              if (key.startsWith(_LocalDatastoreUtils.OBJECT_PREFIX)) {
                keys.push(key);
              }
            }

            if (!(keys.length === 0)) {
              _context8.next = 9;
              break;
            }

            return _context8.abrupt("return");

          case 9:
            this.isSyncing = true;
            pointersHash = {};
            _i = 0, _keys = keys;

          case 12:
            if (!(_i < _keys.length)) {
              _context8.next = 23;
              break;
            }

            _key = _keys[_i];
            _key$split = _key.split('_'), _key$split2 = (0, _slicedToArray2.default)(_key$split, 4), className = _key$split2[2], objectId = _key$split2[3];

            if (_key.split('_').length === 5 && _key.split('_')[3] === 'User') {
              className = '_User';
              objectId = _key.split('_')[4];
            }

            if (!objectId.startsWith('local')) {
              _context8.next = 18;
              break;
            }

            return _context8.abrupt("continue", 20);

          case 18:
            if (!(className in pointersHash)) {
              pointersHash[className] = new Set();
            }

            pointersHash[className].add(objectId);

          case 20:
            _i++;
            _context8.next = 12;
            break;

          case 23:
            queryPromises = Object.keys(pointersHash).map(function (className) {
              var objectIds = Array.from(pointersHash[className]);
              var query = new _ParseQuery.default(className);
              query.limit(objectIds.length);

              if (objectIds.length === 1) {
                query.equalTo('objectId', objectIds[0]);
              } else {
                query.containedIn('objectId', objectIds);
              }

              return query.find();
            });
            _context8.prev = 24;
            _context8.next = 27;
            return _regeneratorRuntime().awrap(Promise.all(queryPromises));

          case 27:
            responses = _context8.sent;
            objects = [].concat.apply([], responses);
            pinPromises = objects.map(function (object) {
              var objectKey = _this2.getKeyForObject(object);

              return _this2.pinWithName(objectKey, object._toFullJSON());
            });
            _context8.next = 32;
            return _regeneratorRuntime().awrap(Promise.all(pinPromises));

          case 32:
            this.isSyncing = false;
            _context8.next = 39;
            break;

          case 35:
            _context8.prev = 35;
            _context8.t0 = _context8["catch"](24);
            console.error('Error syncing LocalDatastore: ', _context8.t0);
            this.isSyncing = false;

          case 39:
          case "end":
            return _context8.stop();
        }
      }
    }, null, this, [[24, 35]], Promise);
  },
  getKeyForObject: function (object) {
    var objectId = object.objectId || object._getId();

    return "" + _LocalDatastoreUtils.OBJECT_PREFIX + object.className + "_" + objectId;
  },
  getPinName: function (pinName) {
    if (!pinName || pinName === _LocalDatastoreUtils.DEFAULT_PIN) {
      return _LocalDatastoreUtils.DEFAULT_PIN;
    }

    return _LocalDatastoreUtils.PIN_PREFIX + pinName;
  },
  checkIfEnabled: function () {
    if (!this.isEnabled) {
      console.error('Parse.enableLocalDatastore() must be called first');
    }

    return this.isEnabled;
  }
};
module.exports = LocalDatastore;

_CoreManager.default.setLocalDatastoreController(require('./LocalDatastoreController.react-native'));

_CoreManager.default.setLocalDatastore(LocalDatastore);