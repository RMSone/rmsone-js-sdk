define(['app'], function (app) {
    'use strict';
    app.controller('SubmitappCtrl', function($scope, $http, $location) {
        $scope.appinfo = {};
        $scope.appinfo.appname="";
        $scope.appinfo.apppath="";
        $scope.appinfo.desinationappath="";
        $scope.appinfo.configjson ="";
        $scope.appinfo.appdescription="";
        $scope.jsonobj ={};
        $scope.file = "";
        $scope.files =[]
        $scope.uploadObj={};
        $scope.imageinput="";

        $scope.submitapp = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                $scope.postAppInfo();
            } else {
                return angular.forEach(err.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    return $scope.errors[field] = error.message;
                });
            }
        };

        $scope.postAppInfo = function(){
            var request = $http({
                method: "post",
                url: "/api/configs/appinfo",
                dataType: "json",
                data: {"name":  $scope.appinfo.appname, "appfoldername":$scope.appinfo.apppath,"configjson":$scope.appinfo.configjson,"destinationapppath":$scope.appinfo.desinationappath, "content":$scope.appinfo.appdescription, "status":"Installed"}

            }).success(function(){alert('App has been submitted successfully.')});

            $scope.uploadObj.files = $scope.files;
            $scope.uploadObj.destinationpath =  $scope.appinfo.desinationappath;
            var uploadrequest = $http({
                method: "post",
                url: "/api/configs/upload",
                data: $scope.uploadObj

            }).success(function(){
                console.log("success");
            }).error(function(){
                console.log("failure");
            });

            $scope.getAppInfo()
           // $scope.appinfo = "";

        };

        $scope.getAppInfo = function() {
            $http.get('/api/configs/appinfo').success(function(data) {
                $scope.jsonobj = data;

            });
        };

        $scope.getAppInfo();
        $scope.gridOptions = {
            data: "jsonobj",
            multiSelect:"false",
            enablePaging:"true",
            enableCellEdit: true,
            enableCellSelection: true,
            enableRowSelection: false,
            pagingOptions:[{ pageSizes: [250, 500, 1000], pageSize: 250, totalServerItems: 0, currentPage: 1 }],
            footerRowHeight: 55,
            jqueryUITheme: true,
            disableEndCellEditWhenInvalidInput: $scope.disableEndCellEditWhenInvalidInputConfig,
            columnDefs: [
                {
                    field: "name",
                    displayName: "App Name",
                    visible: true
                },
                {
                    field: "appfoldername",
                    displayName: "App Path",
                    visible: true
                },
                {
                    field: "content",
                    displayName: "Description",
                    visible: true
                },
                {
                    field: "status",
                    displayName: "Status",
                    visible: true
                }

            ]
        };

        var input = document.getElementById("fileURL");
        var output = document.getElementById("fileOutput");



        input.addEventListener("change", function(e) {
            $scope.files = e.target.files;

            if(e.target.files.length>0){
                var file = e.target.files[0];
                var path = e.target.files[0].webkitRelativePath;
                $scope.appinfo.apppath = path.substring(0,path.indexOf("/"));

            }

        }, false);

//        var imageinput = document.getElementById("imageURL");
//        imageinput.addEventListener("change", function(e) {
//            $scope.imageinput = e.target;
//
//        }, false);


    });

});