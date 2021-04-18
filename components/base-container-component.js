import BaseLayoutComponent from './base-layout-component.js';
import { Alignment } from './properties/index.js';

export default class BaseContainerComponent extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.children = properties.children || [];
  }

  layoutComponent(document) {
    for (let child of this.children) {

      child.width = this.width - this.margin.horizontalTotal;
      child.height = this.height - this.margin.verticalTotal;

      child.originY = this.originY + this.y + this.margin.top;
      child.originX = this.originX + this.x + this.margin.left;

      child.layoutComponent(document);
    }
  }
}