(function () {
  'use strict';

  angular
    .module('app')
    .factory("ProfileService", ProfileService)
    .controller('Profile.IndexController', ["profile","$mdToast", "ProfileService", Controller]);

  function Controller(profile, $mdToast, ProfileService) {
    this.profile = profile;
    this.updateProfile = () => {
      let userData = {
        username: this.profile.username,
        firstName: this.profile.firstName,
        lastName: this.profile.lastName
      }
      ProfileService.updateProfile({ user: userData }).then((res) => {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Profile updated successfully!")
            .hideDelay(3000)
            .position("top right")
        );
      }, error => {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Error occured during update operation!")
            .hideDelay(3000)
            .position("top right")
        );
      });
    }
  }

})();