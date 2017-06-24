const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  desc: {
    type: String,
    trim: true,
  },
  descLower: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  city: String,
  eventId: String,
  userId: String,
  info: String,
  link: String,
  logo: String,
  captain: String,
  sponsor: String,
  rating: Number,
  isActive: Boolean,
});

// using fat arrow leads to this = undefined
ModelSchema.pre('save', function (next) {
  this.descLower = this.desc;
  next();
});

/*
ModelSchema.pre('findOneAndUpdate', function () {
  const desc = this.getUpdate().desc.trim().toLowerCase();
  console.log('evetn-modelpre', desc);
  this.findOneAndUpdate({}, { $set: { descLower: desc } });
});
*/

module.exports = mongoose.model('teams', ModelSchema);
