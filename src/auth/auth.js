const passport = require('passport');
const { User } = require('../models');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
//check if user role is allowed
function authRole(role) {
  return (req, res, next) => {
    if(req.user.role !== role){
      res.status(401)
      return res.send('Access not allowed')
    }
    next();
  }
}

//check if user can view this resource
function canViewResource(user, resource) {
  return (user.role === 'Accountant' || user.role === 'Admin' || resource.userId === user.userId)
}

// function authResource(req, res,next){

// }

//auth strategy
passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromHeader('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = {authRole, canViewResource}