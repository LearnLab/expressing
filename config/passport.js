const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({},
	(username, password, done) => {
		// First, the user gotta be in the DB
		User.findOne({ 
			username: username 
		}, 'name email username hash salt', (err, user) => {
			console.log(user);
			if(err) { return done(err); }

			if(!user || !user.validPassword(password)) {
				return done(null, false, {
					message: 'We have not found that combination of username and password.'
				});
			}

			return done(null, user);
		});
	}
));
