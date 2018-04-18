module.exports = {
  proxyBaseConf: {
    port: 8001, // 代理服务端口，默认8001
    throttle: 0, // 网速限制，单位kb/s，0为不限制
    forceProxyHttps: false, // 是否强制拦截所有的https，忽略规则模块的返回
    wsIntercept: false, // 不开启websocket代理
    silent: false, // 是否屏蔽所有console输出
    systemProxy: true // 是否启用系统代理
  },
  proxyRuleConf: {
    path: '' // String 如果是文件则该文件定义规则，否则遍历目录
  },
  webInterface: {
    enable: true, // 是否启用web拦截界面
    webPort: 8002, // web界面服务端口
    autoOpen: true // 是否自动打开
  }
}