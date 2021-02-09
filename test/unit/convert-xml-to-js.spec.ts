import { convertXmlToJs } from '../../src/index';
import { XmlToJsOptionalOptions } from '../../src/interfaces';
import { convertXmlToJsArr } from '../mocks';

describe('convertXmlToJs function unit tests', () => {
  convertXmlToJsArr.forEach((testcase) => {
    it(`Test case #${testcase.num}, ${testcase.description}, should return ${testcase.expected}.`, async () => {
      expect(convertXmlToJs(testcase.paramXml, testcase.paramOptions as XmlToJsOptionalOptions)).toStrictEqual(testcase.expected);
    });
  });
});
