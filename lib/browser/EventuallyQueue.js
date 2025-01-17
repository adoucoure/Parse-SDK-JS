"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _sliceInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/slice");

var _reverseInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/reverse");

var _Promise = require("@babel/runtime-corejs3/core-js-stable/promise");

var _Object$setPrototypeOf = require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of");

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getPrototypeOf = require("@babel/runtime-corejs3/core-js-stable/object/get-prototype-of");

var _Object$create = require("@babel/runtime-corejs3/core-js-stable/object/create");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Symbol = require("@babel/runtime-corejs3/core-js-stable/symbol");

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _setInterval2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-interval"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _ParseObject = _interopRequireDefault(require("./ParseObject"));

var _ParseQuery = _interopRequireDefault(require("./ParseQuery"));

var _Storage = _interopRequireDefault(require("./Storage"));

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof _Symbol ? _Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return _Object$defineProperty(obj, key, {
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
        generator = _Object$create(protoGenerator.prototype),
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
  var getProto = _Object$getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    var _context9;

    _forEachInstanceProperty(_context9 = ["next", "throw", "return"]).call(_context9, function (method) {
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
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
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
    }], _forEachInstanceProperty(tryLocsList).call(tryLocsList, pushTryEntry, this), this.reset(!0);
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
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = _Object$create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = _Promise);
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

    return _reverseInstanceProperty(keys).call(keys), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      var _context10;

      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, _forEachInstanceProperty(_context10 = this.tryEntries).call(_context10, resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+_sliceInstanceProperty(name).call(name, 1)) && (this[name] = undefined);
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

var QUEUE_KEY = 'Parse/Eventually/Queue';
var queueCache = [];
var dirtyCache = true;
var polling = undefined;
/**
 * Provides utility functions to queue objects that will be
 * saved to the server at a later date.
 *
 * @class Parse.EventuallyQueue
 * @static
 */

var EventuallyQueue = {
  /**
   * Add object to queue with save operation.
   *
   * @function save
   * @name Parse.EventuallyQueue.save
   * @param {ParseObject} object Parse.Object to be saved eventually
   * @param {object} [serverOptions] See {@link https://parseplatform.org/Parse-SDK-JS/api/master/Parse.Object.html#save Parse.Object.save} options.
   * @returns {Promise} A promise that is fulfilled if object is added to queue.
   * @static
   * @see Parse.Object#saveEventually
   */
  save: function (object
  /*: ParseObject*/
  )
  /*: Promise*/
  {
    var serverOptions
    /*: SaveOptions*/
    = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.enqueue('save', object, serverOptions);
  },

  /**
   * Add object to queue with save operation.
   *
   * @function destroy
   * @name Parse.EventuallyQueue.destroy
   * @param {ParseObject} object Parse.Object to be destroyed eventually
   * @param {object} [serverOptions] See {@link https://parseplatform.org/Parse-SDK-JS/api/master/Parse.Object.html#destroy Parse.Object.destroy} options
   * @returns {Promise} A promise that is fulfilled if object is added to queue.
   * @static
   * @see Parse.Object#destroyEventually
   */
  destroy: function (object
  /*: ParseObject*/
  )
  /*: Promise*/
  {
    var serverOptions
    /*: RequestOptions*/
    = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.enqueue('destroy', object, serverOptions);
  },

  /**
   * Generate unique identifier to avoid duplicates and maintain previous state.
   *
   * @param {string} action save / destroy
   * @param {object} object Parse.Object to be queued
   * @returns {string}
   * @static
   * @ignore
   */
  generateQueueId: function (action
  /*: string*/
  , object
  /*: ParseObject*/
  )
  /*: string*/
  {
    object._getId();

    var className = object.className,
        id = object.id,
        _localId = object._localId;

    var uniqueId = object.get('hash') || _localId;

    return [action, className, id, uniqueId].join('_');
  },

  /**
   * Build queue object and add to queue.
   *
   * @param {string} action save / destroy
   * @param {object} object Parse.Object to be queued
   * @param {object} [serverOptions]
   * @returns {Promise} A promise that is fulfilled if object is added to queue.
   * @static
   * @ignore
   */
  enqueue: function (action
  /*: string*/
  , object
  /*: ParseObject*/
  , serverOptions
  /*: SaveOptions | RequestOptions*/
  )
  /*: Promise*/
  {
    var _this = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var queueData, queueId, index, prop;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.getQueue();

            case 2:
              queueData = _context.sent;
              queueId = _this.generateQueueId(action, object);
              index = _this.queueItemExists(queueData, queueId);

              if (index > -1) {
                // Add cached values to new object if they don't exist
                for (prop in queueData[index].object) {
                  if (typeof object.get(prop) === 'undefined') {
                    object.set(prop, queueData[index].object[prop]);
                  }
                }
              } else {
                index = queueData.length;
              }

              queueData[index] = {
                queueId: queueId,
                action: action,
                object: object.toJSON(),
                serverOptions: serverOptions,
                id: object.id,
                className: object.className,
                hash: object.get('hash'),
                createdAt: new Date()
              };
              return _context.abrupt("return", _this.setQueue(queueData));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  store: function store(data) {
    return _Storage.default.setItemAsync(QUEUE_KEY, (0, _stringify.default)(data));
  },
  load: function load() {
    return _Storage.default.getItemAsync(QUEUE_KEY);
  },

  /**
   * Sets the in-memory queue from local storage and returns.
   *
   * @function getQueue
   * @name Parse.EventuallyQueue.getQueue
   * @returns {Promise<Array>}
   * @static
   */
  getQueue: function getQueue()
  /*: Promise<Array>*/
  {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!dirtyCache) {
                _context2.next = 10;
                break;
              }

              _context2.t0 = JSON;
              _context2.next = 4;
              return _this2.load();

            case 4:
              _context2.t1 = _context2.sent;

              if (_context2.t1) {
                _context2.next = 7;
                break;
              }

              _context2.t1 = '[]';

            case 7:
              _context2.t2 = _context2.t1;
              queueCache = _context2.t0.parse.call(_context2.t0, _context2.t2);
              dirtyCache = false;

            case 10:
              return _context2.abrupt("return", queueCache);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },

  /**
   * Saves the queue to local storage
   *
   * @param {Queue} queue Queue containing Parse.Object data.
   * @returns {Promise} A promise that is fulfilled when queue is stored.
   * @static
   * @ignore
   */
  setQueue: function setQueue(queue
  /*: Queue*/
  )
  /*: Promise<void>*/
  {
    queueCache = queue;
    return this.store(queueCache);
  },

  /**
   * Removes Parse.Object data from queue.
   *
   * @param {string} queueId Unique identifier for Parse.Object data.
   * @returns {Promise} A promise that is fulfilled when queue is stored.
   * @static
   * @ignore
   */
  remove: function remove(queueId
  /*: string*/
  )
  /*: Promise<void>*/
  {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var queueData, index;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this3.getQueue();

            case 2:
              queueData = _context3.sent;
              index = _this3.queueItemExists(queueData, queueId);

              if (!(index > -1)) {
                _context3.next = 8;
                break;
              }

              (0, _splice.default)(queueData).call(queueData, index, 1);
              _context3.next = 8;
              return _this3.setQueue(queueData);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },

  /**
   * Removes all objects from queue.
   *
   * @function clear
   * @name Parse.EventuallyQueue.clear
   * @returns {Promise} A promise that is fulfilled when queue is cleared.
   * @static
   */
  clear: function clear()
  /*: Promise*/
  {
    queueCache = [];
    return this.store([]);
  },

  /**
   * Return the index of a queueId in the queue. Returns -1 if not found.
   *
   * @param {Queue} queue Queue containing Parse.Object data.
   * @param {string} queueId Unique identifier for Parse.Object data.
   * @returns {number}
   * @static
   * @ignore
   */
  queueItemExists: function queueItemExists(queue
  /*: Queue*/
  , queueId
  /*: string*/
  )
  /*: number*/
  {
    return (0, _findIndex.default)(queue).call(queue, function (data) {
      return data.queueId === queueId;
    });
  },

  /**
   * Return the number of objects in the queue.
   *
   * @function length
   * @name Parse.EventuallyQueue.length
   * @returns {number}
   * @static
   */
  length: function length()
  /*: number*/
  {
    var _this4 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var queueData;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this4.getQueue();

            case 2:
              queueData = _context4.sent;
              return _context4.abrupt("return", queueData.length);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },

  /**
   * Sends the queue to the server.
   *
   * @function sendQueue
   * @name Parse.EventuallyQueue.sendQueue
   * @returns {Promise<boolean>} Returns true if queue was sent successfully.
   * @static
   */
  sendQueue: function sendQueue()
  /*: Promise<boolean>*/
  {
    var _this5 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var queue, queueData, i, queueObject, id, hash, className, ObjectType;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this5.getQueue();

            case 2:
              queue = _context5.sent;
              queueData = (0, _toConsumableArray2.default)(queue);

              if (!(queueData.length === 0)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", false);

            case 6:
              i = 0;

            case 7:
              if (!(i < queueData.length)) {
                _context5.next = 26;
                break;
              }

              queueObject = queueData[i];
              id = queueObject.id, hash = queueObject.hash, className = queueObject.className;
              ObjectType = _ParseObject.default.extend(className);

              if (!id) {
                _context5.next = 16;
                break;
              }

              _context5.next = 14;
              return _this5.process.byId(ObjectType, queueObject);

            case 14:
              _context5.next = 23;
              break;

            case 16:
              if (!hash) {
                _context5.next = 21;
                break;
              }

              _context5.next = 19;
              return _this5.process.byHash(ObjectType, queueObject);

            case 19:
              _context5.next = 23;
              break;

            case 21:
              _context5.next = 23;
              return _this5.process.create(ObjectType, queueObject);

            case 23:
              i += 1;
              _context5.next = 7;
              break;

            case 26:
              return _context5.abrupt("return", true);

            case 27:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },

  /**
   * Build queue object and add to queue.
   *
   * @param {ParseObject} object Parse.Object to be processed
   * @param {QueueObject} queueObject Parse.Object data from the queue
   * @returns {Promise} A promise that is fulfilled when operation is performed.
   * @static
   * @ignore
   */
  sendQueueCallback: function sendQueueCallback(object
  /*: ParseObject*/
  , queueObject
  /*: QueueObject*/
  )
  /*: Promise<void>*/
  {
    var _this6 = this;

    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (object) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", _this6.remove(queueObject.queueId));

            case 2:
              _context6.t0 = queueObject.action;
              _context6.next = _context6.t0 === 'save' ? 5 : _context6.t0 === 'destroy' ? 20 : 33;
              break;

            case 5:
              if (!(typeof object.updatedAt !== 'undefined' && object.updatedAt > new Date(queueObject.object.createdAt))) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", _this6.remove(queueObject.queueId));

            case 7:
              _context6.prev = 7;
              _context6.next = 10;
              return object.save(queueObject.object, queueObject.serverOptions);

            case 10:
              _context6.next = 12;
              return _this6.remove(queueObject.queueId);

            case 12:
              _context6.next = 19;
              break;

            case 14:
              _context6.prev = 14;
              _context6.t1 = _context6["catch"](7);

              if (!(_context6.t1.message !== 'XMLHttpRequest failed: "Unable to connect to the Parse API"')) {
                _context6.next = 19;
                break;
              }

              _context6.next = 19;
              return _this6.remove(queueObject.queueId);

            case 19:
              return _context6.abrupt("break", 33);

            case 20:
              _context6.prev = 20;
              _context6.next = 23;
              return object.destroy(queueObject.serverOptions);

            case 23:
              _context6.next = 25;
              return _this6.remove(queueObject.queueId);

            case 25:
              _context6.next = 32;
              break;

            case 27:
              _context6.prev = 27;
              _context6.t2 = _context6["catch"](20);

              if (!(_context6.t2.message !== 'XMLHttpRequest failed: "Unable to connect to the Parse API"')) {
                _context6.next = 32;
                break;
              }

              _context6.next = 32;
              return _this6.remove(queueObject.queueId);

            case 32:
              return _context6.abrupt("break", 33);

            case 33:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[7, 14], [20, 27]]);
    }))();
  },

  /**
   * Start polling server for network connection.
   * Will send queue if connection is established.
   *
   * @function poll
   * @name Parse.EventuallyQueue.poll
   * @param [ms] Milliseconds to ping the server. Default 2000ms
   * @static
   */
  poll: function poll() {
    var _this7 = this;

    var ms
    /*: number*/
    = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;

    if (polling) {
      return;
    }

    polling = (0, _setInterval2.default)(function () {
      var RESTController = _CoreManager.default.getRESTController();

      RESTController.request('GET', 'health').then(function (_ref) {
        var status = _ref.status;

        if (status === 'ok') {
          _this7.stopPoll();

          return _this7.sendQueue();
        }
      }).catch(function (e) {
        return e;
      });
    }, ms);
  },

  /**
   * Turns off polling.
   *
   * @function stopPoll
   * @name Parse.EventuallyQueue.stopPoll
   * @static
   */
  stopPoll: function stopPoll() {
    clearInterval(polling);
    polling = undefined;
  },

  /**
   * Return true if pinging the server.
   *
   * @function isPolling
   * @name Parse.EventuallyQueue.isPolling
   * @returns {boolean}
   * @static
   */
  isPolling: function isPolling()
  /*: boolean*/
  {
    return !!polling;
  },
  _setPolling: function _setPolling(flag
  /*: boolean*/
  ) {
    polling = flag;
  },
  process: {
    create: function create(ObjectType, queueObject) {
      var object = new ObjectType();
      return EventuallyQueue.sendQueueCallback(object, queueObject);
    },
    byId: function byId(ObjectType, queueObject) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var sessionToken, query, results;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                sessionToken = queueObject.serverOptions.sessionToken;
                query = new _ParseQuery.default(ObjectType);
                query.equalTo('objectId', queueObject.id);
                _context7.next = 5;
                return (0, _find.default)(query).call(query, {
                  sessionToken: sessionToken
                });

              case 5:
                results = _context7.sent;
                return _context7.abrupt("return", EventuallyQueue.sendQueueCallback(results[0], queueObject));

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    byHash: function byHash(ObjectType, queueObject) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var sessionToken, query, results;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                sessionToken = queueObject.serverOptions.sessionToken;
                query = new _ParseQuery.default(ObjectType);
                query.equalTo('hash', queueObject.hash);
                _context8.next = 5;
                return (0, _find.default)(query).call(query, {
                  sessionToken: sessionToken
                });

              case 5:
                results = _context8.sent;

                if (!(results.length > 0)) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt("return", EventuallyQueue.sendQueueCallback(results[0], queueObject));

              case 8:
                return _context8.abrupt("return", EventuallyQueue.process.create(ObjectType, queueObject));

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    }
  }
};
module.exports = EventuallyQueue;