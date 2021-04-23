const BaseLayoutComponent = require('./base-layout-component.js');
const { TextAlignment } = require('./enums');

module.exports = class BaseTextComponent extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.text = properties.text || '';
    this.textAlignment = properties.textAlignment || TextAlignment.left;
    this.fontSize = properties.fontSize || 10;
    this.fontFamily = properties.fontFamily || 'Helvetica';
    this.fontWeight = properties.fontWeight;
    this.lineBreak = properties.lineBreak || false;
    this.ellipsis = properties.ellipsis || false;
  }
}