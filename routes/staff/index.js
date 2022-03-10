const {
  getStaffPge,
  registerStaff,
  getStaffPanel,
  getStaffView,
  getStaffEdit,
  updateStaff,
  getStaffDelete,
  deleteStaff,
  searchStaffs,
  searchAllStaff,
} = require("../../contoller/staff");
const { isAuthenticated } = require("../../middleware/auth");

const router = require("express").Router();

router
  .route("/staff")
  .get(isAuthenticated, getStaffPge)
  .post(isAuthenticated, registerStaff);
router.route("/staff/panel").get(isAuthenticated, getStaffPanel);
router.route("/staff/view/:id").get(isAuthenticated, getStaffView);
router
  .route("/staff/edit/:id")
  .get(isAuthenticated, getStaffEdit)
  .put(isAuthenticated, updateStaff);
router
  .route("/staff/delete/:id")
  .get(isAuthenticated, getStaffDelete)
  .delete(isAuthenticated, deleteStaff);
router.route("/staff/search").get(isAuthenticated, searchStaffs);
router.route("/staff/search/all").get(isAuthenticated,searchAllStaff);
module.exports = router;
