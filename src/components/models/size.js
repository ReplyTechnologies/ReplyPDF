module.exports = class Size {
  constructor(properties) {
    this.width = properties.width || 0;
    this.height = properties.height || 0;
  }

  toArray() {
    return [ this.width, this.height ];
  }
}