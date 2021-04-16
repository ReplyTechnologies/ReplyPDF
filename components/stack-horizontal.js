import BaseContainerComponent from './base-container-component.js';

export class StackHorizontal extends BaseContainerComponent {
  constructor(properties) {
    super(properties);
  }

  initializeComponent(data) {
    const dataBindingSource = this.getBinding(data);

    for (let child of this.children) {
      child.initializeComponent(dataBindingSource);
    }
  }

  layoutComponent(document) {
    let offsetX = 0;
    let maxHeight = 0;

    for (let child of this.children) {
      child.originX = offsetX + this.originX + this.x + this.margin.left;
      child.originY = this.originY + this.y + this.margin.top;

      child.layoutComponent(document);

      offsetX += child.width;
      maxHeight = Math.max(maxHeight, child.height);
    }

    this.height = maxHeight + this.margin.verticalTotal;
  }

  generateComponent(document, data) {
    this._generateDebugLayout(document);

    const dataBindingSource = this.getBinding(data);

    for (let child of this.children) {
      child.generateComponent(document, dataBindingSource);
    }
  }
}