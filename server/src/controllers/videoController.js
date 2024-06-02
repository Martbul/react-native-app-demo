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








module.exports = router;
