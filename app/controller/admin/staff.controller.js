const StaffService = require("../../services/staff.service");

module.exports.index = async (req, res, next) => {
  try {
    const staffId = req.params.staffId;
    const staffInfo = await StaffService.getStaffbyId(staffId);
    res.status(200).json(staffInfo);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllStaff = async (req, res, next) => {
  try {
    const staffs = await StaffService.getAllStaff();
    res.status(200).json(staffs);
  } catch (error) {
    next(error);
  }
};
