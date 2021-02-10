import { convertXmlToJson } from '../../src/index';
import { XmlToJsOptionalOptions } from '../../src/interfaces';
import { convertXmlToJsonArr } from '../mocks';

describe('convertXmlToJson function unit tests', () => {
  convertXmlToJsonArr.forEach((testcase) => {
    it(`Test case #${testcase.num}, ${testcase.description}, should return ${testcase.expected}.`, async () => {
      expect(convertXmlToJson(testcase.paramXml, testcase.paramOptions as XmlToJsOptionalOptions)).toEqual(testcase.expected);
    });
  });
});
