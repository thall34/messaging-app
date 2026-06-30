const prisma = require('../config/db');

async function getUserByName(username) {
    const user = await prisma.user.findUnique({
        where: { username: username },
    });

    return user;
};

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    return user;
};

async function createNewUser(username, password, email, birthDate) {
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: password,
            email: email,
            birthDate: birthDate,
        },
    });

    return newUser;
};

async function updateUserById(username, password, email, birthDate, id) {
    const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
            username: username,
            password: password,
            email: email,
            birthDate: birthDate,
        },
    });

    return updatedUser;
};

async function deleteUserById(id) {
    const deletedUser = await prisma.user.delete({
        where: { id: id },
    });

    return deletedUser;
};

module.exports = {
    getUserByName,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
}