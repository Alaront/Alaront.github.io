export default class Popup {
    constructor(options) {
        this.popupSelector = options.popupSelector;
        this.callSelector = options.callSelector;

        this.callElement = document.querySelector(this.callSelector);
        this.popupElement = document.querySelector(this.popupSelector);
        this.bodyContainer = document.querySelector('body');

        this.popupContainer = null;

        this.init();
    }

    init() {
        this.makePopupContainer();
        this.popupShowEvent();
    }

    popupShowEvent() {
        this.callElement.addEventListener('click', () => {
            this.addMarkup();
        })
    }

    popupCloseEvent() {
        this.popupContainer.querySelector('.popup-close').addEventListener('click', () => {
            this.popupContainer.remove();
            this.bodyContainer.classList.remove('limited');
        })
    }

    makePopupContainer() {
        this.popupContainer = document.createElement('div');
        this.popupContainer.classList.add('popup-wrapper');
        this.popupContainer.insertAdjacentHTML('beforeend', '<span class="popup-close"></span>');

        this.popupContainer.append(this.popupElement);
    }

    addMarkup() {
        this.bodyContainer.append(this.popupContainer);
        this.popupElement.classList.remove('popup-hide');
        this.bodyContainer.classList.add('limited');

        this.popupCloseEvent();
    }


}