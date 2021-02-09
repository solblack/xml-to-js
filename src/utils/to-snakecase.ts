/**
 * This function converts a prop name in pascal, camel, snake, kebab or separated by :
 * into snake case version
 * @param param
 * @returns string
 */
export function toSnakeCase(param: string) {
  const text = '' + param;

  const hasSymbolSeparators = /[-_:]/.test(text);
  const isAllUpperOrLower = /^([a-z]+|[A-Z]+)$/.test(text);

  const arr: string[] = hasSymbolSeparators
    ? text.split(/[-_:]/)
    : !isAllUpperOrLower
    ? text.split(/(=?[A-Z][a-z]+)|(=?[A-Z]+)|(=?[a-z]+)/)
    : [text];

  const mappedArr = arr.map((val) => {
      return val != '' && val != undefined ? val.toLowerCase() : null;
  }).filter(val => val != null);
  
  return mappedArr.join('_');
}
