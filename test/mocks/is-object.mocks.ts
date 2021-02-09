/**
 * Utils fn isObjectArr() test cases
 */
// TODO come up with more test cases (edge cases!)
export const isObjectArr = [
  { num: 1, param: 'im a string', expected: false },
  { num: 2, param: 123, expected: false },
  { num: 3, param: ['array'], expected: false },
  { num: 4, param: {}, expected: true },
  { num: 5, param: { test: 'testing' }, expected: true },
  { num: 6, param: true, expected: false },
  { num: 7, param: null, expected: false },
  { num: 8, param: undefined, expected: false },
];
