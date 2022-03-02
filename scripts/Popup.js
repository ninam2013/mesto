export const KEY_ESC = 27;

export class Popup {
  constructor(popupselector) {
    this._popupselector = document.querySelector(popupselector)
  }

  open() {
    this._popupselector.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupselector.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }



  _handleEscClose(evt) {
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


