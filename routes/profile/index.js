  const { getProfilePage } = require("../../contoller/profile");
const { isAuthenticated } = require("../../middleware/auth");
  
  const router = require("express").Router();
  
router.route('/profile').get(isAuthenticated,getProfilePage) ;
  module.exports = router;
  