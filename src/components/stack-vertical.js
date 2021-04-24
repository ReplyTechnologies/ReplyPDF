const BaseStackComponent = require('./base-stack-component.js');
const { Alignment } = require('./enums/index.js');

module.exports = class StackVertical extends BaseStackComponent {
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

    let firstChild = true;
    for (let child of this.children) {
      if (firstChild) {
        firstChild = false;
      } else {
        offsetY += this.spacing;
      }

      child._originX = this._originX + this.x + this.margin.left;
      child._originY = offsetY + this._originY + this.y + this.margin.top;

      child.layoutComponent(document);

      offsetY += child.height;
      maxWidth = Math.max(maxWidth, child.width);
    }

    this.height = offsetY + this.margin.verticalTotal;
    this.width = maxWidth + this.margin.horizontalTotal;

    for (let child of this.children) {
      switch (child.horizontalAlignment) {
        case Alignment.start:
          child._originX = this._originX + this.x + this.margin.left;
          break;
        case Alignment.end:
          child._originX = this._originX + this.x + this.width - this.margin.right - child.width;
          break;
        case Alignment.middle:
          child._originX = this._originX + this.x + (this.width / 2) - (child.width / 2);
          break;
        case Alignment.fill:
          child._originX = this._originX + this.x + this.margin.left;
          child.width = maxWidth;
          break;
      }

      child.layoutComponent(document);
    }
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