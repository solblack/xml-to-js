/**
 * Utils fn convertValueToArray() test cases
 */
// TODO come up with more test cases (edge cases!)
export const convertValueToArrayArr = [
  { num: 1, param: 'im a string', expected: ['im a string'] },
  { num: 2, param: 123, expected: [123] },
  { num: 3, param: ['array', 'array2'], expected: ['array', 'array2'] },
  { num: 4, param: true, expected: [true] },
  { num: 5, param: null, expected: [] },
  { num: 6, param: undefined, expected: [] },
  { num: 7, param: {}, expected: [] },
  { num: 8, param: { test: 'testing' }, expected: ['testing'] },
  {
    num: 9,
    param: { test: [{ nestedTest: 'testing' }] },
    expected: [{ nestedTest: 'testing' }],
  },
  {
    num: 10,
    param: { test: [{ nestedTest: 'testing' }, { nestedTest: 'testing' }] },
    expected: [{ nestedTest: 'testing' }, { nestedTest: 'testing' }],
  },
  {
    num: 11,
    param: { test: { nestedTest: 'testing' } },
    expected: [{ nestedTest: 'testing' }],
  },
  {
    num: 12,
    param: {
      test: { nestedTest: 'testing' },
      otherProp: { nestedTest: 'testing' },
    },
    expected: [
      { test: { nestedTest: 'testing' }, otherProp: { nestedTest: 'testing' } },
    ],
  },
];
