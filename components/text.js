import BaseTextComponent from './base-text-component.js';
import { FontWeight } from './properties/index.js';

export class Text extends BaseTextComponent {
  constructor(properties) {
    super(properties);

    this._text = '';
  }

  generateDebugLayout(document) {
    if (!document.debug) {
      return;
    }

    document.lineWidth(0.5);

    document
      .strokeColor('red')
      .rect(
        this.originX + this.x,
        this.originY + this.y,
        this.width,
        this.height)
      .stroke();

    // area for content
    document
      .strokeColor('green')
      .rect(
        this.originX + this.x + this.margin.left,
        this.originY + this.y + this.margin.top,
        this.width - this.margin.horizontalTotal,
        this.height - this.margin.verticalTotal
      )
      .stroke();
  }

  layoutComponent(document, data) {
    this._text = this.text;

    if (typeof(this._text) == 'string') {
      while (this._text.indexOf('{{') != -1 && this._text.indexOf('}}') != -1) {
        const startIndex = this._text.indexOf('{{');
        const endIndex = this._text.indexOf('}}') + 2;
        const bindingResult = this.getBinding(data, this._text.substring(startIndex, endIndex));
        this._text = this._text.substring(0, startIndex) + bindingResult + this._text.substring(endIndex);
      }
    }

    this.height = document
      .fontSize(this.fontSize)
      .font(this.fontFamily + (this.fontWeight == FontWeight.bold ? '-Bold' : ''))
      .heightOfString(this._text, this.width - this.margin.horizontalTotal, {
        fontFamily: this.fontFamily + (this.fontWeight == FontWeight.bold ? '-Bold' : ''),
      }) + this.margin.verticalTotal;
  }

  generateComponent(document, data) {
    this.generateDebugLayout(document);

    document
      .fontSize(this.fontSize)
      .font(this.fontFamily + (this.fontWeight == FontWeight.bold ? '-Bold' : ''))
      .text(this._text,
        this.originX + this.x + this.margin.left,
        this.originY + this.y + this.margin.top, {
          width: this.width - this.margin.horizontalTotal,
          align: this.textAlignment,
          ellipsis: true,
          lineBreak: false,
          height: this.fontSize
        }
      );
  }
}