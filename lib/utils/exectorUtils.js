const Default = require('../defaultConf.js');
const {getType, check} = require('./vaildate.js');

function getMsg (types) {
  let list = [] // type msg
  types.forEach((value, key) => {
    let msg = value === true ? '' : `${value.name}`;
    if (key.name === 'Array') msg = (msg ? ('每一项为' + msg) : '') + ',用逗号隔开';
    list.push({type: key.name, msg})
  })
  return list.map(item => `值为${item.type}类型${item.msg ? `(${item.msg})` : ''}`).join('或')
}

function genItem (v, key, keys) {
  let types = getType(key, v);
  let item = {
    keys,
    name: key,
    message: `当前编辑：${key}, ${getMsg(types)}`
  };
  if (types.has(Boolean)) {
    item.type = 'confirm';
  } else if (types.has(Number) || types.has(String) || types.has(Array)) {
    item.type = 'input';
    if (types.has(Array)) { // todo array child is string
      item.filter = iv => iv.split(',').map(i => i.trim());
    } else if (types.has(Number)) {
      item.filter = iv => Number(iv)
    }
    item.validate = iv => check(v, iv, key).code === 0;
  } else { // function 
    item.type = 'editor'
  }
  return item;
}

function treeObject (obj, curKey, keys) {
  let result = []; // item {type, name, message, default, choices, validate} choices {name, checked, children}
  if (obj && obj.constructor === Object) {
    let choices = {
      type: 'checkbox',
      name: curKey || 'root',
      message: `choose options of ${curKey || 'root'}(Press <space> to select, <a> to toggle all, <i> to invert selection)`,
      choices: []
    }
    let keyList = keys || [];
    Object.keys(obj).map(key => {
      let curKeys = keyList.slice();
      curKeys.push(key)
      choices.choices.push({
        name: key,
        checked: false,
        children: treeObject(obj[key], key, curKeys)
      })
    })
    result.push(choices)
  } else {
    result.push(genItem(obj, curKey, keys));
  }
  return result;
}

module.exports = {
  getOptions () {
    return treeObject(Default, 'root', null);
  },
  getChildOpts(res, opts) {
    // ex {root: [proxyBaseConf]} [{name: root, choices: [{proxyBaseConf: {children: []}}]}]
    // 通过最后keys来生成config
    let result = []; // 返回对象或数组，数组则继续选择，对象则是配置项
    Object.keys(res).forEach(key => {
      let opt = opts.find(item => item.name === key);
      if (opt) {
        if (res[key].length > 0) {
          res[key].forEach(childKey => {
            if (opt.choices) {
              let item = opt.choices.find(item => item.name === childKey);
              if (item) result.push(item.children[0])
            }
          })
        }
      }
    })
    if (result.length === 0) {
      // todo 暂时因为层级原因导致会一次输入
      result = {};
      opts.forEach(item => {
        if (item.keys && item.name in res) {
          let obj = result;
          item.keys.forEach((key, i) => {
            if (i === item.keys.length - 1) {
              obj[key] = res[key]
            } else {
              !obj[key] && (obj[key] = {});
              obj = obj[key]
            }
          })
        }
      })
    }
    return result;
  }
}