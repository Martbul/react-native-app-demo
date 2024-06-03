const router = require("express").Router();
const videoService = require("../services/videoService");
const formidable = require('formidable');
// const multer  = require('multer')
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage })

const multer = require('multer')
const path = require('path')

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    console.log(file);
      cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  }
});
const upload = multer({ storage })

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




router.post('/createVideo', upload.single('thumbnail'), async (req, res) => {
 console.log('ere');

  console.log(req.files);
  const thumbnail = req.files.thumbnail[0];
  try {
      const createdVideo = await videoService.createVideo(title, video.path, thumbnail.path, prompt);
      console.log(createdVideo);
      res.json(createdVideo);
  } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'An error occurred while creating the video.' });
  }
});

// router.post('/createVideo', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), async (req, res) => {
//  console.log('ere');

//   console.log(req.files);
//   const video = req.files.video[0];
//   const thumbnail = req.files.thumbnail[0];
//   try {
//       const createdVideo = await videoService.createVideo(title, video.path, thumbnail.path, prompt);
//       console.log(createdVideo);
//       res.json(createdVideo);
//   } catch (error) {
//       console.log('Error: ', error);
//       res.status(500).json({ error: 'An error occurred while creating the video.' });
//   }
// });






module.exports = router;
