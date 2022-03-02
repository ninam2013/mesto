export class PopupWithForm extends Popup {
  constructor(popupselector, submitForm){
    super(popupselector),
    this.submitForm = submitForm
  }
  _getInputValues() {
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;

    popupEdit.close()
  }

  setEventListeners(){
    popupProfileOpenButton.addEventListener('click', () => { popupEdit.open(); fillModalForm() });
    popupCardOpenButton.addEventListener('click', () => popupCard.open());

    formEditProfile.addEventListener('submit', handleProfileFormSubmit);
    formCardElement.addEventListener('submit', handleCardFormSubmit);
  }
}
