import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';


export default function validateInput(data) {
  const errors = {};

  if (!data.desc || Validator.isEmpty(data.desc.trim())) {
    errors.desc = 'This field is required';
  }

  if (data.desc && data.desc.trim().indexOf(' ') !== -1) {
    errors.desc = 'Empty spaces not allowed!';
  }

  if (data.rating && !Validator.isNumeric(data.rating)) {
    errors.rating = 'This field is for number only';
  }

  if (data._id && !Validator.isMongoId(data._id.toString())) {
    errors._id = 'this field has wrong type';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
