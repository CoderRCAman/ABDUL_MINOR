const req = require("express/lib/request");
const { getLoggedInDetails } = require("../../helper");
const Standard = require("../../model/standard");
async function getStandardPage(req, res) {
  //✅ comleted
  const loggedInDetails = getLoggedInDetails(req); 
  const availableStandard = await Standard.find() ;
  res.render("Standard", {
    loggedIn: loggedInDetails ? loggedInDetails : false,
    standards:availableStandard
  });
} 

async function getStandardDeletePage(req,res){ 
  const id = req.params.id ; 
  const standardDetails = await Standard.findById(id) ; 
  const loggedInDetails = getLoggedInDetails(req);  
  if(!standardDetails){
    return res.render('AlreadyDeleted',{
      loggedIn:loggedInDetails ? loggedInDetails : false,
    }) ;
  }
   res.render('StandardDelete',{
    loggedIn: loggedInDetails ? loggedInDetails : false,
    standard:standardDetails.standard,
    id:id
  });
}
async function getStandardEditPage (req,res){
  const id = req.params.id ; 
  const standardDetails = await Standard.findById(id) ; 
  const loggedInDetails = getLoggedInDetails(req);  
  if(!standardDetails){
    return res.render('AlreadyDeleted',{
      loggedIn:loggedInDetails ? loggedInDetails : false,
    }) ;
  }
   res.render('StandardEdit',{
    loggedIn: loggedInDetails ? loggedInDetails : false,
    standard:standardDetails.standard,
    id:id
  });
}

async function addStandard(req, res) {
  //❗ to do
  try {
    const { standard } = req.body;
    if (!standard) {
      return res.status(400).json({ msg: "Cannot add empty standard" });
    } 
    const standardExist = await Standard.findOne({standard:standard});
    if(standardExist) return res.status(400).json({msg:'Standard already exist'})
    const newStandard = new Standard(req.body);
    if (!newStandard) {
      return res
        .status(400)
        .json({ msg: "Something went wrong while creating standard" });
    }
    await newStandard.save();
    return res.status(200).json({standard:newStandard}) ;
  } catch (error) { 
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
async function deleteStandard(req,res) {
  try {
    const {id} = req.params ; 
    if(!id) return res.status(400).json({ msg: "No id was found to delete" }); 
    await Standard.deleteOne({_id:id}); 
    return res.status(200).json({mssg:'Deleted Ok'}) ;
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Internal server error"});
  }
} 

async function updateStandard(req,res) {
  try {
    const {id} = req.params ; 
    console.log(req.body);
    const {standard} = req.body ; 
    if(!id || !standard) return res.status(400).json({ msg: "No id/standard was found to update" }); 
    await Standard.updateOne({_id:id},{standard:standard});
    return res.status(200).json({mssg:'Updated Ok'}) ;
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Internal server error"});
  }
} 


module.exports = {
  getStandardPage,
  addStandard,
  deleteStandard,
  updateStandard,
  getStandardDeletePage,
  getStandardEditPage
};
