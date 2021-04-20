import BaseComponent from './base-component.js';
import { Positioning, Offset, Alignment } from './properties/index.js';

export default class BaseLayoutComponent extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.width = properties.width || 0;
    this.height = properties.height || 0;
    this.x = properties.x || 0;
    this.y = properties.y || 0;

    this.originX = 0;
    this.originY = 0;

    this.column = properties.column || 0;
    this.row = properties.row || 0;

    this.margin = properties.margin || new Offset();

    this.border = properties.border;

    this.positioning = properties.positioning || Positioning.absolute;

    this.verticalAlignment = properties.verticalAlignment || Alignment.fill;
    this.horizontalAlignment = properties.horizontalAlignment || Alignment.fill;

    this.backgroundColor = properties.backgroundColor;

    this.link = properties.link;

    this._link = undefined;
  }

  initializeComponent(data) {
    super.initializeComponent(data);

    const dataBindingSource = this.getBinding(data);

    this._link = this.getStringBinding(dataBindingSource, this.link);
  }

  layoutComponent(document) { }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    this._generateDebugLayout(document);

    if (this.backgroundColor) {
      document
        .rect(
          this.originX + this.x + this.margin.left,
          this.originY + this.y + this.margin.top,
          this.width - this.margin.horizontalTotal,
          this.height - this.margin.verticalTotal)
        .fill(this.backgroundColor);
    }

  }

  afterGenerateComponent(document) {
    super.afterGenerateComponent(document);

    if (this._link) {
      document.link(
        this.originX + this.x + this.margin.left,
        this.originY + this.y + this.margin.top,
        this.width - this.margin.horizontalTotal,
        this.height - this.margin.verticalTotal,
        this._link
      );
    }

    if (this.border) {
      const topLeft = {
        x: this.originX + this.x + this.margin.left,
        y: this.originY + this.y + this.margin.top,
      };

      const topRight = {
        x: this.originX + this.x + this.width - this.margin.right,
        y: this.originY + this.y + this.margin.top,
      };

      const bottomLeft = {
        x: this.originX + this.x + this.margin.left,
        y: this.originY + this.y + this.height - this.margin.bottom,
      };

      const bottomRight = {
        x: this.originX + this.x + this.width - this.margin.right,
        y: this.originY + this.y + this.height - this.margin.bottom,
      };

      this._drawBorderSide(document, this.border.left, topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y);
      this._drawBorderSide(document, this.border.top, topLeft.x, topLeft.y, topRight.x, topRight.y);
      this._drawBorderSide(document, this.border.right, topRight.x, topRight.y, bottomRight.x, bottomRight.y);
      this._drawBorderSide(document, this.border.bottom, bottomLeft.x, bottomLeft.y, bottomRight.x, bottomRight.y);
    }
  }

  _generateDebugLayout(document) {
    if (!document.debug && !this.debug) {
      return;
    }

    document.lineWidth(0.5);

    // absolute area for component
    document
      .strokeColor('red')
      .rect(
        this.originX + this.x,
        this.originY + this.y,
        this.width,
        this.height
      )
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

  _drawBorderSide(document, borderSide, x1, y1, x2, y2) {
    if (!borderSide || !borderSide.thickness) {
      return;
    }

    document
      .strokeColor(borderSide.color)
      .lineCap('butt')
      .moveTo(x1, y1)
      .lineTo(x2, y2)
      .stroke();
  }
}