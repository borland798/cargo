(function () {
    angular
        .module('cargoApp')
        .service('cargoData', cargoData);

    cargoData.$inject = ['$http', 'authentication'];
    function cargoData ($http, authentication) {
        var cargos = function () {
            return $http.get('/api/cargo', {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var cargoById = function(cargoid) {
            return $http.get('/api/cargo/' + cargoid);
        };

        var buses = function() {
            return $http.get('/api/bus');
        };

        var addCargo = function (data) {
            return $http.post('/api/newCargo/', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var updateCargo = function (cargoid, data) {
            return $http.put('/api/updateCargo/' + cargoid, data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var searchCargos = function (data) {
            return $http.get('/api/searchCargos/' + data);
        };

        var addLocation = function (data) {
            return $http.post('/api/newLocation/', data);
        };

        var deleteLocation = function (data) {
            return $http.delete('/api/location/' + data);
        };

        return {
            cargos : cargos,
            cargoById : cargoById,
            buses : buses,
            addCargo : addCargo,
            updateCargo : updateCargo,
            searchCargos : searchCargos,
            addLocation : addLocation,
            deleteLocation : deleteLocation
        };
    }
})();
