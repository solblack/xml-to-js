export interface XmlToJsOptions {
    arrayFields: string[];
    objectFields: string[];
    fieldNameFormat: 'camel' | 'snake' | 'none';
    fieldNameMapping: { [key: string]: string };
    format?: 'object' | 'json';
}