##  快速上手
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
| path | String | 代理规则文件或目录 | 规则 |

**webInterface**
| 配置项 | 数据类型 | 描述 | 备注 |
|---|---|---|---|
| enable | Boolean | 是否启用web版界面 | 默认true |
| webPort | Number | web版界面服务端口 | 默认8002 |
| autoOpen | Boolean | 是否自动打开web版界面 | 默认true |

## todo
- [ ] 基本流程，支持配置读取及nodemon热加载
- [ ] rule通用配置
- [ ] 启动支持参数，shell脚本修改配置
- [ ] shell修改系统代理