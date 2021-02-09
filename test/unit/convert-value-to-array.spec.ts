import { convertValueToArray } from '../../src/utils';
import { convertValueToArrayArr } from '../mocks';

describe('convertValueToArray function unit tests', () => {
  convertValueToArrayArr.forEach((testcase) => {
    it(`Test case #${testcase.num} should return ${testcase.expected}`, async () => {
      expect(convertValueToArray(testcase.param)).toStrictEqual(
        testcase.expected,
      );
    });
  });
});
