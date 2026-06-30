const { body } = require('express-validator');

const validateUser = [
    body('username')
    .trim()
    .notEmpty().withMessage('Must include a username')
    .isLength({ max: 50 }).withMessage('Username must be less than 50 characters'),
    body('password')
    .trim()
    .notEmpty().withMessage('Must include a password')
    .isLength({ min: 8, max: 20 }).withMessage('Password must be at least 8 characters but less than 20')
    .isStrongPassword({
        minLowerCase: 1,
        minUpperCase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage('Password must contain at least 1 lower case letter, 1 upper case letter, 1 number, and 1 symbol'),
    body('email')
    .trim()
    .notEmpty().withMessage('Must include an email')
    .isEmail().withMessage('Must be a valid email (example@example.com)')
    .normalizeEmail(),
    body('birthDate')
    .trim()
    .notEmpty().withMessage('Must include a birthdate')
    .isDate({ format: 'YYYY-MM-DD' }).withMessage('Must be a valid date')
    .toDate(),
];

module.exports = validateUser;