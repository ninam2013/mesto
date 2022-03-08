const KEY_ESC = 27;

// открытие и закрытие попапа
export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    // this.setEventListeners();
    this._handleEscClose = this._handleEscClose.bind(this);
  }


  // открывает popup
  open() {
    this._popupElement.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
  }


  // закрывает popup
  close() {
    this._popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }


  // закрывает popup нажатием на Esc
  _handleEscClose = (evt) => {
    const key = evt.keyCode;

    if (key == KEY_ESC) {
      this.close();
    }
  }



  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_open')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close()
      }
    })
  }
}
