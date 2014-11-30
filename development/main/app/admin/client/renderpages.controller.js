(function() {
    'use strict';
    angular.module('ecosystemApp').controller('RenderPagesCtrl', function($scope, $http, $location,$sce, socket, appService,$stateParams) {
        $scope.templateId = 0;
        $scope.id = $stateParams.id;
        $scope.tinymceModel='';
        $scope.getTemplateContent = function() {
            $http.get('/api/configs/page/'+  $scope.id).success(function(pageData) {
                    if(JSON.parse(pageData.data).type=='app')
                        $location.path(JSON.parse(pageData.data).navigationpath)
                $scope.tinymceModel = $sce.trustAsHtml( pageData['content']);

            });
        };

        $scope.getTemplateContent();
        return $scope.$on('$destroy', function() {
            return null;
        });
    });

}).call(this);