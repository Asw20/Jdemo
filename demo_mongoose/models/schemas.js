var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/* 
 *  --- Role Schema ---
 */
var roleSchema = new mongoose.Schema({ 
    roleName: {
       type: String,
       index: { unique: true }
    },
 	active : Boolean,
    _roleUsers : [{ type: ObjectId, ref: 'User' }],
    _rolePermissions :[{ type: ObjectId, ref: 'Permission' }]
});

exports.Role = mongoose.model('Role', roleSchema);

/* 
 *  --- User Schema ---
 */
var userSchema = new mongoose.Schema({ 
    userName: {
        type: String,
        index: { unique: true }
     },
    password: String,
    email: String,
    _userRoles : [{ type: ObjectId, ref: 'Role' }]
});

exports.User = mongoose.model('User', userSchema);


/* 
 *  --- Permission Schema ---
 */
var permissionSchema = new mongoose.Schema({ 
    permissionName: {
        type: String,
        index: true
     },
    active : Boolean,
    _permissionRoles :[{ type: ObjectId, ref: 'Role' }]
});

exports.Permission = mongoose.model('Permission', permissionSchema);


/* 
 *  --- module.exports ---
 */
//module.exports = {
//		Role: Role
//	    ,User: User
//	    ,UserRole: UserRole
//	    ,Permission: Permission
//	    ,RolePermission: RolePermission
//	};
