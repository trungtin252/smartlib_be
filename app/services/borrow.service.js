const BorrowModal = require("../model/borrow.model");

module.exports.getBorrow = async (query) => {
  return BorrowModal.find(query).populate("sach");
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
