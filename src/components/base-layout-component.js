const BaseComponent = require('./base-component.js');
const { Alignment, Positioning } = require('./enums');
const { Offset } = require('./models');

module.exports = class BaseLayoutComponent extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.width = properties.width || 0;
    this.height = properties.height || 0;
    this.x = properties.x || 0;
    this.y = properties.y || 0;

    this._originX = 0;
    this._originY = 0;

    this._fillParent = false;

    this.margin = properties.margin || new Offset();

    this.border = properties.border;

    // TODO Danie: planned for later implementation
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
          this._originX + this.x + this.margin.left,
          this._originY + this.y + this.margin.top,
          this.width - this.margin.horizontalTotal,
          this.height - this.margin.verticalTotal)
        .fill(this.backgroundColor);
    }
  }

  afterGenerateComponent(document) {
    if (!this._rendered) {
      return;
    }

    super.afterGenerateComponent(document);

    if (this._link) {
      document.link(
        this._originX + this.x + this.margin.left,
        this._originY + this.y + this.margin.top,
        this.width - this.margin.horizontalTotal,
        this.height - this.margin.verticalTotal,
        this._link
      );
    }

    if (this.border) {
      const topLeft = {
        x: this._originX + this.x + this.margin.left,
        y: this._originY + this.y + this.margin.top,
      };

      const topRight = {
        x: this._originX + this.x + this.width - this.margin.right,
        y: this._originY + this.y + this.margin.top,
      };

      const bottomLeft = {
        x: this._originX + this.x + this.margin.left,
        y: this._originY + this.y + this.height - this.margin.bottom,
      };

      const bottomRight = {
        x: this._originX + this.x + this.width - this.margin.right,
        y: this._originY + this.y + this.height - this.margin.bottom,
      };

      const leftEnlargement = (this.border.left && this.border.left.thickness || 0) / 2;
      const topEnlargement = (this.border.top && this.border.top.thickness || 0) / 2;
      const rightEnlargement = (this.border.right && this.border.right.thickness || 0) / 2;
      const bottomEnlargement = (this.border.bottom && this.border.bottom.thickness || 0) / 2;

      this._drawBorderSide(document, this.border.left, topLeft.x, topLeft.y - topEnlargement, bottomLeft.x, bottomLeft.y + bottomEnlargement);
      this._drawBorderSide(document, this.border.top, topLeft.x - leftEnlargement, topLeft.y, topRight.x + rightEnlargement, topRight.y);
      this._drawBorderSide(document, this.border.right, topRight.x, topRight.y - topEnlargement, bottomRight.x, bottomRight.y + bottomEnlargement);
      this._drawBorderSide(document, this.border.bottom, bottomLeft.x - leftEnlargement, bottomLeft.y, bottomRight.x + rightEnlargement, bottomRight.y);
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
        this._originX + this.x,
        this._originY + this.y,
        this.width,
        this.height
      )
      .stroke();

    // area for content
    document
      .strokeColor('green')
      .rect(
        this._originX + this.x + this.margin.left,
        this._originY + this.y + this.margin.top,
        this.width - this.margin.horizontalTotal,
        this.height - this.margin.verticalTotal
      )
      .stroke();

    if (this.debug) {
      document
        .note(
          this._originX + this.x,
          this._originY + this.y,
          this.width,
          this.height,
          JSON.stringify({
            type: this.constructor.name,
            width: this.width,
            height: this.height,
            x: this._originX + this.x,
            y: this._originY + this.y
          }, null, 2));
    }
  }

  _drawBorderSide(document, borderSide, x1, y1, x2, y2) {
    if (!borderSide || !borderSide.thickness) {
      return;
    }

    document
      .lineWidth(borderSide.thickness)
      .strokeColor(borderSide.color)
      .lineCap('butt')
      .moveTo(x1, y1)
      .lineTo(x2, y2)
      .stroke();
  }
}