/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import decode from './decode';
import encode from './encode';
import CoreManager from './CoreManager';
import CryptoController from './CryptoController';
import EventuallyQueue from './EventuallyQueue';
import InstallationController from './InstallationController';
import * as ParseOp from './ParseOp';
import RESTController from './RESTController';

/**
 * Contains all Parse API classes and functions.
 *
 * @static
 * @global
 * @class
 * @hideconstructor
 */

const buildInstance = () => {
  const parseInstance = {
    /**
     * Call this method first to set up your authentication tokens for Parse.
     *
     * @param {string} applicationId Your Parse Application ID.
     * @param {string} [javaScriptKey] Your Parse JavaScript Key (Not needed for parse-server)
     * @param {string} [masterKey] Your Parse Master Key. (Node.js only!)
     * @static
     */
    initialize(applicationId: string, javaScriptKey: string) {
      if (
        process.env.PARSE_BUILD === 'browser' &&
        CoreManager.get('IS_NODE') &&
        !process.env.SERVER_RENDERING
      ) {
        /* eslint-disable no-console */
        console.log(
          "It looks like you're using the browser version of the SDK in a " +
            "node.js environment. You should require('parse/node') instead."
        );
        /* eslint-enable no-console */
      }
      parseInstance._initialize(applicationId, javaScriptKey);
    },

    _initialize(applicationId: string, javaScriptKey: string, masterKey: string) {
      CoreManager.set('APPLICATION_ID', applicationId);
      CoreManager.set('JAVASCRIPT_KEY', javaScriptKey);
      CoreManager.set('MASTER_KEY', masterKey);
      CoreManager.set('USE_MASTER_KEY', false);
    },

    /**
     * Call this method to set your AsyncStorage engine
     * Starting Parse@1.11, the ParseSDK do not provide a React AsyncStorage as the ReactNative module
     * is not provided at a stable path and changes over versions.
     *
     * @param {AsyncStorage} storage a react native async storage.
     * @static
     */
    setAsyncStorage(storage: any) {
      CoreManager.setAsyncStorage(storage);
    },

    /**
     * Call this method to set your LocalDatastoreStorage engine
     * If using React-Native use {@link parseInstance.setAsyncStorage Parse.setAsyncStorage()}
     *
     * @param {LocalDatastoreController} controller a data storage.
     * @static
     */
    setLocalDatastoreController(controller: any) {
      CoreManager.setLocalDatastoreController(controller);
    },

    /**
     * Returns information regarding the current server's health
     *
     * @returns {Promise}
     * @static
     */
    getServerHealth() {
      return CoreManager.getRESTController().request('GET', 'health');
    },

    /**
     * @member {string} Parse.applicationId
     * @static
     */
    set applicationId(value) {
      CoreManager.set('APPLICATION_ID', value);
    },
    get applicationId() {
      return CoreManager.get('APPLICATION_ID');
    },

    /**
     * @member {string} Parse.javaScriptKey
     * @static
     */
    set javaScriptKey(value) {
      CoreManager.set('JAVASCRIPT_KEY', value);
    },
    get javaScriptKey() {
      return CoreManager.get('JAVASCRIPT_KEY');
    },

    /**
     * @member {string} Parse.masterKey
     * @static
     */
    set masterKey(value) {
      CoreManager.set('MASTER_KEY', value);
    },
    get masterKey() {
      return CoreManager.get('MASTER_KEY');
    },

    /**
     * @member {string} Parse.serverURL
     * @static
     */
    set serverURL(value) {
      CoreManager.set('SERVER_URL', value);
    },
    get serverURL() {
      return CoreManager.get('SERVER_URL');
    },

    /**
     * @member {string} Parse.serverAuthToken
     * @static
     */
    set serverAuthToken(value) {
      CoreManager.set('SERVER_AUTH_TOKEN', value);
    },
    get serverAuthToken() {
      return CoreManager.get('SERVER_AUTH_TOKEN');
    },

    /**
     * @member {string} Parse.serverAuthType
     * @static
     */
    set serverAuthType(value) {
      CoreManager.set('SERVER_AUTH_TYPE', value);
    },
    get serverAuthType() {
      return CoreManager.get('SERVER_AUTH_TYPE');
    },

    /**
     * @member {string} Parse.liveQueryServerURL
     * @static
     */
    set liveQueryServerURL(value) {
      CoreManager.set('LIVEQUERY_SERVER_URL', value);
    },
    get liveQueryServerURL() {
      return CoreManager.get('LIVEQUERY_SERVER_URL');
    },

    /**
     * @member {string} Parse.encryptedUser
     * @static
     */
    set encryptedUser(value) {
      CoreManager.set('ENCRYPTED_USER', value);
    },
    get encryptedUser() {
      return CoreManager.get('ENCRYPTED_USER');
    },

    /**
     * @member {string} Parse.secret
     * @static
     */
    set secret(value) {
      CoreManager.set('ENCRYPTED_KEY', value);
    },
    get secret() {
      return CoreManager.get('ENCRYPTED_KEY');
    },

    /**
     * @member {boolean} Parse.idempotency
     * @static
     */
    set idempotency(value) {
      CoreManager.set('IDEMPOTENCY', value);
    },
    get idempotency() {
      return CoreManager.get('IDEMPOTENCY');
    },

    /**
     * @member {boolean} Parse.allowCustomObjectId
     * @static
     */
    set allowCustomObjectId(value) {
      CoreManager.set('ALLOW_CUSTOM_OBJECT_ID', value);
    },
    get allowCustomObjectId() {
      return CoreManager.get('ALLOW_CUSTOM_OBJECT_ID');
    },
  };

  parseInstance.ACL = require('./ParseACL').default;
  parseInstance.Analytics = require('./Analytics');
  parseInstance.AnonymousUtils = require('./AnonymousUtils').default;
  parseInstance.Cloud = require('./Cloud');
  parseInstance.CLP = require('./ParseCLP').default;
  parseInstance.CoreManager = require('./CoreManager');
  parseInstance.Config = require('./ParseConfig').default;
  parseInstance.Error = require('./ParseError').default;
  parseInstance.EventuallyQueue = EventuallyQueue;
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
    Relation: ParseOp.RelationOp,
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
  if (process.env.PARSE_BUILD === 'browser') {
    parseInstance.IndexedDB = require('./IndexedDBStorageController');
  }
  parseInstance._request = function (...args) {
    return CoreManager.getRESTController().request.apply(null, args);
  };
  parseInstance._ajax = function (...args) {
    return CoreManager.getRESTController().ajax.apply(null, args);
  };
  // We attempt to match the signatures of the legacy versions of these methods
  parseInstance._decode = function (_, value) {
    return decode(value);
  };
  parseInstance._encode = function (value, _, disallowObjects) {
    return encode(value, disallowObjects);
  };
  parseInstance._getInstallationId = function () {
    return CoreManager.getInstallationController().currentInstallationId();
  };
  /**
   * Enable pinning in your application.
   * This must be called after `Parse.initialize` in your application.
   *
   * @param [polling] Allow pinging the server /health endpoint. Default true
   * @param [ms] Milliseconds to ping the server. Default 2000ms
   * @static
   */
  parseInstance.enableLocalDatastore = function (polling = true, ms: number = 2000) {
    if (!parseInstance.applicationId) {
      console.log("'enableLocalDataStore' must be called after 'initialize'");
      return;
    }
    if (!parseInstance.LocalDatastore.isEnabled) {
      parseInstance.LocalDatastore.isEnabled = true;
      if (polling) {
        EventuallyQueue.poll(ms);
      }
    }
  };
  /**
   * Flag that indicates whether Local Datastore is enabled.
   *
   * @static
   * @returns {boolean}
   */
  parseInstance.isLocalDatastoreEnabled = function () {
    return parseInstance.LocalDatastore.isEnabled;
  };
  /**
   * Gets all contents from Local Datastore
   *
   * <pre>
   * await Parse.dumpLocalDatastore();
   * </pre>
   *
   * @static
   * @returns {object}
   */
  parseInstance.dumpLocalDatastore = function () {
    if (!parseInstance.LocalDatastore.isEnabled) {
      console.log('Parse.enableLocalDatastore() must be called first'); // eslint-disable-line no-console
      return Promise.resolve({});
    } else {
      return parseInstance.LocalDatastore._getAllContents();
    }
  };

  /**
   * Enable the current user encryption.
   * This must be called before login any user.
   *
   * @static
   */
  parseInstance.enableEncryptedUser = function () {
    parseInstance.encryptedUser = true;
  };

  /**
   * Flag that indicates whether Encrypted User is enabled.
   *
   * @static
   * @returns {boolean}
   */
  parseInstance.isEncryptedUserEnabled = function () {
    return parseInstance.encryptedUser;
  };

  CoreManager.setCryptoController(CryptoController);
  CoreManager.setInstallationController(InstallationController);
  CoreManager.setRESTController(RESTController);

  if (process.env.PARSE_BUILD === 'node') {
    parseInstance.initialize = parseInstance._initialize;
    parseInstance.Cloud = parseInstance.Cloud || {};
    parseInstance.Cloud.useMasterKey = function () {
      CoreManager.set('USE_MASTER_KEY', true);
    };
    parseInstance.Hooks = require('./ParseHooks');
  }

  // For legacy requires, of the form `var Parse = require('parse').Parse`
  parseInstance.Parse = parseInstance;
  return parseInstance;
};

module.exports = buildInstance;
