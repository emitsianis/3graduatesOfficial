const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  newPosts: {
    type: Number,
    default: 0
  }
});

module.exports = Users = mongoose.model("users", userSchema);
