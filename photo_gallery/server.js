var wagner = require('wagner-core');
var rest_service = require('./rest-service');

// To add wagner as it's own service
wagner.factory('wagner', function(){
    return wagner;
});

// To configurer the web api and start the service
rest_service.setup(wagner, 5000).then(function(){
    console.log('Rest Service configured');
}).catch(console.log);