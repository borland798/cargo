(function () {
    angular.module('cargoApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

    function config ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/about', {
                templateUrl: 'about/about.html',
                controller: 'aboutCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }

    angular
        .module('cargoApp')
        .config(['$routeProvider', '$locationProvider', config]);
})();
