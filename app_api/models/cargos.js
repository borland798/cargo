var mongoose = require('mongoose');

var cargoSchema = mongoose.Schema({
    receiverName : {
        type: String,
        required: true
    },
    receiverNumber: {
        type: Number,
        required: true
    },
    bus: {
        number: {
            type: String,
            required: true
        },
        from: {
            type: String,
            required: true
        }
    },
    locationId: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        "default": true
    },
    description: String,
    date: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model('Cargo', cargoSchema);