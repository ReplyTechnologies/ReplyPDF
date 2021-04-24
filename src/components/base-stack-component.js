const BaseContainerComponent = require('./base-container-component.js');

module.exports = class BaseStackComponent extends BaseContainerComponent {
  constructor(properties) {
    super(properties);

    this.spacing = properties.spacing || 0;
  }
}