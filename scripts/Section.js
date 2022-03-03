export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items,
      this.renderer = renderer,
      this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.reverse().forEach(item => this.renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
