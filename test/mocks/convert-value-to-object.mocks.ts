/**
 * Utils fn convertValueToObject() test cases
 */
// TODO come up with more test cases (edge cases!)
export const convertValueToObjectArr = [
  { num: 1, param: 'im a string', expected: { value: 'im a string' } },
  { num: 2, param: 123, expected: { value: 123 } },
  {
    num: 3,
    param: ['array', 'array2'],
    expected: { value: ['array', 'array2'] },
  },
  { num: 4, param: {}, expected: { value: null } },
  { num: 5, param: { test: 'testing' }, expected: { test: 'testing' } },
  { num: 6, param: true, expected: { value: true } },
  { num: 7, param: null, expected: { value: null } },
  { num: 8, param: undefined, expected: { value: null } },
  {
    num: 9,
    param: { '@test': 'testing' },
    expected: { test: 'testing', value: null },
  },
  {
    num: 10,
    param: { '@test': 'testing', '#': 'some value' },
    expected: { test: 'testing', value: 'some value' },
  },
  {
    num: 11,
    param: { '@test': 'testing', prop: { prop: 'value' } },
    expected: { test: 'testing', prop: { prop: 'value' } },
  },
  {
    num: 12,
    param: { '@test': 'testing', '@value': 'value attribute', '#': 'some text value' },
    expected: { test: 'testing', valueAttribute: 'value attribute', value: 'some text value' },
  },
];
