(function() {
    'use strict';

    /*
     Removes server error when user updates input
     */
    angular.module('ecosystemApp').directive('mongooseError', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                return element.on('keydown', function() {
                    return ngModel.$setValidity('mongoose', true);
                });
            }
        };
    });

}).call(this);