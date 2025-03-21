const PushlishModel = require("../model/publisher.model");

module.exports.getPushlisher = async () => {
  return await PushlishModel.find();
};

// module.exports.getCategoriesByName = async (name) => {
//   return await CategoryModel.find({
//     ten: { $regex: name, $options: "i" },
//   }).limit(10);
// };
