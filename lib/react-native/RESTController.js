var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _ParseError = _interopRequireDefault(require("./ParseError"));

var _promiseUtils = require("./promiseUtils");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      (0, _defineProperty2.default)(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

var uuidv4 = require('./uuid');

var XHR = null;

if (typeof XMLHttpRequest !== 'undefined') {
  XHR = XMLHttpRequest;
}

var useXDomainRequest = false;

if (typeof XDomainRequest !== 'undefined' && !('withCredentials' in new XMLHttpRequest())) {
  useXDomainRequest = true;
}

function ajaxIE9(method, url, data, headers, options) {
  return new Promise(function (resolve, reject) {
    var xdr = new XDomainRequest();

    xdr.onload = function () {
      var response;

      try {
        response = JSON.parse(xdr.responseText);
      } catch (e) {
        reject(e);
      }

      if (response) {
        resolve({
          response: response
        });
      }
    };

    xdr.onerror = xdr.ontimeout = function () {
      var fakeResponse = {
        responseText: JSON.stringify({
          code: _ParseError.default.X_DOMAIN_REQUEST,
          error: "IE's XDomainRequest does not supply error info."
        })
      };
      reject(fakeResponse);
    };

    xdr.onprogress = function () {
      if (options && typeof options.progress === 'function') {
        options.progress(xdr.responseText);
      }
    };

    xdr.open(method, url);
    xdr.send(data);

    if (options && typeof options.requestTask === 'function') {
      options.requestTask(xdr);
    }
  });
}

var RESTController = {
  ajax: function (method, url, data, headers, options) {
    if (useXDomainRequest) {
      return ajaxIE9(method, url, data, headers, options);
    }

    var promise = (0, _promiseUtils.resolvingPromise)();
    var isIdempotent = _CoreManager.default.get('IDEMPOTENCY') && ['POST', 'PUT'].includes(method);
    var requestId = isIdempotent ? uuidv4() : '';
    var attempts = 0;

    (function dispatch() {
      if (XHR == null) {
        throw new Error('Cannot make a request: No definition of XMLHttpRequest was found.');
      }

      var handled = false;
      var xhr = new XHR();

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || handled || xhr._aborted) {
          return;
        }

        handled = true;

        if (xhr.status >= 200 && xhr.status < 300) {
          var response;

          try {
            response = JSON.parse(xhr.responseText);

            if (typeof xhr.getResponseHeader === 'function') {
              if ((xhr.getAllResponseHeaders() || '').includes('x-parse-job-status-id: ')) {
                response = xhr.getResponseHeader('x-parse-job-status-id');
              }

              if ((xhr.getAllResponseHeaders() || '').includes('x-parse-push-status-id: ')) {
                response = xhr.getResponseHeader('x-parse-push-status-id');
              }
            }
          } catch (e) {
            promise.reject(e.toString());
          }

          if (response) {
            promise.resolve({
              response: response,
              status: xhr.status,
              xhr: xhr
            });
          }
        } else if (xhr.status >= 500 || xhr.status === 0) {
          if (++attempts < _CoreManager.default.get('REQUEST_ATTEMPT_LIMIT')) {
            var delay = Math.round(Math.random() * 125 * Math.pow(2, attempts));
            setTimeout(dispatch, delay);
          } else if (xhr.status === 0) {
            promise.reject('Unable to connect to the Parse API');
          } else {
            promise.reject(xhr);
          }
        } else {
          promise.reject(xhr);
        }
      };

      headers = headers || {};

      if (typeof headers['Content-Type'] !== 'string') {
        headers['Content-Type'] = 'text/plain';
      }

      if (_CoreManager.default.get('IS_NODE')) {
        headers['User-Agent'] = 'Parse/' + _CoreManager.default.get('VERSION') + ' (NodeJS ' + process.versions.node + ')';
      }

      if (isIdempotent) {
        headers['X-Parse-Request-Id'] = requestId;
      }

      if (_CoreManager.default.get('SERVER_AUTH_TYPE') && _CoreManager.default.get('SERVER_AUTH_TOKEN')) {
        headers['Authorization'] = _CoreManager.default.get('SERVER_AUTH_TYPE') + ' ' + _CoreManager.default.get('SERVER_AUTH_TOKEN');
      }

      var customHeaders = _CoreManager.default.get('REQUEST_HEADERS');

      for (var key in customHeaders) {
        headers[key] = customHeaders[key];
      }

      if (options && typeof options.progress === 'function') {
        var handleProgress = function handleProgress(type, event) {
          if (event.lengthComputable) {
            options.progress(event.loaded / event.total, event.loaded, event.total, {
              type: type
            });
          } else {
            options.progress(null, null, null, {
              type: type
            });
          }
        };

        xhr.onprogress = function (event) {
          handleProgress('download', event);
        };

        if (xhr.upload) {
          xhr.upload.onprogress = function (event) {
            handleProgress('upload', event);
          };
        }
      }

      xhr.open(method, url, true);

      for (var h in headers) {
        xhr.setRequestHeader(h, headers[h]);
      }

      xhr.onabort = function () {
        promise.resolve({
          response: {
            results: []
          },
          status: 0,
          xhr: xhr
        });
      };

      xhr.send(data);

      if (options && typeof options.requestTask === 'function') {
        options.requestTask(xhr);
      }
    })();

    return promise;
  },
  request: function request(method, path, data, options) {
    options = options || {};

    var url = _CoreManager.default.get('SERVER_URL');

    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    url += path;
    var payload = {};

    if (data && typeof data === 'object') {
      for (var k in data) {
        payload[k] = data[k];
      }
    }

    var context = options.context;

    if (context !== undefined) {
      payload._context = context;
    }

    if (method !== 'POST') {
      payload._method = method;
      method = 'POST';
    }

    payload._ApplicationId = _CoreManager.default.get('APPLICATION_ID');

    var jsKey = _CoreManager.default.get('JAVASCRIPT_KEY');

    if (jsKey) {
      payload._JavaScriptKey = jsKey;
    }

    payload._ClientVersion = _CoreManager.default.get('VERSION');
    var useMasterKey = options.useMasterKey;

    if (typeof useMasterKey === 'undefined') {
      useMasterKey = _CoreManager.default.get('USE_MASTER_KEY');
    }

    if (useMasterKey) {
      if (_CoreManager.default.get('MASTER_KEY')) {
        delete payload._JavaScriptKey;
        payload._MasterKey = _CoreManager.default.get('MASTER_KEY');
      } else {
        throw new Error('Cannot use the Master Key, it has not been provided.');
      }
    }

    if (_CoreManager.default.get('FORCE_REVOCABLE_SESSION')) {
      payload._RevocableSession = '1';
    }

    var installationId = options.installationId;
    var installationIdPromise;

    if (installationId && typeof installationId === 'string') {
      installationIdPromise = Promise.resolve(installationId);
    } else {
      var installationController = _CoreManager.default.getInstallationController();

      installationIdPromise = installationController.currentInstallationId();
    }

    return installationIdPromise.then(function (iid) {
      payload._InstallationId = iid;

      var userController = _CoreManager.default.getUserController();

      if (options && typeof options.sessionToken === 'string') {
        return Promise.resolve(options.sessionToken);
      } else if (userController) {
        return userController.currentUserAsync().then(function (user) {
          if (user) {
            return Promise.resolve(user.getSessionToken());
          }

          return Promise.resolve(null);
        });
      }

      return Promise.resolve(null);
    }).then(function (token) {
      if (token) {
        payload._SessionToken = token;
      }

      var payloadString = JSON.stringify(payload);
      return RESTController.ajax(method, url, payloadString, {}, options).then(function (_ref) {
        var response = _ref.response,
            status = _ref.status;

        if (options.returnStatus) {
          return _objectSpread(_objectSpread({}, response), {}, {
            _status: status
          });
        } else {
          return response;
        }
      });
    }).catch(RESTController.handleError);
  },
  handleError: function handleError(response) {
    var error;

    if (response && response.responseText) {
      try {
        var errorJSON = JSON.parse(response.responseText);
        error = new _ParseError.default(errorJSON.code, errorJSON.error);
      } catch (e) {
        error = new _ParseError.default(_ParseError.default.INVALID_JSON, 'Received an error with invalid JSON from Parse: ' + response.responseText);
      }
    } else {
      var message = response.message ? response.message : response;
      error = new _ParseError.default(_ParseError.default.CONNECTION_FAILED, 'XMLHttpRequest failed: ' + JSON.stringify(message));
    }

    return Promise.reject(error);
  },
  _setXHR: function _setXHR(xhr) {
    XHR = xhr;
  },
  _getXHR: function _getXHR() {
    return XHR;
  }
};
module.exports = RESTController;