import { expect } from 'chai';
import { copyObject } from '../../server/util';

// const assert = require('assert');

describe('Object', () => {
  it('should copy object without mutation', () => {
    const obj = {
      pwd: 1234,
      desc: 'test',
    };
    const sameObj = obj;
    obj.pwd = 4321;

    const newObj = copyObject(obj);
    newObj.pwd = 4321;
    expect(obj === sameObj).to.be.true;
    expect(obj === newObj).to.be.false;
    newObj.pwd = 1111;
    expect(obj.pwd === newObj.pwd).to.be.false;
  });
});
