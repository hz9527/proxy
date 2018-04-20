const GetMockRule = require('./utils/getRequires.js');
const generatorMockRule = require('./utils/generatorMockRule.js');
const GeneratorOpt = require('./utils/generatorOpt.js');
const AnyProxy = require('anyproxy');

module.exports = function hotMock (isDir, dirPath, config, startHook, errorHook) {
  // 获取mock配置
  return Promise.resolve(isDir ? GetMockRule(dirPath) : require(dirPath))
    .then(mockRule => {
      // todo mockrule解析支持配置
      // 根据生成的拦截规则生成配置项
      const proxyServer = new AnyProxy.ProxyServer(GeneratorOpt(config, generatorMockRule(mockRule)));
      typeof startHook === 'function' && proxyServer.on('ready', startHook);
      typeof errorHook === 'function' && proxyServer.on('error', errorHook);
      proxyServer.start();
      return proxyServer
    })
}

