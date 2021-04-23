module.exports = class BorderSide {
  constructor(properties) {
    properties = properties || {};

    this.thickness = properties.thickness || 1;
    this.color = properties.color || 'black';
  }
}
