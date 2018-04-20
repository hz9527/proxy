// 返回一个函数 参数为请求url
function check (rule, url, router = '') {
  Object.keys(rule).find(key => url.indexOf(router + key) > -1)
}
module.exports = function generatorRule(mockRule) {
  return url => {
    let result
    let ind = url.indexOf('/')
    if (ind > 0) { // 确定url是路由
      let router = url.slice(ind - 1, url.search(/[?#]/))
       // 使用findIndex及find尽早结束遍历
      mockRule.findIndex(rule => {
        let key
        if (rule.$router) {
          if (router.indexOf(rule.$router) > 0) {
            key = check(rule, router, rule.$router)
          }
        } else {
          key = check(rule, router)
        }
        if (key) {
          result = rule[key]
        }
        return !!key
      })
    }
    return result
  }
}