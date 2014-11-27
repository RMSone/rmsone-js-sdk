'use strict';

var _ = require('lodash');
var ConfigModel = require('./config.model.js');
var PageModel = require('./page.model.js');
var AppinfoModel = require('./appinfo.model');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

exports.createdirectory = function(req, res) {

    var uploadfiles = req.body.files;
    var foldername = req.body.appfoldername;
    var targetbasedirectory =  req.body.destinationpath;
    targetbasedirectory = targetbasedirectory.split("\\").join("/");
    if( targetbasedirectory.substring(targetbasedirectory.lastIndexOf("/")) != "/"){
        targetbasedirectory = targetbasedirectory + "/";
    }
    for(var i=0;i<uploadfiles.length ; i++){
        var webkitRelativePath = uploadfiles[i].webkitRelativePath;
        var lastindexcount = webkitRelativePath.lastIndexOf("/");
        var folderpath = webkitRelativePath.substring(0, lastindexcount);

        mkdirp( targetbasedirectory + foldername + "/" + folderpath, function (err) {
            if (err) console.error(err)
        });

    }

};

exports.upload = function(req, res) {
    console.log("inside upload");

    //var sourcebasedirectory = 'C:/UploadApp/';
   // var sourcebasedirectory = '/main/app/';


    var sourcebasedirectory =  req.body.sourcepath;
    sourcebasedirectory = sourcebasedirectory.split("\\").join("/");
    if( sourcebasedirectory.substring(sourcebasedirectory.lastIndexOf("/")) != "/"){
        sourcebasedirectory = sourcebasedirectory + "/";
    }

    var foldername = req.body.appfoldername;

    var uploadfiles = req.body.files;
    var targetbasedirectory =  req.body.destinationpath;
    targetbasedirectory = targetbasedirectory.split("\\").join("/");
    if( targetbasedirectory.substring(targetbasedirectory.lastIndexOf("/")) != "/"){
        targetbasedirectory = targetbasedirectory + "/";
    }


    for(var i=0;i<uploadfiles.length ; i++){
        var webkitRelativePath = uploadfiles[i].webkitRelativePath;
        var lastindexcount = webkitRelativePath.lastIndexOf("/");
        var folderpath = webkitRelativePath.substring(0, lastindexcount);
        var filename = webkitRelativePath.substring(lastindexcount+1);

        var source = sourcebasedirectory + uploadfiles[i].webkitRelativePath;
        var target = targetbasedirectory + foldername  + "/" + folderpath + "/" +filename;

        mkdirp( targetbasedirectory + foldername + "/" + folderpath, function (err) {
            if (err) console.error(err)
        });

    }

    for(var i=0;i<uploadfiles.length ; i++){
        var webkitRelativePath = uploadfiles[i].webkitRelativePath;
        var lastindexcount = webkitRelativePath.lastIndexOf("/");
        var folderpath = webkitRelativePath.substring(0, lastindexcount);
        var filename = webkitRelativePath.substring(lastindexcount+1);

        var source = sourcebasedirectory + uploadfiles[i].webkitRelativePath;
        var target = targetbasedirectory + foldername  + "/" + folderpath + "/" +filename;

        copyFile(source, target, function(){
            console.log('error');


        });
    }

    function copyFile(source, target, cb) {
        var cbCalled = false;

        var rd = fs.createReadStream(source);
        rd.on("error", function(err) {
            done(err);
        });
        var wr = fs.createWriteStream(target);
        wr.on("error", function(err) {
            done(err);
        });
        wr.on("close", function(ex) {
            done();
        });
        rd.pipe(wr);

        function done(err) {
            if (!cbCalled) {
                cb(err);
                cbCalled = true;
            }
        }
    }

};

// Get a single navbar
exports.showNavbar = function(req, res) {
    var Config = ConfigModel(req.user.tenant);

    Config.findOne({}, function (err, config) {
        if(err) { return handleError(res, err); }
        if(!config) { return res.send(404); }
        return res.json(config);

    });
};

// Creates a new app info in the DB.
exports.createappinfo = function(req, res) {
    var App = AppinfoModel(req.user.tenant);

    App.create(req.body, function(err, page) {
        if(err) { return handleError(res, err); }
        return res.json(201, page);
    });
};

// Get a list of apps
exports.getappinfo = function(req, res) {
    var App = AppinfoModel(req.user.tenant);

    var fields = "";
    if (req.query.fields) fields = req.query.fields;

    App.find(fields, function (err, pages) {
        if(err) { return handleError(res, err); }
        return res.json(200, pages);
    });
};

// Get a list of apps config
exports.getAppConfigList = function(req, res) {
    var App = AppinfoModel('rms');

    App.find({}, function (err, appconfiglist) {
        if(err) { return handleError(res, err); }
        return res.json(200, appconfiglist);
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