var levelup = require('levelup');
//var s3leveldb = require('./index.js');

var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});



var accessKeyId = 'AKIAILBZUF2AMWXMXMMA';
var secretAccessKey = '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';

var cr = new AWS.Credentials(accessKeyId, secretAccessKey, sessionToken = null);

var db = levelup('mydb', {
  // the 'db' option replaces LevelDOWN
  db: require('./index.js'),
  reg: 'us-east-1',
  cred: cr,
  buck: 'aellison'
});
