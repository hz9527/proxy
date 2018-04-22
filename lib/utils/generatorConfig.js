function transObj (obj, key) { // 将多层对象变为一层
  let result = {};
  if (obj && obj.constructor === Object) {
    Object.assign(result, ...Object.keys(obj).map(key => transObj(obj[key], key)))
  } else {
    result[key] = obj;
  }
  return result;
}

module.exports = function generatorConfig () {
  return transObj(require('./getConfig.js')(null, true), null)
}