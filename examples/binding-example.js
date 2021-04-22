import * as fs from 'fs';
import { Container, Page, StackVertical, Text } from '../src/components/index.js';
import { PageSize } from '../src/components/enums/index.js';
import { Offset } from '../src/components/models/index.js';
import { EasyDocs } from '../src/easy-docs.js';

export default {
  generate() {
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

    let doc = EasyDocs.generateDocument({
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-binding-example.pdf'));
    doc.end();
  }
}