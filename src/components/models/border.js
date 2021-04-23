const BorderSide = require('./border-side.js');

module.exports = class Border {
  constructor(properties) {
    properties = properties || {};

    if (properties.constructor.name == 'BorderSide') {
      this.left = properties;
      this.top = properties;
      this.right = properties;
      this.bottom = properties;
    } else if (properties.thickness || properties.color) {
      this.left = this.top = this.right = this.bottom = new BorderSide(properties);
    } else {
      this.left = properties.left || new BorderSide();
      this.top = properties.top || new BorderSide();
      this.right = properties.right || new BorderSide();
      this.bottom = properties.bottom || new BorderSide();
    }
  }
}
