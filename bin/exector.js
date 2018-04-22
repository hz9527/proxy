// exec 对应两种执行策略，当只有list或无参数，需要确认配置再执行
  // 执行前需要检查配置是否合法
const Inquirer = require('./inquirer.js');
const getConfig = require('../lib/utils/getConfig');
const Utils = require('../lib/utils/utils.js');
const { getOptions, getChildOpts } = require('../lib/utils/exectorUtils.js');
const RULE_KEY = 'proxyRuleConf';
const PATH_KEY = 'mockPath';

// exec
function mergeDir (config, dir) {
  config.constructor !== Object && (config = {});
  if (RULE_KEY in config) {
    config[PATH_KEY] = dir;
  } else {
    config[RULE_KEY] = {[PATH_KEY]: dir};
  }
  return config
}

function cyclicPrompt (answer, opts) {
  let cur = answer ? getChildOpts(answer, opts) : opts;
  if (cur.constructor === Object) return cur;
  return Inquirer.commomPrompt(cur)
    .then((ans) => cyclicPrompt(ans, cur))
}

function getConf (args) {
  // 如果无参数或只有list，第一步则是确认是否需要配置，若需要配置则用终端交互配置
  // 若有path参数，第一步是通过路径获取配置，若还有dir
  return Promise.resolve((need => need ? Inquirer.startComfirm()
    : true)(!('path' in args || 'dir' in args || 'yes' in args))
  ).then(res => {
    if (res === true || res.confirmStart === true) {
      // 获取配置
      return new Promise((resolve, reject) => {
        let configPath = args.path || Utils.getCurConfig();
        let config = null;
        let mockDir = args.dir;
        if (!Utils.isVaildPath(configPath)) {
          if ('path' in args) reject({ code: 2, msg: `config file path(${args.path}) is inexistence`});
          configPath = null;
        }
        if (configPath) config = require(configPath);
        if (mockDir && config) config = mergeDir(config, mockDir);
        resolve(config);
      })
    } else {
      // 编辑配置
      return cyclicPrompt(null, getOptions())
    }
  })
}

function genConfig(config) {
  return getConfig(config, false, true);
}

function showConfig (config, needShow) {
  needShow && console.dir(config);
}

function startProxy () {
  require('../lib/index.js');
}


module.exports = {
  exec (args) {
    // 对外部而言就是一个promise，无非是第一步获取配置，第二步生成配置，第三步展示配置（可以略过），第四步启动服务
    // 都在生成配置时检查，因为编辑可能是空
    return getConf(args)
      .then(genConfig)
      .then(config => showConfig(config, 'list' in args))
      .then(startProxy)
      .catch(msg => {
        console.log(msg.msg || msg);
      })
  },
  exec_set (args) {

  },
  exec_ls (args) {

  }
}