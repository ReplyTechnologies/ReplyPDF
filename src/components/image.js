const BaseLayoutComponent = require('./base-layout-component.js');
const { Alignment } = require('./enums/index.js');
const isUrl = require('is-url');
const request = require('sync-request');
const isXml = require('is-xml');
const SVGtoPDF = require('svg-to-pdfkit');

module.exports = class Image extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.source = properties.source;
    this.stretch = properties.stretch;
  }

  initializeComponent(data) {
    super.initializeComponent(data);

    if (this.binding) {
      this.source = this.getBinding(data);
    }

    if (isUrl(this.source)) {
      const response = request('GET', this.source);
      this.source = response.body;
    }
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    let horizontalAlignmentValue = '';
    switch (this.horizontalAlignment) {
      case Alignment.start:
        horizontalAlignmentValue = 'left';
        break;
      case Alignment.middle:
      case Alignment.fill:
        horizontalAlignmentValue = 'center';
        break;
      case Alignment.end:
        horizontalAlignmentValue = 'right';
        break;
    }

    let verticalAlignmentValue = '';
    switch (this.verticalAlignment) {
      case Alignment.start:
        verticalAlignmentValue = 'top';
        break;
      case Alignment.middle:
      case Alignment.fill:
        verticalAlignmentValue = 'center';
        break;
      case Alignment.end:
        verticalAlignmentValue = 'bottom';
        break;
    }

    if (isXml(this.source)) {
      // render image as SVG
      if (this.source.constructor.name === 'Buffer') {
        this.source = this.source.toString('utf8');
      }

      SVGtoPDF(
        document,
        this.source,
        this._originX + this.x + this.margin.left,
        this._originY + this.y + this.margin.top, {
          width: this.width,
          height: this.height,
        }
      );
    } else {
      // render image normally
      document.image(
        this.source,
        this._originX + this.x + this.margin.left,
        this._originY + this.y + this.margin.top, {
          fit: !this.stretch && [this.width, this.height],
          width: this.stretch && this.width,
          height: this.stretch && this.height,
          align: horizontalAlignmentValue,
          valign: verticalAlignmentValue,
        }
      );
    }
  }
}