var express = require('express');
var bodyparser = require('body-parser');
var status = require('http-status');
var path = require('path');
var photos = require('./photos');

module.exports.setup = function (wagner) {
    // To define the different paths used in the local filesystem
    wagner.factory('publicPathFileSystem', function () {
        return path.join(__dirname, '../ui/public/');
    });
    wagner.factory('protectedPathFileSystem', function () {
        return path.join(__dirname, '../ui/protected/');
    });
    wagner.factory('publicPathURL', function () {
        return '/';
    });
    wagner.factory('protectedPathURL', function () {
        return '/protected/';
    });
    // To define the main pages used for redirections
    wagner.factory('mainPage', function (publicPathURL) {
        return publicPathURL + 'index.html';
    });
    wagner.factory('loginPage', function (publicPathURL) {
        return publicPathURL + 'login.html';
    });

    // An express router is created to handle all the api requests
    var router = express.Router();

    // create application/json parser, this will be used for all
    // the UI requests
    var jsonParser = bodyparser.json()
    router.use(jsonParser);


    // To associate the path and HTTP method with a specific handler
    // which are called using wagner to grant access to the different
    // mongoose models

    // Images CRUD
    router.get('/photos/',
        [wagner.invoke(photos.get)]);
    // router.get('/photos/:id',
    //     [wagner.invoke(photos.getbyid)]);
    // router.post('/photos',
    //     [wagner.invoke(photos.post)]);
    // router.put('/photos',
    //     [wagner.invoke(photos.put)]);
    // router.delete('/photos/:id',
    //     [wagner.invoke(photos.delete)]);


    // To add the router to wagner to make it available to the map generator
    wagner.factory('router', function () {
        return router;
    });


    // To setup the app to handle the requests using the previously
    // created router and some setup to handle static files
    wagner.invoke(function (api, publicPathFileSystem, protectedPathFileSystem
        , publicPathURL, protectedPathURL, mainPage) {

        // All the api methods are handled by the router
        api.use('/api/', router);

        // Add a middleware to return all the ui static files from the ui/static folder, 
        // these files don't need authentication
        api.use(publicPathURL,
            express.static(publicPathFileSystem, { maxAge: '2 days' }));

        // The default response for a call to the main page is a redirection to the login
        api.get('/', function (req, res) {
            res.redirect(mainPage);
        });

        // The default response for all the other request is a request for authentication
        api.use(function (req, res, next) {
            res.status(status.NOT_FOUND)
                .sendFile('notfound.html', { root: publicPathFileSystem });
        });
    });
};