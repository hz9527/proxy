const Default = require('../defaultConf.js');
const Check = require('./vaildate.js').check;
const Utils = require('./utils.js');

// 注意，配置对象在设计时如果希望是需要合并的为对象
function merge (def, obj, k, check) { // 深度合并对象
  let needCheck = typeof check === 'function';
  let result = {};
  let needMerge = false;
  if (def && def.constructor === Object) {
    if (needCheck) {
      needMerge = true;
      obj = obj || {};
    } else if (obj && obj.constructor === Object) {
      needMerge = true;
    }
  }
  if (needMerge) {
    Object.keys(def).forEach(key => {
      result[key] = merge(def[key], obj[key], key, check);
    })
  } else {
    needCheck && check(def, obj, k);
    result = obj === void 0 ? def : obj;
  }
  return result;
}

function check (def, v, k) {
  let result = Check(def, v, k);
  if (result.code !== 0) {
    throw new Error(result.msg);
  }
}

let config;

// todo trans mockPath
module.exports = function getConfig (customConfig, useCache = false, needCheck = false) {
  if (!useCache) {
    config = merge(Default, customConfig, null, needCheck ? check : null);
  }
  if (!config) {
    // 先获取当前目录下proxy.config.js，若不存在则为null
    let configPath = Utils.getCurConfig();
    config = merge(Default, Utils.isVaildPath(configPath) ? require(configPath) : null, null, check);
  }
  return config
}