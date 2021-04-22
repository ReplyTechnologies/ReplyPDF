import BaseLayoutComponent from './base-layout-component.js';

export default class BaseContainerComponent extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.children = properties.children || [];
  }

  layoutComponent(document) {
    for (let child of this.children) {

      child.width = this.width - this.margin.horizontalTotal;
      child.height = this.height - this.margin.verticalTotal;

      child._originY = this._originY + this.y + this.margin.top;
      child._originX = this._originX + this.x + this.margin.left;

      child.layoutComponent(document);
    }
  }

  afterGenerateComponent(document) {
    super.afterGenerateComponent(document);

    for (let child of this.children) {
      child.afterGenerateComponent(document);
    }
  }

  clone() {
    const instance = super.clone();
    instance.children = [];
    for (let child of this.children) {
      instance.children.push(child.clone());
    }

    return instance;
  }
}