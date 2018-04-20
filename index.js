const path = require('path');
const fs = require('fs');
const opn = require('opn');
const process = require('process');
const child_process = require('child_process');
const HotProxy = require('./hotProxy.js');
// 获取配置
const config = require('./utils/getConfig.js')();

// check config & 如果path为目录，使用nodemon启动服务watch目录，否则直接启动
let isDir = config.path;
let dirPath = path.join(__dirname, config.path);
if (isDir !== '' && fs.existsSync(dirPath)) {
  isDir = fs.statSync(dirPath).isDirectory();
} else {
  throw new Error('path is invaild');
}

let anyProxy;
let errorHook = err => console.log(err);
// 启动hotproxy
HotProxy(isDir, dirPath, config, () => {
  // 读取配置，看是否需要需要修改代理
  if (config.systemProxy) {
    child_process.exec(`sh ${path.join(__dirname, './utils/setProxy.sh')} on 127.0.0.1 ${config.port}`)
  }
  // 根据配置决定是否打开浏览器
  if (config.autoOpen) {
    opn(`http://127.0.0.1:${config.webPort}`);
  }
}, errorHook)
  .then(proxy => {
    anyProxy = proxy;
  });

if (isDir) {
  // watch dir
  fs.watch(dirPath, event => {
    anyProxy.close();
    HotProxy(isDir, dirPath, config, () => {
      console.log('start proxy');
    }, errorHook)
      .then(proxy => {
        anyProxy = proxy;
      })
  })
}

process.on('SIGINT', function () {
  if (config.systemProxy) {
    child_process.exec(`sh ${path.join(__dirname, './utils/setProxy.sh')} off`)
  }
  setTimeout(() => {
    process.exit()
  }, 10)
});