import BaseLayoutComponent from './base-layout-component.js';
import { Positioning } from './properties/index.js';

export class RepeatVertical extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.child = properties.child;
  }

  initializeComponent(data) {
    super.initializeComponent(data);

    const dataBindingSource = this.getBinding(data);

    for (let child of this.children) {
      child.initializeComponent(dataBindingSource);
    }
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

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

      this.child.initializeComponent(data);
      this.child.layoutComponent(document);

      if (this.child.originY + this.child.height > this.originY + this.height) {
        document.renderNextPage = true;
        return;
      }

      this.child.generateComponent(document, value);

      offsetY += this.child.height;
    }
  }
}
