var express = require('express');
var router = require('./router');
var owasp = require('./owasp');


// This function setups a new express aplication and 
// binds it with the express router created in router.js file
module.exports = function (wagner, port) {
    return new Promise(function (resolve, reject) {
        try {
            // To create a new express aplication
            var api = express();
            // To put the application in wagner for automatic test purposes
            wagner.factory('api', function () {
                return api;
            });
            // To setup the security middlewares
            owasp.setup(wagner);
            // To bind the application with the router
            router.setup(wagner);
            // To setup the automatic sitemap generator
            // Put the api to listen for requests on port 3000
            var server = api.listen(port, function () {
                console.log('Listening on port: ' + server.address().port);
                // If everything was correctly configured the promise is resolved
                resolve();
            });
            wagner.factory('server', function () {
                return server;
            });
        } catch (err) {
            reject(err);
        }
    });
};
