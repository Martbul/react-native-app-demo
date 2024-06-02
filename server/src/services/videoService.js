const User = require("../models/User");
const Video = require("../models/Video");


exports.getAllVideos = async () => {
  try {
    const allVideos = await Video.find({});
    return allVideos;
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    throw error;
  }
};

exports.getLatestVideos = async () => {

  try {
    const latestVideos = await Video.find({}).sort({ createdAt: -1 }).limit(7);
    return latestVideos;
  } catch (err) {
    console.log('err: ' + err);
  }

};
exports.searchVideos = async (videoName) => {

  try {
    const searchVideResults = await Video.find({ title: { $regex: videoName, $options: 'i' } });
    return searchVideResults;
  } catch (err) {
    console.log('err: ' + err);
  }

};
exports.allUserVideos = async (userEmail) => {

  try {
    const allUserVideos = await Video.find({ creator: userEmail });
    return allUserVideos;
  } catch (err) {
    console.log('err: ' + err);
  }

};

