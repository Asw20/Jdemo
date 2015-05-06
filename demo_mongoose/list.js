//import async to make control flow simplier
var async = require('async');

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
        index: { unique: true }
     },
    active : Boolean,
    _permissionRoles :[{ type: ObjectId, ref: 'Role' }]
});

var Permission = mongoose.model('Permission', permissionSchema);

/*
 *  --------- Connection ---------------- 
 */
mongoose.connect('mongodb://localhost/demo_mongodb', function (err) {	
	 if (err) throw err;
});

/* 
 *  --------- Query List ---------------- 
 */

/*
 *  --- User -­> (x)Roles -> RoleName
 */
function listUsers() {
	User.find().populate('_userRoles').exec( function(err, rows) {
		for (i=0; i < rows.length; i++) {
			console.log('User :%s',rows[i].userName)
			for (j=0; j < rows[i]._userRoles.length; j++) {
				console.log('  has role(s) (populated) of :%s',rows[i]._userRoles[j].roleName)
			}
		}
		nextTask()
	})
}

/*
 * --- Role -­> (x)Permissions -> PermissionName
 */
function listRoles() {
	Role.find().populate('_rolePermissions').exec( function(err, rows) {
		for (i=0; i < rows.length; i++) {
			console.log('Role :%s',rows[i].roleName)
			for (j=0; j < rows[i]._rolePermissions.length; j++) {
				console.log('  has permission(s) (populated) :%s',rows[i]._rolePermissions[j].permissionName)
			}
		}
		nextTask()	
	})
}


/*
 * --- Use Async Paralle
 */

Async.parallel([
                
	//Read user data from Sheets
    function(callback) {
    	var query = User.findOne({userName: username}).populate('_userRoles');
        query.exec(function(err, sheet) {
        	if (err) {
        		callback(err);
        	}
             
        callback(null, user);
        });
     },
             
     //Read friends data from Friends
     function(callback) {
    	 var query = Role.find({sheet_id: sheet_id});
    	 query.exec(function(err, friends) {
    		 if (err) {
    			 callback(err);
    		 }
             
                        callback(null, friends);
                    });
                },
             
                //Read expenses data from Expenses
                function(callback) {
                    var query = db.ExpensesModel.find({sheet_id: sheet_id});
                    query.sort('-date');
                    query.exec(function(err, expenses) {
                        if (err) {
                            callback(err);
                        }
             
                        callback(null, expenses);
                    });
                }
            ],



var tasks =[listUsers
            ,listRoles
            ]

function nextTask(err, result) {
	if (err) throw err;
	
	var currentTask = tasks.shift();
	
	if (currentTask) {
		currentTask(result);
		}
}

nextTask();