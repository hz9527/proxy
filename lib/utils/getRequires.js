const fs = require('fs');
const path = require('fs');

// 支持目录下还有目录，反正只识别.js
function readDir (dirPath) {
  return new Promise(resolve => {
    fs.readdir(dirPath, (err, files) => {
      resolve(files)
    })
  })
}
async function getFiles (filePath) {
  let result = []
  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isDirectory()) {
      let list = await readDir(filePath)
      list = await Promise.all(list.map(file => getFiles(`${filePath}/${file}`)))
      list.forEach(res => {
        result = result.concat(res)
      })
    } else {
      result.push(filePath)
    }
  }
  return result
}
module.exports = function getRule (dirPath) {
  return getFiles(dirPath)
    .then(list => {
      return list.map(p => require(p))
    })
}