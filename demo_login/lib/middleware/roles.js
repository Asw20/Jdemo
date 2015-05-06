var err='';
var userRoles = function (){
	return function(req,res,next) {
		if (typeof(req.user) != 'undefined') {
			req.user.roles = ['Admin', 'Expeditor','Receiver'];
			next();
    	}else{
    		next();
    	};	
	}
}
module.exports = userRoles