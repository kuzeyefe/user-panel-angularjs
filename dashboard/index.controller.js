(function () {
  'use strict';

  angular
    .module('app')
    .controller('Dashboard.IndexController', ['$scope', "AuthenticationService", "$state", Controller]);

  function Controller($scope, AuthenticationService, $state) {
    $scope.destroySession = function () {
      AuthenticationService.logout();
    };


    $scope.logout = function () {
      AuthenticationService.logout();
      $state.go('login');
    };
  }

})();