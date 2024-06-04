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

  try {
     const searchVideoResult = await videoService.searchVideos(videoName);
     res.json(searchVideoResult)
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log('err  ' + errorMessages);
    return errorMessages
  }
})

router.post('/getAllUserVideos', async (req, res) => {
const userEmail = req.body.userEmail
  try {
     const allUserVideos = await videoService.allUserVideos(userEmail);
     res.json(allUserVideos)
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log('err  ' + errorMessages);
    return errorMessages
  }
})




router.post('/createVideo', async (req, res) => {
const {title, video,thumbnail,prompt,creator} = req.body
console.log(req.body);
  console.log(title);
  console.log(video);
  console.log(creator);
  
  try {
      const createdVideo = await videoService.createVideo(
        title,
        video,
        thumbnail,
        prompt,
        creator
      );
      console.log(createdVideo);
      res.json(createdVideo);
  } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'An error occurred while creating the video.' });
  }
});


module.exports = router;
