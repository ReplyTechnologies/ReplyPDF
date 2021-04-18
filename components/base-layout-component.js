import BaseComponent from './base-component.js';
import { Positioning, Offset, Alignment } from './properties/index.js';

export default class BaseLayoutComponent extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.width = properties.width || 0;
    this.height = properties.height || 0;
    this.x = properties.x || 0;
    this.y = properties.y || 0;

    this.originX = 0;
    this.originY = 0;

    this.column = properties.column || 0;
    this.row = properties.row || 0;

    this.margin = properties.margin || new Offset();

    this.positioning = properties.positioning || Positioning.absolute;

    this.verticalAlignment = properties.verticalAlignment || Alignment.fill;
    this.horizontalAlignment = properties.horizontalAlignment || Alignment.fill;

    this.backgroundColor = properties.backgroundColor;

    this.link = properties.link;

    this._link = undefined;
  }

  initializeComponent(data) {
    super.initializeComponent(data);

    const dataBindingSource = this.getBinding(data);

    this._link = this.getStringBinding(dataBindingSource, this.link);
  }

  layoutComponent(document) { }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    this._generateDebugLayout(document);

    if (this.backgroundColor) {
      document
        .rect(
          this.originX + this.x + this.margin.left,
          this.originY + this.y + this.margin.top,
          this.width - this.margin.horizontalTotal,
          this.height - this.margin.verticalTotal)
        .fill(this.backgroundColor);
    }

    if (this._link) {
      document.link(
        this.originX + this.x + this.margin.left,
        this.originY + this.y + this.margin.top,
        this.width - this.margin.horizontalTotal,
        this.height - this.margin.verticalTotal,
        this._link
      );
    }
  }

  _generateDebugLayout(document) {
    if (!document.debug && !this.debug) {
      return;
    }

    document.lineWidth(0.5);

    // absolut area for component
    document
      .strokeColor('red')
      .rect(
        this.originX + this.x,
        this.originY + this.y,
        this.width,
        this.height
      )
      .stroke();

    // area for content
    document
      .strokeColor('green')
      .rect(
        this.originX + this.x + this.margin.left,
        this.originY + this.y + this.margin.top,
        this.width - this.margin.horizontalTotal,
        this.height - this.margin.verticalTotal
      )
      .stroke();
  }

}