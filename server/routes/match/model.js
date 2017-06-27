const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  eventId: String,
  place: String,
  userId: String,
  info: String,
  referee: String,
  link: String,
  originHomeDesc: String,
  originGuestDesc: String,
  homeId: String,
  guestId: String,
  round: Number,
  date: String,
  time: String,
  homeScore: Number,
  guestScore: Number,
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

module.exports = mongoose.model('matches', ModelSchema);
