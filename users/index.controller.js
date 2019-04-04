(function () {
  'use strict';

  angular
    .module('app')
    .factory("UserService", UserService)
    .controller('User.IndexController', ['users', '$scope',
      '$mdDialog', '$mdToast', 'UserService', Controller]);

  function Controller(users, $scope, $mdDialog, $mdToast, UserService) {
    this.users = users;
    this.showAddUserDialog = function (event) {
      let userData = {
        firstName: null,
        lastName: null,
        password: null,
        username: null
      }
      $mdDialog.show({
        controller: DialogController,
        templateUrl: './users/user-detail-dialog.view.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        scope: $scope,
        userData: null,
        mainController: this,
        preserveScope: true,
        fullscreen: true
      });
    }
    this.showUserDetailDialog = function (userId) {
      UserService.getUserById(userId).then((response) => {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: './users/user-detail-dialog.view.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          scope: $scope,
          userData: response,
          mainController: this,
          preserveScope: true,
          fullscreen: true
        });
      }, (error) => {
        $scope.showToast("Error occured during retriving user data!");
      })

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
  function DialogController($scope, $mdDialog, userData, mainController, UserService) {
    $scope.postData = { ...userData };
    $scope.cancel = () => {
      $mdDialog.cancel();
    };
    $scope.saveUser = () => {
      if (!userData) {
        UserService.saveUser({ user: $scope.postData }).then((resolve) => {
          $mdDialog.cancel();
          $scope.postData = {
            firstName: null,
            lastName: null,
            username: null,
            password: null
          };
          $scope.showToast("User saved successfully!");
          UserService.getUsers().then((res) => {
            mainController.users = res;
          }, (error) => {
            $scope.showToast("Page refresh failed!");

          });
        }, (reject) => {
          $scope.showToast("User save operation failed!");
        });
      } else {
        UserService.updateUser({ user: $scope.postData }).then((resolve) => {
          $mdDialog.cancel();
          $scope.postData = {
            firstName: null,
            lastName: null,
            username: null,
            password: null
          };
          $scope.showToast("User updated successfully!");
          UserService.getUsers().then((res) => {
            mainController.users = res;
          }, (error) => {
            $scope.showToast("Page refresh failed!");

          });
        }, (reject) => {
          $scope.showToast("User update operation failed!");
        });
      }

    };
  }

})();