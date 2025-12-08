const User = require("../models/userModel");


const createUser = async (userData) => {
    return await User.create(userData);
};

const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const getUserByUid = async (uid) => {
    return await User.findOne({ where: { uid } });

};
module.exports = {
    createUser,
    getUserByEmail,
    getUserByUid,
};