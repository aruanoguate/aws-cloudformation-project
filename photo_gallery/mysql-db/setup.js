// To be called when the app starts to setup all the information
// needed to then create the database connections
module.exports = function (wagner) {

    // To pull all the information from the env variables
    var connectionSettings = {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        database: process.env.MYSQLDATABASE,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        connectTimeout: process.env.MYSQLTIMEOUT
    };

    // The connection settings are added as a wagner service
    wagner.factory('connectionSettings', function () {
        return connectionSettings;
    })
};