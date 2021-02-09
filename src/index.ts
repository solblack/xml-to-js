import { convert as convertXml } from 'xmlbuilder2';
import {
  AnyObject,
  XmlToJsOptions,
  XmlToJsOptionalOptions,
} from './interfaces';
import { transformObject } from './utils';

/**
 * This function converts an XML into a JS object according to
 * a given set of options
 * @param xml string
 * @param options XmlToJsOptionalOptions
 * Options:
 * - arrayFields: array containing the names of the XML tags that are supposed to be arrays (example ['propertyKey'])
 * - objectFields: array containing the names of the XML tags that are supposed to be objects (example ['propertyKey']),
 * This is useful in the case of XML tags that may have properties. Read the documentation for more detail on this feature.
 * - format: by default, this function will return a Javascript object. You can set it to "object" or to "json"
 * - fieldNameFormat: option to format all property keys. By default, this will be set to "none". 
 * Options are: "camel" for camelcase format, "snake" for snakecase and "none" for no formatting.
 * - fieldNameMapping: this object will be used to change the name of the property keys. The keys of this
 * object need to be the exact name (in the original format) of the XML tag, and the value will be the name used
 * to replace the property key during the convertion
 * @returns object or JSON string
 */
export function convertXmlToJs(xml: string, options: XmlToJsOptionalOptions = {}) : AnyObject | string {

  const optionsObj: XmlToJsOptions = {
    arrayFields: options.arrayFields ?? [],
    objectFields: options.objectFields ?? [],
    fieldNameFormat: options.fieldNameFormat ?? 'none',
    fieldNameMapping: options.fieldNameMapping ?? {},
    format: options.format ?? 'object',
  };

  const convertedObject = convertXml(xml, { format: 'object' });

  const clonedObject: AnyObject = JSON.parse(JSON.stringify(convertedObject));

  const mappedObject: AnyObject = transformObject(clonedObject, optionsObj);

  const formatedObject =
    optionsObj.format == 'object' ? mappedObject : JSON.stringify(mappedObject);

  return formatedObject;
}
