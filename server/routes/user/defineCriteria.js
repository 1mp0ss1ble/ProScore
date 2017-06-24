import validator from 'validator';

export default (req) => {
  const _id = req.params._id;
  let criteria = req.query;

  if (criteria.username) {
    criteria.usernameLower = criteria.username.trim().toLowerCase();
    delete criteria.username;
  }

  if (_id && validator.isMongoId(String(_id))) {
    criteria = { _id };
  }
  return criteria;
};
