var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


/*
 *  ------------- Schema Declaration ---------------
 */

/*
 *  Role Schema 
 */
var roleSchema = Schema({ 
    roleName: {
       type: String,
       index: { unique: true }
    },
 	active : Boolean,
    _roleUsers : [{ type: ObjectId, ref: 'User' }],
    _rolePermissions :[{ type: ObjectId, ref: 'Permission' }]
});

var Role = mongoose.model('Role', roleSchema);

/* 
 *  --- User Schema ---
 */
var userSchema = Schema({ 
    userName: {
        type: String,
        index: { unique: true }
     },
    password: String,
    email: String,
    _userRoles : [{ type: ObjectId, ref: 'Role' }]
});

var User = mongoose.model('User', userSchema);


/* 
 *  --- Permission Schema ---
 */
var permissionSchema = Schema({ 
    permissionName: {
        type: String,
        index: true
     },
    active : Boolean,
    _permissionRoles :[{ type: ObjectId, ref: 'Role' }]
});

var Permission = mongoose.model('Permission', permissionSchema);

/*
 *  ------------- Remove Schemas ---------------
 */

mongoose.connect('mongodb://localhost/demo_mongodb', function (err) {	
	 if (err) throw err;
	User.remove(function() {
		Role.remove(function() {
			Permission.remove(function() {
				mongoose.disconnect();
			}); 
		});
	});
});
//models.User.remove(function() {