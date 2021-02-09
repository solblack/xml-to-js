import { toSnakeCase } from '../../src/utils';
import { toSnakeCaseArr } from '../mocks';

describe('toSnakeCase function unit tests', () => {
  toSnakeCaseArr.forEach((testcase) => {
    it(`Test case #${testcase.num} with param ${testcase.param} should return ${testcase.expected}`, async () => {
      expect(toSnakeCase(testcase.param)).toBe(testcase.expected);
    });
  });
});
