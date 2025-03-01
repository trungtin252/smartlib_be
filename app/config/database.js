const { default: mongoose } = require("mongoose");

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected !");
  } catch (error) {
    console.log("Fail to connect, please check again");
  }
};
