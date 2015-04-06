var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
// Force Language
  req.setLocale('fr');	
  res.render('index', { title: 'Express', greeting: req.__('Hello, World!'), message: req.__('Bye Bye!'), other: req.__('Not Translated!') });
});

module.exports = router;
