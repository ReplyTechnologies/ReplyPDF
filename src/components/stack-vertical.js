const BaseContainerComponent = require('./base-container-component.js');

module.exports = class StackVertical extends BaseContainerComponent {
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
    let offsetY = 0;
    let maxWidth = 0;

    for (let child of this.children) {
      child._originX = this._originX + this.x + this.margin.left;
      child._originY = offsetY + this._originY + this.y + this.margin.top;

      child.layoutComponent(document);

      offsetY += child.height;
      maxWidth = Math.max(maxWidth, child.width);
    }

    this.height = offsetY + this.margin.verticalTotal;
    this.width = maxWidth + this.margin.horizontalTotal;
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    const dataBindingSource = this.getBinding(data);

    // TODO Danie: check for next page rendering and component continuation

    for (let child of this.children) {
      child.generateComponent(document, dataBindingSource);
    }
  }
}