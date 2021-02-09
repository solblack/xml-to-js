import { toCamelCase } from '../../src/utils';
import { toCamelCaseArr } from '../mocks';

describe('toCamelCase function unit tests', () => {
  toCamelCaseArr.forEach((testcase) => {
    it(`Test case #${testcase.num} should return ${testcase.expected}`, async () => {
      expect(toCamelCase(testcase.param)).toBe(testcase.expected);
    });
  });
});
