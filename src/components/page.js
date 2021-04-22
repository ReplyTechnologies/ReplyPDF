import BaseContainerComponent from './base-container-component.js';

export class Page extends BaseContainerComponent {
  constructor(properties) {
    super(properties);

    this.firstPageHeader = properties.firstPageHeader;
    this.header = properties.header;
    this.footer = properties.footer;

    this.size = properties.size;

    this.width = this.size.width;
    this.height = this.size.height;
  }

  initializeComponent(data) {
    super.initializeComponent(data);

    const dataBindingSource = this.getBinding(data);

    for (let child of this.children) {
      child.initializeComponent(dataBindingSource);
    }
  }

  generateHeaderComponent(document, data) {
    const headerTemplate = this._getHeader(document);

    if (!headerTemplate) {
      return;
    }

    const header = headerTemplate.clone();

    header.width = this.width - this.margin.horizontalTotal;
    header._originX = this.margin.left;
    header._originY = this.margin.top;

    header.initializeComponent(data);
    header.layoutComponent(document);
    header.generateComponent(document, data);
    header.afterGenerateComponent(document);
  }

  generateFooterComponent(document, data) {
    if (!this.footer) {
      return;
    }

    const footerHeight = this._getFooterHeight();
    const footer = this.footer.clone();

    footer.width = this.size.width - this.margin.horizontalTotal;
    footer._originX = this.margin.left;
    footer._originY = this.size.height - this.margin.bottom - footerHeight;

    footer.initializeComponent(data);
    footer.layoutComponent(document);
    footer.generateComponent(document, data);
    footer.afterGenerateComponent(document);
  }

  generateComponent(document, data) {
    super.generateComponent(document, data);

    const headerHeight = this._getHeaderHeight(document);
    const footerHeight = this._getFooterHeight();

    for (let child of this.children) {
      child.width = this.size.width - this.margin.horizontalTotal;
      child.height = this.size.height - this.margin.verticalTotal - headerHeight - footerHeight;
      child._originX = this.margin.left;
      child._originY = this.margin.top + headerHeight;

      child.initializeComponent(data);
      child.layoutComponent(document);
      child.generateComponent(document, data);

      if (document.renderNextPage) {
        return;
      }
    }
  }


  _getHeaderHeight(document) {
    const header = this._getHeader(document);
    return header && header.height || 0;
  }

  _getHeader(document) {
    let headerComponent = this.header;
    if (document.pageIndex === 0 && this.firstPageHeader) {
      headerComponent = this.firstPageHeader;
    }

    return headerComponent;
  }

  _getFooterHeight() {
    return this.footer && this.footer.height || 0;
  }
}