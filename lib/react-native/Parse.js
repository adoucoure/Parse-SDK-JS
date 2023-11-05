var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _decode = _interopRequireDefault(require("./decode"));

var _encode = _interopRequireDefault(require("./encode"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _CryptoController = _interopRequireDefault(require("./CryptoController"));

var _EventuallyQueue = _interopRequireDefault(require("./EventuallyQueue"));

var _InstallationController = _interopRequireDefault(require("./InstallationController"));

var ParseOp = _interopRequireWildcard(require("./ParseOp"));

var _RESTController = _interopRequireDefault(require("./RESTController"));

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

var buildInstance = function () {
  var parseInstance = {
    initialize: function (applicationId, javaScriptKey) {
      parseInstance._initialize(applicationId, javaScriptKey);
    },
    _initialize: function (applicationId, javaScriptKey, masterKey) {
      _CoreManager.default.set('APPLICATION_ID', applicationId);

      _CoreManager.default.set('JAVASCRIPT_KEY', javaScriptKey);

      _CoreManager.default.set('MASTER_KEY', masterKey);

      _CoreManager.default.set('USE_MASTER_KEY', false);
    },
    setAsyncStorage: function (storage) {
      _CoreManager.default.setAsyncStorage(storage);
    },
    setLocalDatastoreController: function (controller) {
      _CoreManager.default.setLocalDatastoreController(controller);
    },
    getServerHealth: function () {
      return _CoreManager.default.getRESTController().request('GET', 'health');
    },

    set applicationId(value) {
      _CoreManager.default.set('APPLICATION_ID', value);
    },

    get applicationId() {
      return _CoreManager.default.get('APPLICATION_ID');
    },

    set javaScriptKey(value) {
      _CoreManager.default.set('JAVASCRIPT_KEY', value);
    },

    get javaScriptKey() {
      return _CoreManager.default.get('JAVASCRIPT_KEY');
    },

    set masterKey(value) {
      _CoreManager.default.set('MASTER_KEY', value);
    },

    get masterKey() {
      return _CoreManager.default.get('MASTER_KEY');
    },

    set serverURL(value) {
      _CoreManager.default.set('SERVER_URL', value);
    },

    get serverURL() {
      return _CoreManager.default.get('SERVER_URL');
    },

    set serverAuthToken(value) {
      _CoreManager.default.set('SERVER_AUTH_TOKEN', value);
    },

    get serverAuthToken() {
      return _CoreManager.default.get('SERVER_AUTH_TOKEN');
    },

    set serverAuthType(value) {
      _CoreManager.default.set('SERVER_AUTH_TYPE', value);
    },

    get serverAuthType() {
      return _CoreManager.default.get('SERVER_AUTH_TYPE');
    },

    set liveQueryServerURL(value) {
      _CoreManager.default.set('LIVEQUERY_SERVER_URL', value);
    },

    get liveQueryServerURL() {
      return _CoreManager.default.get('LIVEQUERY_SERVER_URL');
    },

    set encryptedUser(value) {
      _CoreManager.default.set('ENCRYPTED_USER', value);
    },

    get encryptedUser() {
      return _CoreManager.default.get('ENCRYPTED_USER');
    },

    set secret(value) {
      _CoreManager.default.set('ENCRYPTED_KEY', value);
    },

    get secret() {
      return _CoreManager.default.get('ENCRYPTED_KEY');
    },

    set idempotency(value) {
      _CoreManager.default.set('IDEMPOTENCY', value);
    },

    get idempotency() {
      return _CoreManager.default.get('IDEMPOTENCY');
    },

    set allowCustomObjectId(value) {
      _CoreManager.default.set('ALLOW_CUSTOM_OBJECT_ID', value);
    },

    get allowCustomObjectId() {
      return _CoreManager.default.get('ALLOW_CUSTOM_OBJECT_ID');
    }

  };
  parseInstance.ACL = require('./ParseACL').default;
  parseInstance.Analytics = require('./Analytics');
  parseInstance.AnonymousUtils = require('./AnonymousUtils').default;
  parseInstance.Cloud = require('./Cloud');
  parseInstance.CLP = require('./ParseCLP').default;
  parseInstance.CoreManager = require('./CoreManager');
  parseInstance.Config = require('./ParseConfig').default;
  parseInstance.Error = require('./ParseError').default;
  parseInstance.EventuallyQueue = _EventuallyQueue.default;
  parseInstance.FacebookUtils = require('./FacebookUtils').default;
  parseInstance.File = require('./ParseFile').default;
  parseInstance.GeoPoint = require('./ParseGeoPoint').default;
  parseInstance.Polygon = require('./ParsePolygon').default;
  parseInstance.Installation = require('./ParseInstallation').default;
  parseInstance.LocalDatastore = require('./LocalDatastore');
  parseInstance.Object = require('./ParseObject').default;
  parseInstance.Op = {
    Set: ParseOp.SetOp,
    Unset: ParseOp.UnsetOp,
    Increment: ParseOp.IncrementOp,
    Add: ParseOp.AddOp,
    Remove: ParseOp.RemoveOp,
    AddUnique: ParseOp.AddUniqueOp,
    Relation: ParseOp.RelationOp
  };
  parseInstance.Push = require('./Push');
  parseInstance.Query = require('./ParseQuery').default;
  parseInstance.Relation = require('./ParseRelation').default;
  parseInstance.Role = require('./ParseRole').default;
  parseInstance.Schema = require('./ParseSchema').default;
  parseInstance.Session = require('./ParseSession').default;
  parseInstance.Storage = require('./Storage');
  parseInstance.User = require('./ParseUser').default;
  parseInstance.LiveQuery = require('./ParseLiveQuery').default;
  parseInstance.LiveQueryClient = require('./LiveQueryClient').default;

  parseInstance._request = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _CoreManager.default.getRESTController().request.apply(null, args);
  };

  parseInstance._ajax = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _CoreManager.default.getRESTController().ajax.apply(null, args);
  };

  parseInstance._decode = function (_, value) {
    return (0, _decode.default)(value);
  };

  parseInstance._encode = function (value, _, disallowObjects) {
    return (0, _encode.default)(value, disallowObjects);
  };

  parseInstance._getInstallationId = function () {
    return _CoreManager.default.getInstallationController().currentInstallationId();
  };

  parseInstance.enableLocalDatastore = function () {
    var polling = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

    if (!parseInstance.applicationId) {
      console.log("'enableLocalDataStore' must be called after 'initialize'");
      return;
    }

    if (!parseInstance.LocalDatastore.isEnabled) {
      parseInstance.LocalDatastore.isEnabled = true;

      if (polling) {
        _EventuallyQueue.default.poll(ms);
      }
    }
  };

  parseInstance.isLocalDatastoreEnabled = function () {
    return parseInstance.LocalDatastore.isEnabled;
  };

  parseInstance.dumpLocalDatastore = function () {
    if (!parseInstance.LocalDatastore.isEnabled) {
      console.log('Parse.enableLocalDatastore() must be called first');
      return Promise.resolve({});
    } else {
      return parseInstance.LocalDatastore._getAllContents();
    }
  };

  parseInstance.enableEncryptedUser = function () {
    parseInstance.encryptedUser = true;
  };

  parseInstance.isEncryptedUserEnabled = function () {
    return parseInstance.encryptedUser;
  };

  _CoreManager.default.setCryptoController(_CryptoController.default);

  _CoreManager.default.setInstallationController(_InstallationController.default);

  _CoreManager.default.setRESTController(_RESTController.default);

  parseInstance.Parse = parseInstance;
  return parseInstance;
};

module.exports = buildInstance;