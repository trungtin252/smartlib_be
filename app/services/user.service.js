const UserModal = require("../model/user.model");

const getUserbyID = async (userId) => {
  return await UserModal.findById(userId);
};

const getUserbyPhone = async (phonenumber) => {
  return await UserModal.findOne({ soDienThoai: phonenumber });
};

const updateUser = async (userId, updateData) => {
  return await UserModal.findByIdAndUpdate(userId, updateData, { new: true });
};

const getAll = async () => {
  return await UserModal.find();
};

module.exports = { getUserbyID, updateUser, getUserbyPhone, getAll };
