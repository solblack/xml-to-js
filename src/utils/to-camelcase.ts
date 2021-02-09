/**
 * This function converts a prop name in pascal, camel, snake, kebab or separated by :
 * into camel case version
 * @param param
 * @returns string
 */
export function toCamelCase(param: string) {
    const text = '' + param;

    const hasSymbolSeparators = /[-_:]/.test(text);

    if (hasSymbolSeparators) {
        const arr = text.split(/[-_:]/);
        const mappedArr = arr.map((val, index) => {
        if (index == 0) {
            return val.toLowerCase();
        }
        return val[0].toUpperCase() + val.slice(1).toLowerCase();
        });
        return mappedArr.join('');
    } else {
        return text[0].toLowerCase() + text.slice(1);
    }
}