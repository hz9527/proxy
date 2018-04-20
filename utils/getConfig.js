const process = require('process');
// todo 默认配置支持识别目录下proxy.config.js文件
const Default = require('../config.js');

function formatArgv (list) {
  // 目前只有path配置为字符串其他都是布尔或者数字函数字段不可配置
  let result = {};
  list.forEach((item, ind) => {
    if (item.indexOf('-') === 0 && ind < list.length - 1 && list[ind + 1] && list[ind + 1].indexOf('-') !== 0) {
      let key = item.slice(1);
      result[key] = key === 'path' ? list[ind + 1] : new Function(`return ${list[ind + 1]}`);
    }
  });
  return result;
}

function forKeys (obj, parentKey, callBack) {
  if (obj && obj.constructor === Object) {
    Object.keys(obj).forEach(key => {
      forKeys(obj[key], key, callBack);
    });
  } else {
    typeof callBack === 'function' && callBack(parentKey, obj)
  }
}

module.exports = function getConfig () {
  let config = {};
  let outConf = formatArgv(process.argv.slice(2));
  forKeys(Default, null, (key, value) => {
    // todo 判断参数是否合法
    if (key) {
      config[key] = key in outConf ? outConf[key] : value;
    }
  })
  return config
}