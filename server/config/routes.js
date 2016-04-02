var mongoose = require('mongoose');

module.exports = function(app, config) {
  //app.get('/partials/:partialPath', function (req, res) {
  //    res.render('partials/' + req.params.partialPath);
  //});

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
    res.render('index', {
      bootstrappedUser: req.user
    });
    //res.render('index', {
    //    mongoMessage: mongoMessage
    //});
  });

  app.post('/saveDataFirstLoad', function(req, res) {

    var obj = {};

    obj = req.body;

    saveData(obj);

    res.send(obj);
    
  });



}

function saveData(dataChotot) {

  var dataSchema = mongoose.Schema({
      id: Number,
      description: String,
      link: String,
      position: Number,
  });

  var Item = mongoose.model('Item', dataSchema);

  Item.find({}).exec(function (err, collection) {

      // if (collection.length === 0) {
      for (var i = 0; i < dataChotot.length; i++) {
        Item.create({
          id: dataChotot[i].id,
          description: dataChotot[i].description,
          link: dataChotot[i].link,
          position: dataChotot[i].position
        });
      }

      // }
  });
}
