const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const passport = require('passport')
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
    },
    username: {
        type: String, 
        unique: [true, 'Username already exists']
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    }
})

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);


passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = User;