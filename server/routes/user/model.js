const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelSchma = new Schema({
  username: {
    type: String,
    trim: true,
  },
  usernameLower: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: String,
  role: String,
  createdDate: Date,
});

// using fat arrow leads to this = undefined
ModelSchma.pre('save', function (next) {
  this.usernameLower = this.username;
  next();
});

/*
ModelSchma.pre('findOneAndUpdate', function () {
  const username = this.getUpdate().username.trim().toLowerCase();
  this.findOneAndUpdate({}, { $set: { usernameLower: username } });
});
*/

module.exports = mongoose.model('users', ModelSchma);
