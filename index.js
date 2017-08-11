var util = require('util')
  , AbstractLevelDOWN = require('abstract-leveldOWN').AbstractLevelDOWN;


function AWSS3LevelDOWN (location) {
    AbstractLevelDOWN.call(this, location)
  }


  // our new prototype inherits from AbstractLevelDOWN
  util.inherits(AWSS3LevelDOWN, AbstractLevelDOWN);

  // implement some methods

  AWSS3LevelDOWN.prototype._open = function (options, callback) {
    // initialise a memory storage object
    console.log(options);
    // optional use of nextTick to be a nice async citizen
    process.nextTick(function () { callback(null, this) }.bind(this))
}


AWSS3LevelDOWN.prototype._put = function (key, value, options, callback) {
 key = '_' + key // safety, to avoid key='__proto__'-type skullduggery
 this._store[key] = value
 process.nextTick(callback)
}

AWSS3LevelDOWN.prototype._get = function (key, options, callback) {
 var value = this._store['_' + key]
 if (value === undefined) {
   // 'NotFound' error, consistent with LevelDOWN API
   return process.nextTick(function () { callback(new Error('NotFound')) })
 }
 process.nextTick(function () {
   callback(null, value)
 })
}

AWSS3LevelDOWN.prototype._del = function (key, options, callback) {
 delete this._store['_' + key]
 process.nextTick(callback)
}


module.exports = AWSS3LevelDOWN;
