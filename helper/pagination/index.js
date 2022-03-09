const Student = require("../../model/student");

async function paginatedResults(query, model) {
  const { page, limit, search } = query;
  let standard = query.standard === "New Admitted" ? undefined : query.standard;
  const results = {};

  try {
    results.results = await model
      .find(
        search ? { s_name: search } : standard ? { s_standard: standard } : {}
      )
      .exec();

    return results;
  } catch (error) {
    throw error;
  }
}
async function searchStudent_roll(req, res) {
  const {roll_no} = req.query;
  try {
    if (!roll_no)
      return res.status(400).json({ msg: "Please specify a roll number" });
    const foundStudent = await Student.findOne({ s_roll: roll_no });
    return res.status(200).json(foundStudent);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
}
module.exports = {
  paginatedResults, 
  searchStudent_roll
};
