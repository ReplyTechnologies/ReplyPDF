import BaseLayoutComponent from './base-layout-component.js';
import { Container, Text } from './index.js';
import { Alignment, Border, Offset, TextAlignment } from './properties/index.js';
import { StackHorizontal } from './stack-horizontal.js';
import { default as _ } from 'lodash';

export class Table extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.border = properties.border || new Border();

    this.headerStyle = properties.headerStyle || {};
    this.headerBorder = properties.headerBorder || new Border();

    this.cellStyle = properties.cellStyle || {};
    this.cellBorder = properties.cellBorder || new Border();

    this.columns = properties.columns || [];
  }

  initializeComponent(data) {
    // prepare columns
    for (let column of this.columns) {
      column.width = column.width || 1;
    }
  }

  generateComponent(document, data) {
    this._generateDebugLayout(document);

    const values = this.getBinding(data);
    if (!values || !values.length) {
      // invalid data binding
      return;
    }

    // calculate relative width unit
    const absoluteWidthTotal = _(this.columns)
      .filter((c) => c.width > 1)
      .sumBy((c) => c.width);

    const relativeWidthTotal = _(this.columns)
      .filter((c) => c.width <= 1)
      .sumBy((c) => c.width);

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
        border: column.headerBorder || this.headerBorder,
        children: [
          new Text({
            margin: new Offset(5),
            textAlignment: column.textAlignment,
            horizontalAlignment: Alignment.fill,
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
        let textValue = value[column.property];
        if (column.fx) {
          textValue = column.fx(index, value, textValue);
        }

        const cell = new Container({
          width: column._width,
          border: column.cellBorder || this.cellBorder,
          children: [
            new Text({
              margin: new Offset(5),
              textAlignment: column.textAlignment,
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
