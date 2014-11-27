(function() {
    'use strict';
    angular.module('mymodule',[]);
    angular.module('nonAngularApp',[]);
    angular.module('adminUiApp',[]);
    angular.module('import',[]);
    angular.module('exposure',[]);



    angular.module('ecosystemApp', ['ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap','ngGrid','ui.tree', 'angucomplete','ui.tinymce','leaflet-directive','mymodule','nonAngularApp','adminUiApp','import','exposure','ngDropdowns']).config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode(true);
        return $httpProvider.interceptors.push('authInterceptor');
    }).factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },
            responseError: function(response) {
                if (response.status === 401) {
                    $location.path('/login');
                    $cookieStore.remove('token');
                }
                return $q.reject(response);
            }
        };
    }).run(function($rootScope, $location, Auth) {
        return $rootScope.$on('$stateChangeStart', function(event, next) {
            return Auth.isLoggedInAsync(function(loggedIn) {
                if (next.authenticate && !loggedIn) {
                    return $location.path("/login");
                }
            });
        });
    });

}).call(this);
