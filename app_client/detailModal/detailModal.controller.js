(function () {

    angular
        .module('cargoApp')
        .controller('detailModalCtrl', detailModalCtrl);
    
    detailModalCtrl.$inject = ['$modalInstance', 'cargoData', 'data'];
    function detailModalCtrl($modalInstance, cargoData, data) {
        var vm = this;

        cargoData
            .cargoById(data.cargoid)
            .success(function(data) {
                vm.data = data;
            });

        vm.modal = {
            close : function (result) {
                $modalInstance.close(result);
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();