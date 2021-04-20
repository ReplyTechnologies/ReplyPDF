import BaseLayoutComponent from './base-layout-component.js';
import { Container, Text } from './index.js';
import { Alignment, Border, Offset, TextAlignment } from './properties/index.js';
import { StackHorizontal } from './stack-horizontal.js';

export class Table extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.border = properties.border || new Border();

    this.headerStyle = properties.headerStyle || {};
    this.cellStyle = properties.cellStyle || {};
    this.alternativeCellStyle = properties.alternativeCellStyle || {};

    this.columns = properties.columns || [];
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
    headings.originX = this.originX + this.x + this.margin.left;
    headings.originY = this.originY + this.y + this.margin.top;

    headings.initializeComponent(data);
    headings.layoutComponent(document);
    headings.generateComponent(document, data);

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
        let columnCellStyle = column.cellStyle;
        let tableCellStyle = this.cellStyle;

        if (index % 2 == 0) {
          if (column.alternativeCellStyle) {
            columnCellStyle = column.alternativeCellStyle;
          }

          if (this.alternativeCellStyle) {
            tableCellStyle = this.alternativeCellStyle;
          }
        }

        let textValue = value[column.property];
        if (column.fx) {
          textValue = column.fx(index, value, textValue);
        }

        const cell = new Container({
          width: column._width,
          border: columnCellStyle.border || tableCellStyle.border,
          backgroundColor: columnCellStyle.backgroundColor || tableCellStyle.backgroundColor,
          children: [
            new Text({
              margin: new Offset(5),
              textAlignment: columnCellStyle.textAlignment || tableCellStyle.textAlignment,
              fontWeight: columnCellStyle.fontWeight || tableCellStyle.fontWeight,
              color: columnCellStyle.color || tableCellStyle.color,
              horizontalAlignment: Alignment.fill,
              text: textValue,
            }),
          ],
        });
        rowComponents.push(cell);
      }

      row.originX = this.originX + this.x + this.margin.left;
      row.originY = offsetY + this.originY + this.y + this.margin.top;

      row.initializeComponent(data);
      row.layoutComponent(document);

      if (offsetY + this.originY + row.height > this.originY + this.height) {
        document.renderNextPage = true;
        return;
      }

      row.generateComponent(document, data);

      offsetY += row.height;
    }
  }
}
