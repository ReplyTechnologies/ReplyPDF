const BaseLayoutComponent = require('./base-layout-component.js');
const Container = require('./container.js');
const Text = require('./text.js');
const StackHorizontal = require('./stack-horizontal.js');
const { Alignment } = require('./enums');
const { Offset } = require('./models');

module.exports = class Table extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.headerStyle = properties.headerStyle || {};
    this.cellStyle = properties.cellStyle || {};
    this.alternativeCellStyle = properties.alternativeCellStyle || {};

    this.columns = properties.columns || [];

    this._children = [];
  }

  initializeComponent(data) {
    super.initializeComponent(data);

    // prepare columns
    for (let column of this.columns) {
      column.headerStyle = column.headerStyle || {};
      column.cellStyle = column.cellStyle || {};
      column.width = column.width || 1;
    }
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    const values = this.getBinding(data);
    if (!values || !values.length) {
      // invalid data binding
      return;
    }

    // calculate absolute and relative widths
    let absoluteWidthTotal = 0;
    let relativeWidthTotal = 0;
    for (let column of this.columns) {
      if (column.width > 1) {
        absoluteWidthTotal += column.width;
      } else {
        relativeWidthTotal += column.width;
      }
    }

    const availableRelativeWidth = this.width - this.margin.horizontalTotal - absoluteWidthTotal;

    const relativeWidthUnit = availableRelativeWidth / relativeWidthTotal;

    // create horizontal stack for heading components
    const headingComponents = [];
    const headings = new StackHorizontal({
      children: headingComponents,
    });

    // create heading cells
    for (let column of this.columns) {
      column._width = column.width;

      if (column._width <= 1) {
        column._width *= relativeWidthUnit;
      }

      const cell = new Container({
        width: column._width,
        verticalAlignment: Alignment.fill,
        border: column.headerStyle.border || this.headerStyle.border,
        backgroundColor: column.headerStyle.backgroundColor || this.headerStyle.backgroundColor,
        children: [
          new Text({
            margin: new Offset(5),
            textAlignment: column.headerStyle.textAlignment || this.headerStyle.textAlignment,
            color: column.headerStyle.color || this.headerStyle.color,
            horizontalAlignment: Alignment.fill,
            fontWeight: column.headerStyle.fontWeight || this.headerStyle.fontWeight,
            text: column.text,
          }),
        ],
      });
      headingComponents.push(cell);
    }

    // layout and render heading
    headings._originX = this._originX + this.x + this.margin.left;
    headings._originY = this._originY + this.y + this.margin.top;

    headings.initializeComponent(data);
    headings.layoutComponent(document);
    headings.generateComponent(document, data);
    this._children.push(headings);

    let offsetY = headings.height;

    // create table content
    for (let index = values._index || 0; index < values.length; index++) {
      values._index = index;
      const value = values[index];

      const rowComponents = [];
      const row = new StackHorizontal({
        children: rowComponents,
      });

      for (let column of this.columns) {
        let cellStyle = {};

        Object.assign(cellStyle, this.cellStyle || {});
        Object.assign(cellStyle, column.cellStyle || {});

        if (index % 2 == 0) {
          Object.assign(cellStyle, this.alternativeCellStyle || {});
          Object.assign(cellStyle, column.alternativeCellStyle || {});
        }

        let textValue = value[column.property];
        if (column.fx) {
          textValue = column.fx(index, value, textValue);
        }

        const cell = new Container({
          width: column._width,
          border: cellStyle.border,
          backgroundColor: cellStyle.backgroundColor,
          children: [
            new Text({
              margin: new Offset(5),
              textAlignment: cellStyle.textAlignment,
              fontWeight: cellStyle.fontWeight,
              color: cellStyle.color,
              horizontalAlignment: Alignment.fill,
              text: textValue,
            }),
          ],
        });
        rowComponents.push(cell);
      }

      row._originX = this._originX + this.x + this.margin.left;
      row._originY = offsetY + this._originY + this.y + this.margin.top;

      row.initializeComponent(data);
      row.layoutComponent(document);

      if (offsetY + this._originY + row.height > this._originY + this.height) {
        document.renderNextPage = true;
        break;
      }

      row.generateComponent(document, data);
      this._children.push(row);

      offsetY += row.height;
    }
    this.height = offsetY;
  }

  afterGenerateComponent(document) {
    super.afterGenerateComponent(document);

    for (let child of this._children) {
      child.afterGenerateComponent(document);
    }
  }
}
