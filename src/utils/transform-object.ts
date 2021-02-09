import { AnyObject, XmlToJsOptions } from '../interfaces';
import {
  isObject,
  transformArray,
  convertNestedProp,
  toCamelCase,
  toSnakeCase,
} from './index';

/**
 * This function takes an object with the xmlbuilder2 library format and additional
 * formatting options as params and returns an object transformed according to
 * the given set of options
 * This function will transform all nested objects
 * @param param
 * @returns object
 */
export function transformObject(object: AnyObject, options: XmlToJsOptions) {
  

  let clonedObject: AnyObject = JSON.parse(JSON.stringify(object));

  const newObject: AnyObject = {};

  Object.keys(clonedObject).forEach((key) => {
    // Process value to array
    options.arrayFields.forEach((path) => {
      const pathArr = path.split(/[/]/);

      if (pathArr.length && key == pathArr[0]) {
        clonedObject = convertNestedProp(clonedObject, pathArr, 'array');
      }
    });

    // Process value to object
    options.objectFields.forEach((path) => {
      const pathArr = path.split(/[/]/);

      if (pathArr.length && key == pathArr[0]) {
        clonedObject = convertNestedProp(clonedObject, pathArr, 'object');
      }
    });

    let value = clonedObject[key];
    // Transform nested values
    value = isObject(value)
      ? transformObject(value, options)
      : Array.isArray(value)
      ? transformArray(value, options)
      : value;

    // Change key name and format
    let newKey: string =
      key in options.fieldNameMapping ? options.fieldNameMapping[key] : key;

    switch (options.fieldNameFormat) {
      case 'camel':
        newKey = toCamelCase(newKey);
        break;
      case 'snake':
        newKey = toSnakeCase(newKey);
        break;
      default:
        break;
    }
    newObject[newKey] = value;
  });
  return newObject;
}
