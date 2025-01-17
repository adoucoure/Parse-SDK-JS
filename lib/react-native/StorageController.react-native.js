var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var StorageController = {
  async: 1,
  getItemAsync: function (path) {
    return new Promise(function (resolve, reject) {
      _CoreManager.default.getAsyncStorage().getItem(path, function (err, value) {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  },
  setItemAsync: function (path, value) {
    return new Promise(function (resolve, reject) {
      _CoreManager.default.getAsyncStorage().setItem(path, value, function (err, value) {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  },
  removeItemAsync: function (path) {
    return new Promise(function (resolve, reject) {
      _CoreManager.default.getAsyncStorage().removeItem(path, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  getAllKeysAsync: function () {
    return new Promise(function (resolve, reject) {
      _CoreManager.default.getAsyncStorage().getAllKeys(function (err, keys) {
        if (err) {
          reject(err);
        } else {
          resolve(keys);
        }
      });
    });
  },
  multiGet: function (keys) {
    return new Promise(function (resolve, reject) {
      _CoreManager.default.getAsyncStorage().multiGet(keys, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  multiRemove: function (keys) {
    return new Promise(function (resolve, reject) {
      _CoreManager.default.getAsyncStorage().multiRemove(keys, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(keys);
        }
      });
    });
  },
  clear: function () {
    return _CoreManager.default.getAsyncStorage().clear();
  }
};
module.exports = StorageController;