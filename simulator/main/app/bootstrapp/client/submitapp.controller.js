(function() {
    'use strict';
    var app;

    app = angular.module('ecosystemApp');

    'use strict';

    app.controller('SubmitappCtrl', function($scope, $http, $location) {
        $scope.appinfo = {};
        $scope.appinfo.appname="";
        $scope.appinfo.apppath="";
        $scope.appinfo.sourcepath="";
        $scope.appinfo.desinationappath="";
        $scope.appinfo.configjson ="";
        $scope.appinfo.appdescription="";
        $scope.jsonobj ={};
        $scope.file = "";
        $scope.files =[]
        $scope.uploadObj={};
        $scope.imageinput="";
        $scope.appfolderdefault = "";

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

        var appfoldername ="";

        $scope.postAppInfo = function(){

            if($scope.appinfo.apppath == ""){
                appfoldername = $scope.appfolderdefault;
            }
            else{
                appfoldername =$scope.appinfo.apppath;

            }

            var request = $http({
                method: "post",
                url: "/api/configs/appinfo",
                dataType: "json",
                data: {"name":  $scope.appinfo.appname, "appfoldername":appfoldername,"configjson":$scope.appinfo.configjson,"destinationapppath":$scope.appinfo.desinationappath, "content":$scope.appinfo.appdescription, "status":"Installed"}

            }).success(function(){alert('App has been submitted successfully.')});

            $scope.uploadObj.files = $scope.files;
            $scope.uploadObj.sourcepath = $scope.appinfo.sourcepath;
            $scope.uploadObj.destinationpath =  $scope.appinfo.desinationappath;
            $scope.uploadObj.appfoldername =  $scope.appinfo.apppath;
            var createdirectory = $http({
                method: "post",
                url: "/api/configs/createdirectory",
                data: $scope.uploadObj

            }).success(function(){

                console.log("success");
            }).error(function(){
                console.log("failure");
            });

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

        input.addEventListener("change", function(e) {
            $scope.files = e.target.files;
            if(e.target.files.length>0){
                var path = e.target.files[0].webkitRelativePath;
                $scope.appfolderdefault = path.substring(0,path.indexOf("/"));
            }

        }, false);

//        var imageinput = document.getElementById("imageURL");
//        imageinput.addEventListener("change", function(e) {
//            $scope.imageinput = e.target;
//
//        }, false);


    });

}).call(this);