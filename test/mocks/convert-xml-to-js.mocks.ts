/**
 * fn convertXmlToJs() test cases
 */
// TODO come up with more test cases (edge cases!)
// interface XmlToJsOptionalOptions {
//   arrayFields?: string[];
//   objectFields?: string[];
//   fieldNameFormat?: 'camel' | 'snake' | 'none';
//   fieldNameMapping?: { [key: string]: string };
//   format?: 'object' | 'json';
// }
export const convertXmlToJsArr = [
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
      format: 'object',
      fieldNameFormat: 'snake',
      arrayFields: ['CATALOG'],
      fieldNameMapping: { CATALOG: 'cd_catalog' },
    },
    expected: {
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
    },
  },
  {
    num: 2,
    description: 'All lowercase fields and array field with one item',
    paramXml: `<catalog>
    <cd>
    <title>Empire Burlesque</title>
    <artist>Bob Dylan</artist>
    <country>USA</country>
    <company>Columbia</company>
    <price>10.90</price>
    <year>1985</year>
    </cd>
  </catalog>`,
    paramOptions: {
      format: 'object',
      fieldNameFormat: 'snake',
      arrayFields: ['catalog'],
      fieldNameMapping: { catalog: 'cd_catalog' },
    },
    expected: {
      cd_catalog: [
        {
          title: 'Empire Burlesque',
          artist: 'Bob Dylan',
          country: 'USA',
          company: 'Columbia',
          price: '10.90',
          year: '1985',
        },
      ],
    },
  },
  {
    num: 3,
    description: 'No props in param options',
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
    paramOptions: {},
    expected: {
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
    },
  },
  {
    num: 4,
    description: 'Return JSON with snakecase format',
    paramXml: `<CATALOG>
    <CD>
    <ALBUM-TITLE>Empire Burlesque</ALBUM-TITLE>
    <ARTIST-NAME>Bob Dylan</ARTIST-NAME>
    <COUNTRY>USA</COUNTRY>
    <COMPANY>Columbia</COMPANY>
    <PRICE>10.90</PRICE>
    <YEAR>1985</YEAR>
    </CD>
  </CATALOG>`,
    paramOptions: {
      format: 'json',
      fieldNameFormat: 'snake',
      arrayFields: ['CATALOG'],
    },

    expected: JSON.stringify({
      catalog: [
        {
          album_title: 'Empire Burlesque',
          artist_name: 'Bob Dylan',
          country: 'USA',
          company: 'Columbia',
          price: '10.90',
          year: '1985',
        },
      ],
    }),
  },
  {
    num: 5,
    description: 'Fieldnames mapping, path object setting and camelcase formatting',
    paramXml: `<?xml version="1.0" encoding="UTF-8"?>
    <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:etp="https://www.mpay24.com/soap/etp/1.5/ETP.wsdl"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AcceptPayment">
       <SOAP-ENV:Header />
       <SOAP-ENV:Body>
          <etp:AcceptPayment>
             <merchantID>92883</merchantID>
             <tid>12081</tid>
             <pType>PAYPAL</pType>
             <payment xsi:type="etp:PaymentPAYPAL">
                <amount>180</amount>
                <currency>EUR</currency>
             </payment>
             <successURL>https://www.domain.at/success</successURL>
             <errorURL>https://www.domain.at/error</errorURL>
             <confirmationURL>https://www.domain.at/confirmation</confirmationURL>
             <cancelURL>https://www.domain.at/cancel</cancelURL>
          </etp:AcceptPayment>
       </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>`,
    paramOptions: {
      format: 'object',
      fieldNameFormat: 'camel',
      objectFields: ['SOAP-ENV:Body/etp:AcceptPayment/payment'],
      fieldNameMapping: {pType: "payment_type", 'etp:AcceptPayment': 'accept_payment'}
    },

    expected: {
      soapEnvEnvelope: {
        '@xmlnsSoapEnv': 'http://schemas.xmlsoap.org/soap/envelope/',
        '@xmlnsEtp': 'https://www.mpay24.com/soap/etp/1.5/ETP.wsdl',
        '@xmlnsXsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xsiType': 'AcceptPayment',
        soapEnvHeader: {},
        soapEnvBody: {
          acceptPayment: {
            merchantID: '92883',
            tid: '12081',
            paymentType: 'PAYPAL',
            payment: {
              'xsiType': 'etp:PaymentPAYPAL',
              amount: '180',
              currency: 'EUR'
            },
            successURL: 'https://www.domain.at/success',
            errorURL: 'https://www.domain.at/error',
            confirmationURL: 'https://www.domain.at/confirmation',
            cancelURL: 'https://www.domain.at/cancel'
          }
        }
      }
    }
  },
  {
    num: 6,
    description: 'Fieldnames mapping, path object setting and camelcase formatting',
    paramXml: `<?xml version="1.0" encoding="UTF-8"?>
    <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:etp="https://www.mpay24.com/soap/etp/1.5/ETP.wsdl"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AcceptPayment">
       <SOAP-ENV:Header />
       <SOAP-ENV:Body>
          <etp:AcceptPayment>
             <merchantID>92883</merchantID>
             <tid>12081</tid>
             <pType>PAYPAL</pType>
             <payment xsi:type="etp:PaymentPAYPAL">
                <amount>180</amount>
                <currency>
                  <name origin="USA">Dollar</name>
                  <sign>$</sign>
                </currency>
             </payment>
             <successURL>https://www.domain.at/success</successURL>
             <errorURL>https://www.domain.at/error</errorURL>
             <confirmationURL>https://www.domain.at/confirmation</confirmationURL>
             <cancelURL>https://www.domain.at/cancel</cancelURL>
          </etp:AcceptPayment>
       </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>`,
    paramOptions: {
      format: 'object',
      fieldNameFormat: 'camel',
      objectFields: ['SOAP-ENV:Body/etp:AcceptPayment/payments/currency/name'],
      fieldNameMapping: {pType: "payment_type", 'etp:AcceptPayment': 'accept_payment'}
    },

    expected: {
      soapEnvEnvelope: {
        '@xmlnsSoapEnv': 'http://schemas.xmlsoap.org/soap/envelope/',
        '@xmlnsEtp': 'https://www.mpay24.com/soap/etp/1.5/ETP.wsdl',
        '@xmlnsXsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xsiType': 'AcceptPayment',
        soapEnvHeader: {},
        soapEnvBody: {
          acceptPayment: {
            merchantID: '92883',
            tid: '12081',
            paymentType: 'PAYPAL',
            payment: {
              '@xsiType': 'etp:PaymentPAYPAL',
              amount: '180',
              currency: {
                name: {
                  '@origin': 'USA',
                  '#': 'Dollar'
                },
                sign: '$'
              }
            },
            successURL: 'https://www.domain.at/success',
            errorURL: 'https://www.domain.at/error',
            confirmationURL: 'https://www.domain.at/confirmation',
            cancelURL: 'https://www.domain.at/cancel'
          }
        }
      }
    }
  },
  {
    num: 7,
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
    expected: {
      CATALOG: {
        CD: {
          TITLE: 'Empire Burlesque',
          ARTIST: 'Bob Dylan',
          COUNTRY: 'USA',
          COMPANY: 'Columbia',
          PRICE: '10.90',
          YEAR: '1985',
        }
      },
    },
  },
  {
    num: 8,
    description: 'Fieldnames mapping, path object setting and camelcase formatting',
    paramXml: `<?xml version="1.0" encoding="UTF-8"?>
    <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:etp="https://www.mpay24.com/soap/etp/1.5/ETP.wsdl"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AcceptPayment">
       <SOAP-ENV:Header />
       <SOAP-ENV:Body>
          <etp:AcceptPayment>
             <merchantID>92883</merchantID>
             <tid>12081</tid>
             <pType>PAYPAL</pType>
             <payment xsi:type="etp:PaymentPAYPAL">
                <amount>180</amount>
                <currency>
                  <name origin="USA">Dollar</name>
                  <sign>$</sign>
                </currency>
             </payment>
             <successURL>https://www.domain.at/success</successURL>
             <errorURL>https://www.domain.at/error</errorURL>
             <confirmationURL>https://www.domain.at/confirmation</confirmationURL>
             <cancelURL>https://www.domain.at/cancel</cancelURL>
          </etp:AcceptPayment>
       </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>`,
    paramOptions: {
      format: 'object',
      fieldNameFormat: 'camel',
      objectFields: ['SOAP-ENV:Body/etp:AcceptPayment/payment/currency/names'],
      fieldNameMapping: {pType: "payment_type", 'etp:AcceptPayment': 'accept_payment'}
    },

    expected: {
      soapEnvEnvelope: {
        '@xmlnsSoapEnv': 'http://schemas.xmlsoap.org/soap/envelope/',
        '@xmlnsEtp': 'https://www.mpay24.com/soap/etp/1.5/ETP.wsdl',
        '@xmlnsXsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xsiType': 'AcceptPayment',
        soapEnvHeader: {},
        soapEnvBody: {
          acceptPayment: {
            merchantID: '92883',
            tid: '12081',
            paymentType: 'PAYPAL',
            payment: {
              '@xsiType': 'etp:PaymentPAYPAL',
              amount: '180',
              currency: {
                name: {
                  '@origin': 'USA',
                  '#': 'Dollar'
                },
                sign: '$'
              }
            },
            successURL: 'https://www.domain.at/success',
            errorURL: 'https://www.domain.at/error',
            confirmationURL: 'https://www.domain.at/confirmation',
            cancelURL: 'https://www.domain.at/cancel'
          }
        }
      }
    }
  },
  //TODO add functionality to support multidimentional arrays
  // {
  //   num: 9,
  //   description: 'Testing arrays in arrays',
  //   paramXml: `<COLOR_GROUPS>
  //   <GROUP>
  //     <COLOR>yellow</COLOR>
  //     <COLOR>pink</COLOR>
  //     <COLOR>blue</COLOR>
  //   </GROUP>
  //   <GROUP>
  //     <COLOR>red</COLOR>
  //     <COLOR>green</COLOR>
  //     <COLOR>white</COLOR>
  //   </GROUP>
  // </COLOR_GROUPS>`,
  //   paramOptions: {
  //     format: 'object',
  //     fieldNameFormat: 'snake',
  //     arrayFields: ['COLOR_GROUPS', 'GROUP'],
  //   },
  //   expected: {
  //     color_groups: [
  //       ['yellow', 'pink', 'blue'], ['red', 'green', 'white']
  //     ]
  //   }
  // },
];