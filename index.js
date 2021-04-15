import { default as PDFDocument } from 'pdfkit';
import * as fs from 'fs';
import { Container, Page, Text, RepeatVertical } from './components/index.js';
import { PageSize, Positioning, Offset, TextAlignment } from './components/properties/index.js';

const template = new Page({
  size: PageSize.A4,
  margin: new Offset({
    left: 50,
    top: 25,
    right: 50,
    bottom: 25,
  }),
  header: new Text({
    text: 'Page Header {{pageNumber}} of {{pageCount}}',
    height: 100,
  }),
  footer: new Container({
    height: 50,
    margin: new Offset(5),
    children: [
      new Text({
        fontSize: 10,
        text: 'Page Footer {{pageNumber}} of {{pageCount}}',
      }),
    ],
  }),
  children: [
    new RepeatVertical({
      margin: new Offset(5),
      binding: 'arrayValues',
      child:
        new Text({
          margin: new Offset(5),
          text: 'Current value:\n{{.}}',
        }),
    }),
  ],
});

const doc = new PDFDocument({
  bufferPages: true,
  size: template.size.toArray(),
  margin: 0,
});

doc.debug = true;

const array = [];
for (let i = 0; i < 100; i++) {
  array.push(i);
}

const data = {
  sampleText: 'hi :-)',
  arrayValues: array,
};

let documentPage = doc;

do {
  documentPage.renderNextPage = false;
  template.generateComponent(documentPage, data);

  if (documentPage.renderNextPage) {
    documentPage = doc.addPage({
      size: template.size.toArray(),
      margin: 0,
    });
  }
} while (documentPage.renderNextPage);

let pages = doc.bufferedPageRange();
for (let i = 0; i < pages.count; i++) {
  doc.switchToPage(i);

  data.pageNumber = i + 1;
  data.pageCount = pages.count;

  template.generateHeaderComponent(documentPage, data);
  template.generateFooterComponent(documentPage, data);
}

doc.pipe(fs.createWriteStream('output.pdf'));
doc.end();