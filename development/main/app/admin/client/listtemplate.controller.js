(function() {
    'use strict';
    angular.module('ecosystemApp').controller('ListTemplateCtrl', function($scope, $http, $location, $timeout, socket, appService) {
        $scope.jsonobj = [];
        $scope.newtemplate = {};
        $scope.newtemplate.title = "test template";
        $scope.newtemplate.type = "2";
        $scope.newtemplate.navigationpath = "www.rms.com";
        $scope.disableEndCellEditWhenInvalidInputConfig = true;
        $scope.editedTemplateIdList = [];
        $scope.templateTypes = {1: 'static', 2: 'app'};

        $scope.apps= {1: 'Import', 2: 'Exposure',3:'Enity Management',4:'MyApp'};

        $scope.templateUrl= {1: '/entityManagement', 2: '/entityManagement/entity/create'};

        $scope.jsonobj.push({"id": "", "title" : "Page1", type: "static",application: "application", navigationpath : "aSDASD"});

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
                    field: "id",
                    displayName: "Template ID",
                    visible: false
                },
                {
                    field: "title",
                    displayName: "Template Name",
                    cellTemplate: "<div class=\"ngCellText\" style=\"width:95%;padding:10px;\"><a ng-click=\"loadById(row.entity)\">{{row.getProperty(col.field)}}</a></div>",
                    //editableCellTemplate: "<div  class=\"ngCellText\"><input ngInput  type=\"text\" required ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ui-validate=\"{formValidateFn : 'formValidate($value)' }\">\"Is e-mail black-listed? {{!!template-form.$error.formValidateFn}}\"</div>",
                    enableCellEdit: true,
                    width:"25%"
                },
                {
                    field: "type",
                    displayName: "Template Type",
                    editableCellTemplate: "<select style=\"width:95%;padding-top:5px;\" ng-class=\"colt\" + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-options=\"name as name for (id, name) in templateTypes\"/>",
                    enableCellEdit: true,
                    width:"20%"
                },
                {
                    field: "application",
                    displayName: "Application",
                    editableCellTemplate: "<select style=\"width:95%;padding-top:5px;\" ng-class=\"colt\" + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-options=\"name as name for (id, name) in apps\"/>",
                    enableCellEdit: true,
                    width:"25%"
                },
                {
                    field: "navigationpath",
                    displayName: "Navigation Path",
                    editableCellTemplate: "<select style=\"width:95%;padding-top:5px;\" ng-class=\"colt\" + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-options=\"name as name for (id, name) in templateUrl\"/>",
                    enableCellEdit: true,
                    width:"25%"
                },
                {
                   displayName: "Action",
                   headerCellTemplate :
                   "<div style=\"padding-right:50px; padding-left:30px\"><a class=\"pull-right btn btn-primary btn-xs\"  ng-click=\"AddTemplate()\" style=\"margin-right: 8px;\"><span class=\"glyphicon glyphicon-plus\"></span></a></div>",
                   /*"<a class=\"pull-right btn btn-primary btn-xs\" ng-click=\"saveTemplate()\">Save</a>" ,*/

                   cellTemplate: "<div style=\"padding-right:50px; padding-left:30px\"><a class=\"pull-right btn btn-danger btn-xs\" ng-click=\"deleteTemplate(row.entity)\"> <span class=\"glyphicon glyphicon-remove\"></span></a></div>",
                   /*+ "<a class=\"btn btn-primary btn-xs pull-right\"  ng-click=\"editNode(item)\"><i class=\"glyphicon glyphicon-pencil\"></i></a>" */
                   width:"5%",
                   enableCellEdit: false
                }
            ]
        };

        $scope.successfulMessage = function(){
            $scope.message = 'Changes saved successfully...';
            $scope.showMessage = true;

            // Simulate 2 seconds loading delay
            $timeout(function() {

                // Loadind done here - Show message for 3 more seconds.
                $timeout(function() {
                    $scope.showMessage = false;
                }, 3000);

            }, 2000);
        };

        $scope.AddTemplate = function(){
            $scope.jsonobj.push({"id": "", "title" : "", type: "", navigationpath : ""});
        };

        $scope.loadById = function(row) {
            appService.setTemplateId(row.id);
            return $location.path("/editcontent")
        };

        $scope.getTemplateList = function() {
            $http.get('/api/configs/page').success(function(data) {
                $scope.convertDatatoObject(data);

            });
        };

        $scope.getTemplateList();


        $scope.convertDatatoObject = function(data){
            $scope.jsonobj = [];
            angular.forEach(data, function(item, key) {

                var obj = JSON.parse(item.data);
                return $scope.jsonobj.push({"id": item._id, "title" : obj.title, type: obj.type,application: obj.application, navigationpath : obj.navigationpath});

            });
            return $scope.jsonobj;
        };

        $scope.saveTemplate = function() {
            var saveAction = false;
            if($scope.doValidationCheck()){
                angular.forEach($scope.jsonobj, function(value, key) {
                    if(value.title != ""){
                        if(value.id == ""){
                            $scope.createTemplate(value);
                            saveAction = true;
                        }
                        else{
                            if($scope.editedTemplateIdList.indexOf(value.id) != -1) {
                                $scope.updateTemplate(value);
                                saveAction = true;
                            }
                        }
                    }

                });
                if(saveAction){
                    $scope.successfulMessage();
                }
                $scope.getTemplateList();
            }
        };

        $scope.doValidationCheck = function(){
            var hasEmptyTitle = false;
            angular.forEach($scope.jsonobj, function(value, key) {
                if(value.title == ""){
                    hasEmptyTitle = true;
                }

            });
                if(hasEmptyTitle){
                    var retVal = confirm("Template Name is mandatory. Any template without name will not be saved. Do you still want to continue with the save action?");
                    if (retVal == true) {
                        return true;
                    } else {
                        return false;
                    }
                }
            return true;
        }

        $scope.createTemplate = function(addedtemplateObj){

            var request = $http({
                method: "post",
                url: "/api/configs/page",
                dataType: "json",
                data: {data: JSON.stringify(addedtemplateObj)}
            });

           // $scope.getTemplateList();
        };

        $scope.updateTemplate = function(updatedtemplateObj) {

            var request = $http({
                method: "put",
                url: '/api/configs/page/' + updatedtemplateObj.id,
                dataType: "json",
                data: {data: JSON.stringify(updatedtemplateObj)}
            });

         //   $scope.getTemplateList();
        };

        $scope.$on('ngGridEventEndCellEdit', function(event) {
            $scope.template = event.targetScope.row.entity;
            var templateid = $scope.template.id;
            if(templateid != "" && $scope.editedTemplateIdList.indexOf(templateid) == -1){
                $scope.editedTemplateIdList.push($scope.template.id);
            }

           /* if( $scope.template.id ==""){
            $scope.createTemplate( $scope.template);}
            else{
                $scope.updateTemplate( $scope.template);
            }
            // console.log($scope.contact );*/
        });

        $scope.deleteTemplate = function(row) {

            $http["delete"]('/api/configs/page/' + row.id);
            $scope.getTemplateList();
        };
        return $scope.$on('$destroy', function() {
            return socket.unsyncUpdates('thing');
        });
    });/*.directive('contenteditable',
        function() {
            return {
                require: 'ngModel',
                link: function($scope, elm, attrs, ngModelCtrl) {
                    ngModelCtrl.$parsers.push(function(viewValue) {
                        //here, you can access $scope which will have row value so you can compare cells

                    });
                }
            };
      }).directive('ngInput', [function() {
            return {
                require: 'ngModel',
                link: function ($scope, elm, attrs, ngModel) {
                    // Store the initial cell value so we can reset to it if need be
                    var oldCellValue;
                    var dereg = $scope.$watch('ngModel', function() {
                        oldCellValue = ngModel.$modelValue;
                        dereg(); // only run this watch once, we don't want to overwrite our stored value when the input changes
                    });

                    elm.bind('keydown', function(evt) {
                        switch (evt.keyCode) {
                            case 37: // Left arrow
                            case 38: // Up arrow
                            case 39: // Right arrow
                            case 40: // Down arrow
                                evt.stopPropagation();
                                break;
                            case 27: // Esc (reset to old value)
                                if (!$scope.$$phase) {
                                    $scope.$apply(function() {
                                        ngModel.$setViewValue(oldCellValue);
                                        elm.blur();
                                    });
                                }
                                break;
                            case 13: // Enter (Leave Field)
                                if($scope.enableCellEditOnFocus && $scope.totalFilteredItemsLength() - 1 > $scope.row.rowIndex && $scope.row.rowIndex > 0  || $scope.enableCellEdit) {
                                    elm.blur();
                                }
                                break;
                        }

                        return true;
                    });

                    elm.bind('click', function(evt) {
                        evt.stopPropagation();
                    });

                    elm.bind('mousedown', function(evt) {
                        evt.stopPropagation();
                    });

                    $scope.$on('ngGridEventStartCellEdit', function () {
                        elm.focus();
                        elm.select();
                    });

                    angular.element(elm).bind('blur', function () {
                        if (!$scope.disableEndCellEditWhenInvalidInput || ngModel.$valid)
                            $scope.$emit('ngGridEventEndCellEdit');
                    });
                }
            };
        }]);*/


}).call(this);