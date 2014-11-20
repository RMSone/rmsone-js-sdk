/**
 * Created by csarkar on 11/12/2014.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AppinfoSchema = new Schema({
    name: String,
    appfoldername: String,
    destinationapppath: String,
    configjson: String,
    content: String,
    status: String
});

var modelName = "";

module.exports = function(tenant) {
    if (!tenant || tenant.length == 0) throw new Error('Tenant name cannot be empty');
    modelName = tenant.toLowerCase() + '.Appinfo';
    return mongoose.model(modelName, AppinfoSchema);
};
