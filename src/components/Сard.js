// создание карточки
export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick, { userId }, handelLikeClick) {

    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handelLikeClick = handelLikeClick;
    this._element = this._getTemplate();
    this._deleteIcon = this._element.querySelector('.place__basket');
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

    this.setLikes(this._likes);
    this._setEventListeners(this._cardImage, this._placeTitle);

    if (this._owner !== this._userId) {
      this._deleteIcon.remove();
    }

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


  // клик на иконку корзины карточки
  _setRemoveCardHandler() {
    this._element
      .querySelector('.place__basket')
      .addEventListener(
        'click',
        () => { this._handleDeleteClick(this._id) }
      );
  }


  // удаление карточки
  deleteCard() {
    this._element.remove('place');
    this._element = null;
  }


  // задаем количество лайков
  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._element.querySelector('.place__count');
    likeCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._enableLikeIcon()
    } else {
      this._disableLikeIcon()
    }
  }


  //проверка соответствия id для лайков
  isLiked() {
    const uresHasLikedCard = this._likes.find(user => user._id === this._userId);

    return uresHasLikedCard
  }


  // like по клику
  _setLikeHandler() {
    this._element
      .querySelector('.place__button')
      .addEventListener('click', () => { this._handelLikeClick(this._id) });
  }


  // переключение иконки like
  _enableLikeIcon() {
    this._element.querySelector('.place__button').classList.add('place__button_active');
  }


  // переключение иконки like
  _disableLikeIcon() {
    this._element.querySelector('.place__button').classList.remove('place__button_active');
  }

}
