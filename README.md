# Custom convert XML text to Javascript object or JSON text
Use this library to convert XML strings into JS objects with a customizable, prettier and easier to work with format.



## Features
* **Customize your XML to JS convertion**:
Most converter libraries will give you some convertion configuration options, but all will end up converting an XML text into a pretty ugly JS or JSON object (been there?? ... I have :( and it sucks!).
This library gives you several options to customize the convertion, such as: mapping property key names, setting which properties are supposed to be an array or object and formatting the property key names to camel case or to snake case.
This way, you'll end up having a better, prettier and more consistent Javascript object after the XML convertion.

* **Minimal Dependencies**:
This library depends only on one external npm module (xmlbuilder2)

* **Typescript compatible**:
This library is developed using Typescript and the package has built-in type declarations included, so you can use it in your Typescript project and take advantage of the typing for this library.

# Usage

## Installation

```
npm install --save xml2customjs
```
## Quick start

```js
const convert = require('xml2customjs');

const xml = `<MUSIC-CATALOG>
<CD>
<TITLE>Empire Burlesque</TITLE>
<ARTIST>Bob Dylan</ARTIST>
<COUNTRY>USA</COUNTRY>
<COMPANY>Columbia</COMPANY>
<PRICE currency="USD">10.90</PRICE>
<YEAR>1985</YEAR>
</CD>
</MUSIC-CATALOG>
`;

const converterOptions = {
    format: 'object',
    fieldNameFormat: 'snake',
    arrayFields: ['MUSIC-CATALOG'],
    objectFields: ['PRICE'],
    fieldNameMapping: { TITLE: 'albumTitle'}
}

const convertedObjectWithOptions = convert.convertXmlToJs(xml, converterOptions);

console.log(convertedObjectWithOptions);
```

# Convertion options
The convertion options parameter is optional and all of its properties are optional as well.
| Option        | Default          | Description  |
| :------------- |:-------------| :-----|
| format     | "object" | The converter function will return a Javascript object if you set this to "object" or it will return a JSON text if you set it to "json" |
| fieldNameFormat     | "none"      |   This option will be used to format all property keys. By default, it will be set to "none", meaning no format will be performed. You can set it to "camel" for camelcase format, "snake" for snakecase or "none" for no formatting. |
| fieldNameMapping | { }      |    This object will be used to change the name of the property keys. Each key of this object needs to be the exact same as the name (in the original format) of the XML tag, and the value will be the name used to replace the property key during the convertion. |
| arrayFields | [ ]      |    This property must be an array containing the names of the XML tags that are supposed to be arrays. Example: ['propertyKey1', 'propertyKey2']. IMPORTANT: each string should be the exact same as the name (in the original format) of the XML tag |
| objectFields | [ ]      |    This property must be an array containing the names of the XML tags that are supposed to be objects. Why is this important and when does it come in handy? For example, when you have an XML tag that has optional properties and a text value (meaning it does not contain other elements). By default, an XML tag with no properties and a text value, will be converted into a property key with a string value (`<color>pink</color>` will be { color: "pink" }). But if that tag comes with one or more properties (for example `<color primary="no">pink</color>`, the result will be an object with this format: { color: {'@primary': 'no', '#': 'pink'} }. So, if you know in advance that you'll have tags with properties, you can set this options like this ['color'], and then you will get an object with this format: { color: { primary: "no", value: "pink" }. You can add as many properties as you wish. Example: ['propertyKey1', 'propertyKey2']. IMPORTANT: each string should be the exact same as the name (in the original format) of the XML tag |

## Convertion examples
Let's see how the convertion works in the quick start example above:
```javascript
const convert = require('xml2customjs');
const xml = `<MUSIC-CATALOG>
<CD>
<TITLE>Empire Burlesque</TITLE>
<ARTIST>Bob Dylan</ARTIST>
<COUNTRY>USA</COUNTRY>
<COMPANY>Columbia</COMPANY>
<PRICE currency="USD">10.90</PRICE>
<YEAR>1985</YEAR>
</CD>
</MUSIC-CATALOG>
`;

const converterOptions = {
    format: 'object',
    fieldNameFormat: 'snake',
    arrayFields: ['MUSIC-CATALOG'],
    objectFields: ['PRICE'],
    fieldNameMapping: { TITLE: 'albumTitle'}
}

const convertedObjectWithOptions = convert.convertXmlToJs(xml, converterOptions);

console.log(convertedObjectWithOptions);
```

Using this options, convertedObjectWithOptions will be an object with this format:

```
{
    music_catalog: [
      {
        album_title: 'Empire Burlesque',
        artist: 'Bob Dylan',
        country: 'USA',
        company: 'Columbia',
        price: { value: '10.90', currency: 'USD' },
        year: '1985'
      }
    ]
}
```

If no options are set, like in this case:
```js
const convertedObject = convert.convertXmlToJs(xml);
```
Then, the result would be this:
```
{
    'MUSIC-CATALOG': {
      CD: {
        TITLE: 'Empire Burlesque',
        ARTIST: 'Bob Dylan',
        COUNTRY: 'USA',
        COMPANY: 'Columbia',
        PRICE: { '@currency': 'USD', '#': '10.90' },
        YEAR: '1985'
      }
    }
  }
```

Notice that, by default, XML tags with properties are converted into objects where properties are represented with an '@' and the name of the property. If the tag has a text value instead of other child elements, then the text value is represented with an '#'. In the case you are dealing with XML tags with properties that contain other elements instead of text, you could use the objectFields option to have the properties names without the '@' prefix.

***

# Contribution

## Testing

To perform tests on this project, download the full repository from GitHub (not from npm) and then do the following:

```
cd xml2customjs
npm install
npm test
```

## Reporting

Use [this link](https://github.com/solblack/xml2customjs/issues) to report an issue or bug. Please include a sample code where the code is failing.

# License

[MIT]
