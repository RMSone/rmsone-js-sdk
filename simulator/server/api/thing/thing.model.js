'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
    name: String,
    description:String,
    redirecturi: String,
    jsorigins:String,
    info: String,
    appid: String,
    clientid: String,
    clientsecret: String,
    active: Boolean
});

module.exports = mongoose.model('Thing', ThingSchema);