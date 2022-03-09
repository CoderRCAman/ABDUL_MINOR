const { getLoggedInDetails } = require("../../helper");
const { paginatedResults } = require("../../helper/pagination");
const Student = require("../../model/student"); 
const Standard = require("../../model/standard") ;
async function getAdmissionPage(req, res) {
  // ✅ Completed
  const loggedInDetails = getLoggedInDetails(req); 
  const standards = await Standard.find({u_id:loggedInDetails.user_id}) ;
  res.render("Admission", {
    loggedIn: loggedInDetails ? loggedInDetails : false,
    standards : standards
  });
}
async function getAdmissionPanel(req, res) {
  const loggedInDetails = getLoggedInDetails(req);
  try {
    const studentList = await paginatedResults({ u_id:loggedInDetails.user_id }, Student);  
    const standards = await Standard.find({u_id:loggedInDetails.user_id}) ;
    res.render("AdmissionPanel", {
      loggedIn: loggedInDetails ? loggedInDetails : false,
      student_list: studentList,
      standards : standards
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}   

async function getStudentView (req,res) {
  const id = req.params.id ; 
  if(!id) return res.status(400).json({msg:'NO ID WAS FOUND'}) ;
  try {
    const student = await Student.findById(id) ; 
    const loggedInDetails = getLoggedInDetails(req); 
    return res.render('ViewStudent',{
      loggedIn: loggedInDetails ? loggedInDetails : false,
      student: student,
    });
  } catch (error) { 
    console.log(error);
    return res.status(500).json({msg:'INTERNAL SERVER ERROR'}) ;
  }
}

async function getStudentEditView (req,res) {
   const id= req.params.id ;
  if(!id) return res.status(400).json({msg:'NO ID WAS FOUND'}) ;
  try {
    const student = await Student.findById(id) ; 
    const loggedInDetails = getLoggedInDetails(req); 
    const standards = await Standard.find() ;

    return res.render('StudentEdit',{
      loggedIn: loggedInDetails ? loggedInDetails : false,
      student: student,
      id: id,
      standards:standards
    });
  } catch (error) { 
    console.log(error);
    return res.status(500).json({msg:'INTERNAL SERVER ERROR'}) ;
  }
} 
async function getStudentDelete (req,res) {
  try {
    const id = req.params.id ; 
    const student = await Student.findById(id) ; 
    const loggedInDetails = getLoggedInDetails(req);  
    if(!student){
      return res.render('AlreadyDeleted',{
        loggedIn:loggedInDetails ? loggedInDetails : false,
      }) ;
    }
     return res.render('StudentDelete',{
      loggedIn: loggedInDetails ? loggedInDetails : false,
      student:student,
      id:id
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:'Internal server error'});
  }
}
async function updateStudent (req,res) {
  const body = req.body ; 
  const id = req.params.id ; 
  if(!body|| !id) return res.status(400).json({msg:"NOTHING TO UPDATE"}) ; 
  try {
    await Student.updateOne({_id:id},body) ;
    return res.status(200).json({msg:'Updated successfully'}) ;
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:'INTERNAL SERVER ERROR'})
  }  
} 
async function deleteStudent (req,res) {
  try {
    const id = req.params.id ;
    if(!id) return res.status(400).json({msg:"NOTHING TO D"}) ; 
    await Student.deleteOne({_id:id});
    return res.status(200).json({msg:'DELETED OK!'})
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:'INTERNAL SERVER ERROR'})

  }
}

async function getStudentByStandard (req,res) {
  let {standard} = req.query ;  
  if(!standard) return res.status(400).json({msg:'NO STANDARD WAS SELECTED'}); 
  const loggedInDetails = getLoggedInDetails(req) ;
  try {
    const studentList = await paginatedResults({standard:standard,u_id:loggedInDetails.user_id},Student) ;
    return res.status(200).json(studentList);
  } catch (error) {
    return res.status(500).json({msg:'Internal server error'});
  }
}

async function admitStudent(req, res) {
  // ✅ Completed
  try {
    const body = req.body;
    console.log(body);
    //verify uniqueness of the given data
    const ifStudentAlreadyExist = await Student.findOne({
      s_roll: body.s_roll,
      s_standard: body.s_standard,
    });
    if (ifStudentAlreadyExist)
      return res
        .status(400)
        .json({
          msg: `Same roll number already exist in standard ${body.s_standard}`,
        });
    const newStudent = new Student(body);
    const savedStudent = await newStudent.save();
    if (savedStudent)
      return res
        .status(201)
        .json({ msg: "Successfully admitted a new student" });
    return res.status(400).json({ msg: "Unable to save student" });
  } catch (error) {
    const validationError = {
      school_name: error.school_name,
      student_name: error.s_name,
      student_roll: error.s_roll,
      date_of_birth: error.date_of_birth,
      student_phone: error.s_phone,
      student_address: error.s_address,
      student_standard: error.s_standard,
    };
    res.status(400).json({ error: validationError });
    return res.status(500).json({ msg: "" });
  }
}
module.exports = {
  getAdmissionPage,
  admitStudent,
  getAdmissionPanel,
  getStudentByStandard,
  getStudentView ,
  getStudentEditView,
  updateStudent,
  getStudentDelete,
  deleteStudent
};
