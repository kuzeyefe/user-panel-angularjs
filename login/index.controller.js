(function () {
  'use strict';

  angular
    .module('app')
    .controller('Login.IndexController', ['$scope', 'AuthenticationService', '$mdToast', "$state", Controller]);

  function Controller($scope, AuthenticationService, $mdToast, $state) {
    this.user = {
      username: null,
      password: null
    };

    this.login = function () {
      AuthenticationService.login(this.user).then(function (msg) {
        $state.go('dashboard');
      }, function (errMsg) {
        $scope.showToast(errMsg.data.msg);
      });
    };

    this.signUp = () => {
      $state.go('sign-up');
    }
    $scope.showToast = function (message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .hideDelay(3000)
          .position("top right")
      );
    }
  }

})();