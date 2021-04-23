module.exports = class Style {
  constructor(properties) {
    this.border = properties.border;

    this.backgroundColor = properties.backgroundColor;
    this.color = properties.color;

    this.fontSize = properties.fontSize;
    this.fontWeight = properties.fontWeight;
    this.textAlignment = properties.textAlignment;
  }
}