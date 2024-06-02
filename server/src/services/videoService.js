const User = require("../models/User");
const Video = require("../models/Video");






exports.getAllVideos = async () => {

  try {

    const allVideos = await Video.find({});
    return allVideos;
  } catch (err) {
    console.log('err: ' + err);
  }

};


