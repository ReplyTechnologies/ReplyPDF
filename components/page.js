import BaseContainerComponent from './base-container-component.js';

export class Page extends BaseContainerComponent {
  constructor(properties) {
    super(properties);

    this.header = properties.header;
    this.footer = properties.footer;

    this.size = properties.size;

    this.width = this.size.width;
    this.height = this.size.height;

    this.children = properties.children || [];
  }

  generateDebugLayout(document) {
    if (!document.debug) {
      return;
    }

    document.lineWidth(0.5);

    document
      .strokeColor('red')
      .rect(0, 0, this.size.width, this.size.height)
      .stroke();

    // area for header
    document
      .strokeColor('blue')
      .rect(
        this.margin.left,
        this.margin.top,
        this.size.width - this.margin.horizontalTotal,
        this.header.height
      )
      .stroke();

    // area for footer
    document
      .strokeColor('purple')
      .rect(
        this.margin.left,
        this.size.height - this.margin.bottom - this.footer.height,
        this.size.width - this.margin.horizontalTotal,
        this.footer.height
      )
      .stroke();

    // area for content
    document
      .strokeColor('green')
      .rect(
        this.margin.left,
        this.margin.top + this.header.height,
        this.size.width - this.margin.horizontalTotal,
        this.size.height - this.margin.verticalTotal - this.header.height - this.footer.height
      )
      .stroke();
  }

  generateHeaderComponent(document, data) {
    this.header.width = this.width - this.margin.horizontalTotal;
    this.header.originX = this.margin.left;
    this.header.originY = this.margin.top;

    this.header.layoutComponent(document, data);
    this.header.generateComponent(document, data);
  }

  generateFooterComponent(document, data) {
    this.footer.width = this.width - this.margin.horizontalTotal;
    this.footer.originX = this.margin.left;
    this.footer.originY = this.size.height - this.margin.bottom - this.footer.height;

    this.footer.layoutComponent(document, data);
    this.footer.generateComponent(document, data);
  }

  generateComponent(document, data) {
    this.generateDebugLayout(document);

    for (let child of this.children) {
      child.width = this.width - this.margin.horizontalTotal;
      child.height = this.height - this.margin.verticalTotal - this.header.height - this.footer.height;
      child.originX = this.margin.left;
      child.originY = this.margin.top + this.header.height;

      child.layoutComponent(document, data);
      child.generateComponent(document, data);

      if (document.renderNextPage) {
        return;
      }
    }
  }
}