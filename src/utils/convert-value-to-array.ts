import { isObject } from "./index";

/**
 * This function receives a value of type any and returns it converted to an array
 * Is the value is an object with only one prop and the param convertNested is set
 * to true (default value), then the returned array will be that
 * prop value converted to array
 * @param value
 * @returns array
 */
export function convertValueToArray(value: any, convertNested = true): any[] {
    if (Array.isArray(value)) {
      return value;
    }

    if (isObject(value)) {
      const keys = Object.keys(value);
      if (keys.length == 1) {
        const trueArr = convertNested
          ? convertValueToArray(value[keys[0]], false)
          : [{ ...value }];

        return trueArr;
      }
      if (keys.length > 1) {
        return [{ ...value }];
      }

      return [];
    }
    if (
      typeof value == 'string' ||
      typeof value == 'boolean' ||
      typeof value == 'number'
    ) {
      return [value];
    }
    return [];
  }