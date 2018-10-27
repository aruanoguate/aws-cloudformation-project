var _ = require('underscore');
var fs = require('fs');

// To be called when the app starts to setup all the information
// needed to then create the database connections
module.exports = function (wagner) {
    // The connection settings are pulled from the configuration file
    var connectionsSettings = JSON.parse(fs.readFileSync('./photo_gallery/mysql-db/connections-settings.json').toString());
    var serversAvailable = [];

    // For each connection setting, we add a new wagner service
    _.each(connectionsSettings, function (connectionSettings) {
        // Assign the password from environment variables
        connectionSettings['password'] = process.env.MYSQLPASSWORD

        // The connection settings are added as a wagner service
        wagner.factory('MYSQL_' + connectionSettings.name, function () {
            return connectionSettings;
        })
        // The server is added to a list of available server
        serversAvailable.push(connectionSettings.name);
    });

    // The list of available servers is added to wagner for future usage
    wagner.factory('serversAvailable', function () {
        return serversAvailable;
    })
};