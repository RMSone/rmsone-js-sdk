define(['app','angular', 'angularRoute','angular-cookies','angular-sanitize','angular-resource', 'components/auth/auth.service'], function (app) {
    //var app = angular.module("rmsNavbar", ['ngCookies', 'ngResource', 'ngSanitize','ngRoute','rmsAdminService']);

    app.controller('NavbarCtrl', function($scope, $location,$http, Auth) {
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

        $scope.$on('someEvent', function(event, data)
        {
            console.log(data);
        });


        $scope.list = [
            {
                "id": 1,
                "title": "Home123",
                "editing": false,
                "pagetitle": "",
                "pageid": "",
                "items": []
            }
        ];
        $scope.logout = function() {
            alert('Hi');
            Auth.logout();
            return $location.path('/login');
        };
        $scope.navclick=function(item)
        {
            if(item.pageid=='')
                $location.path('/');
            $http.get('/api/configs/page/'+  item.pageid).success(function(pageData) {
                if(JSON.parse(pageData.data).type=='app')
                    $location.path(JSON.parse(pageData.data).navigationpath)
                else
                    $location.path('/display/'+item.pageid+"/"+(item.title).split(' ').join('_'));


            });
        };
        $scope._getMenuData = function () {
            $http.get('/api/configs/navbar').success(function (menu) {
                if(menu && menu!='') {
                    //$scope.list = JSON.parse(menu.navbar);
                }
            });
        };
        if($scope.isLoggedIn())
            $scope._getMenuData();
        return $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
//    angular.element(document).ready(function() {
//        angular.bootstrap(document.getElementById("navbar"), ["rmsNavbar"]);
//
//    });
});
