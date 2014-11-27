'use strict';
angular.module('ecosystemApp').config(function($stateProvider) {
    return $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/client/admin.html',
        controller: 'AdminCtrl'
    }).state('listtemplate', {
        url: '/listtemplate',
        templateUrl: 'app/admin/client/listtemplate.html',
        controller: 'ListTemplateCtrl'
    }).state('renderpage', {
        url: '/display/:id/:title',
        templateUrl: 'app/admin/client/renderpages.html',
        controller: 'RenderPagesCtrl'
    }).state('editcontent', {
        url: '/editcontent',
        templateUrl: 'app/admin/client/editcontent.html',
        controller: 'editContentCtrl'
    }).state('menu', {
        url: '/menu',
        templateUrl: 'app/admin/client/menu.html',
        controller: 'MenuCtrl',
        authenticate: true
    });
}).factory("appService", function($cookieStore) {
    var appData;
    appData = [
        {
            yearSetCount: 0
        }
    ];
    return {
        setAppId: function(id) {
            //appData.id = id;
            $cookieStore.put('AppId', id);
        },
        getAppId: function() {
            //return appData.id;
            return $cookieStore.get('AppId');
        },
        setTemplateId: function(id) {
            //appData.id = id;
            $cookieStore.put('templateId', id);
        },
        getTemplateId: function() {
            //return appData.id;
            return $cookieStore.get('templateId');
        }
    };
});
