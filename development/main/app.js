define(loadConfig(), function (main, angularAMD) {
    'use strict';

    var app = angular.module('ecosystemApp', moduledepandancy);

    app.config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                templateUrl: 'app/bootstrapp/client/bootstrapp.html', controller: 'BootstrappCtrl'
            }))
            .when("/submitapp", angularAMD.route({
                templateUrl: 'app/bootstrapp/client/submitapp.html', controller: 'SubmitappCtrl'
            }))

            .otherwise({});
        $locationProvider.html5Mode(true);
        return $httpProvider.interceptors.push('authInterceptor');
    });
    app.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    $cookieStore.remove('token');
                }
                return $q.reject(response);
            }
        };
    });
    app.controller('NavbarCtrl', function ($scope, $location, $http, Auth) {
        $scope.menu = [
            {
                title: 'Home',
                link: '/'
            }
        ];
        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.$on('someEvent', function (event, data) {
            console.log(data);
        });


        $scope.list = [
            {
                "id": 1,
                "title": "Home",
                "editing": false,
                "pagetitle": "",
                "pageid": "",
                "items": []
            }
        ];
        $scope.logout = function () {
            Auth.logout();
            return $location.path('/login');
        };
        $scope.navclick = function (item) {
            if (item.pageid == '')
                $location.path('/');
            $http.get('/api/configs/page/' + item.pageid).success(function (pageData) {
                if (JSON.parse(pageData.data).type == 'app') {
                    $location.path(JSON.parse(pageData.data).navigationpath)
                }
                else
                    $location.path('/display/' + item.pageid + "/" + (item.title).split(' ').join('_'));
            });
        };
        $scope._getMenuData = function () {
            $http.get('/api/configs/navbar').success(function (menu) {
                if (menu && menu != '') {
                    $scope.list = JSON.parse(menu.navbar);
                }
            });
        };
        $scope._getMenuData();
        if ($scope.isLoggedIn())
            $scope._getMenuData();
        return $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
    app.run(function ($rootScope, $location, Auth) {
        return $rootScope.$on('$routeProvider', function (event, next) {
            return Auth.isLoggedInAsync(function (loggedIn) {
                if (next.authenticate && !loggedIn) {
                    return $location.path("/login");
                }
            });
        });
    });
    return  angularAMD.bootstrap(app);
});
