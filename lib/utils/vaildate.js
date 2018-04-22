const fs = require('fs');
const Utils = require('./utils.js');

// {code: Number, msg: String} 0 is vaild; 1 is type error; 2 is value invaild;

function check_mockPath (mockPath) {
  console.log(mockPath)
  if (!fs.existsSync(mockPath)) {
    return { code: 2, msg: 'mock path is invaild'}
  }
  return {code: 0}
}

module.exports = {
  getType (key, def) {
    if (key !== 'domain') {
      return new Map([[def.constructor, true]])
    } else {
      return new Map([[Array, String], [String, true]])
    }
  },
  check (def, v, key) {
    let result = { code: 0 };
    if (key === 'mockPath') {
      result = check_mockPath(v || def);
    }
    if (v !== void 0) {
      let types = module.exports.getType(key, def);
      let pass = true
      if (!types.has(v.constructor)) {
        pass = false;
        // todo check domain
      } else {
        if (v.constructor === Number) pass = !isNaN(v);
      }
      if (!pass) result = { code: 1, msg: `${key} type error, need ${typeof def}` };
    }
    return result;
  }
}