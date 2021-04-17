import BaseContainerComponent from './base-container-component.js';

export class StackVertical extends BaseContainerComponent {
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
    let offsetY = 0;
    let maxWidth = 0;

    for (let child of this.children) {
      child.originX = this.originX + this.x + this.margin.left;
      child.originY = offsetY + this.originY + this.y + this.margin.top;

      child.layoutComponent(document);

      offsetY += child.height;
      maxWidth = Math.max(maxWidth, child.width);
    }

    this.height = offsetY;
    this.width = maxWidth + this.margin.horizontalTotal;
  }

  generateComponent(document, data) {
    this._generateDebugLayout(document);

    const dataBindingSource = this.getBinding(data);

    for (let child of this.children) {
      child.generateComponent(document, dataBindingSource);
    }
  }
}