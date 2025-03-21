const StaffModel = require("../model/staff.model");

const getAllStaff = async () => {
  return await StaffModel.find();
};

const getStaffbyCode = async (staffCode) => {
  return StaffModel.findOne({ maNhanVien: staffCode });
};

const getStaffbyId = async (staffId) => {
    return StaffModel.findById(staffId);
}

module.exports = { getAllStaff, getStaffbyCode ,getStaffbyId };
