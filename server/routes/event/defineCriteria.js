import validator from 'validator';

export default (req) => {
  const _id = req.params._id;
  let criteria = req.query;

  /* make search by unified field*/
  if (criteria.desc) {
    criteria.descLower = criteria.desc.trim().toLowerCase();
    delete criteria.desc;
  }

  if (_id && validator.isMongoId(String(_id))) {
    criteria = { _id };
  }
  return criteria;
};
