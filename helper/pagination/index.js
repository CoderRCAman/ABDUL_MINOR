const Student = require("../../model/student");

async function paginatedResults(query, model) {
  let standard = query.standard === "New Admitted" ? undefined : query.standard;
  const results = {};

  try {
    results.results = await model
      .find(
        standard ? { u_id:query.u_id , s_standard: standard } : {u_id:query.u_id}
      )
      .exec();

    return results;
  } catch (error) {
    throw error;
  }
}
async function searchStudent_roll(req, res) {
  const {roll_no,u_id} = req.query; 
  try {
    if (!roll_no)
      return res.status(400).json({ msg: "Please specify a roll number" });
    const foundStudent = await Student.findOne({u_id:u_id , s_roll: roll_no });
    return res.status(200).json(foundStudent);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
}
module.exports = {
  paginatedResults, 
  searchStudent_roll
};
