/**
 * Main application routes
 */

'use strict';

var errors = require('./errors/index');
var path = require('path');
module.exports = function(app) {

    app.use('/api/things', require('./server/api/thing'));
    app.use('/api/users', require('./server/api/user'));
    app.use('/auth', require('./server/auth'));
    app.use('/api/configs', require('./main/app/admin/server'));


  // Insert routes below
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
     res.sendfile(app.get('appPath') + '/index.html');
    });
};
