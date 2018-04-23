const fs = require('fs');
const path = require('path');
const RULE_KEY = 'proxyRuleConf';
const PATH_KEY = 'mockPath';

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
  transMockPath (filePath, config) {
    // 这里写得不纯
    if (config && config[RULE_KEY] && config[RULE_KEY][PATH_KEY]) {
      let p = filePath.indexOf('.js') > 1 ? filePath.slice(0, filePath.lastIndexOf('/') - 1) : filePath;
      config[RULE_KEY][PATH_KEY] = path.join(p, config[RULE_KEY][PATH_KEY])
    }
    return config
  }
}