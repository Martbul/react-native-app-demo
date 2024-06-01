const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "the NAME of the order is required"],
    // validate: {
    //   validator: function (value) {
    //     return /^[a-zA-Z]+ [a-zA-Z]+$/.test(value);
    //   },
    //   message: "please enter a correct name(exp: Discord))",
    // },
  },
  description: {
    type: String,
    required: [true, "the description is required"],
  },
  
  price: {
    type: String,
    required: [true, "the price for the order is required"],
  },
  category: {
    type: String,
    required: [true, "the category field is required"],
  },

  imgUrl: {
    type: String,
    required: [true, "the img field is required"],
  },
  likes: {
    type: Number,
  },
  comments: {
    type: Object,
    
  },
  likedBy:{
    type:Array
  },
  posted_at:{
    type:String
  },
  creator:{
    type:String
  }
  // _creator: { type: String },
});


const App = mongoose.model("App", appSchema);

module.exports = App;
