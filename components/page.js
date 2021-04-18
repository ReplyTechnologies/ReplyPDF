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

  initializeComponent(data) {
    super.initializeComponent(data);

    const dataBindingSource = this.getBinding(data);

    for (let child of this.children) {
      child.initializeComponent(dataBindingSource);
    }
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

    const headerHeight = this.header && this.header.height || 0;
    const footerHeight = this.footer && this.footer.height || 0;

    // area for header
    document
      .strokeColor('blue')
      .rect(
        this.margin.left,
        this.margin.top,
        this.size.width - this.margin.horizontalTotal,
        headerHeight
      )
      .stroke();

    // area for footer
    document
      .strokeColor('purple')
      .rect(
        this.margin.left,
        this.size.height - this.margin.bottom - footerHeight,
        this.size.width - this.margin.horizontalTotal,
        footerHeight
      )
      .stroke();

    // area for content
    document
      .strokeColor('green')
      .rect(
        this.margin.left,
        this.margin.top + headerHeight,
        this.size.width - this.margin.horizontalTotal,
        this.size.height - this.margin.verticalTotal - headerHeight - footerHeight
      )
      .stroke();
  }

  generateHeaderComponent(document, data) {
    if (!this.header) {
      return;
    }

    this.header.width = this.width - this.margin.horizontalTotal;
    this.header.originX = this.margin.left;
    this.header.originY = this.margin.top;

    this.header.initializeComponent(data);
    this.header.layoutComponent(document);
    this.header.generateComponent(document, data);
  }

  generateFooterComponent(document, data) {
    if (!this.footer) {
      return;
    }

    const footerHeight = this.footer && this.footer.height || 0;

    this.footer.width = this.width - this.margin.horizontalTotal;
    this.footer.originX = this.margin.left;
    this.footer.originY = this.size.height - this.margin.bottom - footerHeight;

    this.footer.initializeComponent(data);
    this.footer.layoutComponent(document);
    this.footer.generateComponent(document, data);
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    const headerHeight = this.header && this.header.height || 0;
    const footerHeight = this.footer && this.footer.height || 0;

    for (let child of this.children) {
      child.width = this.width - this.margin.horizontalTotal;
      child.height = this.height - this.margin.verticalTotal - headerHeight - footerHeight;
      child.originX = this.margin.left;
      child.originY = this.margin.top + headerHeight;

      child.initializeComponent(data);
      child.layoutComponent(document);
      child.generateComponent(document, data);

      if (document.renderNextPage) {
        return;
      }
    }
  }
}