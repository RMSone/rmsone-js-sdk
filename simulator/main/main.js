define([],function(){


    var RMSSDKinit = function() {
        RMSONE.init(null, function() {
            console.log("SDK loaded");
        }, function() {
            console.log('errror loading sdk');
        });
    };
    return RMSSDKinit;

})

