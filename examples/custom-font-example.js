const fs = require('fs');
const { Page, StackVertical, Text } = require('../src/components/index.js');
const { PageSize, FontWeight } = require('../src/components/enums/index.js');
const { Offset } = require('../src/components/models/index.js');
const ReplyPDF = require('../src/reply-pdf.js');

module.exports = {
  generate: () => {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      children: [
        new StackVertical({
          children: [
            new Text({
              margin: new Offset(10),
              fontFamily: 'Robinette',
              fontSize: 30,
              text: 'This is robinette font',
            }),
            new Text({
              margin: new Offset(10),
              fontFamily: 'GrandAutoDemo',
              text: 'This is grand auto demo font',
            }),
            new Text({
              margin: new Offset(10),
              fontFamily: 'GrandAutoDemo',
              text: 'This is grand auto demo font in italic',
              italic: true,
            }),
            new Text({
              margin: new Offset(10),
              fontFamily: 'PlayfairDisplay',
              text: 'This is playfair dispay font',
            }),
            new Text({
              margin: new Offset(10),
              fontFamily: 'PlayfairDisplay',
              fontWeight: FontWeight.bold,
              text: 'This is playfair dispay font in bold',
            }),
          ],
        })
      ],
    });

    let doc = ReplyPDF.generateDocument({
      fonts: {
        'Robinette': fs.readFileSync('examples/fonts/Robinette.ttf'),
        'GrandAutoDemo': fs.readFileSync('examples/fonts/GrandAutoDemoRegular.ttf'),
        'PlayfairDisplay': fs.readFileSync('examples/fonts/PlayfairDisplay-Regular.ttf'),
        'PlayfairDisplay-Bold': fs.readFileSync('examples/fonts/PlayfairDisplay-Bold.ttf'),
      },
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-custom-font-example.pdf'));
    doc.end();
  }
}