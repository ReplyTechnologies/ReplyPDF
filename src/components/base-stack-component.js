const BaseContainerComponent = require('./base-container-component.js');
const { Layout } = require('./enums/index.js');

module.exports = class BaseStackComponent extends BaseContainerComponent {
  constructor(properties) {
    super(properties);

    this.spacing = properties.spacing || 0;
    this.layout = properties.layout || Layout.none;

    this._contentWidth = 0;
    this._contentHeight = 0;
  }

  _layoutChildren(document) {
    let maxWidth = 0;
    let maxHeight = 0;

    for (let child of this.children) {

      child.layoutComponent(document);

      maxWidth = Math.max(maxWidth, child.width);
      maxHeight = Math.max(maxHeight, child.height);
    }

    this._contentWidth = maxWidth;
    this._contentHeight = maxHeight;
  }
}