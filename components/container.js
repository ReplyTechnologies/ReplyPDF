import BaseContainerComponent from './base-container-component.js';
import { Border } from './properties/index.js';

export class Container extends BaseContainerComponent {
  constructor(properties) {
    super(properties);

    this.border = properties.border || new Border();
  }

  layoutComponent(document) {
    let maxWidth = 0;
    let maxHeight = 0;

    for (let child of this.children) {
      if (this.width) {
        child.width = this.width - this.margin.horizontalTotal;
      }

      if (this.height) {
        child.height = this.height - this.margin.verticalTotal;
      }

      child.originX = this.originX + this.x + this.margin.left;
      child.originY = this.originY + this.y + this.margin.top;

      child.layoutComponent(document);

      maxHeight = Math.max(maxHeight, child.height);
      maxWidth = Math.max(maxWidth, child.width);
    }

    if (!this.width) {
      this.width = maxWidth + this.margin.horizontalTotal;
    }

    if (!this.height) {
      this.height = maxHeight + this.margin.verticalTotal;
    }
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    const topLeft = {
      x: this.originX + this.x,
      y: this.originY + this.y,
    };

    const topRight = {
      x: this.originX + this.x + this.width,
      y: this.originY + this.y,
    };

    const bottomLeft = {
      x: this.originX + this.x,
      y: this.originY + this.y + this.height,
    };

    const bottomRight = {
      x: this.originX + this.x + this.width,
      y: this.originY + this.y + this.height,
    };

    this._drawBorderSide(document, this.border.left, topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y);
    this._drawBorderSide(document, this.border.top, topLeft.x, topLeft.y, topRight.x, topRight.y);
    this._drawBorderSide(document, this.border.right, topRight.x, topRight.y, bottomRight.x, bottomRight.y);
    this._drawBorderSide(document, this.border.bottom, bottomLeft.x, bottomLeft.y, bottomRight.x, bottomRight.y);
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