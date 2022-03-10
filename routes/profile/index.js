  const { getProfilePage, getUpdateProfilePage, updateAdmin } = require("../../contoller/profile");
const { isAuthenticated } = require("../../middleware/auth");
  
  const router = require("express").Router();
  
router.route('/profile').get(isAuthenticated,getProfilePage) ;
router.route('/profile/edit').get(isAuthenticated,getUpdateProfilePage)
.put(isAuthenticated,updateAdmin);
  module.exports = router;
  