var express = require('express');
var router = express.Router();
var moment = require('moment');
const objectId = require('mongodb').ObjectId;


/* GET home page. */
module.exports = (db, coll) => {
  router.get('/', function (req, res, next) {
    const page = req.query.page || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const pages = 3;


    db.collection(coll).find({}).toArray(function (err, result) {
      if (err) return res.status(500).json({
        error: true,
        message: err
      })

      // res.send(result);
      res.status(200).render('index', {
        moment,
        result,
        page,
        pages
      })
    });
  });

  router.get('/add', (req, res) => {
    res.status(200).render('add');
  })

  router.post('/add', (req, res) => {
    const add = { "string": req.body.stringdata, "integer": parseInt(req.body.integerdata), "float": parseFloat(req.body.floatdata), "date": req.body.datedata, "boolean": JSON.parse(req.body.booleandata) }

    db.collection(coll).insertOne(add)
      .then(() => res.redirect('/'))
      .catch(err =>
        res.status(500).json({
          error: true,
          message: err
        }))
  });

  router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.collection(coll).deleteOne({ _id: objectId(id) })
      .then(() => res.redirect('/'))
      .catch((err) => {
        res.status(500).json({
          error: true,
          message: err
        })
      })
  });

  return router;
}
