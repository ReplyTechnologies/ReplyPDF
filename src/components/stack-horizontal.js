const BaseStackComponent = require('./base-stack-component.js');
const { Alignment } = require('./enums');

module.exports = class StackHorizontal extends BaseStackComponent {
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
    let offsetX = 0;
    let maxHeight = 0;

    let firstChild = true;
    for (let child of this.children) {
      if (firstChild) {
        firstChild = false;
      } else {
        offsetX += this.spacing;
      }

      child._originX = offsetX + this._originX + this.x + this.margin.left;
      child._originY = this._originY + this.y + this.margin.top;

      child.layoutComponent(document);

      offsetX += child.width;
      maxHeight = Math.max(maxHeight, child.height);
    }

    this.height = maxHeight + this.margin.verticalTotal;
    this.width = offsetX;

    for (let child of this.children) {
      switch (child.verticalAlignment) {
        case Alignment.start:
          child._originY = this._originY + this.y + this.margin.top;
          break;
        case Alignment.end:
          child._originY = this._originY + this.y + this.height - this.margin.bottom - child.height;
          break;
        case Alignment.middle:
          child._originY = this._originY + this.y + (this.height / 2) - (child.height / 2);
          break;
        case Alignment.fill:
          child._originY = this._originY + this.y + this.margin.top;
          child.height = maxHeight;
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