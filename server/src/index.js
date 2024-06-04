const express = require("express");
const bodyParser = require("body-parser");
const expressConfig = require("./config/expressConfig");
const mongoose = require("mongoose");
const path = require('path');
const { PORT } = require("./constants");
const routes = require("./router");
require("dotenv").config()

const uri = process.env.ATLAS_URI;
// Local variables
const app = express();




// Configs

expressConfig(app);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})
.then(()=>console.log('Connected to MongoDB!'))
.catch((error) =>console.log("MongoDB connection FAILED:", error.message));

// Routing
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
