const UserService = require("../../services/user.service");

module.exports.getAllUser = async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
