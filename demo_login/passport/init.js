var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

var permissions = require('../lib/permissions.js'); //###Asw20 Declare permissions

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            //###Asw20 Execute permission with callback 
            permissions.userPermissions(user,function(err,permissions){
            	user.permissions =permissions;
            	done(err, user);
            });
          //###Asw20 ------------------------------
//###Asw20 done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}