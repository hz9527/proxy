let Default = require('../defaultConf.js');
const Check = require('./vaildate.js').check;
const Utils = require('./utils.js');

// trans default config mock path
let path = require('path');
Default = Utils.transMockPath(path.join(__dirname, '../defaultConf.js'), Default);

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

// 思考这样一个问题：当mockPath来自文件（包括默认），则应该是文件的相对路径，当mockPath来自终端，则应该是执行位置命令的相对路径
// 但是我们在获取终端参数时已经将其转换成绝对路径了，获取默认文件也转换成绝对路径了，总之最终是一个绝对路径
module.exports = function getConfig (customConfig, useCache = false, needCheck = false) {
  if (!useCache) {
    config = merge(Default, customConfig, null, needCheck ? check : null);
  }
  if (!config) {
    // 先获取当前目录下proxy.config.js，若不存在则为null
    let configPath = Utils.getCusConfPath();
    let cusConf = Utils.isVaildPath(configPath) ? require(configPath) : null;
    if (cusConf) cusConf = Utils.transMockPath(configPath, cusConf);
    config = merge(Default, cusConf, null, check);
  }
  return config
}