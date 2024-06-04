const mongoose = require("mongoose");


const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minLength: [3, "title is too short"],
      maxLength: [300, "title is too long"],
    },

    thumbnail: {
      type: String,
      required: [true, "thumbnail is required"],
    },
    prompt: {
      type: String,
      required: [true, "prompt is required"],
    },
    video: {
      type: String,
      required: [true, "video is required"],
    },
    creator: {
      type: String,
      required: [true, "creator is required"],
    },
    filePath: String,
  },
  {
    timestamps: true,
  }
);



const Video = mongoose.model("Video", videoSchema);


module.exports = Video;
