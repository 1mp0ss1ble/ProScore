import copyObject from './copyObject';

export default (obj, ...props) => {
  const copyObj = copyObject(obj);

  props.forEach((prop) => {
    if (copyObj[prop]) {
      delete copyObj[prop];
    }
  });
  return copyObj;
};
