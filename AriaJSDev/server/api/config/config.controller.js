'use strict';

var _ = require('lodash');
var ConfigModel = require('./config.model');
var PageModel = require('./page.model');
//var Util = require('../../lib/util');

// Get a single navbar
exports.showNavbar = function(req, res) {
  var Config = ConfigModel(req.user.tenant);
  
  Config.findOne({}, function (err, config) {
    if(err) { return handleError(res, err); }
    if(!config) { return res.send(404); }
    return res.json(config);

  });
};

// Creates/updates a navbar in the DB.
exports.createNavbar = function(req, res) {
  var Config = ConfigModel(req.user.tenant);

  Config.findOneAndUpdate({}, req.body, {upsert: true, new: true}, function(err, config){
    if(err) { return handleError(res, err); }
    return res.json(201, config);
  });
};

// Get a list of pages
exports.pages = function(req, res) {
  var Page = PageModel(req.user.tenant);

  var fields = "";
  if (req.query.fields) fields = req.query.fields;

  Page.find(fields, function (err, pages) {
    if(err) { return handleError(res, err); }
    return res.json(200, pages);
  });
};

// Get a single page
exports.showPage = function(req, res) {
  var Page = PageModel(req.user.tenant);

  var fields = "";
  if (req.query.fields) fields = req.query.fields;
  

  Page.findById(req.params.id, fields, function (err, page) {
    if(err) { return handleError(res, err); }
    if(!page) { return res.send(404); }
    return res.json(page);
  });
};

// Creates a new page in the DB.
exports.createPage = function(req, res) {
  var Page = PageModel(req.user.tenant);

  Page.create(req.body, function(err, page) {
    if(err) { return handleError(res, err); }
    return res.json(201, page);
  });
};

// Updates an existing page in the DB.
exports.updatePage = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  var Page = PageModel(req.user.tenant);

  Page.findById(req.params.id, function (err, page) {
    if (err) { return handleError(res, err); }
    if(!page) { return res.send(404); }
    var updated = _.merge(page, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, page);
    });
  });
};

// Deletes a page from the DB.
exports.destroyPage = function(req, res) {
  var Page = PageModel(req.user.tenant);

  Page.findById(req.params.id, function (err, page) {
    if(err) { return handleError(res, err); }
    if(!page) { return res.send(404); }
    page.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}