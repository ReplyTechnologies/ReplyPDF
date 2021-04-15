import BaseLayoutComponent from './base-layout-component.js';
import { TextAlignment } from './properties/index.js';

export default class BaseTextComponent extends BaseLayoutComponent {
  constructor(properties) {
    super(properties);

    this.text = properties.text || '';
    this.textAlignment = properties.textAlignment || TextAlignment.left;
    this.fontSize = properties.fontSize || 12;
    // fontFamily, fontWeight

  }
}