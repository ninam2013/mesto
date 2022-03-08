// создание карточки
export class Card {
  constructor(data, cardSelector, handleCardClick) {

    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.place__image');
    this._placeTitle = this._element.querySelector('.place__title');
  }


// копируем код с Template и возвращаем элементы
  _getTemplate() {
    const placeTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = placeTemplate.querySelector('.place').cloneNode(true);

    return cardElement
  }


//получаем новый элемент карты
  getNewCardElement() {
    this._cardImage.src = this._link;
    this._cardImage.alt = 'карточка ' + this._name;
    this._placeTitle.textContent = this._name;

    this._setEventListeners(this._cardImage, this._placeTitle)

    return this._element;
  }



  // вызов обработчиков событий
  _setEventListeners() {
    this._setOpenImagePopup();
    this._setLikeHandler();
    this._setRemoveCardHandler();
  }


  // открытие по клику popup карточки
  _setOpenImagePopup() {
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._cardImage, this._placeTitle)
    });
  }


  // удаление по клику на иконку карточки
  _setRemoveCardHandler() {
    this._element
      .querySelector('.place__basket')
      .addEventListener(
        'click',
        () => this._removeCard()
      );
  }


  // установка like по клику
  _setLikeHandler() {
    this._element
      .querySelector('.place__button')
      .addEventListener('click', this._toggleLike);
  }


  // переключение иконки like
  _toggleLike(evt) {
    evt.target.classList.toggle('place__button_active');
  }


  // удаление карточки
  _removeCard() {
    this._element.remove('place');
  }
}
