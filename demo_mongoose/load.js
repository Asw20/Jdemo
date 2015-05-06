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
 *  ------------- Data Declaration ---------------
 */

var userData = [
            { name : 'User01', password : 'secret01', email : '01@email.com'},
            { name : 'User02', password : 'secret01', email : '02@email.com'},
            { name : 'User03', password : 'secret01', email : '03@email.com'},
            { name : 'Tintin', password : 'LaLicorne', email : 'tintin@milou.com'}
          ];

var roleData = [
                { name : 'Role01', active : true},
                { name : 'Role02', active : true},
                { name : 'Role03', active : false},
                { name : 'Journalist', active : true}
               ];

var permissionData = [
                { name : 'Perm01', active : true},
                { name : 'Perm02', active : false},
                { name : 'Perm03', active : true},
                { name : 'Read_NewsPages', active : true},
                { name : 'Post_NewsPages', active : true}
                ];               

var permissionRoleData  = [
                { perm : 'Perm01',role : 'Role01'},
                { perm : 'Perm02',role : 'Role01'}, 
                { perm : 'Perm02',role : 'Role02'},
                { perm : 'Perm03',role : 'Role03'},
                { perm : 'Read_NewsPages',role : 'Journalist'}, 
                { perm : 'Post_NewsPages',role : 'Journalist'}, 
                ];   

var userRoleData  = [
                { user : 'User01',role : 'Role01'},
                { user : 'User02',role : 'Role02'}, 
                { user : 'User02',role : 'Role03'},
                { user : 'User03',role : 'Role03'},
                { user : 'Tintin',role : 'Journalist'}, 
                ];   

/*
 *   ---------- Load Data  ----------
 */


mongoose.connect('mongodb://localhost/demo_mongodb', function (err) {	
	 if (err) throw err;
});


function loadUsers() {
	async.each(userData,
		  // 2nd param is the function that each item is passed to
		function(item, callback){
		// Call an asynchronous function, often a save() to DB
			var newUser =new User();
			newUser.userName = item.name;
			newUser.password = item.password;
			newUser.email = item.email;
   			newUser.save(function(err) {
   				if (err){
   					console.log('loadUsers Error in Saving: '+err);
					throw err;  
   				}
   				console.log('loadUsers : %s created',item.name);
			    // Async call is done, alert via callback
			    callback();
   			});
		},
		// 3rd param is the function to call when everything's done
		function(err){
			// All tasks are done now
			console.log('loadUsers Iterating done');
			loadRoles();
		}
	);
}


function loadRoles() {
	async.each(roleData,
		  // 2nd param is the function that each item is passed to
		function(item, callback){
		// Call an asynchronous function, often a save() to DB
			var newRole =new Role();
			newRole.roleName = item.name;
			newRole.active = item.active;
			newRole.save(function(err) {
 				if (err){
 					console.log('loadRoles Error in Saving: '+err);
					throw err;  
 				}
 				console.log('loadRoles : %s created',item.name);
			    // Async call is done, alert via callback
			    callback();
 			});
		},
		// 3rd param is the function to call when everything's done
		function(err){
			// All tasks are done now
			console.log('loadRoles Iterating done');
			loadPermissions();
		}
	);
}


function loadPermissions() {
	async.each(permissionData,
		  // 2nd param is the function that each item is passed to
		function(item, callback){
		// Call an asynchronous function, often a save() to DB
	  		var newPermission =new Permission();
	  		newPermission.permissionName = item.name;
	  		newPermission.active = item.active;
	  		newPermission.save(function(err) {
				if (err){
					console.log('loadPermissions Error in Saving: '+err);
					throw err;  
				}
				console.log('loadPermissions : %s created',item.name);
			    // Async call is done, alert via callback
			    callback();
			});
		},
		// 3rd param is the function to call when everything's done
		function(err){
			// All tasks are done now
			console.log('loadPermissions Iterating done');
			loadPermissionsRoles()
		}
	);
}


function loadPermissionsRoles() {
	async.eachSeries(permissionRoleData,
		  // 2nd param is the function that each item is passed to
		function(item, callback){
		// Call an asynchronous function, often a save() to DB
			Permission.findOne({'permissionName': item.perm}).exec( function(err, rowPermission) { 
				if (err){ 
					console.log('loadPermissionsRoles Permission.finOne Error Perm : %s Role :%s  Err :% ',item.perm,item.role,err);
					throw err;
				}
				Role.findOne({'roleName': item.role}).exec(function(err, rowRole) {
			    	if (err){ 
			    		console.log('loadPermissionsRoles Role.finOne Error Perm : %s Role :%s  Err :% ',item.perm,item.role,err);
			    		throw err;
			    	}
			    	// Add Permission to Role
					rowRole._rolePermissions.push(rowPermission);
				    rowRole.save(function (err) {
				    	if (err){
				    		console.log('loadPermissionsRoles Error Saving Perm : %s Role :%s  Err :% ',item.perm,item.role,err);
				            throw err; 
				    	}
				    	console.log ('Permission: %s added to Role : %s:',item.perm,item.role);
				    	// Add Role to Permission
						rowPermission._permissionRoles.push(rowRole);
						rowPermission.save(function (err) {
					    	if (err){
					    		console.log('loadPermissionsRoles Error Saving Role : %s Perm : %s Err :%s ',item.role,item.perm,err);
					            throw err; 
					    	}
					    	console.log ('Role: %s added to Permission : %s:',item.role,item.perm);
						    // Async call is done, alert via callback
						    callback();
						});
				    });
				});
			});
		},	
		// 3rd param is the function to call when everything's done
		function(err){
			// All tasks are done now
			console.log('loadPermissionsRoles Iterating done');
			LoadUserRole();
		}
	);
}

function LoadUserRole(){ 
	async.eachSeries(userRoleData,
			  // 2nd param is the function that each item is passed to
			function(item, callback){
			// Call an asynchronous function, often a save() to DB
				User.findOne({'userName': item.user}).exec( function(err, rowUser) { 
					if (err){ 
						console.log('LoadUserRole User.finOne Error User : %s Role :%s  Err :% ',item.user,item.role,err);
						throw err;
					}
					Role.findOne({'roleName': item.role}).exec(function(err, rowRole) {
				    	if (err){ 
				    		console.log('LoadUserRole Role.finOne Error Role : %s Role :%s  Err :% ',item.perm,item.role,err);
				    		throw err;
				    	}
				    	// Add Permission to Role
						rowRole._rolePermissions.push(rowUser);
					    rowRole.save(function (err) {
					    	if (err){
					    		console.log('LoadUserRole Error Saving User : %s Role :%s  Err :% ',item.user,item.role,err);
					            throw err; 
					    	}
					    	console.log ('LoadUser User: %s added to Role : %s:',item.user,item.role);
					    	// Add Role to Permission
					    	rowUser._userRoles.push(rowRole);
					    	rowUser.save(function (err) {
						    	if (err){
						    		console.log('LoadUserRole Error Saving Role : %s User : %s Err :%s ',item.role,item.user,err);
						            throw err; 
						    	}
						    	console.log ('Role: %s added to User : %s:',item.role,item.user);
							    // Async call is done, alert via callback
							    callback();
							});
					    });
					});
				});
			},	
			// 3rd param is the function to call when everything's done
			function(err){
				// All tasks are done now
				console.log('LoadUserRole Iterating done');
				closeCon();
			}
		);
	}

loadUsers();

function closeCon (){ mongoose.disconnect()};
