import { AnyObject } from "../interfaces";
import { isObject } from "./index";

  /**
   * This function receives a value of type any and returns it converted to an object
   * using 'value' as the key. If the value is an object with xmlBuilder2 format (using
   * '@' at the beginning of attributes keys and '#' for the value of the xml tag), it
   * will return the same object without the "@" prefix and replacing '#' for 'value'
   * if the object has other non-attribute props, prop value will not be returned unless
   * in the original value there's a '#' prop.
   * If the '#' value is undefined it will be set to null instead. If the original
   * value only has attribute props (with '@' prefix), the object returned will have a
   * 'value' prop with null value
   * @param value
   * @returns object
   */
  export function convertValueToObject(value: any) {
    if (isObject(value)) {
      const newObject: AnyObject = { value: null };
      const keys = Object.keys(value);
      keys.forEach((key) => {
        const newKey = key == '#' ? 'value' : key == '@value' ? 'valueAttribute' : key.replace(/[@]/, '');
        newObject[newKey] = value[key];
      });
      if (keys.some((key) => !/[@#]/.test(key))) {
        delete newObject.value;
      }
      return newObject;
    }
    value == undefined ? (value = null) : null;
    return { value };
  }