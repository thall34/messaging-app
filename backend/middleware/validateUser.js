const { body } = require('express-validator');

const validateUser = [
    body('username')
    .trim()
    .notEmpty().withMessage('Must include a username')
    .isLength({ max: 50 }).withMessage('Username must be less than 50 characters'),
    body('password')
    .trim()
    .notEmpty().withMessage('Must include a password')
    .isLength({ max: 20 }).withMessage('Password must be less than 20 characters'),
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