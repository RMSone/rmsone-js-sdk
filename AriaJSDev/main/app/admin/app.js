define(['angularAMD','components/auth/auth.service'], function (angularAMD) {


    if (typeof requirejs != 'function') {
        requirejs = function(config) { requirejs = config; };
    }

    requirejs( { paths: { 'AdminCtrl':'app/admin/client/admin.controller' } } );
    requirejs( { paths: { 'ListTemplateCtrl':'app/admin/client/listtemplate.controller'} } );
    requirejs( { paths: {  'MenuCtrl':'app/admin/client/menu.controller' } } );
    requirejs( { paths: {  'RenderPagesCtrl':'app/admin/client/renderpages.controller' } } );
    requirejs( { paths: {  'editContentCtrl':'app/admin/client/editcontent.controller' } } );


    var app = angular.module("rmsAdmin", ['rmsAdminService']);
    app.config(function($routeProvider) {

        $routeProvider
            .when("/admin", angularAMD.route({
                templateUrl: 'app/admin/client/admin.html', controller: 'AdminCtrl'
            }))
            .when("/listtemplate", angularAMD.route({
                templateUrl: 'app/admin/client/listtemplate.html', controller: 'ListTemplateCtrl'
            }))
            .when("/display/:id/:title", angularAMD.route({
                templateUrl: 'app/admin/client/renderpages.html', controller: 'RenderPagesCtrl'
            }))
            .when("/editcontent", angularAMD.route({
                templateUrl: 'app/admin/client/editcontent.html', controller: 'editContentCtrl'
            }))
            .when("/menu", angularAMD.route({
                templateUrl: 'app/admin/client/menu.html', controller: 'MenuCtrl'
            }))
    });


    app.factory("appService", function ($cookieStore) {
        var appData;
        appData = [
            {
                yearSetCount: 0
            }
        ];
        return {
            setAppId: function (id) {
                //appData.id = id;
                $cookieStore.put('AppId', id);
            },
            getAppId: function () {
                //return appData.id;
                return $cookieStore.get('AppId');
            },
            setTemplateId: function (id) {
                //appData.id = id;
                $cookieStore.put('templateId', id);
            },
            getTemplateId: function () {
                //return appData.id;
                return $cookieStore.get('templateId');
            }
        };
    });
    return app
});
