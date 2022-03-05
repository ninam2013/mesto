// отрисовка элементов на странице
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items,
    this.renderer = renderer,
    this._container = document.querySelector(containerSelector);
  }


  // перебор карточек
  renderItems() {
    this._renderedItems.reverse().forEach(item => this.renderer(item));
  }


// добавляет карточки в начало
  addItem(element) {
    this._container.prepend(element);
  }
}
