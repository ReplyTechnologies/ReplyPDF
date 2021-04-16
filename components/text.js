import BaseTextComponent from './base-text-component.js';
import { FontWeight } from './properties/index.js';

export class Text extends BaseTextComponent {
  constructor(properties) {
    super(properties);

    this._text = '';
  }

  initializeComponent(data) {
    this._text = this.text;

    if (data && typeof(this._text) == 'string') {
      while (this._text.indexOf('{{') != -1 && this._text.indexOf('}}') != -1) {
        const startIndex = this._text.indexOf('{{');
        const endIndex = this._text.indexOf('}}') + 2;
        const bindingResult = this.getBinding(data, this._text.substring(startIndex, endIndex));
        this._text = this._text.substring(0, startIndex) + bindingResult + this._text.substring(endIndex);
      }
    }
  }

  layoutComponent(document) {
    document
      .fontSize(this.fontSize)
      .font(this.fontFamily + (this.fontWeight == FontWeight.bold ? '-Bold' : ''))

    if (this.width == 0) {
      this.width = document
        .widthOfString(this._text) + this.margin.horizontalTotal;
    }

    if (this.height == 0) {
      this.height = document
        .heightOfString(this._text, this.width - this.margin.horizontalTotal) + this.margin.verticalTotal;
    }
  }

  generateComponent(document, data) {
    this._generateDebugLayout(document);

    document
      .fontSize(this.fontSize)
      .font(this.fontFamily + (this.fontWeight == FontWeight.bold ? '-Bold' : ''))
      .text(this._text,
        this.originX + this.x + this.margin.left,
        this.originY + this.y + this.margin.top, {
          width: this.width - this.margin.horizontalTotal,
          align: this.textAlignment,
          ellipsis: '',
          lineBreak: false,
          height: this.fontSize
        }
      );
  }
}