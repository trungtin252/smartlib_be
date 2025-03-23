const express = require("express");
const route = express.Router();



const uploadCloud =
  require("../../middlewares/uploadCloud.middlewares").uploadCloud;

const UserController = require("../../controller/client/profile.controller");
const multer = require("../../helpers/storeMuler");

const upload = multer;

route.get("/", UserController.index);
route.post("/changeavata", upload.single("image"), UserController.changeAvatar);

module.exports = route;
