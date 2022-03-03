export const KEY_ESC = 27;

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.setEventListeners();
  }

  get popupElement () { return this._popupElement }

  open() {
    this._popupElement.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }



  _handleEscClose = (evt) =>  {
    const key = evt.keyCode;

    if (key == KEY_ESC) {
      this.close();
    }
  }



  setEventListeners() {
    const popups = document.querySelectorAll('.popup')

    popups.forEach((popup) => {

      popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_open')) {
          this.close()
        }
        if (evt.target.classList.contains('popup__close')) {
          this.close()
        }
      })
    })
  }
}


