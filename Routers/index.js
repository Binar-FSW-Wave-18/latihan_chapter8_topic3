const express = require("express")
const route = express.Router()
const UserController  = require("../controllers/UserController")


route.get("/", UserController.viewregister)
route.post("/registerhandle", UserController.register)
route.get("/login", UserController.viewlogin)
route.post("/loginhandle", UserController.login)
route.get("/home", UserController.home)



module.exports = route