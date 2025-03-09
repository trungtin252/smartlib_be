const UserModal = require("../model/user.model");

const getUserbyID = async (userId) => {
  return await UserModal.findById(userId);
};

const updateUser = async (userId, updateData) => {
  return await UserModal.findByIdAndUpdate(userId, updateData, { new: true });
};

module.exports = { getUserbyID, updateUser };
