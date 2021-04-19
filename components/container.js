import BaseContainerComponent from './base-container-component.js';
import { Alignment, Border } from './properties/index.js';

export class Container extends BaseContainerComponent {
  constructor(properties) {
    super(properties);
  }

  initializeComponent(data) {
    super.initializeComponent(data);

    const dataBindingSource = this.getBinding(data);

    for (let child of this.children) {
      child.initializeComponent(dataBindingSource);
    }
  }

  layoutComponent(document) {
    let maxWidth = 0;
    let maxHeight = 0;

    for (let child of this.children) {

      if (this.width && !child.width && child.horizontalAlignment === Alignment.fill) {
        child.width = this.width - this.margin.horizontalTotal;
      }

      if (this.height && !child.height && child.verticalAlignment === Alignment.fill) {
        child.height = this.height - this.margin.verticalTotal;
      }

      child.layoutComponent(document);

      maxWidth = Math.max(maxWidth, child.width);
      maxHeight = Math.max(maxHeight, child.height);
    }

    if (!this.width) {
      this.width = maxWidth + this.margin.horizontalTotal;
    }

    if (!this.height) {
      this.height = maxHeight + this.margin.verticalTotal;
    }

    for (let child of this.children) {
      switch (child.verticalAlignment) {
        case Alignment.start:
          child.originY = this.originY + this.y + this.margin.top;
          break;
        case Alignment.end:
          child.originY = this.originY + this.y + this.height - this.margin.bottom - child.height;
          break;
        case Alignment.middle:
          child.originY = this.originY + this.y + (this.height / 2) - (child.height / 2);
          break;
        case Alignment.fill:
          child.originY = this.originY + this.y + this.margin.top;
          break;
      }

      switch (child.horizontalAlignment) {
        case Alignment.start:
          child.originX = this.originX + this.x + this.margin.left;
          break;
        case Alignment.end:
          child.originX = this.originX + this.x + this.width - this.margin.right - child.width;
          break;
        case Alignment.middle:
          child.originX = this.originX + this.x + (this.width / 2) - (child.width / 2)
          break;
        case Alignment.fill:
          child.originX = this.originX + this.x + this.margin.left;
          break;
      }

      child.layoutComponent(document);
    }
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    const dataBindingSource = this.getBinding(data);

    for (let child of this.children) {
      child.generateComponent(document, dataBindingSource);

      if (document.renderNextPage) {
        return;
      }
    }
  }
}