const userService = require("../services/user.service");

module.exports.login = async (req, res, next) => {
  try {
    const { password, phonenumber } = req.body;
    const user = await userService.getUserbyPhone(phonenumber);
    if (!user) {
      res.status(400).json({ message: "Invalid username or password" });
    }
    if (!(password === user.matKhau)) {
      res.status(400).json({ message: "Invalid username or password" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
