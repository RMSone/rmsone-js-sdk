/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var io = require('socket.io');
var siofu = require("socketio-file-upload");

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express().use(siofu.router);
var server = require('http').createServer(app);
//var socketio = require('socket.io')(server, {
//    serveClient: (config.env === 'production') ? false : true,
//    path: '/socket.io-client'
//});

//require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

io = io.listen(server);
io.set('log level', 1);

io.sockets.on('connection', function(socket){
    var uploader = new siofu();
    uploader.dir = __dirname + "/uploads";
    uploader.listen(socket);

    uploader.on("error", function(event){
        console.log("Error from uploader", event);

    });

//    setInterval(function(){
//        socket.emit('date', {'date': new Date()});
//    }, 1000);
//
//    //recieve client data
//    socket.on('client_data', function(data){
//        process.stdout.write(data.letter);
//    });
});


// Expose app
exports = module.exports = app;