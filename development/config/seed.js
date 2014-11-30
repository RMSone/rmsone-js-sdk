/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../server/api/thing/thing.model');
var User = require('../server/api/user/user.model');

Thing.find({}).remove(function() {
    Thing.create({
        name: 'ELA App',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
        appid: '9b119659-d1f5-4aac-2d4a-dea673862dda'
    }, {
        name: 'Dynamic Portfolio Management',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.',
        appid: '6aeeb78d-c53d-4da4-7308-0ae5c3d81fe1'
    }, {
        name: 'Power Analyst',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html',
        appid: 'ce87e76f-b3a4-4cda-8ce1-01993141b113'
    });
});

User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Beatrix Kiddo',
        email: 'kiddo@rms.com',
        password: 'user123'
    }, {
        provider: 'local',
        name: 'a',
        email: 'a@a.com',
        password: 'aaa'
    }, {
        provider: 'local',
        name: 'a',
        email: 'a@a.com',
        password: 'aaa'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Oren Ishii',
        email: 'oren@rms.com',
        password: 'admin123'
    }, function() {
        console.log('finished populating users');
    });
});