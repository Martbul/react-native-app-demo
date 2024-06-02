const router = require("express").Router();
const videoService = require("../services/videoService");

router.get('/getAllVideos', async (req, res) => {
  try {
    const allVideos = await videoService.getAllVideos();
    res.json(allVideos)
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log('err  ' + errorMessages);
    return errorMessages
  }
})

router.get('/getLatestVideos', async (req, res) => {

  try {
    const latestVideos = await videoService.getLatestVideos();
    res.json(latestVideos)
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log('err  ' + errorMessages);
    return errorMessages
  }
})



router.get('/serchVideos', async (req, res) => {
const videoName = req.query.videoName
console.log(videoName);

  try {
     const searchVideoResult = await videoService.searchVideos(videoName);
     console.log(searchVideoResult);
     res.json(searchVideoResult)
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log('err  ' + errorMessages);
    return errorMessages
  }
})








module.exports = router;
