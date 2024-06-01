const router = require("express").Router();
const profileService = require("../services/profileService");
//const { isAuth } = require("./../middlewares/authMiddleware");


//! profle page is fucked
router.post('/',async (req,res)=>{
    const {email} = req.body
  
    try {
        const profileData = await profileService.getProfileData(email)
    res.json(profileData).status(200).end();
    console.log('userData deliverd');
    } catch (message) {
        res.status(400).json({ message }); 
    }
     
})



router.put("/edit", async (req, res) => {
   console.log("here");
  try {
    
    console.log(req.body);
    
     // const { email } = req.params;
      //console.log(email);
      
  
      const {
        currentEmail,
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
        country,
        city,
        aboutMe,
      } = req.body;
  
    
    
   
  
      await profileService.update(
        currentEmail,
        username,
        firstName,
        lastName,
        phoneNumber,
        country,
        city,
        aboutMe
    );
    console.log('Successful Profile Edit');
    const updatedProfileData = {
      username,
      firstName,
      lastName,
      phoneNumber,
      country,
      city,
      aboutMe,
    };
  
      res.json(updatedProfileData).status(200).end();
    } catch (message) {
      res.status(400).json({ message });
    }
  });
module.exports = router;
