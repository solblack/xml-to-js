import { transformArray } from '../../src/utils';
import { transformArrayArr } from '../mocks';

describe('transformArray function unit tests', () => {
  transformArrayArr.forEach((testcase) => {
    it(`Test case #${testcase.num} should return ${testcase.expected}`, async () => {
      expect(transformArray(testcase.paramArray, testcase.paramOptions)).toStrictEqual(
        testcase.expected,
      );
    });
  });
});
