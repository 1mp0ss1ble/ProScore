import { expect } from 'chai';
import { lowerizeFields } from '../../server/util';

const assert = require('assert');

describe('Object', () => {
  it('lowerize field and save into [field+Lower] field', () => {
    const obj = {
      pwd: 1234,
      desc: 'TESt',
      descLower: 'init',
    };
    const newObj = lowerizeFields(obj, 'desc');
    assert.equal(obj.descLower, 'init');
    assert(obj !== newObj, 'origin and return are not same obj');
    assert.equal(newObj.descLower, 'test');
  });
});
