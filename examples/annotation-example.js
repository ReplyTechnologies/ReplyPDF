import * as fs from 'fs';
import { Container, Page, StackVertical, Table, Text } from '../components/index.js';
import { PageSize, Offset, TextAlignment, FontWeight, Border, BorderSide, Alignment } from '../components/properties/index.js';
import { EasyDocs } from '../easy-docs.js';

export default {
  generate() {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      children: [
        new StackVertical({
          children: [
            new Text({
              margin: new Offset(10),
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
              border: new Border(new BorderSide({ thickness: 5 })),
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
            }),
          ],
        })
      ],
    });

    const data = {
      link: 'https://www.google.com',
    };

    let doc = EasyDocs.generateDocument({
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('output-annotation-example.pdf'));
    doc.end();
  }
}