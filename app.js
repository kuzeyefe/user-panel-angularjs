(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'ngStorage'])
        .constant('AUTH_EVENTS', {
            notAuthenticated: 'auth-not-authenticated'
        })
        .constant('API_ENDPOINT', {
            url: 'http://127.0.0.1:3000'
            //  For a simulator use: url: 'http://127.0.0.1:8080/api'
        })
        .config(config)
        .controller('Main.IndexController', ['$scope', '$mdSidenav', MainController])
        .run(run);
   
    function MainController($scope, $mdSidenav) {
        $scope.toggleLeft = buildToggler('left');

        function buildToggler(componentId) {
          return function () {
            $mdSidenav(componentId).toggle();
          };
        }
    }

    function config($stateProvider,  $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'dashboard/index.view.html',
                controller: 'Dashboard.IndexController',
                controllerAs: 'vm'
            })
            .state('dashboard.profile', {
                url: '/profile',
                templateUrl: 'profile/index.view.html',
                controller: 'Profile.IndexController',
                controllerAs: 'vm',
                resolve: {
                    profile: function (ProfileService) {
                      return ProfileService.getProfile();
                    }
                  }
            })
            .state('dashboard.users', {
                url: '/users',
                templateUrl: 'users/index.view.html',
                controller: 'User.IndexController',
                controllerAs: 'vm',
                resolve: {
                    users: function (UserService) {
                      return UserService.getUsers();
                    }
                  }
            })
            .state('login', {
                url: '/login',
                cache: false,
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            })
            .state('sign-up', {
                url: '/sign-up',
                cache: false,
                templateUrl: 'sign-up/index.view.html',
                controller: 'SignUp.IndexController',
                controllerAs: 'vm'
            });
    }
    function run($rootScope, $state, AuthenticationService, AUTH_EVENTS) {
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
            if (!AuthenticationService.isAuthenticated()) {
                console.log(next.name);
                if (next.name !== 'login' && next.name !== 'sign-up') {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
    }
})();