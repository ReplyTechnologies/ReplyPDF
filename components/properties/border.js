import { BorderSide } from './border-side.js';

export class Border {
  constructor(properties) {
    properties = properties || {};

    if (properties && properties.constructor.name == 'BorderSide') {
      this.left = properties;
      this.top = properties;
      this.right = properties;
      this.bottom = properties;
    } else {
      this.left = properties.left || new BorderSide();
      this.top = properties.top || new BorderSide();
      this.right = properties.right || new BorderSide();
      this.bottom = properties.bottom || new BorderSide();
    }
  }
}