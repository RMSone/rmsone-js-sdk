var tempAppConfig;
$.ajax('/api/configs/appConfigInfo').done(function(data){
    tempAppConfig = data;
});
var apps = ['adminUiApp'];
var moduleDependency = [];
var loadConfig = function(){
    for(var i = 0; i < tempAppConfig.length; i++)
    {
        var config = JSON.parse(tempAppConfig[i].configjson);
        if(config.angularFramework === "true") {
            for(var j = 0; j < config.modules.length; j++)
            {
                apps.pushIfNotExist(config.modules[j], function(e) {
                    return e === config.modules[j];
                });
                moduleDependency.pushIfNotExist(config.modules[j], function(e) {
                    return e === config.modules[j];
                });
            }
            for(var j = 0; j < config.dependentModules.length; j++)
            {
                moduleDependency.pushIfNotExist(config.dependentModules[j], function(e) {
                    return e === config.dependentModules[j];
                });
            }
        }
    }
    return apps;
};

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) {
    for(var i=0; i < this.length; i++) {
        if(comparer(this[i])) return true;
    }
    return false;
};

// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element, comparer) {
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};