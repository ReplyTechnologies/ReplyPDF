const fs = require('fs');
const { Container, Page, StackHorizontal, StackVertical, Text } = require('../src/components/index.js');
const { PageSize, TextAlignment, Alignment, Layout } = require('../src/components/enums/index.js');
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
          spacing: 5,
          children: [
            new Text({
              text: 'Default:'
            }),
            new StackHorizontal({
              children: [
                new Text({ text: '11', width: 100 }),
                new Text({ text: '12', verticalAlignment: Alignment.end, }),
                new Text({ text: '13', margin: new Offset(10), backgroundColor: 'skyblue' }),
                new Text({ text: '14', verticalAlignment: Alignment.middle }),
                new Text({ text: '15' }),
              ],
            }),
            new Text({
              text: 'Space Between (20pt):'
            }),
            new StackHorizontal({
              spacing: 20,
              children: [
                new Text({ text: '11', width: 100 }),
                new Text({ text: '12', verticalAlignment: Alignment.end, }),
                new Text({ text: '13', margin: new Offset(10), backgroundColor: 'skyblue' }),
                new Text({ text: '14', verticalAlignment: Alignment.middle }),
                new Text({ text: '15' }),
              ],
            }),
            new Text({
              text: 'Space Evenly:'
            }),
            new StackHorizontal({
              layout: Layout.spaceEvenly,
              children: [
                new Text({ text: '11', width: 100 }),
                new Text({ text: '12', verticalAlignment: Alignment.end, }),
                new Text({ text: '13', margin: new Offset(10), backgroundColor: 'skyblue' }),
                new Text({ text: '14', verticalAlignment: Alignment.middle }),
                new Text({ text: '15' }),
              ],
            }),
            new Text({
              text: 'Size Evenly:'
            }),
            new StackHorizontal({
              layout: Layout.sizeEvenly,
              children: [
                new Text({ text: '11', width: 100 }),
                new Text({ text: '12', verticalAlignment: Alignment.end, }),
                new Text({ text: '13', margin: new Offset(10), backgroundColor: 'skyblue' }),
                new Text({ text: '14', verticalAlignment: Alignment.middle }),
                new Text({ text: '15' }),
              ],
            }),
            new Text({
              text: 'Size Evenly with spacing (20pt):'
            }),
            new StackHorizontal({
              spacing: 15,
              layout: Layout.sizeEvenly,
              children: [
                new Text({ text: '11', width: 100 }),
                new Text({ text: '12', verticalAlignment: Alignment.end, }),
                new Text({ text: '13', margin: new Offset(10), backgroundColor: 'skyblue' }),
                new Text({ text: '14', verticalAlignment: Alignment.middle }),
                new Text({ text: '15' }),
              ],
            }),
            new StackHorizontal({
              spacing: 20,
              children: [
                new StackVertical({
                  children: [
                    new Text({ text: 'A', height: 50 }),
                    new Text({ horizontalAlignment: Alignment.middle, text: 'B' }),
                    new Text({ backgroundColor: 'lime', text: 'C', margin: new Offset(10) }),
                    new Text({ horizontalAlignment: Alignment.end, text: 'D' }),
                    new Text({ text: 'E' }),
                  ],
                }),
                new StackVertical({
                  spacing: 20,
                  children: [
                    new Text({ text: 'A', height: 50 }),
                    new Text({ horizontalAlignment: Alignment.middle, text: 'B' }),
                    new Text({ backgroundColor: 'lime', text: 'C', margin: new Offset(10) }),
                    new Text({ horizontalAlignment: Alignment.end, text: 'D' }),
                    new Text({ text: 'E' }),
                  ],
                }),
                new StackVertical({
                  layout: Layout.spaceEvenly,
                  children: [
                    new Text({ text: 'A', height: 50 }),
                    new Text({ horizontalAlignment: Alignment.middle, text: 'B' }),
                    new Text({ backgroundColor: 'lime', text: 'C', margin: new Offset(10) }),
                    new Text({ horizontalAlignment: Alignment.end, text: 'D' }),
                    new Text({ text: 'E' }),
                  ],
                }),
                new StackVertical({
                  layout: Layout.sizeEvenly,
                  children: [
                    new Text({ text: 'A', height: 50 }),
                    new Text({ horizontalAlignment: Alignment.middle, text: 'B' }),
                    new Text({ backgroundColor: 'lime', text: 'C', margin: new Offset(10) }),
                    new Text({ horizontalAlignment: Alignment.end, text: 'D' }),
                    new Text({ text: 'E' }),
                  ],
                }),
                new StackVertical({
                  spacing: 20,
                  layout: Layout.sizeEvenly,
                  children: [
                    new Text({ text: 'A', height: 50 }),
                    new Text({ horizontalAlignment: Alignment.middle, text: 'B' }),
                    new Text({ backgroundColor: 'lime', text: 'C', margin: new Offset(10) }),
                    new Text({ horizontalAlignment: Alignment.end, text: 'D' }),
                    new Text({ text: 'E' }),
                  ],
                }),
              ],
            }),
            new StackHorizontal({
              spacing: 50,
              children: [
                new Text({ text: 'V', width: 50 }),
                new Text({
                  verticalAlignment: Alignment.middle,
                  text: 'W'
                }),
                new Text({
                  backgroundColor: 'orange',
                  text: 'X',
                  margin: new Offset(10)
                }),
                new Text({
                  verticalAlignment: Alignment.end,
                  text: 'Y'
                }),
                new Text({ text: 'Z' }),
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