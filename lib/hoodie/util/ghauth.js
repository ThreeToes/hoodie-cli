var ghauth = require('ghauth');

var authOptions = {
  configName : 'hoodie-cli',
  scopes     : ['gist'],
  note       : 'hoodie-cli',
  userAgent  : 'hoodie-cli'
};

exports.getGHToken = function (callback) {

  ghauth(authOptions, function (err, authData) {

    if (err) {
      return callback(err);
    }

    return callback(null, authData);
  });

};

