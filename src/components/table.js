const BaseLayoutComponent = require('./base-layout-component.js');
const Container = require('./container.js');
const Text = require('./text.js');
const StackVertical = require('./stack-vertical.js');
const StackHorizontal = require('./stack-horizontal.js');
const { Alignment } = require('./enums');
const { Offset } = require('./models');

module.exports = class Table extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this._fillParent = true;

    this.headerStyle = properties.headerStyle || {};
    this.cellStyle = properties.cellStyle || {};
    this.alternativeCellStyle = properties.alternativeCellStyle || {};

    this.columns = properties.columns || [];

    this._content = undefined;
    this._dataSource = [];
    this._index = properties._index || 0;
    this._renderNextPage = false;
  }

  initializeComponent(data) {
    super.initializeComponent(data);

    this._dataSource = this.getBinding(data);

    // prepare columns
    for (let column of this.columns) {
      column.headerStyle = column.headerStyle || {};
      column.cellStyle = column.cellStyle || {};
      column.width = column.width || 1;
    }
  }

  _createTableHeader() {
    // create horizontal stack for heading components
    const headingComponents = [];
    const headings = new StackHorizontal({
      children: headingComponents,
    });

    // create heading cells
    for (let column of this.columns) {
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

    return headings;
  }

  _createTableRow(index, record) {
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

      let textValue = record[column.property];
      if (column.fx) {
        textValue = column.fx(index, record, textValue);
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

    return row;
  }

  layoutComponent(document) {
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

    for (let column of this.columns) {
      column._width = column.width;

      if (column._width <= 1) {
        column._width *= relativeWidthUnit;
      }
    }

    if (!this._content) {
      let tableComponents = [];
      this._content = new Container({
        x: this.x,
        y: this.y,
        children: [
          new StackVertical({
            children: tableComponents
          })
        ]
      });

      let offsetY = 0;

      const header = this._createTableHeader();
      tableComponents.push(header);

      header.width = this.width - this.margin.horizontalTotal;

      header.initializeComponent({});
      header.layoutComponent(document);

      offsetY += header.height;

      // create table content
      for (let index = this._index || 0; index < this._dataSource.length; index++) {
        this._index = index;
        const record = this._dataSource[index];

        const row = this._createTableRow(index, record);

        row.width = this.width - this.margin.horizontalTotal;

        row.initializeComponent(record);
        row.layoutComponent(document);

        offsetY += row.height;

        if (offsetY > this.height - this.margin.verticalTotal) {
          this._renderNextPage = true;
          break;
        }

        tableComponents.push(row);
      }
    }

    this._content._originX = this._originX;
    this._content._originY = this._originY;

    this._content.initializeComponent({});
    this._content.layoutComponent(document);

    this.width = this._content.width;
    this.height = this._content.height;
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    this._content.generateComponent(document, data);

    document.renderNextPage = this._renderNextPage;
  }

  afterGenerateComponent(document) {
    super.afterGenerateComponent(document);
    this._content.afterGenerateComponent(document);
  }
}
