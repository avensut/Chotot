var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

console.log(process.env.NODE_ENV);

require('./server/config/express')(app, config);

require('./server/config/routes')(app, config);

app.listen(config.port);

console.log('Listening on port ' + config.port + '...');
