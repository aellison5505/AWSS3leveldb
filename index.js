var util = require('util')
  , AbstractLevelDOWN = require('abstract-leveldOWN').AbstractLevelDOWN;
var AWS = require('aws-sdk');


function AWSS3LevelDOWN (location) {
  this._loc=location+'/';
  if (!(this instanceof AWSS3LevelDOWN)){
    return new AWSS3LevelDOWN(location);
  }
    AbstractLevelDOWN.call(this, location);
  }


  // our new prototype inherits from AbstractLevelDOWN
  util.inherits(AWSS3LevelDOWN, AbstractLevelDOWN);

  // implement some methods

AWSS3LevelDOWN.prototype._open = function (options, callback) {
    // initialise a memory storage object
    console.log(this._loc);
    console.log(options);
    AWS.config.update({
        region: options.reg,
        credentials: options.cred
    });

    this._s3 = new AWS.S3({
        apiVersion: '2006-03-01',
  //      params: {Bucket: options.buck}
        });
    var params = {
      Bucket: options.buck /* required */
    };
    this._s3.headBucket(params, function(err, data) {
     if (err){ console.log(err); // an error occurred
      //  return process.nextTick(function () { callback(new Error('NotFound'), this).bind(this) });

     } else
          console.log(data);           // successful response
          //check for exits file!
          //if not create it
    });

    // optional use of nextTick to be a nice async citizen
    process.nextTick(function () { callback(null, this) }.bind(this));
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
