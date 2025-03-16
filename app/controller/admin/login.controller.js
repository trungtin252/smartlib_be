const StaffService = require("../../services/staff.service");

module.exports.login = async (req, res, next) => {
  try {
    const { staffID, password } = req.body;
    const staff = await StaffService.getStaffbyCode(staffID);
    if (!staff) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }
    if (!(password === staff.matKhau)) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};
