var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        index: { unique: true }
     },
    password: String,
    email: String,
    phone : String,
    language : String,
    note: String,
    created_at: Date,
    updated_at: Date,
});

userSchema.pre('save', function(next){
	  now = new Date();
	  this.updated_at = now;
	  if ( !this.created_at ) {
	    this.created_at = now;
	  }
	  next();
	});

var User = mongoose.model('User', userSchema);

//module.exports = mongoose.model('User',UserSchema);
module.exports = {
	    User: User
	};