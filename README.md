##  快速上手
> 本工具是一个强侵入式mock（抓包）工具，具体原理就是基于anyproxy对响应进行拦截返回mock数据，优点就是对开发项目完全没有任何更改，比如开发过程请求了测试环境接口

项目优点：
1. 完全独立，对接口强侵入，对项目无侵入
2. 基于代理，可以模拟网络情况，顺带抓包

**使用终端配置**

```sh
npm i
npm run dev
```

**使用config文件配置**

```sh
npm i
npm run start
```

## config
config大致划分为三类配置：proxyBaseConf（代理相关配置）、proxyRuleConf（代理规则配置）、webInterface（代理可视化配置）。  
每一类就是一个对象，包含更细粒度配置项  
**proxyBaseConf**

| 配置项 | 数据类型 | 描述 | 备注 |
|---|---|---|---|
| port | Number | 代理服务端口 | 默认8001 |
| throttle | Number | 代理网速上限设置，单位kb/s | 默认不限制，0为不限制 |
| forceProxyHttps | Boolean | 是否强制拦截所有的https，忽略规则模块的返回 | 默认false |
| wsIntercept | Boolean | 是否开启websocket代理 | 默认否 |
| silent | Boolean | 是否屏蔽所有console输出 | 默认false |
| systemProxy | Boolean | 是否自动开启、关闭系统代理 | 若为true代理服务启动与关闭触发系统代理开关，只支持mac |

**proxyRuleConf**

| 配置项 | 数据类型 | 描述 | 备注 |
|---|---|---|---|
| mockPath | String | 代理规则文件或目录 | 规则 |
| domain | String or Array | 代理规则主机名 | 默认只要路由符合规则就拦截 |
| formte | Function | 对mock处理，如添加code、msg等 | 默认直接返回mock数据，只有在符合被处理情况才调用此方法 |
| responseHandler | Function | 处理mock，在一些场景下我们也希望返回原响应，参数为res，mock，req | 返回true或false，只有在符合被处理情况才调用此方法 |

**webInterface**

| 配置项 | 数据类型 | 描述 | 备注 |
|---|---|---|---|
| enable | Boolean | 是否启用web版界面 | 默认true |
| webPort | Number | web版界面服务端口 | 默认8002 |
| autoOpen | Boolean | 是否自动打开web版界面 | 默认true |

## todo
- [x] 基本流程，支持配置读取及mock热加载
- [ ] rule通用配置
- [ ] cli工具
- [x] shell修改系统代理
- [ ] 提供node api
- [ ] 作为npm包使用
- [ ] 拓展代理，可不做mock，注入cookie等