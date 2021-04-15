import BaseLayoutComponent from './base-layout-component.js';

export default class BaseContainerComponent extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.children = properties.children || [];
  }

  generateComponent(document, data) {
    this.generateDebugLayout(document);

    for (let child of this.children) {
      child.width = this.width - (this.margin.left + this.margin.right);
      child.originX = this.originX + this.x + this.margin.left;
      child.originY = this.originY + this.y + this.margin.top;

      child.layoutComponent(document, data);
      child.generateComponent(document, data);

      if (document.renderNextPage) {
        return;
      }
    }
  }
}