

const App = require("../models/app");

exports.getAll = async () => {
  const apps = await App.find().lean();

  return apps;
};

exports.create = async (appData) => {
  appData.likes = 0;
  appData.likedBy = Array;
  appData.comments={}
 
  const newApp = await App.create(appData);
  
  return newApp;
};





exports.getSingleApp = (id) => App.findById(id);


exports.update = (appId, appData) => App.findByIdAndUpdate(appId, appData);


exports.delete = (appId) => App.findByIdAndDelete(appId);

exports.addLikeToApp = async(appId,email) =>{
 
  const app = await this.getSingleApp(appId)
 
  
   app.likes += 1
    app.likedBy.push(email);
    

  return app.save();


}






//! WORKING STAGE
exports.subtrLikeFromApp = async (appId, email) => {
  console.log('subtracting');
  const app = await this.getSingleApp(appId);

    app.likes -= 1

    let index = app.likedBy.indexOf(email);
    if (index > -1) {
      app.likedBy.splice(index, 1);
       return app.save();
    }
  
}

exports.subtrLikeFromApp = async (appId, email) => {
  console.log("subtracting");
  const app = await this.getSingleApp(appId);

   if (app.likes > 0) {
      app.likes -= 1;
      await app.save(); // Save the updated app object with one less like
      console.log("Successfully subtracted one like from the app.");
    } else {
      console.log("Cannot subtract like as the count is already zero.");
    }
  
  
};