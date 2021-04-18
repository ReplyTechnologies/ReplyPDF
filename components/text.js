import BaseTextComponent from './base-text-component.js';
import { Alignment, FontWeight } from './properties/index.js';

export class Text extends BaseTextComponent {
  constructor(properties) {
    super(properties);

    this.verticalAlignment = properties.verticalAlignment || Alignment.start;
    this.horizontalAlignment = properties.horizontalAlignment || Alignment.start;

    this.link = properties.link;
    this.linkStyle = {
      color: '#1a0dab',
      underline: true,
    };
    if (properties.linkStyle) {
      Object.assign(this.linkStyle, properties.linkStyle);
    }

    this.color = properties.color || 'black';
    this.underline = properties.underline;

    this._text = '';
    this._defaultFontWidthOffset = 1;
  }

  initializeComponent(data) {
    const dataBindingSource = this.getBinding(data);
    this._text = this.getStringBinding(dataBindingSource, this.text);
  }

  layoutComponent(document) {
    document
      .fontSize(this.fontSize)
      .font(this.fontFamily + (this.fontWeight == FontWeight.bold ? '-Bold' : ''));

    if (!this.width) {
      this.width = document
        .widthOfString(this._text) + this.margin.horizontalTotal + this._defaultFontWidthOffset;
    }

    if (!this.height) {
      this.height = document
        .heightOfString(this._text, {
          width: this.width - this.margin.horizontalTotal,
          ellipsis: this.ellipsis,
          lineBreak: this.lineBreak,
        }) + this.margin.verticalTotal;
    }
  }

  generateComponent(document, data) {
    this._generateDebugLayout(document);

    document
      .fontSize(this.fontSize)
      .font(this.fontFamily + (this.fontWeight == FontWeight.bold ? '-Bold' : ''))
      .fillColor(this.link && this.linkStyle.color || this.color)
      .text(this._text,
        this.originX + this.x + this.margin.left,
        this.originY + this.y + this.margin.top, {
          width: this.width - this.margin.horizontalTotal,
          align: this.textAlignment,
          ellipsis: this.ellipsis,
          lineBreak: this.lineBreak,
        }
      );

    if (this.underline || (this._link && this.linkStyle.underline)) {
      document.underline(
        this.originX + this.x + this.margin.left,
        this.originY + this.y + this.margin.top,
        this.width - this.margin.horizontalTotal,
        this.height - this.margin.verticalTotal, {
          color: this._link && this.linkStyle.color || this.color,
        }
      );
    }

    if (this._link) {
      document.link(
        this.originX + this.x + this.margin.left,
        this.originY + this.y + this.margin.top,
        this.width - this.margin.horizontalTotal,
        this.height - this.margin.verticalTotal,
        this._link
      )
    }
  }
}