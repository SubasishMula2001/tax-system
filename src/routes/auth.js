const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Auth')
const passport = require('passport')
require('../auth/auth');
router
    .route('/new')
    .post(controllers.registerUser)

router
    .route('/login')
    .post(controllers.loginUser)

router
    .route('/logout', passport.authenticate('jwt', { session: false }))
    .post(controllers.logoutUser)

module.exports = router;