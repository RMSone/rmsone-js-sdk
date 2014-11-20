'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Util = require('../../lib/util');

var ConfigSchema = new Schema({
  navbar: String,
  other: String
});

var modelName = "";



module.exports = function(tenant) {
  if (!tenant || tenant.length == 0) throw new Error('Tenant name cannot be empty');
  modelName = tenant.toLowerCase() + '.Config';
  return mongoose.model(modelName, ConfigSchema);
};
