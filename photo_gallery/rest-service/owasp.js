var helmet = require('helmet');

module.exports.setup = function (wagner) {
    //To setup the security settings of the app
    wagner.invoke(function (api) {
        api.use(helmet());
    });
};