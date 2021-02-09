/**
 * Utils fn toSnakeCase() test cases
 */
// TODO come up with more test cases (edge cases!)
export const toSnakeCaseArr = [
  { num: 1, param: 'TestCamel', expected: 'test_camel' },
  { num: 2, param: 'TEST_CAMEL', expected: 'test_camel' },
  { num: 3, param: 'test_camel', expected: 'test_camel' },
  { num: 4, param: 'Test_camel', expected: 'test_camel' },
  { num: 5, param: 'test-camel', expected: 'test_camel' },
  { num: 6, param: 'test:camel', expected: 'test_camel' },
  { num: 7, param: 'Test:Camel', expected: 'test_camel' },
  { num: 8, param: 'TEST-CAMEL', expected: 'test_camel' },
  { num: 9, param: 'TEST', expected: 'test' },
  { num: 10, param: 'test', expected: 'test' },
  { num: 10, param: 'testURL', expected: 'test_url' },
  // TODO add functionality to support this edge test case
  // { num: 11, param: 'PDFStream', expected: 'pdf_stream'}
];
