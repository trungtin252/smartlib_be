const CategoryModel = require("../model/category.model");

module.exports.getAllCatogory = async () => {
  return await CategoryModel.find();
};
