var express = require('express');
var router = express.Router();

//###Asw20 Add messages to "info" type of messages
router.get('/flash', function(req, res, next){
	  // Set a flash message by passing the key, followed by the value, to req.flash(). 
	  req.flash('info', 'Flash is back!')
	  req.flash('info', 'with Express 4')
	  res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'connect-flash',message: req.flash('info') });
});

module.exports = router;
