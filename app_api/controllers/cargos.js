var mongoose = require('mongoose');
var Cargo = mongoose.model('Cargo');
var Location = mongoose.model('Location');
var User = mongoose.model('User');
var getLocation = function(req, res, callback) {
    if (req.payload && req.payload.username) {
        User
            .findOne({ username : req.payload.username }, function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "User not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                callback(req, res, user.locationId);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "User not found"
        });
    }
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getCargos = function (req, res) {
    getLocation(req, res, function (req, res, locationId) {
        Cargo
            .find({locationId: locationId}, function (err, cargos) {
                if (!err) {
                    sendJsonResponse(res, 200, cargos);
                } else {
                    sendJsonResponse(res, 400, err);
                }
            })
            .sort({date:-1});
    });
};

module.exports.getCargo = function (req, res) {
    Cargo
        .findById(req.params.cargoid, function (err, cargo) {
            if (!err) {
                Location
                    .findById(cargo.locationId, function (err, location) {
                        if (!err) {
                            var newCargo = {
                                name : cargo.receiverName,
                                number : cargo.receiverNumber,
                                description : cargo.description,
                                date : cargo.date,
                                status : cargo.status,
                                bus : cargo.bus,
                                location : {
                                    name : location.name,
                                    number : location.number,
                                    address : location.address
                                }
                            };
                            sendJsonResponse(res, 200, newCargo)
                        }
                        else {
                            sendJsonResponse(res, 400, "location not found");
                        }
                    });
            } else {
                sendJsonResponse(res, 400, "Cargo not found.");
            }
        });
};

module.exports.createCargo = function (req, res) {
    getLocation(req, res, function (req, res, locationId) {
        Cargo.create({
            receiverName: req.body.name,
            receiverNumber: req.body.number,
            bus: {
                number : req.body.busNumber,
                from : req.body.from
            },
            locationId: locationId,
            description: req.body.desc
        }, function (err, cargo) {
            if (!err) {
                sendJsonResponse(res, 201, cargo);
            } else {
                sendJsonResponse(res, 400, err);
            }
        });
    });
};

module.exports.updateCargo = function (req, res) {
    getLocation(req, res, function (req, res, locationId) {
        Cargo
            .findById(req.params.cargoid, function (err, cargo) {
                if (!err) {
                    if (cargo.locationId == locationId) {
                        cargo.status = req.body.value;
                        cargo.save(function (err, cargo) {
                            if (!err) {
                                sendJsonResponse(res, 200, cargo);
                            }
                            else {
                                sendJsonResponse(res, 400, err);
                            }
                        });
                    }
                    else {
                        sendJsonResponse(res, 400, {"message" : "Unauthorized Error"});
                    }
                } else {
                    sendJsonResponse(res, 400, err);
                }
            })
            .select('status locationId');
    });
};

module.exports.searchCargos = function (req, res) {
    var text = req.params.text;
    var number = text;
    if (isNaN(text)) {
        number = 0;
    }
    var regex = new RegExp(text, 'i');
    Cargo
        .find({
                status: true,
                $or: [
                    {receiverName: regex},
                    {receiverNumber: number}
                ]
            }, function (err, cargos) {
            if (!err) {
                sendJsonResponse(res, 200, cargos);
            } else {
                sendJsonResponse(res, 400, err);
            }
        });
};