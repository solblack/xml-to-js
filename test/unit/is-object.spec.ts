import { isObject } from '../../src/utils';
import { isObjectArr } from '../mocks';

describe('isObject function unit tests', () => {
  isObjectArr.forEach((testcase) => {
    it(`Test case #${testcase.num} should return ${testcase.expected}`, async () => {
      expect(isObject(testcase.param)).toBe(testcase.expected);
    });
  });
});
