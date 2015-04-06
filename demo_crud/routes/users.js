var express = require('express');
var router = express.Router();

var models = require('../models/schemaDb');

/* GET /users listing. */
router.get('/', function(req, res, next) {
	models.User.find(function (err, rows) {
		if (err) return next(err);
		res.render('users',{page_title:"User List",data:rows});
	});
});

/* GET /users listing. */
router.get('/add', function(req, res, next) {
	res.render('user_add',{page_title:"User Add",data:"",message:""});
});

/* POST /user */
router.post('/add', function(req, res, next) {
	/* Validate if already exist */
	models.User.findOne({username: req.body.username}, function (err, rows){
		if (rows) {
			/* Record already exist resend body field information entered by the user*/
			res.render ('user_add',{page_title:"User Add Error",data:req.body,message:"User Already Exist"});
		} else {
			models.User.create(req.body, function (err, rows) {
				if (err) return next(err);
				res.redirect('/users');
			});
		}
	});
});

/* GET /user/id */
router.get('/edit/:id', function(req, res, next) {
	models.User.findById(req.params.id, function (err, rows) {
		if (err) return next(err);
		res.render('user_edit',{page_title:"Edit USer",data:rows});
	});
});

/* PUT /user/:id */
router.post('/edit/:id', function(req, res, next) {
	models.User.findByIdAndUpdate(req.params.id, req.body, function (err, rows) {
		if (err) return next(err);
		res.redirect('/users');
	});
});

/* GET /user/id */
router.get('/del/:id', function(req, res, next) {
	models.User.findById(req.params.id, function (err, rows) {
		if (err) return next(err);
		res.render('user_del',{page_title:"Delete User",data:rows});
	});
});

/* DELETE /user/:id */
router.post('/del/:id', function(req, res, next) {
	models.User.findByIdAndRemove(req.params.id, req.body, function (err, rows) {
		if (err) return next(err);
		res.redirect('/users');
	});
});

module.exports = router;