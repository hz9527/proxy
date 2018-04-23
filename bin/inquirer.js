const inquirer = require('inquirer')

module.exports = {
  startComfirm () {
    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmStart',
        message: 'just start proxy ?',
        default: true
      }
    ])
  },
  commomPrompt (opts) {
    return inquirer.prompt(opts)
  }
}