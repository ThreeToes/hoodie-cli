var path = require('path');
var fs = require('fs');
var ghauth = require('./ghauth');

exports.getHomeDir = function() {
  var homedir = 'HOME';

  if (process.platform === 'win32') {
    homedir = 'USERPROFILE';
  }

  return path.join(process.env[homedir]);

};

exports.hasAuthData = function (callback) {

  var authDatafile = path.resolve(exports.getHomeDir() + '/.config/hoodie-cli.json');
  var authDataFileExists = fs.existsSync(authDatafile);

  console.log(authDatafile, authDataFileExists);

  if (!authDataFileExists) {
    exports.createAuthData(function() {

    });

  }

  return callback(null, {});

};

exports.createAuthData = function(callback) {

  ghauth.getGHToken(function(err, authData) {
    if (err) {
      return callback(err);
    }

    return callback(null, authData);

  });

};

