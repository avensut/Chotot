var mongoose = require('mongoose');

var Item = require('../models/items');

module.exports = function(app, config) {

    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));

    db.once('open', function callback() {

        console.log('chotot db opened');

    });

    app.get('/partials/*', function(req, res) {

        res.render('../../public/app/' + req.params[0]);

    });

    app.get('*', function(req, res) {

        // get data first load

        Item.find({}).sort({

            position: -1

        }).exec(function(err, posts) {

            if (err) {

                res.send(err);

            } else {

                res.render('index', {

                    dataChotot: posts

                });
            }

        });

    });

    app.post('/saveDataFirstLoad', function(req, res) {

        var obj = {};

        obj = req.body;

        saveData(obj);

        res.send(obj);

    });

}

function saveData(dataChotot) {

    var newItem = new Item();

    for (var i = 0; i < dataChotot.length; i++) {

        Item.create({

            // id: dataChotot[i].id,

            description: dataChotot[i].description,

            link: dataChotot[i].link,

            position: dataChotot[i].position

        });

    }
}
