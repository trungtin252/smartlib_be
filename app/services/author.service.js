const AuthorModel = require("../model/author.model");

module.exports.getAuthorByName = async (name) => {
  return await AuthorModel.findOne({ ten: name });
};

module.exports.getAuthorById = async (id) => {
  return await AuthorModel.findById(id);
};

module.exports.getAuthorsbyName = async (name) => {
  return await AuthorModel.find({
    ten: { $regex: name, $options: "i" },
  }).limit(10);
};

module.exports.getAll = async () => {
  return await AuthorModel.find();
};
