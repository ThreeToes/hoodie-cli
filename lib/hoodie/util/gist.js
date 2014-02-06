var ghauth = require('./ghauth');
var request = require('request');

var gistUrl = 'https://api.github.com/gists';

var internals = {
  makeReq: function (gistData, authData, callback) {
    var reqOptions = {
      url: gistUrl,
      headers : {
        'Authorization': 'bearer ' + authData.token,
        'X-GitHub-OTP' : authData.otp || null,
        'User-Agent'   : 'hoodie-cli',
        'Content-type' : 'application/json'
      },
      method: 'POST',
      json: {
        description: "hoodie-cli verbose output",
        "public": true,
        "files": {
          "hoodie-cli-output.sh": {
            "content": gistData
          }
        }
      }
    };

    request.post(reqOptions, function(err, body) {
      if (err) {
        return callback(err, null);
      }

      return callback(null, body);
    });

  },

  getGHAuthData: function(callback) {

    ghauth.getGHToken(function(err, authData) {
      if (err) {
        return callback(err);
      }

      return callback(null, authData);

    });

  }

};

exports.create = function (data, callback) {

  internals.getGHAuthData(function (err, authData) {

    internals.makeReq(data, authData, function (err, resp) {
      if (err) {
        return callback(err);
      }

      return callback(null, resp);
    });

  });

};

