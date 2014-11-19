define(['app'], function (app) {
    'use strict';
    app.controller('MenuCtrl', function ($scope, $http, Auth) {
        $scope.parameters = {
            dragEnabled: true,
            emptyPlaceholderEnabled: false,
            maxDepth: 10,
            dragDelay: 0,
            dragDistance: 0,
            lockX: false,
            lockY: false,
            boundTo: "",
            spacing: 20,
            coverage: 50,
            cancelKey: "esc",
            copyKey: "shift",
            selectKey: "ctrl",
            enableExpandOnHover: true
        };
        $scope.selected = '';
        $scope.pages=[];
        $scope.showinput=true;
        $scope.list = null;

        $scope.editing = true;
        $scope.isAdmin = Auth.isAdmin;

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

        $scope.inputclick=function() {
            $scope.showinput=false;
        }
        $scope._getMenuData = function () {
            $http.get('/api/configs/navbar').success(function (menu) {
                if(menu && menu!='')
                   $scope.list = JSON.parse(menu.navbar);
            });
        };

        $scope._getPages = function () {
            $http.get('/api/configs/page').success(function (pages) {
                if(pages && pages!=''){
                    for(var i=0;i<pages.length;i++)
                    {
                        $scope.pages.push({id:pages[i]._id,title:JSON.parse(pages[i].data).title})
                    }

                }
                    //$scope.pages = pages;
            });
        };

        $scope._getMenuData();

        $scope._getPages();


        $scope.submitMenuData = function () {
            var navbar = {
                navbar: JSON.stringify($scope.list)
            };
            $http.post('/api/configs/navbar', navbar).success(function(data) {
                alert('Data Save Successful.')
            }).error((function(_this) {
                return function(err) {
                    deferred.reject(err);
                    return typeof callback === "function" ? callback(err) : void 0;
                };
            })(this));
        };

        $scope.isAdmin = Auth.isAdmin;

        $scope.deleteNode = function (item) {
            item.remove();

        };


        $scope.toggleNode = function (item) {
            item.toggle();
        };

        $scope.editNode = function (item) {
            item.editing = true;
            $scope.oldTitle = item.title;
            $scope.oldnavigationpath = item.navigationpath;
        };

        $scope.saveMenu = function (item) {
            if (item.title) {
                item.editing = false;
                $scope.showinput=true;
                if(item.selectedPages){
                    item.pageid=item.selectedPages.originalObject.id;
                    item.pagetitle=item.selectedPages.originalObject.title
                    delete item["selectedPages"];
                }

            }
        };

        $scope.cancelMenu = function (item) {
            item.title = $scope.oldTitle;
            item.navigationpath = $scope.oldnavigationpath;
            item.editing = false;
            $scope.showinput=true;
        };

        $scope.newSubItem = function (item) {
            var nodeData;
            nodeData = item.$modelValue;
            return nodeData.items.push({
                id: nodeData.id * 10 + nodeData.items.length,
                title: "New Sub Menu Name",
                items: []
            });
        };

        $scope.newtopNode = function (item) {
            var nodeData;
            nodeData = item.$modelValue;
            return this.list.push({
                id: this.list[this.list.length - 1].id + 1,
                title: "New Menu Name",
                items: []
            });
        };
    }).directive("ng-enter", function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });

});
