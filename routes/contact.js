var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = require('../models/Contact.js');

/* GET ALL ContactS */
router.get('/', function(req, res, next) {
  Contact.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Contact BY ID */
router.get('/:id', function(req, res, next) {
  Contact.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Contact */
router.post('/', function(req, res, next) {
  Contact.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Contact */
router.put('/:id', function(req, res, next) {
  Contact.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Contact */
router.delete('/:id', function(req, res, next) {
  Contact.findByIdAndUpdate( {_id: req.params.id}, {status: false}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
