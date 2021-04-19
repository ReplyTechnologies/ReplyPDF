import * as fs from 'fs';
import { Container, Page, RepeatVertical, StackVertical, Table, Text } from '../components/index.js';
import { PageSize, Offset, TextAlignment, FontWeight, Border, BorderSide, Alignment } from '../components/properties/index.js';
import { EasyDocs } from '../easy-docs.js';

export default {
  generate() {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset({
        left: 50,
        top: 50,
        right: 50,
        bottom: 50,
      }),
      firstPageHeader: new Container({
        height: 150,
        backgroundColor: '#fcc',
        border: new Border(new BorderSide({ thickness: 1 })),
        children: [
          new StackVertical({
            margin: new Offset(10),
            children: [
              new Text({
                text: 'Sample PDF document - Header & Footer',
              }),
              new Text({
                text: 'First Page Header',
              }),
            ],
          }),
        ],
      }),
      header: new Container({
        height: 50,
        backgroundColor: '#cfc',
        border: new Border(new BorderSide({ thickness: 1 })),
        children: [
          new StackVertical({
            margin: new Offset(10),
            children: [
              new Text({
                text: 'Sample PDF document - Header & Footer',
              }),
              new Text({
                text: 'Normal Page Header',
              }),
            ],
          }),
        ],
      }),
      footer: new Container({
        height: 50,
        children: [
          new Text({
            horizontalAlignment: Alignment.end,
            verticalAlignment: Alignment.end,
            fontSize: 10,
            textAlignment: TextAlignment.right,
            text: 'Page {{pageNumber}} of {{pageCount}}',
          }),
        ],
      }),
      children: [
        new RepeatVertical({
          binding: 'arrayValues',
          child: new Container({
            margin: new Offset({
              top: 5,
            }),
            border: new Border(new BorderSide({ thickness: 1 })),
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

    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(i);
    }

    const data = {
      arrayValues: array,
    };

    let doc = EasyDocs.generateDocument({
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('output-header-footer-example.pdf'));
    doc.end();
  }
}