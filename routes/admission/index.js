const {
  getAdmissionPage,
  admitStudent,
  getAdmissionPanel,
  getStudentByStandard,
  getStudentView,
  getStudentEditView,
  updateStudent,
  getStudentDelete,
  deleteStudent,
} = require("../../contoller/admission");
const { isAuthenticated } = require("../../middleware/auth");
const {
  paginatedResults,
  searchStudent_roll,
} = require("../../helper/pagination");

const router = require("express").Router();
router
  .route("/admission")
  .get(isAuthenticated, getAdmissionPage)
  .post(isAuthenticated, admitStudent);
router.route("/admission/panel").get(isAuthenticated, getAdmissionPanel);
router.route("/student/standard").get(isAuthenticated, getStudentByStandard);
router.route("/student/").get(isAuthenticated, searchStudent_roll);
router.route("/student/view/:id").get(isAuthenticated, getStudentView);
router
  .route("/student/delete/:id")
  .get(isAuthenticated, getStudentDelete)
  .delete(isAuthenticated, deleteStudent);
router
  .route("/student/edit/:id")
  .get(isAuthenticated, getStudentEditView)
  .put(isAuthenticated, updateStudent);

module.exports = router;
