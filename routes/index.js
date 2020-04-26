var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = (db, dbName) => {
  router.get('/', function (req, res, next) {
    db.collection(dbName).find({}).toArray( function(err, result) {
      if (err) return res.status(500).json({
        error: true,
        message: err
      })
      res.status(200).json(result)
    });
    // res.render('index', { title: 'Express' });
  });

  return router;
}
