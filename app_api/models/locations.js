var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

mongoose.model('Location', locationSchema);
