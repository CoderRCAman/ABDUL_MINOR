const {
  getStandardPage,
  addStandard,
  updateStandard,
  deleteStandard,
  getStandardDeletePage,
  getStandardEditPage,
} = require("../../contoller/standard");
const { isAuthenticated } = require("../../middleware/auth");

const router = require("express").Router();

router
  .route("/standard")
  .get(isAuthenticated, getStandardPage)
  .post(isAuthenticated, addStandard);
router
  .route("/standard/edit/:id")
  .get(isAuthenticated, getStandardEditPage)
  .put(isAuthenticated, updateStandard);
router
  .route("/standard/delete/:id")
  .get(getStandardDeletePage)
  .delete(isAuthenticated, deleteStandard);
module.exports = router;
