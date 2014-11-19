require.config({
  // make components more sensible
  // expose jquery

  paths: {
      "main":"main",
    "jquery": "bower_components/jquery/dist/jquery",
      "jqueryUI": "bower_components/jquery-ui/jquery-ui.min",
     "crossroads": "bower_components/crossroads.js/dist/crossroads.min",
      "signals":"bower_components/js-signals/dist/signals",
      "hasher":"bower_components/hasher/dist/js/hasher",
      "routerFile":"routers",
      'angularRoute': 'bower_components/angular-route/angular-route.min',
      'angular': 'bower_components/angular/angular',
      'angular-ui-router':'bower_components/angular-ui-router/release/angular-ui-router',
      'angular-cookies':'bower_components/angular-cookies/angular-cookies',
      'angular-resource':'bower_components/angular-resource/angular-resource',
      'angular-sanitize':'bower_components/angular-sanitize/angular-sanitize',
      'ui-bootstrap-tpls':'bower_components/angular-bootstrap/ui-bootstrap-tpls',
      'text':'bower_components/requirejs-text/text',
      "ngGrid":"bower_components/angular-grid/ng-grid-2.0.14.min",
      'angularAMD': 'bower_components/angularAMD/angularAMD',
      'ngload': 'components/lib/ngload',
      'ui-bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
      'angular-socket-io':'bower_components/angular-socket-io/socket.min',
      'BootstrappCtrl':'app/bootstrapp/client/bootstrapp.controller',
      'angular-ui-tree':'components/lib/angular-ui-tree.min',
      'angular-dropdowns':'components/lib/angular-dropdowns.min',
      'autocomplete':'components/lib/autocomplete',
      'tinymce':'bower_components/tinymce/tinymce.min',
      'angular-tinymce':'bower_components/angular-ui-tinymce/src/tinymce',
      'socket':'bower_components/angular-socket-io/socket',
      "crossroads": "bower_components/crossroads.js/dist/crossroads.min",
      "signals":"bower_components/js-signals/dist/signals",
      "hasher":"bower_components/hasher/dist/js/hasher",
      "SubmitappCtrl":"app/bootstrapp/client/submitapp.controller"


  },
    shim: {

        'angularRoute': ['angular'],
        'ngGrid':['angular'],
        'angularAMD': ['angular'],
        'angularRoute': ['angular'],
        'angular-ui-router': ['angular'],
        'angular-cookies': ['angular'],
        'ui-bootstrap-tpls': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-resource': ['angular'],
        'ui-bootstrap':['angular'],
        'angular-socket-io':['angular'],
        'angular-ui-tree':['angular'],
        'angular-dropdowns':['angular'],
        'autocomplete':['angular'],
        'socket':['angular'],
        'angular-tinymce':['angular','tinymce']


    },
    deps: ['app']
});





