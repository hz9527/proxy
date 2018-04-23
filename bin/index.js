const fs = require('fs');
const path = require('path');
const Version = require('../package.json').version;
const program = require('commander');
const Exec = require('./exector.js');

// 基础 -V -H --version -help
  // proxy -V
// 默认展示默认配置并确认是否直接启动
  // proxy 如果mock目录未配置需要设置
// 命令 [-L -P -Y -D --list --path --yes -dir]
  // proxy -L 展示默认配置
  // proxy -P 修改本次启动配置文件地址
  // proxy -Y 无需确认直接启动，如果mock目录未配置需要设置
  // proxy -D ./mock 设置mock目录

const CLI_CONF = [
  ['-P, --path <configPath>', 'set proxy config file path once'],
  ['-D, --dir <mockDirPath>', 'set mock dir'],
  ['-Y, --yes', 'ignore confirm, just start proxy if mock dir is valid'],
  ['-L, --list', 'show merged config'],
];

CLI_CONF.reduce((pre, cur, ind) => {
  if (ind === 1) {
    pre = program
      .version(Version)
      .option(pre[0], pre[1])
      .action((cmd) => {
        console.log('you can --help')
      })
  }
  return pre.option(cur[0], cur[1])
})
function getOpts (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = o.long.replace(/^--/, '')
    if (cmd[key] && typeof cmd[key] !== 'function') {
      args[key] = cmd[key]
    }
  })
  return args
}
function getPath (p) {
  return path.join(process.cwd(), p)
}
// todo add command
// // set current dir proxy.config.js if it exist
// program
//   .command('set')
//   .description('set current dir proxy.config.js if it exist')
//   .option('-G, --global', 'set default config')
//   .option('-F, --filepath <configFilePath>', 'set config by path')
//   .action(cmd => {
//     console.log(getOpts(cmd))
//   })
// // show current dir proxy.config.js if it exist
// program
//   .command('ls')
//   .description('show current dir proxy.config.js if it exist')
//   .option('-G, --global', 'show global config')
//   .option('-F, --filepath <configFilePath>', 'show config by path')
//   .action(cmd => {
//     console.log(getOpts(cmd))
//   })

program.parse(process.argv)

if (program.args.length === 0) {
  // check keys
  // 无参数，确认设置再启动
  // dir path yes都会忽略确认
  // dir优先级最高，任何和它一起使用都不会覆盖mockPath
  // path设置config文件路径，path
  // yes忽略确认选择直接启动
  // list无任何影响，任何和它使用都不影响，但它会最后执行
  let args = getOpts(program)
  'path' in args && (args.path = getPath(args.path))
  'dir' in args && (args.dir = getPath(args.dir))
  Exec.exec(args);
}





