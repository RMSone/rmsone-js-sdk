'use strict';

var cfenv= require("cfenv");

var appEnv = cfenv.getAppEnv();


// Development specific configuration
// ==================================
module.exports = {
    mongo: {
        uri:    appEnv.getServiceURL("1") ||
            'mongodb://localhost:27017/AnileshTest1'
    },
    seedDB: true
};

