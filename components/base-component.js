export default class BaseComponent {
  constructor(properties) {
    this.binding = properties.binding;
  }

  initializeComponent(data) {}

  generateComponent(document, data) {}

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

    if (parts.length == 1 || !head) {
      return head;
    }

    return this._getSubBinding(head, parts.splice(1));
  }
}