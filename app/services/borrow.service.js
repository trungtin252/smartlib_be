const BorrowModal = require("../model/borrow.model");

const getBorrow = async (query) => {
  return BorrowModal.find(query);
};

module.exports.createBorrow = async (data) => {
  return BorrowModal.save(data);
};
module.exports = { getBorrow };
