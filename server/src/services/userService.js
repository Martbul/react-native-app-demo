const User = require("../models/User");

const App = require("../models/app");

const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const {jwtDecode} = require('jwt-decode')
const { SECRET } = require("../constants");
// const { body } = require('express-validator');

async function validatePassword(password, userPassword) {
 
  const isValid = await bcrypt.compare( password, userPassword );
  //console.log(isValid);

  if (!isValid) {
    throw new Error("invalid email or password");
  }
}

async function getToken(user) {
  const payload = { username:user.username,_id: user._id, email: user.email };
  
  const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

  return token;
}




exports.singup = async (userData) => {
  //console.log(userData);
  userData.firstName = ''
  userData.lastName = ''
  userData.country = ''
  userData.city = ''
  userData.phoneNumber = ''
  userData.aboutMe = ''
  userData.imgUrl = ''
  userData.appsLiked=[] 
  // console.log(userData.order);
  // const emailTest = JSON.parse(userData.email)
  // if(await User.findOne(emailTest)){
  //   throw Error
  // }
  try {
    const user = await User.create(userData);
    

const token = await getToken(user); //works


const decodedToken = jwtDecode(token)



//! works!!
return decodedToken;
  } catch (err) {
    console.log('err: '+err);
  }
  
};



exports.login = async (email, password) => {
  const user = await User.findOne({email});
  
  if (!user) {
    return ("invalid username!!!!!!!!! or password");
  }

  await validatePassword(password, user.password);

  const token = await getToken(user);
  const decodedToken = jwtDecode(token)
  
  return decodedToken;
};

exports.getMyProfile = (userId)=> 
  User.findById(userId)

 exports.getSingleUserByEmail = (email) => {
   const query = { email: email }; // Assuming email is the field in the User collection

   return User.findOne(query);
 };

exports.getSingleApp = (id) => App.findById(id);




exports.addLikedAppToUserLikedApps = async (email, appId) => {
  try {
    const app = await this.getSingleApp(appId);
    const user = await this.getSingleUserByEmail(email)

    if (user.appsLiked.includes(app.title)) {
    
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $pull: { appsLiked: app.title } },
      { new: true }
    );

    if (updatedUser) {
      console.log(
        "App removed successfully from the user's liked apps:",
        updatedUser
      );
    } else {
      console.log("User not found or app not removed.");
      }
      




    } else {




      const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $push: { appsLiked: app.title } },
      { new: true }
      );
      
      if (updatedUser) {
      console.log(
        "App added successfully to the user's liked apps:",
        updatedUser
      );
    } else {
      console.log("User not found or app not added.");
      }
      

    }

    

    
  } catch (error) {
    console.error("Failed to update user with app:", error);
  }
};





exports.sptrAppFromUserLikedApps = async (email, appId) => {
  try {
    const app = await this.getSingleApp(appId);
    const user = await this.getSingleUserByEmail(email);

   (user.appsLiked.includes(app.title)) 
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { $pull: { appsLiked: app.title } },
        { new: true }
      );

      if (updatedUser) {
        console.log(
          "App removed successfully from the user's liked apps:",
          updatedUser
        );
      } else {
        console.log("User not found or app not removed.");
      }
    
  } catch (error) {
    console.error("Failed to update user with app:", error);
  }
};














exports.addAppToUserCreatedApps = (data) => {
  const title = data.title
  const creatorEmail = data.creatorEmail


   User.findOneAndUpdate(
     { email: creatorEmail },
     { $push: { appsCreated: title } },
     { new: true }
   )
     .then((updatedUser) => {
       //    console.log("Order added successfully to the user:", updatedUser);
     })
     .catch((error) => {
       console.error("Failed to update user with order:", error);
     });

};



exports.addAppToUserBoughtApps =async(email, appId) => {
  const app = await this.getSingleApp(appId);
  console.log('here');
  console.log(email);
  console.log(app);
 User.findOneAndUpdate(
   { email: email },
   { $push: { appsBought: app.title } },
   { new: true }
 )
   .then((updatedUser) => {
     //    console.log("Order added successfully to the user:", updatedUser);
   })
   .catch((error) => {
     console.error("Failed to update user with order:", error);
   });
}