const BorrowModal = require("../model/borrow.model");

module.exports.getBorrow = async (
  query,
  sortBy = "ngayMuon",
  sortOrder = -1
) => {
  return BorrowModal.find(query)
    .sort({ [sortBy]: sortOrder })
    .populate("sach")
    .populate("docGia");
};

module.exports.createBorrow = async (data) => {
  return BorrowModal.save(data);
};

module.exports.deleteBorrow = async (id) => {
  return BorrowModal.findByIdAndDelete(id);
};

module.exports.getBorrowById = async (id) => {
  return BorrowModal.findById(id);
};
