(function () {
    angular
        .module('cargoApp')
        .controller('aboutCtrl', aboutCtrl);

    function aboutCtrl() {
        var vm = this;

        vm.pageHeader = {
            title : 'Сайтыг хэрэглэх заавар'
        };
    }
})();