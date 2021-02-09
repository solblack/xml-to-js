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
 * @param options xmlToJsOptions
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
