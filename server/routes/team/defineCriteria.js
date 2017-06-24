import validator from 'validator';
import mongoose from 'mongoose';

export default (req) => {
  const _id = req.params._id;
  let criteria = { ...req.query };

  /* make search by unified field*/
  if (criteria.desc) {
    criteria.descLower = criteria.desc.trim().toLowerCase();
    delete criteria.desc;
  }

  if (_id && validator.isMongoId(String(_id))) {
    criteria = { _id };
  }

  if (criteria._id) {
    const oldArray = criteria._id.split(',');
    if (Array.isArray(oldArray)) {
      const newArray = [];
      oldArray.map(id => newArray.push(mongoose.Types.ObjectId(id)));
      criteria = { ...criteria, _id: { $in: newArray } };
    }
  }
  return criteria;
};
