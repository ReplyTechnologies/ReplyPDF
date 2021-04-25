const BaseStackComponent = require('./base-stack-component.js');
const { Alignment, Layout } = require('./enums/index.js');

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

  _layoutComponent(document, spacing, layout) {
    layout = layout || Layout.none;

    let offsetY = 0;

    let firstChild = true;
    for (let child of this.children) {
      if (firstChild) {
        firstChild = false;
      } else {
        if (layout === Layout.none) {
          offsetY += spacing;
        }
      }

      child._originY = offsetY + this._originY + this.y + this.margin.top;

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
          child.width = this.width - this.margin.horizontalTotal;
          break;
      }

      child.layoutComponent(document);

      offsetY += child.height;
    }

    return offsetY;
  }

  layoutComponent(document) {
    this._layoutChildren(document);

    if (!this.width) {
      this.width = this._contentWidth + this.margin.horizontalTotal;
    }

    let layoutOffsetY = this._layoutComponent(document, this.spacing, this.layout);

    if (!this.height) {
      this.height = layoutOffsetY + this.margin.verticalTotal;
    }

    if (this.children.length > 1) {

      switch (this.layout) {
        case Layout.spaceEvenly:
          let availableSpace = this.height - layoutOffsetY;
          let spacing = availableSpace / (this.children.length - 1);
          layoutOffsetY = this._layoutComponent(document, spacing);
          break;

        case Layout.sizeEvenly:
          let childHeight = (this.height - this.margin.verticalTotal - (this.spacing * (this.children.length - 1))) / this.children.length;
          let offsetY = this._originY + this.x + this.margin.top;
          for (let child of this.children) {
            child._originY = offsetY;

            child.height = childHeight;

            child.layoutComponent(document);

            offsetY += child.height + this.spacing;
          }
          break;
      }
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