const fs = require('fs');
const { Container, Page, Text } = require('../src/components/index.js');
const { PageSize, Alignment } = require('../src/components/enums/index.js');
const { Border, Offset } = require('../src/components/models/index.js');
const ReplyPDF = require('../src/reply-pdf.js');
const GridLayout = require('../src/components/grid-layout.js');

module.exports = {
  generate: () => {

    const countChildren = [];

    for (var i = 0; i < 5; i++) {
      countChildren.push(
        new Container({
          margin: new Offset(10),
          border: new Border(),
          children: [
            new Text({
              margin: new Offset(10),
              text: `Item: ${i}`,
              fontSize: 20
            }),
          ]
        })
      );
    }

    const template = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      header: new Container({
        height: 50,
        children: [
          new Text({
            text: 'Sample PDF document - Grid Layout',
          }),
        ],
      }),
      footer: new Container({
        height: 50,
        children: [
          new Text({
            verticalAlignment: Alignment.end,
            horizontalAlignment: Alignment.end,
            fontSize: 10,
            text: 'Page {{pageNumber}} of {{pageCount}}',
          }),
        ],
      }),
      children: [
        new GridLayout({
          columns: 3,
          children: countChildren
        })
      ]
    });

    const data = {};

    let doc = ReplyPDF.generateDocument({
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-grid-layout-example.pdf'));
    doc.end();
  }
}