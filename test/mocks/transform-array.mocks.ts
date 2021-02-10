import { XmlToJsOptions } from '../../src/interfaces';
/**
 * Utils fn transformArray() test cases
 */
// TODO come up with more test cases (edge cases!)

const optionsObj: XmlToJsOptions = {
  arrayFields: [],
  objectFields: [],
  fieldNameFormat: 'snake',
  fieldNameMapping: {},
};

export const transformArrayArr = [
  {
    num: 1,
    paramArray: [[{ Color: 'red' }, { Color: 'pink' }]],
    paramOptions: optionsObj,
    expected: [[{ color: 'red' }, { color: 'pink' }]],
  },
  {
    num: 2,
    paramArray: ['red', 'pink'],
    paramOptions: optionsObj,
    expected: ['red', 'pink'],
  },
];
