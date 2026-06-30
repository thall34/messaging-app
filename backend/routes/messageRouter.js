const { Router } = require('express');
const messageRouter = Router();
const messageController = require('../controllers/messageController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isOwner = require('../middleware/isOwner');
const validateId = require('../middleware/validateId');
const validateUserId = require('../middleware/validateUserId');
const validateRecipientId = require('../middleware/validateRecipientId');
const validateMessage = require('../middleware/validateMessage');

messageRouter.get('/:id', isAuthenticated, validateId, messageController.findMessage);
messageRouter.post('/:recipientId', isAuthenticated, validateRecipientId, validateUserId, validateMessage, messageController.createMessage);
messageRouter.put('/:id', isAuthenticated, validateId, isOwner, validateMessage, messageController.updateMessage);
messageRouter.delete('/:id', isAuthenticated, validateId, isOwner, messageController.deleteMessage);

module.exports = messageRouter;