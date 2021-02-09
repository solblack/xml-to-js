import { XmlToJsOptions } from '../interfaces';
import { isObject, transformObject } from './index';

/**
 * This function returns an array with its object items transformed according to
 * a given set of options
 * @param param
 * @returns array
 */
export function transformArray(array: any[], options: XmlToJsOptions): any[] {
    return array.map((value) => {
        const newValue = isObject(value)
        ? transformObject(value, options)
        : Array.isArray(value)
        ? transformArray(value, options)
        : value;

        return newValue;
    });
}