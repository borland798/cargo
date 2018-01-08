(function () {
    angular
        .module('cargoApp')
        .controller('addModalCtrl', addModalCtrl);
    
    addModalCtrl.$inject = ['$modalInstance', 'cargoData'];
    function addModalCtrl($modalInstance, cargoData) {
        var vm1 = this;

        vm1.formData = {
            name : ""
        };

        vm1.onSubmit = function () {
            vm1.formError = "";
            cargoData.addCargo({
                name : vm1.formData.name,
                number : vm1.formData.number,
                busNumber : vm1.formData.busNumber,
                from : vm1.formData.from,
                desc : vm1.formData.description
            })
                .success(function (data) {
                    vm1.modal.close(data);
                })
                .error(function (err) {
                    vm1.formError = "Хадгалахад алдаа гарлаа. Алдаа: " + err;
                });
        };

        cargoData
            .buses()
            .success(function (buses) {
                vm1.buses = buses;
            })
            .error(function (err) {
                vm1.formError = "Автобус татахад алдаа гарлаа." + err;
            });

        vm1.modal = {
            close : function (result) {
                $modalInstance.close(result);
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };
    }
})();