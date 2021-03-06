const BaseLayoutComponent = require('./base-layout-component.js');

module.exports = class RepeatVertical extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.template = properties.template;

    this._children = [];
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

      const child = this.template.clone();

      child.width = this.width - this.margin.horizontalTotal;
      child._originX = this._originX + this.margin.left;
      child._originY = offsetY + this._originY + this.margin.top;

      child.initializeComponent(value);
      child.layoutComponent(document);

      if (child._originY + child.height > this._originY + this.height) {
        document.renderNextPage = true;
        return;
      }

      child.generateComponent(document, value);
      this._children.push(child);

      offsetY += child.height;
    }
  }

  afterGenerateComponent(document) {
    super.afterGenerateComponent(document);

    for (let child of this._children) {
      child.afterGenerateComponent(document);
    }
  }
}
