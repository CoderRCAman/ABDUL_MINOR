const { getLoggedInDetails } = require("../../helper");
const Staff = require("../../model/staff");
function getStaffPge(req, res) {
  const loggedInDetails = getLoggedInDetails(req);
  return res.render("Staff", {
    loggedIn: loggedInDetails ? loggedInDetails : false,
  });
}
async function getStaffPanel(req, res) {
  const loggedInDetails = getLoggedInDetails(req);
  const staffList = await Staff.find({ u_id: loggedInDetails.user_id });
  return res.render("StaffPanel", {
    loggedIn: loggedInDetails ? loggedInDetails : false,
    staff_list: staffList,
  });
}
async function getStaffView(req, res) {
  const loggedInDetails = getLoggedInDetails(req);
  const id = req.params.id;
  const staff = await Staff.findById(id);
  if (!staff)
    return res.render("AlreadyDeleted", {
      loggedIn: loggedInDetails ? loggedInDetails : false,
    });
  return res.render("ViewStaff", {
    loggedIn: loggedInDetails ? loggedInDetails : false,
    staff: staff,
  });
}
async function getStaffEdit(req, res) {
  const loggedInDetails = getLoggedInDetails(req);
  const id = req.params.id;
  const staff = await Staff.findById(id);
  if (!staff)
    return res.render("AlreadyDeleted", {
      loggedIn: loggedInDetails ? loggedInDetails : false,
    });
  return res.render("StaffEdit", {
    loggedIn: loggedInDetails ? loggedInDetails : false,
    staff: staff,
  });
}
async function getStaffDelete(req, res) {
  const loggedInDetails = getLoggedInDetails(req);
  const id = req.params.id;
  const staff = await Staff.findById(id);
  if (!staff)
    return res.render("AlreadyDeleted", {
      loggedIn: loggedInDetails ? loggedInDetails : false,
    });
  return res.render("StaffDelete", {
    loggedIn: loggedInDetails ? loggedInDetails : false,
    staff: staff,
    id: id,
  });
}
async function deleteStaff(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ msg: "NOTHING TO D" });
    await Staff.deleteOne({ _id: id });
    return res.status(200).json({ msg: "DELETED OK!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
}
async function updateStaff(req, res) {
  const id = req.params.id;
  const body = req.body;
  if (!id || !body) return res.status(400).json({ msg: "Nothing to update" });
  try {
    await Staff.updateOne({ _id: id }, body);
    return res.status(200).json({ msg: "UPDATED OK!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
}
async function registerStaff(req, res) {
  try {
    const body = req.body;
    const loggedDetails = getLoggedInDetails(req);
    console.log(body);
    const ifStaffExist = await Staff.findOne({
      staff_email: body.staff_email,
      u_id: loggedDetails.user_id,
    });
    console.log(ifStaffExist);
    if (ifStaffExist)
      return res
        .status(400)
        .json({ msg: `Same email(${body.staff_email}) is already registered` });
    const newStaff = new Staff(body);
    await newStaff.save();
    return res.status(201).json({ msg: "Successfully registered a new staff" });
  } catch (error) {
    return res.status(500).json({
      error: "Some internal server error/or invalid forms please try again",
    });
  }
}
async function searchStaffs(req, res) {
  try {
    const loggedDetails = getLoggedInDetails(req);
    const { name } = req.query;
    if (!name) return res.status(404).json({ msg: "NOTHING TO SEARCH" });
    const staff = await Staff.find({
      u_id: loggedDetails.user_id,
      staff_name: {  $regex:name, $options:'i'},
    }); 
    return res.status(200).json(staff);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function searchAllStaff (req,res){
  try {
    const loggedDetails = getLoggedInDetails(req); 
    const staff = await Staff.find({
      u_id: loggedDetails.user_id,
    }); 
    return res.status(200).json(staff) ;
  } catch (error) {
    console.log(error); 
    return res.status(500).json({msg:'Internal server error'})
  }
}
module.exports = {
  getStaffPge,
  registerStaff,
  getStaffPanel,
  getStaffView,
  getStaffEdit,
  getStaffDelete,
  updateStaff,
  deleteStaff,
  searchAllStaff,
  searchStaffs,
};
