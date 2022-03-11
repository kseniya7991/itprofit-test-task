const popup = document.querySelector('.popup'),
    popupStatus = popup.querySelector('.popup-form__status'),
    popupMessage = popup.querySelector('.popup-form__message'),
    popupCloseButton = popup.querySelector('.popup-form__close'),
    successImage = popup.querySelector('.popup__image_success'),
    successFailure = popup.querySelector('.popup__image_failure'),
    form = document.querySelector(".popup-form"),
    popupBtn = document.querySelector('.popup-button'),
    spinner = document.querySelector('.spinner'),
    scroll = calcScroll();


//Корректировка отступов для отсутствия дергания страницы при открытии попапа
const openPopupFix = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = `${scroll}px`;
    form.style.marginLeft = `0px`;
    popupBtn.style.marginRight = `${scroll}px`; 
}

//Корректировка отступов для отсутствия дергания страницы при закрытии попапа    
const closePopupFix = () => {
    document.body.style.overflowY = "scroll";
    document.body.style.paddingRight = `0px`;
    form.style.marginLeft = `${scroll}px`;
    popupBtn.style.marginRight = `0px`;
}
    

//Обработка кликов на попап. При клике на оверлей или одну из кнопок закрытия вызывается закрытие попапа
export const handlePopup = () => {
    popup.addEventListener('click', (e) => {
        if(e.currentTarget === e.target) {
            closePopup();
        }
    });

    popupBtn.addEventListener('click', () => {openPopup("loading", "Please, wait...")})
    popupCloseButton.addEventListener('click', () => {closePopup()})

    calcScroll();
}

//Открытие попапа (после отправки формы)
export const openPopup = (status, description) => {
    popupStatus.textContent = status || "status";
    popupMessage.textContent = description || "message";
    popup.classList.add('popup_active');

    openPopupFix();

    console.log(status)

    if(status === "success") {
        spinner.classList.remove('spinner_active');
        successFailure.classList.remove('popup__image_active');
        successImage.classList.add('popup__image_active');
    } else  if (status === "loading") {
        successImage.classList.remove('popup__image_active');
        successFailure.classList.remove('popup__image_active');
        spinner.classList.add('spinner_active');
    } else {
        spinner.classList.remove('spinner_active');
        successImage.classList.remove('popup__image_active');
        successFailure.classList.add('popup__image_active');
    }

    handlePopup();
}

//Закрытие попапа (при клике на оверлей или на одну из кнопок для закрытия)
const closePopup = () => {
    popup.classList.remove('popup_active');
    closePopupFix();
}

// Функция подсчета размера скролла
function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }



