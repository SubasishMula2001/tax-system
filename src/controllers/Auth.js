const { Accountant, Payer, User } = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken')
// /api/v1/auth/new
// public
// add a new user
exports.registerUser = async (req, res, next) => {
    try {
        const { name, username, password, role } = await req.body;
        await User.register({ username: username }, password, async (err, user) => {
            if (err) {
                console.log('register error' + err);
                return res.status(500).json({
                    success: false,
                    msg: err
                })
            } else {
                user.name = name;
                user.role = role;
                user.save();
                if (role === 'Accountant') {
                    const accountant = await Accountant.create({
                        name, username,
                        userId: user.id
                    })
                } else if (role === 'Payer') {
                    const { age, state, panId } = req.body;
                    const admin = await Payer.create({
                        name, username, age, state, panId,
                        userId: user.id,
                    })
                }
                return res.status(200).json({
                    success: true,
                    data: user
                })
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Unable to register user'
        })
    }
}

//@ api/v1/auth/login

exports.loginUser = async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        console.log('inside login funciton', user)
        req.login(user, (err) => {
            if (err) {
                console.log('login err' + err);
                return res.status(500).json({
                    success: false,
                    msg: 'unable to login'
                })
            } else {
                passport.authenticate("local")(req, res, () => {
                    const body = {
                        userId: req.user._id,
                        username: req.user.username,
                        role: req.user.role
                    }
                    const token = jwt.sign({ user: body }, 'TOP_SECRET');
                    return res.status(200).json({
                        success: true,
                        data: {
                            ...body, token
                        }
                    })
                });
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: error
        })
    }
}

// @api/v1/auth/logout
//req.user middleware is removed ,however jwt expiration is not enabled
exports.logoutUser = async (req, res, next) => {
    try {
        req.logout()
        return res.status(200).json({
            success: true,
            msg: 'logout success'
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            msg: 'unable to logout'
        })
    }
}