module.exports = {
  proxyBaseConf: {
    port: 8001, // 代理服务端口，默认8001
    throttle: 0, // 网速限制，单位kb/s，0为不限制
    forceProxyHttps: false, // 是否强制拦截所有的https，忽略规则模块的返回
    wsIntercept: false, // 不开启websocket代理
    silent: true, // 是否屏蔽所有console输出
    systemProxy: true // 是否启用系统代理
  },
  proxyRuleConf: {
    mockPath: '../../project/qcs.fe.r/mock', // String 如果是文件则该文件定义规则，否则遍历目录
    domain: '', // String or Array | String 拦截的主机，字符串或数组，如hz.r.qcs.test.sankuai.com
    mockRule: require('./utils/generatorMockRule.js'), // 对mock文件解析
    formatResponse: data => ({code: 0, msg: 'success', data}), // 对mock格式化
    responseHandler: (res, mock, req) => true  // 处理响应，判断是否使用mock，true则使用mock，否则使用正常响应，支持promise异步（接口延迟）
  },
  webInterface: {
    enable: true, // 是否启用web拦截界面
    webPort: 8002, // web界面服务端口
    autoOpen: true // 是否自动打开
  }
}