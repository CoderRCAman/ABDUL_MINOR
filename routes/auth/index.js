const router = require("express").Router(); 
const {getLoginPage,loginUser,get, getRegisterPage, getUserRegistered, logout} = require("../../contoller/login");
const { isAuthenticated } = require("../../middleware/auth");
router.route("/login").get(getLoginPage).post(loginUser);
router.route('/register').get(getRegisterPage).post(getUserRegistered);
router.route('/logout').get(isAuthenticated, logout) ;
module.exports = router;
