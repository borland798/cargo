(function () {
    angular
        .module('cargoApp')
        .controller('homeCtrl', homeCtrl);

    if (window.location.pathname !== '/') {
        window.location.href = '/#' + window.location.pathname;
    }

    homeCtrl.$inject = ['$modal', 'cargoData', 'authentication', 'PagerService'];
    function homeCtrl ($modal, cargoData, authentication, PagerService) {
        var vm = this;

        vm.message = "";

        vm.pageHeader = {
            title: 'Ачаа тээш бүртгэл',
            strapline: 'Таньд хөдөө орон нутгаас ачаа тээш илгээсэн үү!'
        };

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.currentUser = authentication.currentUser();

        if (vm.isLoggedIn) {
            cargoData.cargos()
                .success(function(data) {
                    vm.message = data.length > 0 ? "" : " Ачаа тээш олдсонгүй";
                    vm.data = { cargos : data };
                    showPager(data);
                })
                .error(function (err) {
                    vm.message = "Алдаа гарлаа" + err;
                });
        }


        vm.search = function(text) {
            vm.message = "Хайж байна...";
            cargoData.searchCargos(text)
                .success(function (data) {
                    vm.message = data.length > 0 ? "" : "Үр дүн олдсонгүй.";
                    vm.result = { cargos : data };
                })
                .error(function (err) {
                    vm.message = "Алдаа гарлаа" + err;
                });
        };

        vm.popupAddForm = function() {
            var modalInstance = $modal.open({
                templateUrl: '/addModal/addModal.view.html',
                controller: 'addModalCtrl as vm1'
            });

            modalInstance.result.then(function (data) {
                vm.data.cargos.push(data);
                showPager(vm.data.cargos);
            });
        };

        vm.popupDetailForm = function(cargoid) {
            $modal.open({
                templateUrl: '/detailModal/detailModal.view.html',
                controller: 'detailModalCtrl as vm',
                resolve: {
                    data: function () {
                        return {
                            cargoid : cargoid
                        };
                    }
                }
            });
        };

        vm.received = function(cargoid, status) {
            cargoData
                .updateCargo(cargoid, {
                    value : !status
                })
                .success(function () {
                    vm.data.cargos.forEach(function (cargo) {
                        if (cargo._id === cargoid) {
                            cargo.status = !status;
                        }
                    });
                })
                .error(function (err) {
                    vm.message = err;
                });
        };

        function showPager(data) {
            vm.dummyItems = data; // dummy array of items to be paged
            vm.pager = {};
            vm.setPage = setPage;

            initController();

            function initController() {
                // initialize to page 1
                vm.setPage(1);
            }

            function setPage(page) {
                if (page < 1 || page > vm.pager.totalPages) {
                    return;
                }

                // get pager object from service
                vm.pager = PagerService.GetPager(vm.dummyItems.length, page,3);

                // get current page of items
                vm.page = { cargos : vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1)};
            }
        }
    }
})();
