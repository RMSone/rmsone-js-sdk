'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PageSchema = new Schema({
  data: String,
  content: String
});

var modelName = "";

module.exports = function(tenant) {
  if (!tenant || tenant.length == 0) throw new Error('Tenant name cannot be empty');
  modelName = tenant.toLowerCase() + '.Page';
  return mongoose.model(modelName, PageSchema);
};
