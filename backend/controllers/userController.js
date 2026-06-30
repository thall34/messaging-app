const db = require('../models/userModels');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { validationResult, matchedData } = require('express-validator');

// logs in user to passport local session
function logInUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        };

        if (!user) {
            return res.status(401).json({
                message: info?.message || 'Invalid username or password',
            });
        };

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            };

            return res.status(200).json({
                message: 'Successfully logged in',
                user: user,
            });
        });
    }) (req, res, next);
};

// logs out user from passport local session
async function logOutUser(req, res, next) {
    try {
        req.logout((err) => {
            if (err) {
                return next(err);
            };

            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                };

                res.clearCookie('connect.sid');
                res.sendStatus(204).json({
                    message: 'Successfully logged out'
                });
            });
        });
    } catch(err) {
        next(err);
    };
};

// gets user from database using id
async function findUser(req, res, next) {
    const id = req.validatedId;

    try {
        const foundUser = await db.getUserById(id);
        if (!foundUser) {
            return res.status(400).json({
                message: 'Failed finding user',
            });
        };

        return res.status(200).json({
            message: 'Successfully found user',
            foundUser: foundUser,
        });
    } catch(err) {
        next(err);
    };
};

// creates new user in database
async function createUser(req, res, next) {
    console.log(req.body);
    console.log(matchedData(req));
    console.log(validationResult(req).array());
    const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid credentials to create new user',
            });
        };

    try {
        const { username, password, email, birthDate } = matchedData(req);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.createNewUser(username, hashedPassword, email, birthDate);
        if (!newUser) {
            return res.status(400).json({
                message: 'Failed creating new user',
            });  
        };

        return res.status(200).json({
            message: 'Successfully created new user',
            newUser: newUser,
        });
    } catch(err) {
        next(err);
    };
};

// updates user in database
async function updateUser(req, res, next) {
    const errors = validationResult(req);
    const id = req.validatedId;

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid credentials to update user'
            });
        };

    try {
        const { username, password, email, birthDate } = matchedData(req);
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await db.updateUserById(username, hashedPassword, email, birthDate, id);
        if (!updatedUser) {
            return res.status(400).json({
                message: 'Failed to update user'
            });
        };
        
        return res.status(200).json({
            message: 'Successfully updated user',
            updatedUser: updatedUser,
        });
    } catch(err) {
        next(err);
    };
};

// deletes user from database
async function deleteUser(req, res, next) {
    const id = req.validatedId;

    try {
        await db.deleteUserById(id);
        return res.sendStatus(204);
    } catch(err) {
        next(err);
    };
};

module.exports = {
    logInUser,
    logOutUser,
    findUser,
    createUser,
    updateUser,
    deleteUser,
}