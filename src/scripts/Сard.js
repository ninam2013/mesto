// создание карточки
export class Card {
  constructor(data, cardSelector, handleCardClick) {

    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
  }


// копируем код с Template и возвращаем элементы
  _getTemplate() {
    const placeTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = placeTemplate.querySelector('.place').cloneNode(true);

    return cardElement
  }


//получаем новый элемент карты
  getNewCardElement() {
    const element = this._getTemplate();
    const cardImage = element.querySelector('.place__image');
    const placeTitle = element.querySelector('.place__title');

    cardImage.src = this._link;
    cardImage.alt = 'карточка ' + this._name;
    placeTitle.textContent = this._name;

    this._setEventListeners(cardImage, placeTitle, element)

    return element;
  }


  // вызов обработчиков событий
  _setEventListeners(cardImage, placeTitle, element) {
    this._setOpenImagePopup(cardImage, placeTitle);
    this._setLikeHandler(element);
    this._setRemoveCardHandler(element);
  }


  // открытие по клику popup карточки
  _setOpenImagePopup(cardImage, placeTitle) {
    cardImage.addEventListener('click', () => {
      this.handleCardClick(cardImage, placeTitle)
    });
  }


  // удаление по клику на иконку карточки
  _setRemoveCardHandler(element) {
    element
      .querySelector('.place__basket')
      .addEventListener(
        'click',
        () => this._removeCard(element)
      );
  }


  // установка like по клику
  _setLikeHandler(element) {
    element
      .querySelector('.place__button')
      .addEventListener('click', this._toggleLike);
  }


  // переключение иконки like
  _toggleLike(evt) {
    evt.target.classList.toggle('place__button_active');
  }


  // удаление карточки
  _removeCard(cardElement) {
    cardElement.remove('place');
  }

}
