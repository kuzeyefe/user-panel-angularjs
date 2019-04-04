(function () {
  'use strict';

  angular
    .module('app')
    .controller('SignUp.IndexController', ['$scope', 'AuthenticationService', '$mdToast', "$state", Controller]);

  function Controller($scope, AuthenticationService, $mdToast, $state) {
    this.user = {
      username: null,
      password: null,
      firstName: null,
      lastName: null
    };
    this.signUp = function () {
      AuthenticationService.register(this.user).then(function (msg) {
        $state.go('dashboard');
      }, function (errMsg) {
        $scope.showToast(errMsg.data.msg);
      });
    };
    $scope.showToast = function (message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .hideDelay(3000)
          .position("top right")
      );
    }
    this.login = function () {
      $state.go('login');
    };
  }

})();