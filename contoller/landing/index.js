const { getLoggedInDetails } = require("../../helper");
const Standard = require('../../model/standard') ;
const Student = require('../../model/student') ; 
async function landing(req, res) {
  // ✅ Completed
  const loggedInDetails = getLoggedInDetails(req); 
  const allStandards = await Standard.find({u_id:loggedInDetails.user_id}) ; 
  const studentCount_standard = [] ;
  for(let i=0;i<allStandards.length ;++i) { 
    const standard = allStandards[i].standard
    const countStudent = await Student.countDocuments({
u_id:loggedInDetails.user_id
,s_standard:standard}) ; 
     studentCount_standard.push({
       standard : standard  ,
       count : countStudent
     })
  } 
  console.log(loggedInDetails.school_name);
  if (loggedInDetails) {
    res.render("Dashboard", { loggedIn: true,counts : studentCount_standard ,school_name :loggedInDetails.school_name});
  } else res.render("Home", { loggedIn: false });
}

module.exports = {
  landing,
};
