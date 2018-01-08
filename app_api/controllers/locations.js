var mongoose = require('mongoose');
var Location = mongoose.model('Location');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.createLocation = function (req, res) {
    var name = req.body.name;
    var number = req.body.number;
    var address = req.body.address;
    if (!name || !number || !address) {
        sendJsonResponse(res, 404, {"message" : "All fields required."});
    } else {
        Location.create({
            name: name,
            number: number,
            address: address
        }, function (err, location) {
            console.log(location);
            if(!err) {
                sendJsonResponse(res, 201, location);
            } else {
                sendJsonResponse(res, 400, err);
            }
        });
    }
};

module.exports.delete = function (req, res) {
    var locationId = req.params.locationid;
    if (locationId) {
        Location
            .findByIdAndRemove(locationId, function (err) {
                if (err) { throw err; }
                sendJsonResponse(res, 204, null);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message" : "Location not found"
        });
    }
};