const mongoose = require("mongoose");


const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minLength: [3, "title is too short"],
    maxLength: [300, "title is too long"],
   
  },

  tumbnail:  {
    mimeType: String,
    uri: String,
    name: String,
    size: Number
  },
  prompt: {
    type: String,
    required: [true, "password is required"],
  
  },
  video:  {
    mimeType: String,
    uri: String,
    name: String,
    size: Number
  },
  creator: {
    type: String,
    required: [true, "password is required"],
  
  },
  filePath: String

},
{
    timestamps: true,
});



const Video = mongoose.model("Video", videoSchema);


module.exports = Video;
