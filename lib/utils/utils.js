const fs = require('fs');
const path = require('path');

module.exports = {
  isVaildPath (filePath) {
    return fs.existsSync(filePath)
  },
  isDir (dirPath) {
    return fs.statSync(dirPath).isDirectory()
  },
  getCurConfig () {
    return process.cwd() + '/proxy.config.js'
  }
}