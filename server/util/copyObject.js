export default (original) => {

  /* cant use copy by keys due to nodejs obj mutation */
  return JSON.parse(JSON.stringify(original));

  /*
  const hasOwn = Object.prototype.hasOwnProperty;
  const copy = {};
  const keys = Object.keys(original);
  keys.forEach((key) => {
    if (hasOwn.call(original, key)) {
      copy[key] = original[key];
    }
  });
*/
};
