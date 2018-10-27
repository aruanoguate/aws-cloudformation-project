var mysql = require('mysql');

// This method should be used to connect to the database and wait for the already stablished connection
module.exports = function (wagner, server) {
    // This is an async operation, so a promise should be returned
    return new Promise(function (resolve, reject) {
        try {
            // The connectionSettings is obtained from wagner using the server name
            connectionSettings = wagner.get('MYSQL_' + server);
            // A new connection is created
            var connection = mysql.createConnection(connectionSettings);
            // When the connection is stablished
            connection.connect(function (err) {
                // If there is an error on the connection, the promise is rejected
                if (err) {
                    reject(err);
                    return;
                }
                // If there aren't errors the promise is resolved
                resolve(connection);
            });
            // To listen for disconection errors to avoid having the server
            // stopped by any unhandled error
            connection.on('error', function (err) {
                reject(err);
            });
        } catch (err) {
            // If something fails, the promise should be rejected
            reject(err);
        }
    });
};
