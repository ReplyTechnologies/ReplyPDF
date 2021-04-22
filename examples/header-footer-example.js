import * as fs from 'fs';
import { Container, Page, RepeatVertical, StackVertical, Text } from '../src/components/index.js';
import { PageSize, TextAlignment, Alignment } from '../src/components/enums/index.js';
import { Offset, Border, BorderSide } from '../src/components/models/index.js';
import { EasyDocs } from '../src/easy-docs.js';

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
        border: new Border(),
        children: [
          new StackVertical({
            margin: new Offset(10),
            children: [
              new Text({
                text: 'Sample PDF document - Header & Footer - {{date}}',
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
        border: new Border(),
        children: [
          new StackVertical({
            margin: new Offset(10),
            children: [
              new Text({
                text: 'Sample PDF document - Header & Footer - {{date}}',
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
            horizontalAlignment: Alignment.start,
            verticalAlignment: Alignment.end,
            fontSize: 10,
            text: '{{date}}',
          }),
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

    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(i);
    }

    const data = {
      arrayValues: array,
      date: (new Date()).toLocaleDateString(),
    };

    let doc = EasyDocs.generateDocument({
      info: {
        title: 'Header & Footer Sample PDF',
      },
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-header-footer-example.pdf'));
    doc.end();
  }
}