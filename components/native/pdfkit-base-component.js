import { Offset } from '../properties.index.js';

export class PdfkitBaseComponent {
  constructor(properties) {
    this.x = properties.x || 0;
    this.y = properties.y || 0;
    this.width = properties.width || 0;
    this.height = properties.height || 0;
    this.margin = properties.margin || new Offset();
  }

  layout(document) {}

  render(document) {}
}