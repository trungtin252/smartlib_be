const express = require("express");
const route = express.Router();

const UserController = require("../../controller/admin/user.controller");

route.get("/", UserController.getAllUser);

module.exports = route;
