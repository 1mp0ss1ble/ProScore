import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import moment from 'moment';


export default function validateInput(data) {
  const errors = {};

  let validIds = true;

  if (!data.homeId || !Validator.isMongoId(data.homeId.toString())) {
    errors.homeId = 'Missing or has wrong type';
    validIds = false;
  }

  if (!data.guestId || !Validator.isMongoId(data.guestId.toString())) {
    errors.guestId = 'Missing or has wrong type';
    validIds = false;
  }

  if (validIds && Validator.equals(data.homeId.toString(), data.guestId.toString())) {
    errors.homeId = 'Same team!';
  }


  if (!data.eventId || !Validator.isMongoId(data.eventId.toString())) {
    errors.eventId = 'Missing or has wrong type';
  }


  if (!data.date || !moment(data.date, 'DD/MM/YYYY').isValid()) {
    errors.date = 'Date format must be DD/MM/YYYY';
  }


  if (data.homeScore && !Validator.isNumeric(data.homeScore.toString())) {
    errors.homeScore = 'This field is for number only';
  }

  if (data.guestScore && !Validator.isNumeric(data.guestScore.toString())) {
    errors.guestScore = 'This field is for number only';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
