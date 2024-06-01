const router = require("express").Router();
const userService = require("../services/userService");
const appService = require("../services/appService");
var moment = require('moment');

//const { isAuth } = require("./../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  try {
    //  const orders = await orderService.getAll(search, from, to);
    const apps = await appService.getAll();
    res.json(apps);
  } catch (message) {
    res.status(400).json({ message });
  }
});


router.get("/:appId", async (req, res) => {
  const appId = req.params.appId;


  const app = await appService.getSingleApp(appId).lean();

  if (!app) {
    return;
  }
  res.json(app);

  //res.render("details");
});

router.put("/edit/:appId", async (req, res) => {
  let posted_at = moment().format("MMMM Do YYYY"); 
  console.log(req.body);
  try {
    const { appId } = req.params;
    //console.log(appId);
    const { title, description, price, category, imgUrl} =
    req.body

    const appData = {
      title,
      description,
      price,
      category,
      imgUrl,
      posted_at
      // _ownerId: req.user._id,
    };
   // console.log(appData);

    await appService.update(appId, appData);

    res.json(appData).status(200).end();
  } catch (message) {
    res.status(400).json({ message });
  }
});

router.delete("/delete/:appId", async (req, res) => {
  
  try {

    const { appId } = req.params;
    // console.log(appId);
    await appService.delete(appId);
    res.json(appId).status(200).end();
  } catch (message) {
    res.status(400).json({ message });
  }
});



router.post("/like", async (req, res) => {
 // console.log(req.body);
  const {email}  = req.body
  const { id } = req.body; 
 

  const result = await appService.addLikeToApp(id, email);
  const result2 = await userService.addLikedAppToUserLikedApps(email,id);
  res.json(result).status(200).end()
})


router.post("/subtrLike", async (req, res) => {
  console.log("SUBTRACTING PROCCESS ACTIVAED");
 // console.log(req.body);
  const { email } = req.body;
  const { id } = req.body;

  const result = await appService.subtrLikeFromApp(id, email);
  const result2 = await userService.sptrAppFromUserLikedApps(email, id);
  res.json(result).status(200).end();
});




router.post("/buy", async (req, res) => {
  
  const { email } = req.body;
  const { id } = req.body;

  // const result = await appService.addLikeToApp(id, email);
  const result = await userService.addAppToUserBoughtApps(email, id);
  res.json(result).status(200).end();
});


// router.post('/binds/:bindId', async (req, res) => {
//   console.log('here');
//   console.log(req.body);
// })


module.exports = router;
