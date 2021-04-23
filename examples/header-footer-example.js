const fs = require('fs');
const { Container, Page, RepeatVertical, StackVertical, Text } = require('../src/components/index.js');
const { PageSize, TextAlignment, Alignment } = require('../src/components/enums/index.js');
const { Offset, Border, BorderSide } = require('../src/components/models/index.js');
const ReplyPDF = require('../src/reply-pdf.js');

module.exports = {
  generate: () => {
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

    let doc = ReplyPDF.generateDocument({
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