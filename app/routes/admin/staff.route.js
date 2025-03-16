const express = require("express");
const route = express.Router();

// const uploadCloud =
//   require("../../middlewares/uploadCloud.middlewares").uploadCloud;

const StaffController = require("../../controller/admin/staff.controller");
// const multer = require("../../helpers/storeMuler");

// const upload = multer;

route.get("/:staffId", StaffController.index);
route.get("/", StaffController.getAllStaff);
// route.post("/changeavata", upload.single("image"), UserController.changeAvatar);

module.exports = route;
