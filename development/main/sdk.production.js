// create RMSSDK namespace, should be conacted on top of every other js files
(function(window){
	if (window.RMSSDK) { return; }

	window.RMSSDK = {};
	
})(window);
(function(){
	/**
	 * Define a Util class. Util call is shared between client and server.
	 * Contructor method.
	 */
	function Util() {}

	/**
	 * Merge all properties of two objects
	 * @param  {object} o 				Object o will be updated with properties from object
	 * @param  {object} p 				Object p's properties will merged to object o
	 * @param  {boolean} overwrite		Set true to overwrite object o's properties if same properties exist in both objects
	 * @return {undefined}
	 */
	Util.merge = function(o, p, overwrite) {
		if (overwrite === undefined) { overwrite = true; }
		if (!o || !p) { throw new Error('Invalid parameters'); }
		for (var prop in p) {
			if (o.hasOwnProperty(prop) && !overwrite) { continue; }
			o[prop] = p[prop];
		}
	};

	/**
	 * Clone a object
	 * @param  {object} 			Object to be cloned
	 * @param  {array | object} 	Properties list should be excluded
	 * @return {object}				Cloned object
	 */
	Util.clone = function(o, exclude) {
		if (exclude === undefined) { exclude = {}; }

		if (exclude instanceof Array) {
			var tmp = {};
			for (var i = 0; i < exclude.length; i++) { tmp[exclude[i]] = ''; }
			exclude = tmp;
		}

		if (typeof exclude !== 'object') { throw new Error('exclude should be an object or array'); }

		var objClone = {};
		for (var prop in o) {
			if (o.hasOwnProperty(prop) && !(prop in exclude))
			{
				objClone[prop] = o[prop];
			}
		}

		return objClone;
	};

	if (typeof window !== 'undefined' && window.RMSSDK) { window.RMSSDK.Util = Util; }

	// If we're running under Node
	if(typeof exports !== 'undefined') {
		module.exports = Util;
	}

})();
(function(){
	function Pubsub() {
		this.listeners = {};
	}

	/**
	 * subscribe an event
	 * @param  {string}   event name
	 * @param  {function} 	callback function that will called when event happens
	 * @return {undefined}
	 */
	Pubsub.prototype.subscribe = function(event, callback) {
		if (typeof callback !== 'function') { throw new Error('A valid callback function must be provided.'); }
		if (event in this.listeners) {
			this.listeners[event].push(callback);
		}
		else {
			this.listeners[event] = [];
			this.listeners[event].push(callback);
		}
	};

	/**
	 * publish an event
	 * @param  {string} 	event name
	 * @param  {object} payload that will be carried when triggering/publishing an event
	 * @return {undefined}
	 */
	Pubsub.prototype.publish = function(event, param) {
		if (event in this.listeners)
		{
			this.listeners[event].forEach(function(callback){
				callback(param);
			});
		}
	};

	/**
	 * unsubscribe an event
	 * @param  {string}   event name
	 * @param  {function} 	callback function to unsubscribe with 'event'
	 * @return {undefined}
	 */
	Pubsub.prototype.unsubscribe = function(event, callback) {
		if (!(event in this.listeners) || !(this.listeners[event].some(function(x){ return x === callback; }))) {return;} 
		this.listeners[event].splice(this.listeners[event].indexOf(callback),1);
	};

	if (typeof window !== 'undefined' && window.RMSSDK) { window.RMSSDK.eventPubsub = new Pubsub(); }
	

	// If we're running under Node
	if(typeof exports !== 'undefined') {
		module.exports = Pubsub;
	}

})();


/*!
 * Rms(one) JavaScript SDK
 * Version: 0.0.1
 * init js file to allow client gain access to Rms(one) SDK
 *
 * Copyright 2014 RMS.
 */

/** @namespace */
var RMSSDK = (function(window) {

    /**
     * private function to init components if any
     * @param {array} components
     */
    function initComponents(components) {
        for (var i = 0; i < components.length; i++) {
            components[i].init();
        }
    }

    /**
     * memeber method to load other sdk module js dynamically
     * @param {array} urls
     * @param {function} callback
     */
    RMSSDK.loadModule = function(urls, callback) {
        var that = this;
        // cache loaded scripts to prevent loading scripts that have been loaded
        if (!that.loadedScripts) { that.loadedScripts = {}; }

        if (typeof callback !== 'function') { throw new Error('A callback function must be provided'); }
        if (!Array.isArray(urls)) { throw new Error('urls must be an array'); }

        // substract the scripts that have been loaded
        var urlsToBeLoaded = [];
        for (var i = 0; i < urls.length; i++) {
            if (!(urls[i] in this.loadedScripts)) {
                urlsToBeLoaded.push(urls[i]);
            }
        }

        urls = urlsToBeLoaded;

        var count = urls.length;

        urls.forEach(function(url) {

            var script = document.createElement('script');

            script.async = true;
            script.src = url;

            script.onload = script.onreadystatechange = function() {
                var readyState = script.readyState;
                if (!readyState || /complete|loaded/.test(script.readyState)){
                    that.loadedScripts[url] = true;

                    if (count > 0) { count--; }
                    if (count === 0) { callback(); }

                    script.onload = null;
                    script.onreadystatechange = null;
                }
            };

            document.getElementsByTagName('head')[0].appendChild(script);
        }) ;
    };


    RMSSDK.components = [];

    RMSSDK.use = function (component) {
        this.components.push(component);
    };

    /**
     * member method as main entry point to initialize RMSSDK SDK
     * @param {object} config
     * @param {function} callback
     */
    RMSSDK.init = function (config, callback) {
    	if (!callback || typeof callback !== 'function') { throw new Error('A callback function must be provided'); }
        this.config = config;
        //components will be empty if init() is always the first call from client
        initComponents(this.components);

        var swaggerLoaded = false;

        //update url below to point to real server
        this.loadModule(['http://10.100.105.21:8000/swagger.production.min.js'], function(){
			RMSSDK.swagger = new SwaggerApi({
				url: 'http://10.100.105.21:8000/swagger.json',
				success: function() {
					if (RMSSDK.swagger.ready === true) {
                        if (!swaggerLoaded) {
                            callback();
                            swaggerLoaded = true;
                        }
						
					}
				}
			});
        });

    };

    window.RMSSDK = RMSSDK;

    //client will define global callback with name rmssdkReady() like this
    // window.rmssdkReady = function() {
    //         RMSSDK.init(null, function(){
    //                  ....
    //                  }
    //          )};
    if (typeof window.rmssdkReady === 'function'){
        window.rmssdkReady();
    }

    return RMSSDK;

})(this);


//we also support it in node.js server side
if (typeof exports !== 'undefined'){
    module.exports = RMSSDK;
}
