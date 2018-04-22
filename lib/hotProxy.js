const GetMockRule = require('./utils/getRequires.js');
const GeneratorOpt = require('./utils/generatorOpt.js');
const AnyProxy = require('anyproxy');

module.exports = function hotProxy (isDir, config, startHook, errorHook) {
  // 获取mock配置
  return Promise.resolve(isDir ? GetMockRule(config.mockPath) : require(config.mockPath))
    .then(mockRule => {
      console.log(config.mockRule)
      // 根据生成的拦截规则生成配置项
      const proxyServer = new AnyProxy.ProxyServer(GeneratorOpt(config, config.mockRule(mockRule)));
      typeof startHook === 'function' && proxyServer.on('ready', startHook);
      typeof errorHook === 'function' && proxyServer.on('error', errorHook);
      proxyServer.start();
      return proxyServer
    })
}

