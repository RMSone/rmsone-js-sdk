var tempAppConfig;

$.ajax('/api/configs/appConfigInfo').done(function(data){
    tempAppConfig = data;
});

var apps = ['main', 'angularAMD','angularRoute', 'ui-bootstrap', 'angular-cookies', 'angular-resource', 'angular-sanitize', 'angular-socket-io', 'ngGrid', 'angular-ui-tree', 'angular-dropdowns', 'autocomplete', 'socket', 'tinymce', 'angular-tinymce',
    'app/account/app', 'app/entityManagement/app', 'app/admin/app'];
var moduledepandancy = ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'btford.socket-io', 'ui.bootstrap', 'ngGrid', 'ui.tree', 'angucomplete', 'rmsAccount', 'adminUiApp', 'btford.socket-io', 'ui.tinymce', 'rmsAdmin', 'rmsAdminService'];
var loadConfig = function(){
    if(tempAppConfig)
    {
        for(var i = 0; i < tempAppConfig.length; i++)
        {
            var config = JSON.parse(tempAppConfig[i].configjson);
            if(config.angularFramework === "true") {
                apps.push('app/' + tempAppConfig[i].name + '/app');
                for(var j = 0; j < config.modules.length; j++)
                {
                    moduledepandancy.push(config.modules[j]);
                }
                for(var j = 0; j < config.dependentModules.length; j++)
                {
                    moduledepandancy.push(config.dependentModules[j]);
                }
            }
        }
    }
    return apps;
};



