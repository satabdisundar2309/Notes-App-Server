const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: new Date().getTime()
  },
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
