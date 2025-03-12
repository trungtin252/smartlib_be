const express = require("express");
const route = express.Router();

const Login = require("../../controller/admin/login.controller");

route.get("/", Login);

module.exports = route;
