(function () {
    'use strict';

    angular
        .module('app')
        .service('AuthenticationService', function ($q, $http, API_ENDPOINT) {
            var LOCAL_TOKEN_KEY = 'token';
            var isAuthenticated = false;
            var authToken;

            function loadUserCredentials() {
                var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
                if (token) {
                    useCredentials(token);
                }
            }

            function storeUserCredentials(token) {
                window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
                useCredentials(token);
            }

            function useCredentials(token) {
                isAuthenticated = true;
                authToken = token;

                // Set the token as header for your requests!
                $http.defaults.headers.common.Authorization = authToken;
            }

            function destroyUserCredentials() {
                authToken = undefined;
                isAuthenticated = false;
                $http.defaults.headers.common.Authorization = undefined;
                window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            }

            var register = function (user) {
                return $http.post('http://localhost:3000/users/register', user).then(function (result) {
                    if (result.data) {
                        storeUserCredentials(result.data.data.token);
                        return result.data.data
                    }
                });
            };

            var login = function (user) {
                return $http.post('http://localhost:3000/users/auth', user).then(function (result) {
                    if (result.data) {
                        storeUserCredentials(result.data.data.token);
                        return result.data.data;
                    }
                });
            };

            var logout = function () {
                destroyUserCredentials();
            };

            loadUserCredentials();

            return {
                login: login,
                register: register,
                logout: logout,
                isAuthenticated: function () { return isAuthenticated; },
            };
        })

        .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
            return {
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated,
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        })

        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });
})()