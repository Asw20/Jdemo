//import async to make control flow simplier
var async = require('async');

//var models = require('./models/schemas');
//var dbConfig = require('./conf/db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

Array.prototype.eltidxOf = function arrayObjectIndexOf(property, value) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === value) return i;
    }
    return -1;
}

// Connect to Bd
//mongoose.connect(dbConfig.url);
//mongoose.createConnection(dbConfig.url);
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

var rolePermissionData  = [
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
 *   ---------- First Create Master Data (Users, Roles, Permissions)  ----------
 */

/*
 *  Create user
 */
function addUser(name,password,email){  
	
	User.findOne({ 'userName': name},function(err, rows) {  
		
		if(err){
			console.log('User Error Add: '+err);
	    	throw err;  
	    } 		

		if (!rows){
			  var newUser =new User();
			  newUser.userName = name;
			  newUser.password = password;
			  newUser.email = email;
   			  newUser.save(function(err) {
				  if (err){
					  console.log('User Error in Saving: '+err);
					  throw err;  
				  }
				  console.log('User : %s created',name);
   			  });	  
		}
	});
}

/*
 *  Create Roles
 */
function addRole(name,active){  
	
	Role.findOne({ 'roleName': name},function(err, rows) {  
		
		if(err){
			console.log('Role Error Add : '+err);
	    	throw err;  
	    } 		

		if (!rows){
			  var newRole =new Role();
			  newRole.roleName = name;
			  newRole.active = active;
			  newRole.save(function(err) {
				  if (err){
					  console.log('Role Error in Saving: '+err);
					  throw err;  
				  }
				  console.log('Role : %s created',name);
   			  });	  
		}
	});
}

/*
 *  Create Permission
 */
function addPermission(name,active){  
	
	Permission.findOne({ 'permissionName': name},function(err, rows) {  
		
		if(err){
			console.log('Permission Error Add : '+err);
	    	throw err;  
	    } 		

		if (!rows){
			  var newPermission =new Permission();
			  newPermission.permissionName = name;
			  newPermission.active = active;
			  newPermission.save(function(err) {
				  if (err){
					  console.log('Permission Error in Saving: '+err);
					  throw err;  
				  }
				  console.log('Permission : %s created',name);
   			  });	  
		}
	});
}

/*
 * ------------------ Link Permissions with Roles --------------
 */

function addRolePermission(perm,role){ 
	// Retrieve Permission Object
	Permission.findOne({'permissionName': perm}).populate('_permissionRoles').exec( function(err, rowPermission) { 
    	if (err){ 
    		console.log('addRolePermission Permission.finOne Error Perm : %s Role :%s  Err :% ',perm,role,err);
    		throw err
    		};
		if (rowPermission) {
			// Retrieve Role Object
			Role.findOne({'roleName': role}).populate('_rolePermissions','permissionName').exec(function(err, rowRole) {
		    	if (err){ 
		    		console.log('addRolePermission Role.finOne Error Perm : %s Role :%s  Err :% ',perm,role,err);
		    		throw err
		    		};
				if (rowRole) {
					// Add Permission to Role
					if (rowRole._rolePermissions.eltidxOf('permissionName',perm) < 0) { 
						rowRole._rolePermissions.push(rowPermission);
					    rowRole.save(function (err) {
					    	if (err){
					    		console.log('addRolePermission Error Saving Perm : %s Role :%s  Err :% ',perm,role,err);
					            throw err; 
					    	}
					    	console.log ('Permission: %s added to Rolle : %s:',rowPermission.permissionName,rowRole.roleName);
//							// Add Role to Permission
							if (rowPermission._permissionRoles.eltidxOf('roleName',role) < 0) { 
								rowPermission._permissionRoles.push(rowRole);
								rowPermission.save(function (err) {
							    	if (err){
							    		console.log('addRolePermission Error Saving Role : %s Perm : %s Err :%s ',role,perm,err);
							            throw err; 
							    	}
							    	console.log ('Role: %s added to Permission : %s:',rowRole.roleName,rowPermission.permissionName);
						            mongoose.disconnect();
								});
							}					    	
					    	
					    });
					}
				}
			});
		}
	});
}


function addUserRole(user,role){ 
	// Retrieve Permission Object
	User.findOne({'userName': user}).populate('_userRoles').exec( function(err, userRec) { 
		if (userRec) {
			// Retrieve Role Object
			Role.findOne({'roleName': role}).populate('_rolePermissions','permissionName').exec(function(err, roleRec) {
				if (roleRec) {
					// Add Permission to Role
					if (roleRec._roleUsers.eltidxOf('userName',user) < 0) { 
						roleRec._roleUsers.push(userRec);
						roleRec.save(function (err) {
					    	if (err){
					    		console.log('User Add to Role Error in Saving: '+err);
					            throw err; 
					    	}
					    	console.log ('User: %s added to Rolle : %s:',userRec.userName,roleRec.roleName);
//							// Add Role to Permission
							if (userRec._userRoles.eltidxOf('roleName',role) < 0) { 
								userRec._userRoles.push(roleRec);
								userRec.save(function (err) {
							    	if (err){
							    		console.log('Role Add to User in Saving: '+err);
							            throw err; 
							    	}
							    	console.log ('Role: %s added to User : %s:',roleRec.roleName,userRec.userName);
							    });
							}
					    });
					}

				}
			});
		}
	});
}

function cleanup() {
//	  models.User.remove(function() {
//	    mongoose.disconnect();
//	  });
	}

//mongoose.connect('mongodb://localhost/demo_mongodb', function (err) {
//	  if (err) throw err;


var createMasterData = function(callback){	 
	async.parallel({
		userLoad: function(callback){
			  async.each(userData, function (item, callback) {
				  addUser(item.name,item.password,item.email);
				  callback();
			  });
		  },
		  
		roleLoad: function(callback){
			async.each(roleData, function (item, callback) {
				addRole(item.name,item.active);
				callback();
			});
		},
	
		permissionLoad: function(callback){
			async.each(permissionData, function (item, callback) {
				addPermission(item.name,item.active);
				callback();
			});
		}
		
	}, function(err, result) {
		if (err) {throw err;}
		
		callback(err, result);		
	});
};

var createRelations = function (callback){
	async.series({
		assignPermsToRole: function (callback){
			async.eachSeries(rolePermissionData, function (item, callback) {
				addRolePermission(item.perm,item.role);
				callback();
			});
		},
		
		assignRolesToUser : function(callback){
			async.eachSeries(userRoleData, function (item, callback) {
				addUserRole(item.user,item.role);
				callback();
			});
		}
		
	}, function(err, result) {
		if (err) {throw err;}
		
//		callback(err, result);		
	});
};

mongoose.connect('mongodb://localhost/demo_mongodb', function (err) {	
	 if (err) throw err;
	 createMasterData(createRelations());
});
