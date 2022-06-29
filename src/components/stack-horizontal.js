const BaseStackComponent = require('./base-stack-component.js');
const { Alignment, Layout } = require('./enums/index.js');

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

  _layoutComponent(document, spacing, layout) {
    layout = layout || Layout.none;

    let offsetX = 0;

    let firstChild = true;
    for (let child of this.children) {
      if (firstChild) {
        firstChild = false;
      } else {
        if (layout === Layout.none) {
          offsetX += spacing;
        }
      }

      child._originX = offsetX + this._originX + this.x + this.margin.left;

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
          child.height = this.height;
          break;
      }

      child.layoutComponent(document);

      offsetX += child.width;
    }

    return offsetX;
  }

  layoutComponent(document) {
    this._layoutChildren(document);

    if (!this.height) {
      this.height = this._contentHeight + this.margin.verticalTotal;
    }

    let layoutOffsetX = this._layoutComponent(document, this.spacing, this.layout);

    if (!this.width) {
      this.width = layoutOffsetX + this.margin.horizontalTotal;
    }

    switch (this.layout) {
      case Layout.spaceEvenly:
        let availableSpace = this.width - this.margin.horizontalTotal - layoutOffsetX;
        let spacing = availableSpace / (this.children.length > 1 ? this.children.length - 1 : 1);
        layoutOffsetX = this._layoutComponent(document, spacing);
        break;

      case Layout.sizeEvenly:
        let childWidth = (this.width - this.margin.horizontalTotal - (this.spacing * (this.children.length - 1))) / this.children.length;
        let offsetX = this._originX + this.x + this.margin.left;
        for (let child of this.children) {
          child._originX = offsetX;

          child.width = childWidth;

          child.layoutComponent(document);

          offsetX += child.width + this.spacing;
        }
        break;
    }
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    const dataBindingSource = this.getBinding(data);

    for (let child of this.children) {
      child.generateComponent(document, dataBindingSource);
    }
  }
}