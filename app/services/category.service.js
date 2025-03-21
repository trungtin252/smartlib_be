const CategoryModel = require("../model/category.model");

module.exports.getCatogory = async () => {
  return await CategoryModel.find();
};

module.exports.getCategoriesByName = async (name) => {
  return await CategoryModel.find({
    ten: { $regex: name, $options: "i" },
  }).limit(10);
};
