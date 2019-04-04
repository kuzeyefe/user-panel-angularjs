function UserService($http) {
  function getUsers() {
    return $http.get('http://localhost:3000/users').then(function (response) {
      return response.data.data.rows;
    });
  }
  function saveUser(userData) {
    return $http.post('http://localhost:3000/users', userData).then(function (response) {
      return response.data.data;
    });
  }
  function updateUser(userData) {
    return $http.put('http://localhost:3000/users/'+userData.user.id+'/account', userData).then(function (response) {
      return response.data.data;
    });
  }
  function getUserById(userId) {
    return $http.get('http://localhost:3000/users/'+userId+'/account').then(function (response) {
      return response.data.data;
    });
  }
  return {
    getUsers: getUsers,
    saveUser: saveUser,
    updateUser: updateUser,
    getUserById: getUserById
  };
}