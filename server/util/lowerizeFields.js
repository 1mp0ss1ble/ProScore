import copyObject from './copyObject';

export default (obj, ...fields) => {
  const result = copyObject(obj);

  fields.forEach((field) => {
    result[`${field}Lower`] = result[field].trim().toLowerCase();
  });

  return result;
};
