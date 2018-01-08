var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var ctrlCargos = require('../controllers/cargos');
var ctrlLocations = require('../controllers/locations');
var ctrlAuth = require('../controllers/authentication');

//Cargo
router.get('/cargo', auth, ctrlCargos.getCargos);
router.get('/cargo/:cargoid', ctrlCargos.getCargo);
router.get('/searchCargos/:text',ctrlCargos.searchCargos)
router.post('/newCargo', auth, ctrlCargos.createCargo);
router.put('/updateCargo/:cargoid', auth, ctrlCargos.updateCargo);

//Location
router.post('/newLocation', ctrlLocations.createLocation);
router.delete('/location/:locationid', ctrlLocations.delete);

//Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
