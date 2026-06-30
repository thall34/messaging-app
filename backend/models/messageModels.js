const prisma = require('../config/db');

async function getMessageById(id) {
    const message = await prisma.message.findUnique({
        where: { id: id },
    });

    return message;
};

async function createNewMessage(text, authorId, recipientId) {
    const newMessage = await prisma.message.create({
        data: {
            text: text,
            authorId: authorId,
            recipientId: recipientId,
        },
    });

    return newMessage;
};

async function updateMessageById(text, messageId) {
    const updatedMessage = await prisma.message.update({
        where: { id: messageId },
        data: {
            text: text,
        },
    });

    return updatedMessage;
};

async function deleteMessageById(id) {
    const deletedMessage = await prisma.message.delete({
        where: { id: id },
    });

    return deletedMessage;
};

module.exports = {
    getMessageById,
    createNewMessage,
    updateMessageById,
    deleteMessageById,
};