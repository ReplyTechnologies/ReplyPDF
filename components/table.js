import BaseLayoutComponent from './base-layout-component.js';
import { Container, Text } from './index.js';
import { Offset } from './properties/offset.js';
import { TextAlignment } from './properties/text-alignment.js';

export class Table extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.headerStyle = properties.headerStyle || {};
    this.cellStyle = properties.cellStyle || {};
    this.columns = properties.columns || [];
  }

  layoutComponent(document, data) {

  }

  generateComponent(document, data) {
    this.generateDebugLayout(document);

    const values = this.getBinding(data);
    if (!values || !values.length) {
      // invalid data binding
      return;
    }

    let offsetX = 0;
    let offsetY = 0;

    let maxHeight = 0;

    for (let column of this.columns) {
      const text = new Text(this.headerStyle);
      text.textAlignment = column.textAlignment || TextAlignment.left;
      text.text = column.text;

      text.layoutComponent(document);

      const cell = new Container({
        margin: new Offset(5),
        children: [
          text
        ],
        width: column.width,
        height: text.height + 10,
      });

      maxHeight = Math.max(maxHeight, cell.height);

      cell.originX = offsetX + this.originX + this.margin.left;
      cell.originY = this.originY + this.margin.top;

      cell.generateComponent(document, data);

      offsetX += column.width;
    }

    offsetY += maxHeight;

    for (let index = values._index || 0; index < values.length; index++) {
      values._index = index;
      const value = values[index];

      offsetX = 0;
      maxHeight = 0;

      for (let column of this.columns) {
        const text = new Text(this.cellStyle);
        text.textAlignment = column.textAlignment || TextAlignment.left;

        let textValue = value[column.property];
        if (column.fx) {
          textValue = column.fx(index, value, textValue);
        }
        text.text = textValue;

        text.layoutComponent(document);

        if (offsetY + this.originY + text.height + 10 > this.originY + this.height) {
          document.renderNextPage = true;
          return;
        }

        const cell = new Container({
          margin: new Offset(5),
          children: [
            text
          ],
          width: column.width,
          height: text.height + 10,
        });

        maxHeight = Math.max(maxHeight, cell.height);

        cell.originX = offsetX + this.originX + this.margin.left;
        cell.originY = offsetY + this.originY + this.margin.top;

        cell.generateComponent(document, data);

        offsetX += column.width;
      }

      offsetY += maxHeight;
    }
  }
}