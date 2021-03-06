const BaseTextComponent = require('./base-text-component.js');
const { Alignment, FontWeight } = require('./enums');

module.exports = class Text extends BaseTextComponent {
  constructor(properties) {
    super(properties);

    this.verticalAlignment = properties.verticalAlignment || Alignment.start;
    this.horizontalAlignment = properties.horizontalAlignment || Alignment.start;

    this.linkStyle = {
      color: '#1a0dab',
      underline: true,
    };
    Object.assign(this.linkStyle, properties.linkStyle || {});

    this.color = properties.color || 'black';
    this.underline = properties.underline;
    this.strikethrough = properties.strikethrough;
    this.italic = properties.italic;

    this._text = '';
    this._defaultFontWidthOffset = 0.15 * this.fontSize;
  }

  initializeComponent(data) {
    super.initializeComponent(data);

    this._text = this.getStringBinding(data, this.text);
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
    super.generateComponent(document, data);

    // if (this.rotation) {
    //   document.rotate(this.rotation, {
    //     origin: [ this._originX + this.x , this._originY + this.y ]
    //   });
    // }

    document
      .fontSize(this.fontSize)
      .font(this.fontFamily + (this.fontWeight == FontWeight.bold ? '-Bold' : ''))
      .fillColor(this.link && this.linkStyle.color || this.color)
      .text(this._text,
        this._originX + this.x + this.margin.left,
        this._originY + this.y + this.margin.top, {
        width: this.width - this.margin.horizontalTotal,
        align: this.textAlignment,
        ellipsis: this.ellipsis,
        lineBreak: this.lineBreak,
        strike: this.strikethrough,
        oblique: this.italic,
        underline: this.underline || (this._link && this.linkStyle.underline),
      }
      );

    // if (this.rotation) {
    //   document.rotate(this.rotation * (-1), {
    //     origin: [ this._originX + this.x , this._originY + this.y ]
    //   });
    // }
  }
}