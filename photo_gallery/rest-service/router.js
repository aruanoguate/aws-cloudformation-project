var express = require('express');
var status = require('http-status');
var path = require('path');

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

    // To setup the app to handle the requests using the previously
    // created router and some setup to handle static files
    wagner.invoke(function (api, publicPathFileSystem, protectedPathFileSystem
        , publicPathURL, protectedPathURL, mainPage) {

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