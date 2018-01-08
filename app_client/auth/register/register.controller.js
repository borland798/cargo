(function () {
    angular
        .module('cargoApp')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', 'authentication', 'cargoData'];
    function registerCtrl($location, authentication, cargoData) {
        var vm = this;

        vm.pageHeader = {
            title : 'Шинээр бүртгүүлэх'
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function () {
            vm.formError = "";
            cargoData
                .addLocation(vm.location)
                .error(function (err) {
                    if (err.code == 11000) {
                        vm.formError = "Уг тээш хадгалах газрын нэр бүртгэгдсэн байна.";
                    } else {
                        vm.formError = "Тээш хадгалах газар бүртгэхэд алдаа гарлаа.";
                    }
                })
                .then(function (data) {
                    var id = data.data._id;
                    vm.credentials.locationId = id;
                    authentication
                        .register(vm.credentials)
                        .error(function (err) {
                            if (err.code == 11000) {
                                vm.formError = "Уг хэрэглэгчийн нэр бүртгэгдсэн байна. ";
                            } else {
                                vm.formError = "Хэрэглэгч бүртгэхэд алдаа гарлаа. ";
                            }
                            cargoData
                                .deleteLocation(id)
                                .success(function () {
                                })
                                .error(function () {
                                    vm.formError += "Үүссэн газрыг устгахад алдаа гарлаа."
                                });

                        })
                        .then(function () {
                            $location.search('page', null);
                            $location.path(vm.returnPage);
                        });
                });
        };
    }
})();