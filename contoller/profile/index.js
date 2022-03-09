const { getLoggedInDetails } = require("../../helper");
const User = require('../../model/user');
async function getProfilePage (req,res) {
    const loggedDetails = getLoggedInDetails(req)  ;
    const userDetails = await User.findOne({_id:loggedDetails.user_id})
    return res.render('Profile' ,{loggedIn:loggedDetails?loggedDetails:false,user:userDetails})
}
module.exports = {
    getProfilePage
}