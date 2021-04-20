export default class BaseComponent {
  constructor(properties) {
    this.binding = properties.binding;
    this.debug = properties.debug;
    this.parent = undefined;
  }

  initializeComponent(data) {}

  generateComponent(document, data) {}

  afterGenerateComponent(document) {}

  getBinding(data, binding) {
    if (binding) {
      binding = binding.replace(/{{|}}/g, '');

      if (this.binding) {
        binding = this.binding + '.' + binding;
      }
    } else {
      binding = this.binding;
    }

    if (!binding || binding == '' || binding == '.') {
      return data;
    }

    const parts = binding.split('.');
    return this._getSubBinding(data, parts);
  }

  _getSubBinding(data, parts) {
    const head = data[parts[0].trim()];

    if (parts.length == 1 || head === undefined) {
      return head;
    }

    return this._getSubBinding(head, parts.splice(1));
  }

  getStringBinding(data, text) {
    if (data !== undefined && typeof(text) == 'string') {
      while (text.indexOf('{{') != -1 && text.indexOf('}}') != -1) {
        const startIndex = text.indexOf('{{');
        const endIndex = text.indexOf('}}') + 2;
        const bindingResult = this.getBinding(data, text.substring(startIndex, endIndex));
        text = text.substring(0, startIndex) + bindingResult + text.substring(endIndex);
      }
    }

    return text;
  }

  clone() {
    return new this.constructor(this);
  }
}