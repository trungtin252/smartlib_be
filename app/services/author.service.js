const AuthorModel = require("../model/author.model");

module.exports.getAuthorByName = async (name) => {
  return await AuthorModel.findOne({ ten: name });
};
