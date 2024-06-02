const mongoose = require("mongoose");


const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minLength: [3, "title is too short"],
    maxLength: [300, "title is too long"],
   
  },

  tumbnail: {
    
    type: String,
    required: [true, "email is required"],
    
  },

  prompt: {
    type: String,
    required: [true, "password is required"],
  
  },
  video: {
    type: String,
    required: [true, "password is required"],
  
  },
  creator: {
    type: String,
    required: [true, "password is required"],
  
  },

});



const Video = mongoose.model("Video", videoSchema);


module.exports = Video;
