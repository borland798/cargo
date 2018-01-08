var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonRespone = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {
    if(!req.body.locationId || !req.body.username || !req.body.password) {
        sendJsonRespone(res, 400, {
            "message" : "All fields required"
        });
        return;
    }

    var user = new User();

    user.locationId = req.body.locationId;
    user.username = req.body.username;

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        if(err) {
            sendJsonRespone(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJsonRespone(res, 200, {
                "token" : token
            });
        }
    });
};

module.exports.login = function (req, res) {
    if(!req.body.username || !req.body.password) {
        sendJsonRespone(res, 400, {
            "message" : "All fields required"
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
        var token;

        if(err) {
            sendJsonRespone(res, 200, err);
        }

        if(user) {
            token = user.generateJwt();
            sendJsonRespone(res, 200, {
                "token" : token
            });
        } else {
            sendJsonRespone(res, 401, info);
        }
    })(req, res);
};