import BaseLayoutComponent from './base-layout-component.js';
import { Positioning } from './properties/index.js';

export class RepeatVertical extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.child = properties.child;
  }

  generateComponent(document, data) {
    this.generateDebugLayout(document);

    const values = this.getBinding(data);
    if (!values || !values.length) {
      // invalid data binding
      return;
    }

    let offsetY = 0;

    for (let index = values._index || 0; index < values.length; index++) {
      values._index = index;
      const value = values[index];

      this.child.width = this.width - (this.margin.left + this.margin.right);
      this.child.originX = this.originX + this.margin.left;
      this.child.originY = offsetY + this.originY + this.margin.top;

      this.child.layoutComponent(document, value);

      if (this.child.originY + this.child.height > this.originY + this.height) {
        document.renderNextPage = true;
        return;
      }

      this.child.generateComponent(document, value);

      offsetY += this.child.height;
    }
  }
}
