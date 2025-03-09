const userService = require("../../services/user.service");
require("dotenv").config();

const port = process.env.PORT;

module.exports.index = async (req, res, next) => {
  try {
    const userId = req.query.id;
    const userInfo = await userService.getUserbyID(userId);
    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

module.exports.changeAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có ảnh nào được tải lên" });
    }
    const userId = req.body.userId;
    const imageUrl = `http://localhost:${port}/api/uploads/${req.file.filename}`;

    // Cập nhật ảnh đại diện trong database
    const user = await userService.updateUser(userId, {
      anhDaiDien: imageUrl,
    });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res
      .status(200)
      .json({ message: "Thay đổi ảnh đại diện thành công", imageUrl });
  } catch (error) {
    console.error("Lỗi changeAvatar:", error);
    res.status(500).json({ message: "Lỗi khi thay đổi avatar", error });
  }
};
