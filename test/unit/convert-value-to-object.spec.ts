import { convertValueToObject } from '../../src/utils';
import { convertValueToObjectArr } from '../mocks';

describe('convertValueToObject function unit tests', () => {
  convertValueToObjectArr.forEach((testcase) => {
    it(`Test case #${testcase.num} should return ${JSON.stringify(
      testcase.expected,
    )}`, async () => {
      expect(convertValueToObject(testcase.param)).toStrictEqual(
        testcase.expected,
      );
    });
  });
});
