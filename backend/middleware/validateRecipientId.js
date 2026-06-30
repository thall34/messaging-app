// validates recipient id from request parameters and ensures that it returns a numerical recipient id for other functions
function validateRecipientId(req, res, next) {
    const id = Number(req.params.recipientId);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: 'Invalid ID',
        });
    };

    req.validatedRecipientId = id;
    next();
};

module.exports = validateRecipientId;