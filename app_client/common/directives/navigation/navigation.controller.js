(function () {
    angular
        .module('cargoApp')
        .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$location', 'authentication'];
    function navigationCtrl($location, authentication) {
        nvm = this;

        nvm.currentPath = $location.path();

        nvm.isLoggedIn = authentication.isLoggedIn();

        nvm.currentUser = authentication.currentUser();

        nvm.logout = function() {
            authentication.logout();
            $location.path('/#');
        };
    }
})();