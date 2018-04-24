function generatorRule (config, mockRule) {
  return {
    *beforeSendRequest(requestDetail) { /* ... */ },
    *beforeSendResponse(req, res) {
      let useMock = true
      let data = null
      // 确认域
      if (useMock && config.domain.length > 0) {
        useMock = config.domain.some(item => req.url.indexOf(item) > -1)
      }
      // 确认mock匹配
      if (useMock && typeof mockRule) {
        data = mockRule(req)
        data === void 0 && (useMock = false)
      }
      // 确认是否由mock接管
      if (useMock && config.responseHandler) {
        useMock = config.responseHandler(res, data, req)
      }
      // 确认是否需要处理
      if (useMock) {
        data = config.formatResponse(data)
        let response = res.response
        response.body = JSON.stringify(data)
        return { response }
      }
      return null
    },
    *beforeDealHttpsRequest(requestDetail) { /* ... */ },
    *onError(requestDetail, error) { /* ... */ },
    *onConnectError(requestDetail, error) { /* ... */ }
  };
}

module.exports = function generatorOpt (config, mockRule) {
  let opt = {
    port: config.port,
    rule: generatorRule(config, mockRule),
    webInterface: {
      enable: config.enable,
      webPort: config.webPort
    },
    forceProxyHttps: config.wsIntercept,
    wsIntercept: config.wsIntercept, // 不开启websocket代理
    silent: config.silent
  }
  config.throttle > 0 && (opt.throttle = config.throttle);
  return opt
}