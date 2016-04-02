'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    description: {
        type: 'String',
        required: true
    },
    link: {
        type: 'String',
        required: true
    },
    position: {
        type: 'Number',
        required: true
    }

});

module.exports = mongoose.model('Item', schema);
