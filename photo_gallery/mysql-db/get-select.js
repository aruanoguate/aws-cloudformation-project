var _ = require('underscore');
var mysqldb = require('./index');

// To be called when you need to execute a SP that returns tables
module.exports = function (wagner, server, query, parameters) {
    // This is an async operation, so a promise should be returned
    return new Promise(function (resolve, reject) {
        // Open the connection to the database
        mysqldb.connect(wagner, server).then(function (connection) {
            try {
                // Create a request to the desired SP
                connection.query(query, parameters, function (err, results, fields) {
                    // The connection should be closed inmediately after this is completed
                    connection.end(function (err) {
                        // The connection is terminated now
                        reject(err);
                    });

                    // The promise rejected if there is an error on the request
                    if (err) {
                        reject(err);
                        return;
                    }

                    // If there is no error, the promise is resolved returning the dataSet
                    resolve({ results, fields });
                });
            } catch (err) {
                // If something fails, the promise should be rejected
                reject(err);
            }
        }).catch(reject)
    });
};