import * as fs from 'fs';
import { Page, Image, Container } from '../src/components/index.js';
import { Alignment, PageSize } from '../src/components/enums/index.js';
import { Offset } from '../src/components/models/index.js';
import { ReplyPDF } from '../src/reply-pdf.js';

export default {
  generate() {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset(50),
      children: [
        new Container({
          children: [
            new Image({
              verticalAlignment: Alignment.start,
              horizontalAlignment: Alignment.middle,
              binding: 'chart',
              width: 300,
              height: 100
            }),
          ],
        }),
      ],
    });

    const data = {
      chart: 'https://image-charts.com/chart?chco=3072F3%2Cff0000%2C00aaaa&chd=t%3A10%2C20%2C40%2C80%2C90%2C95%2C99%7C20%2C30%2C40%2C50%2C60%2C70%2C80%7C-1%7C5%2C10%2C22%2C35%2C85&chdl=Ponies%7CUnicorns&chdlp=t&chls=2%2C4%2C1&chm=s%2C000000%2C0%2C-1%2C5%7Cs%2C000000%2C1%2C-1%2C5&chs=700x200&cht=lxy',
    };

    let doc = ReplyPDF.generateDocument({
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-chart-example.pdf'));
    doc.end();
  }
}