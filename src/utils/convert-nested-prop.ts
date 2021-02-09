import { AnyObject } from "../interfaces";
import { isObject, convertValueToObject, convertValueToArray } from "./index";

export function convertNestedProp(
    object: AnyObject,
    pathArr: string[],
    format: 'array' | 'object',
  ) {
    const clonedObject = JSON.parse(JSON.stringify(object));
    let prop = clonedObject;
    pathArr.forEach((element, index) => {
      if(prop == undefined){
        return clonedObject;
      }

      if (index == pathArr.length - 1) {
        if (prop != undefined && isObject(prop) && element in prop) {
          switch (format) {
            case 'object':
              prop[element] = convertValueToObject(prop[element]);
              break;
            case 'array':
              prop[element] = convertValueToArray(prop[element]);
              break;
          }
        }
      } else {
        prop = prop[element];
      }
      
    });
    return clonedObject;
  }