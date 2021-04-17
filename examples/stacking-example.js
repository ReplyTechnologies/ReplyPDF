import * as fs from 'fs';
import { Container, Page, StackHorizontal, StackVertical, Table, Text } from '../components/index.js';
import { PageSize, Offset, TextAlignment, FontWeight, Border, BorderSide } from '../components/properties/index.js';
import { EasyDocs } from '../easy-docs.js';

export default {
  generate() {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      header: new Container({
        height: 50,
        children: [
          new Text({
            text: 'Sample PDF document - Stack Horizontal',
          }),
        ],
      }),
      footer: new Container({
        height: 50,
        children: [
          new Text({
            margin: new Offset({
              top: 25,
            }),
            fontSize: 10,
            textAlignment: TextAlignment.right,
            text: 'Page {{pageNumber}} of {{pageCount}}',
          }),
        ],
      }),
      children: [
        new StackVertical({
          children: [
            new StackHorizontal({
              children: [
                new Text({ text: '1', width: 50 }),
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
            new StackVertical({
              children: [
                new Text({ text: '1', height: 50 }),
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
            new StackHorizontal({
              debug: true,
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

    let doc = EasyDocs.generateDocument({
      data: data,
      template: template,
      debug: true,
    });

    doc.pipe(fs.createWriteStream('output-stack-horizontal-example.pdf'));
    doc.end();
  }
}