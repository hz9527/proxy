// 返回一个函数 参数为请求url
function check (rule, url, router = '') {
  return Object.keys(rule).find(key => url.indexOf(router + key) > -1);
}
module.exports = function generatorRule(mockRule) {
  return req => {
    let result;
    let ind = req.url.indexOf('/');
    if (ind > 0) { // 确定url是路由
      let router = req.url.slice(ind - 1, req.url.search(/[?#]/));
      console.log(router)
       // 使用findIndex及find尽早结束遍历
      mockRule.findIndex(rule => {
        let key;
        if (rule.$router) {
          if (router.indexOf(rule.$router) > 0) key = check(rule, router, rule.$router);
        } else {
          key = check(rule, router);
        }
        // 支持函数，参数为req
        if (key) result = typeof rule[key] === 'function' ? rule[key](req) : rule[key];
        return !!key;
      })
    }
    return result;
  }
}