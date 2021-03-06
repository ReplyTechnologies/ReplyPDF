const fs = require('fs');
const { Container, Page, Text } = require('../src/components/index.js');
const { PageSize, TextAlignment, Alignment } = require('../src/components/enums/index.js');
const { Offset } = require('../src/components/models/index.js');
const ReplyPDF = require('../src/reply-pdf.js');

module.exports = {
  generate: () => {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      header: new Container({
        height: 50,
        children: [
          new Text({
            text: 'Sample PDF document - Container',
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
            new Text({
              text: 'center left',
              horizontalAlignment: Alignment.start,
              verticalAlignment: Alignment.middle,
            }),
            new Text({
              text: 'center center',
              horizontalAlignment: Alignment.middle,
              verticalAlignment: Alignment.middle,
            }),
            new Text({
              text: 'center right',
              horizontalAlignment: Alignment.end,
              verticalAlignment: Alignment.middle,
            }),
            new Text({
              text: 'bottom left',
              fontSize: 25,
              horizontalAlignment: Alignment.start,
              verticalAlignment: Alignment.end,
            }),
            new Text({
              text: 'bottom center',
              horizontalAlignment: Alignment.middle,
              verticalAlignment: Alignment.end,
            }),
            new Text({
              text: 'bottom right',
              horizontalAlignment: Alignment.end,
              verticalAlignment: Alignment.end,
            }),
          ],
        }),
      ],
    });

    const data = {};

    let doc = ReplyPDF.generateDocument({
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-container-example.pdf'));
    doc.end();
  }
}