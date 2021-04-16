import BaseContainerComponent from './base-container-component.js';
import { Border } from './properties/index.js';

export class Container extends BaseContainerComponent {
  constructor(properties) {
    super(properties);

    this.border = properties.border || new Border();
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    this._drawBorderSide(document, this.border.left, this.originX + this.x, this.originY + this.y, this.originX + this.x, this.originY + this.y + this.height);
    this._drawBorderSide(document, this.border.top, this.originX + this.x, this.originY + this.y, this.originX + this.x + this.width, this.originY + this.y);
    this._drawBorderSide(document, this.border.right, this.originX + this.x + this.width, this.originY + this.y, this.originX + this.x + this.width, this.originY + this.y + this.height);
    this._drawBorderSide(document, this.border.bottom, this.originX + this.x, this.originY + this.y + this.height, this.originX + this.x + this.width, this.originY + this.y + this.height);
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