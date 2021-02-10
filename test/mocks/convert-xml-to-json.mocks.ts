/**
 * fn convertXmlToJson() test cases
 */
// TODO come up with more test cases (edge cases!)
// interface XmlToJsOptionalOptions {
//   arrayFields?: string[];
//   objectFields?: string[];
//   fieldNameFormat?: 'camel' | 'snake' | 'none';
//   fieldNameMapping?: { [key: string]: string };
// }
export const convertXmlToJsonArr = [
  {
    num: 1,
    description: 'All uppercase fields and array field',
    paramXml: `<CATALOG>
    <CD>
    <TITLE>Empire Burlesque</TITLE>
    <ARTIST>Bob Dylan</ARTIST>
    <COUNTRY>USA</COUNTRY>
    <COMPANY>Columbia</COMPANY>
    <PRICE>10.90</PRICE>
    <YEAR>1985</YEAR>
    </CD>
    <CD>
    <TITLE>Hide your heart</TITLE>
    <ARTIST>Bonnie Tyler</ARTIST>
    <COUNTRY>UK</COUNTRY>
    <COMPANY>CBS Records</COMPANY>
    <PRICE>9.90</PRICE>
    <YEAR>1988</YEAR>
    </CD>
  </CATALOG>`,
    paramOptions: {
      fieldNameFormat: 'snake',
      arrayFields: ['CATALOG'],
      fieldNameMapping: { CATALOG: 'cd_catalog' },
    },
    expected: JSON.stringify({
      cd_catalog: [
        {
          title: 'Empire Burlesque',
          artist: 'Bob Dylan',
          country: 'USA',
          company: 'Columbia',
          price: '10.90',
          year: '1985',
        },
        {
          title: 'Hide your heart',
          artist: 'Bonnie Tyler',
          country: 'UK',
          company: 'CBS Records',
          price: '9.90',
          year: '1988',
        },
      ],
    }),
  },
  {
    num: 6,
    description: 'Testing function with no options object',
    paramXml: `<CATALOG>
    <CD>
    <TITLE>Empire Burlesque</TITLE>
    <ARTIST>Bob Dylan</ARTIST>
    <COUNTRY>USA</COUNTRY>
    <COMPANY>Columbia</COMPANY>
    <PRICE>10.90</PRICE>
    <YEAR>1985</YEAR>
    </CD>
  </CATALOG>`,
    paramOptions: undefined,
    expected: JSON.stringify({
      CATALOG: {
        CD: {
          TITLE: 'Empire Burlesque',
          ARTIST: 'Bob Dylan',
          COUNTRY: 'USA',
          COMPANY: 'Columbia',
          PRICE: '10.90',
          YEAR: '1985',
        },
      },
    }),
  },
];
