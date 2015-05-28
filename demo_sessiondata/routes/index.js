var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	page_title='Session Data Test Cases'
		
	req.sessionData('var01','value01');
	req.sessionData('var01','value02');
	req.sessionData('var01','value03');
	
	req.sessionData('back','value10');
	req.sessionData('back','value11');
	req.sessionData('back','value12');	
	
	req.sessionData('var02','value20');
	req.sessionData('var03','value21');
	req.sessionData('var04','value22');
	
	res.render('index', { title: 'Express',page_title:page_title ,var01:req.sessionData('var01'), var012:req.sessionData('var01'), back:req.sessionData('back'), back2:req.sessionData('back'), varxx:req.sessionData() });
});

module.exports = router;
