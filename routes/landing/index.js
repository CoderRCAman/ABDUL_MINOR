const { landing } = require("../../contoller/landing");

const router = require("express").Router();

router.route("/").get(landing);

module.exports = router;
