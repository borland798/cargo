var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/cargo';

if (process.env.NODE_ENV==='production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI, {useMongoClient: true});

mongoose.connection.on('connected', function () {
   console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');        
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function () {
   gracefulShutdown('nodemon restart', function () {
       process.kill(process.pid, 'SIGUSR2');
   });
});

process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

process.once('SIGTERM', function () {
    gracefulShutdown('heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./cargos');
require('./users');
require('./locations');

