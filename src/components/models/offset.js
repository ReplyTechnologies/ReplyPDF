export class Offset {
  constructor(value) {
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;

    if (!value) {
      value = 0;
    }

    if (typeof(value) == 'string') {
      value = +value;
    }

    if (typeof(value) == 'number') {
      this.left = value;
      this.top = value;
      this.right = value;
      this.bottom = value;
    } else {
      Object.assign(this, value);
    }
  }

  get verticalTotal() {
    return this.top + this.bottom;
  }

  get horizontalTotal() {
    return this.left + this.right;
  }
}