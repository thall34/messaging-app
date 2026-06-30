const db = require('../models/messageModels');
const { validationResult, matchedData } = require('express-validator');

// gets message from database using id
async function findMessage(req, res, next) {
    const id = req.validatedId;

    try {
        const foundMessage = await db.getMessageById(id);
        if (!foundMessage) {
            return res.status(400).json({
                message: 'Failed finding message',
            });
        };

        return res.status(200).json({
            message: 'Successfully found message',
            foundMessage: foundMessage,
        });
    } catch(err) {
        next(err);
    };
};

// creates new message in database
async function createMessage(req, res, next) {
    const errors = validationResult(req);
    const recipientId = req.validatedId;
    const authorId = req.validatedUserId;

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid credentials to create new message',
            });
        };

    try {
        const { text } = matchedData(req);
        const newMessage = await db.createNewMessage(text, authorId, recipientId);
        if (!newMessage) {
            return res.status(400).json({
                message: 'Failed creating new message',
            });  
        };

        return res.status(200).json({
            message: 'Successfully created new message',
            newMessage: newMessage,
        });
    } catch(err) {
        next(err);
    };
};

// updates message in database
async function updateMessage(req, res, next) {
    const errors = validationResult(req);
    const id = req.validatedId;

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid credentials to update message'
            });
        };

    try {
        const { text } = matchedData(req);
        const updatedMessage = await db.updateMessageById(text, id);
        if (!updatedMessage) {
            return res.status(400).json({
                message: 'Failed to update message'
            });
        };
        
        return res.status(200).json({
            message: 'Successfully updated message',
            updatedMessage: updatedMessage,
        });
    } catch(err) {
        next(err);
    };
};

// deletes user from database
async function deleteMessage(req, res, next) {
    const id = req.validatedId;

    try {
        await db.deleteMessageById(id);
        return res.sendStatus(204);
    } catch(err) {
        next(err);
    };
};

module.exports = {
    findMessage,
    createMessage,
    updateMessage,
    deleteMessage,
};