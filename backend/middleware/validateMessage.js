const { body } = require('express-validator');

const validateMessage = [
    body('text')
    .trim()
    .notEmpty().withMessage('Must include a message')
    .isLength({ max: 100 }).withMessage('Message must be less than 100 characters'),
];

module.exports = validateMessage;