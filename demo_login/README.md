

# Demo_login
Demo application using passport to handle login process, database mongodb (mongoose) and bcrypt to crypt password. 

I have added two scripts
	/lib/middleware/roles.js to add roles to users (req.user.roles = ['Admin', 'Expeditor','Receiver']) 
	/lib/permissions.js      to add permissions to user
	
Those two script can be regrouped in one, but the purpose is tow demonstrate two different approaches.
	roles is integrated to express middleware (the one I prefer)
	permissions need a modification of /passeport/init.js to be executed
	
	 
## Usage
You need to have a mongodb server running.


## Developing
Add passport, passport-local, mongoose, bcrypt-nodejs and connect-flash into package.json and setup app.js
Setup database url in conf/db.js


### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
