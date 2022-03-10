const { getLoggedInDetails } = require("../../helper");
const User = require("../../model/user");
async function getProfilePage(req, res) {
  const loggedDetails = getLoggedInDetails(req);
  const userDetails = await User.findOne({ _id: loggedDetails.user_id });
  return res.render("Profile", {
    loggedIn: loggedDetails ? loggedDetails : false,
    user: userDetails,
  });
}
async function getUpdateProfilePage(req, res) {
  const loggedDetails = getLoggedInDetails(req);
  const userDetail = await User.findById(loggedDetails.user_id);
  if (!userDetail)
    return res.status(404).json({ msg: "No such user was found" });
  return res.render("UpdateProfile", {
    loggedIn: loggedDetails ? loggedDetails : false,
    user: userDetail,
  });
}

async function updateAdmin(req, res) {
  const body = req.body;
  const loggedDetails = getLoggedInDetails(req);
  try {
    const existingAdmin = await User.findById(loggedDetails.user_id);
    if (existingAdmin.email !== body.email) {
      const newEmailExist = await User.findOne({ email: email });
      if (newEmailExist)
        return res
          .status(400)
          .json({ msg: `Email: ${newEmailExist.email}| Already exists` });
    }
    await User.updateOne({ _id: loggedDetails.user_id }, body);
    res.cookie("school_name", body.school_name, {
        maxAge: 24 * 24 * 60 * 1000,
        httpOnly: true,
      });
    return res.status(200).json({ msg: "Updated Ok!" });
  } catch (error) { 
      console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
module.exports = {
  getProfilePage,
  getUpdateProfilePage,
  updateAdmin
};
