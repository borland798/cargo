(function () {
    angular
        .module('cargoApp')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$location', 'authentication'];
    function loginCtrl($location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title : 'Нэвтрэх'
        };

        vm.credentials = {
            username : "",
            password : ""
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.credentials.username || !vm.credentials.password) {
                vm.formError = "Бүх талбаруудыг бөглөх ёстой!"
            } else {
                vm.doLogin();
            }
        };

        vm.doLogin = function () {
            authentication
                .login(vm.credentials)
                .error(function (err) {
                    vm.formError = err;
                })
                .then(function () {
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });
        };
    }
})();