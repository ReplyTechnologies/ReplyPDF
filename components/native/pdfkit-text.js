import { FontWeight } from '../properties/index.js';
import PdfkitBaseComponent from './pdfkit-base-component.js';

export class PdfkitText extends PdfkitBaseComponent {
  constructor(properties) {
    super(properties);

    this.text = properties.text || '';
    this.fontSize = properties.fontSize || 10;
    this.fontWeight = properties.fontWeight || FontWeight.normal;
    this.fontFamily = properties.fontFamily || 'Helvetica';
    this.lineBreak = properties.lineBreak || true;
    this.ellipsisCharacter = properties.ellipsisCharacter || true;
  }

  layout(document) {
    this.height = document
      .fontSize(this.fontSize)
      .font(this.fontFamily + (this.fontWeight == FontWeight.bold ? '-Bold' : ''))
      .heightOfString(this.text, this.width - this.margin.horizontalTotal, {

      }) + this.margin.verticalTotal;
  }

  render(document) {}
}