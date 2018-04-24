const fs = require('fs');
const path = require('path');
const RULE_KEY = 'proxyRuleConf';
const KEYS = ['proxyRuleConf', 'mockPath'];

function treeKeys (obj, keys, check = true) {
  let sub = obj
  let i = 0
  while (i < keys.length - 1 && sub) {
    if (check) {
      if (sub && sub[keys[i]]) {
        sub = sub[keys[i]]
        i++
      }
    } else {
      sub = sub && sub[keys[i]] || {}
      i++
    }
  }
  console.log(sub)
  return i === keys.length - 1 ? sub : null
}

module.exports = {
  isVaildPath (filePath) {
    return fs.existsSync(filePath)
  },
  isDir (dirPath) {
    return fs.statSync(dirPath).isDirectory()
  },
  getCusConfPath () {
    return process.cwd() + '/proxy.config.js'
  },
  transMockPath (filePath, config) { // gen标识是否生成空对象
    // 这里写得不纯
    let sub = treeKeys(config, KEYS)
    if (sub) {
      let p = filePath.indexOf('.js') > 1 ? filePath.slice(0, filePath.lastIndexOf('/')) : filePath;
      // console.log(p, sub, config)
      sub[KEYS[KEYS.length - 1]] = path.join(p, sub[KEYS[KEYS.length - 1]])
    }
    return config
  },
  mergeMockPath (config, mockPath) {
    let sub = treeKeys(config, KEYS, false)
    sub[KEYS[KEYS.length - 1]] = path.join(p, mockPath)
    return config
  }
}