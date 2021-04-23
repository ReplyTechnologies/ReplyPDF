const fs = require('fs');
const { Container, Page, StackVertical, Text } = require('../src/components/index.js');
const { PageSize } = require('../src/components/enums/index.js');
const { Offset } = require('../src/components/models/index.js');
const ReplyPDF = require('../src/reply-pdf.js');

module.exports = {
  generate: () => {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      children: [
        new Container({
          binding: 'tier1',
          children: [
            new StackVertical({
              binding: 'tier2',
              children: [
                new Text({
                  binding: 'tier3.tier4',
                  margin: new Offset(10),
                  text: 'date = {{tier5.date}}',
                }),
              ],
            }),
          ],
        }),
      ],
    });

    const data = {
      tier1: {
        tier2: {
          tier3: {
            tier4: {
              tier5: {
                date: new Date(),
              }
            }
          }
        }
      }
    };

    let doc = ReplyPDF.generateDocument({
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-binding-example.pdf'));
    doc.end();
  }
}