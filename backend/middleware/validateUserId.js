// validates author and recipient ids from request query and ensures that it returns numerical ids for other functions
function validateUserId(req, res, next) {
    const userId = Number(req.user.id);

    if (Number.isNaN(userId)) {
        return res.status(400).json({
            message: 'Invalid ID',
        });
    };

    req.validatedUserId = userId;
    next();
};

module.exports = validateUserId;