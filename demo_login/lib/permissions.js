var err='';

function userPermissions(user,callback){
	permissions = ['user_Dsp','role_Dsp','permission_Dsp'];
	callback(err,permissions)
}
exports.userPermissions = userPermissions;