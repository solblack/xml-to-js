/**
 * Utils fn toCamelCase() test cases
 */
// TODO come up with more test cases (edge cases!)
export const toCamelCaseArr = [
  { num: 1, param: 'TestCamel', expected: 'testCamel' },
  { num: 2, param: 'TEST_CAMEL', expected: 'testCamel' },
  { num: 3, param: 'test_camel', expected: 'testCamel' },
  { num: 4, param: 'Test_camel', expected: 'testCamel' },
  { num: 5, param: 'test-camel', expected: 'testCamel' },
  { num: 6, param: 'test:camel', expected: 'testCamel' },
  { num: 7, param: 'Test:Camel', expected: 'testCamel' },
  { num: 8, param: 'TEST-CAMEL', expected: 'testCamel' },
  { num: 9, param: 'TEST', expected: 'test' },
  // TODO deal with this edge test case
  // { num: 10, param: 'PDFStream', expected: 'pdfStream'}
];
