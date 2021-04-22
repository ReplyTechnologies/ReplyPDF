import * as fs from 'fs';
import { Container, Page, RepeatVertical, StackHorizontal, StackVertical, Text } from '../src/components/index.js';
import { Alignment, PageSize, TextAlignment } from '../src/components/enums/index.js';
import { Border, BorderSide, Offset } from '../src/components/models/index.js';
import { EasyDocs } from '../src/easy-docs.js';

export default {
  generate() {
    const template1 = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      header: new Container({
        height: 50,
      }),
      footer: new Container({
        height: 50,
      }),
      children: [
        new RepeatVertical({
          binding: 'arrayValues',
          template: new Container({
            margin: new Offset({
              top: 5,
            }),
            border: new Border(),
            children: [
              new Text({
                margin: new Offset(5),
                text: 'Array value: {{.}}',
              }),
            ],
          }),
        }),
      ],
    });

    const template2 = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      header: new Container({
        height: 50,
        children: [
          new Text({
            text: 'Sample PDF document - Template 2',
          }),
        ],
      }),
      footer: new Container({
        height: 50,
        children: [
          new Text({
            horizontalAlignment: Alignment.start,
            text: '{{date}}',
          }),
          new Text({
            horizontalAlignment: Alignment.end,
            text: 'Page {{pageNumber}} of {{pageCount}}',
          }),
        ],
      }),
      children: [
        new Container({
          children: [
            new Text({
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              y: 50,
              width: 400,
              textAlignment: TextAlignment.center,
              horizontalAlignment: Alignment.middle,
              verticalAlignment: Alignment.start,
            }),
            new Text({
              text: 'top left',
              horizontalAlignment: Alignment.start,
              verticalAlignment: Alignment.start,
            }),
            new Text({
              text: 'top center',
              horizontalAlignment: Alignment.middle,
              verticalAlignment: Alignment.start,
            }),
            new Text({
              text: 'top right',
              horizontalAlignment: Alignment.end,
              verticalAlignment: Alignment.start,
            }),
          ],
        }),
      ],
    });

    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(i);
    }

    const data1 = {
      arrayValues: array,
    };

    const data2 = {
      date: (new Date()).toLocaleDateString(),
    };

    let doc = EasyDocs.generateDocument({
      data: data1,
      template: template1,
      debug: false,
    });

    doc = EasyDocs.generateDocument({
      doc: doc,
      data: data2,
      template: template2,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-multiple-template-example.pdf'));
    doc.end();
  }
}