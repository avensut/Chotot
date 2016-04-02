var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {

    development: {
        db: 'mongodb://localhost/chotot',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        // db: 'mongodb://avensut:avensut123123@ds064628.mlab.com:64628/chotot',
        db: 'mongodb://localhost/chotot',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}
