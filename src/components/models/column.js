module.exports = class Column {
  constructor(properties) {
    this.property = properties.property;
    this.text = properties.text;
    this.width = properties.width;
    this.headerStyle = properties.headerStyle;
    this.cellStyle = properties.cellStyle;
    this.alternativeCellStyle = properties.alternativeCellStyle;
    this.fx = properties.fx;
  }
}