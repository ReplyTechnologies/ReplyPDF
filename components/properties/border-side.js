export class BorderSide {
  constructor(properties) {
    properties = properties || {};

    this.thickness = properties.thickness || 0;
    this.color = properties.color || 'black';
  }
}