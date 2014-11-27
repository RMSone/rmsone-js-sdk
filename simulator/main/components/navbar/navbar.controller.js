(function() {
    'use strict';
    angular.module('ecosystemApp').controller('NavbarCtrl', function($scope, $location,$http, Auth) {
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
        $scope.logout = function() {
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
                    $scope.list = JSON.parse(menu.navbar);
                }
            });
        };
        if($scope.isLoggedIn())
            $scope._getMenuData();
        return $scope.isActive = function(route) {
            return route === $location.path();
        };
    });

}).call(this);