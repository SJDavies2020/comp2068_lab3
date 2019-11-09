//- File Name: Index.js
//- Author: Steven Davies
//- Website Name: www.sdavies.ca
//- Description: This is the routing file for the site.
//- Updated : 2019-10-13
var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/*Route for Projects. */
router.get('/Projects', function (req, res, next) {
  res.render('Projects', { title: 'Projects' });
});
/*Route for About ME */
router.get('/AboutMe', function (req, res, next) {
  res.render('AboutMe', { title: 'About Me' });
});
/*Route for Service */
router.get('/Services', function (req, res, next) {
  res.render('Services', { title: 'Services' });
});
/*Route for Contact Me */
router.get('/ContactMe', function (req, res, next) {
  res.render('ContactMe', { title: 'Contact ME' });
});

module.exports = router;
