import * as fs from 'fs';
import { Container, Page, Text } from '../src/components/index.js';
import { PageSize, Alignment, FontWeight } from '../src/components/enums/index.js';
import { Offset, Border, BorderSide } from '../src/components/models/index.js';
import { EasyDocs } from '../src/easy-docs.js';

export default {
  generate() {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      children: [
        new Container({
          children: [
            new Text({
              margin: new Offset(10),
              fontWeight: FontWeight.bold,
              text: 'Go to Google',
              link: 'https://www.google.com'
            }),
            new Text({
              margin: new Offset(10),
              text: 'Go to bound link',
              link: '{{link}}'
            }),
            new Text({
              margin: new Offset(10),
              text: 'This is also a link',
              linkStyle: {
                color: 'black',
                underline: false,
              },
              link: 'https://www.google.com'
            }),
            new Text({
              margin: new Offset(10),
              text: 'This is NOT a link',
              underline: true,
              color: '#1a0dab'
            }),
            new Container({
              height: 50,
              border: new Border(new BorderSide({ thickness: 1 })),
              margin: new Offset(10),
              link: 'https://www.google.com',
              children: [
                new Text({
                  verticalAlignment: Alignment.middle,
                  horizontalAlignment: Alignment.middle,
                  text: 'This is text surrounded by a link'
                }),
              ],
            }),
            new Text({
              margin: new Offset(10),
              text: 'This is no longer important',
              strikethrough: true,
              italic: true,
            }),
          ],
        })
      ],
    });

    const data = {
      firstName: "John",
      lastName: "Doe",
      contactNumber: "123 456 7890",
      emailAddress: "john.doe@fake.email.com",
      gender: 'male',
    };

    let doc = EasyDocs.generateDocument({
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-annotation-example.pdf'));
    doc.end();
  }
}