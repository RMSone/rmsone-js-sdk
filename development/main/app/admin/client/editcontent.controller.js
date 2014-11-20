/**
 * Created by haiqing on 10/1/14.
 */

define(['app'], function (app) {
    'use strict';

    app.controller('editContentCtrl', function($scope, $http, $location, $cookieStore, $timeout, appService) {

        $scope.tinymceOptions = {
            theme: "modern",
            plugins: [
                "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                "searchreplace wordcount visualblocks visualchars code fullscreen",
                "insertdatetime media nonbreaking save table contextmenu directionality",
                "emoticons template paste textcolor"
            ],
            toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            toolbar2: "print preview media | forecolor backcolor emoticons",
            image_advtab: true,
            height: "450px",
            width: "100%"
        }

        $scope.templateId = 0;

        $scope.retrieveTemplateId = function () {
            $scope.templateId = $cookieStore.get('templateId');
        }

        $scope.cacheTemplateId = function () {
            $cookieStore.put('templateId', $scope.templateId);
        }

        //$scope.tinymceModel = '<h1>hello world</h1><p>this is my story.  the end.</p>';

        $scope.getTemplateContent = function() {
            $scope.templateId = appService.getTemplateId();
//            if ($scope.templateId === undefined)
//                $scope.retrieveTemplateId();
//            else
//                $scope.cacheTemplateId();

            $http.get('/api/configs/page/'+ $scope.templateId + '?fields=content').success(function(pageData) {
                $scope.tinymceModel = pageData['content'];

            });


        };

        $scope.getTemplateContent();

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


        $scope.saveTemplateContent = function() {



            var request = $http({
                method: "put",
                url: "/api/configs/page/" + $scope.templateId,
                dataType: "json",
                data: {content: $scope.tinymceModel}
            });
            $scope.successfulMessage();
        };

        return $scope.$on('$destroy', function() {
            return null;
        });
    });

});