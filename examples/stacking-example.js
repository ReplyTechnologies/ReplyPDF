const fs = require('fs');
const { Container, Page, StackHorizontal, StackVertical, Text } = require('../src/components/index.js');
const { PageSize, TextAlignment, Alignment } = require('../src/components/enums/index.js');
const { Border, Offset } = require('../src/components/models/index.js');
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
            text: 'Sample PDF document - Stacking',
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
        new StackVertical({
          children: [
            new StackHorizontal({
              spacing: 15,
              children: [
                new Text({ text: '1', width: 50 }),
                new Text({
                  verticalAlignment: Alignment.middle,
                  text: '2'
                }),
                new Text({
                  backgroundColor: 'orange',
                  text: '3',
                  margin: new Offset(15)
                }),
                new Text({
                  verticalAlignment: Alignment.end,
                  text: '4'
                }),
                new Text({ text: '5' }),
              ],
            }),
            new StackVertical({
              spacing: 20,
              children: [
                new Text({ text: '1', height: 50 }),
                new Text({
                  horizontalAlignment: Alignment.middle,
                  text: '2'
                }),
                new Text({
                  backgroundColor: 'pink',
                  text: '3',
                  margin: new Offset(15)
                }),
                new Text({
                  horizontalAlignment: Alignment.end,
                  text: '4'
                }),
                new Text({ text: '5' }),
              ],
            }),
            new StackHorizontal({
              horizontalAlignment: Alignment.fill,
              children: [
                new Text({ text: '1', width: 100 }),
                new Text({ text: '2' }),
                new Text({ text: '3', margin: new Offset(15) }),
                new Container({
                  children: [
                    new Text({ text: '4' }),
                  ],
                }),
                new Text({ text: '5' }),
              ],
            }),
          ],
        }),
      ],
    });

    const data = {};

    let doc = ReplyPDF.generateDocument({
      data: data,
      template: template,
      debug: true,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-stacking-example.pdf'));
    doc.end();
  }
}