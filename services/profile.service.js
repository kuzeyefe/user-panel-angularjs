function ProfileService($http) {
  function getProfile() {
    return $http.get('http://localhost:3000/users/profile').then(function (response) {
      return response.data.data;
    });

  }
 
  function updateProfile(userData) {
    return $http.put('http://localhost:3000/users/', userData).then(function (response) {
      return response.data.data;
    });
  }
  return {
    getProfile: getProfile,
    updateProfile: updateProfile
  };
}