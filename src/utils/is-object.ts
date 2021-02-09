/**
 * This function returns true if the param is an object (not an array or any other type)
 * @param param
 * @returns boolean
 */
export function isObject(param: any) {
    return Object.prototype.toString.call(param) === '[object Object]';
}