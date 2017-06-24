import { expect } from 'chai';
import { removeProps } from '../../server/util';

const assert = require('assert');

describe('Object', () => {
  it('should remove array of props from copy and not mutate original', () => {
    const obj = {
      pwd: 1234,
      desc: 'test',
    };
    const newObj = removeProps(obj, 'pwd');
    assert.equal(newObj.pwd, undefined);
    assert.equal(obj.pwd, 1234);
  });
});
