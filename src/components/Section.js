// отрисовка элементов на странице
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items,
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector)
  }

  // перебор карточек
  renderItems(card) {
    card.forEach(item => this.renderer(item));
  }

  //добавление в начало
  insertElementPrepend(element) {
    this._container.prepend(element);
  }

  //добавление в конец
  insertElementAppend(element) {
    this._container.append(element);
  }
}
