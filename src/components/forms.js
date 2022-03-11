import checkEmailInput from "./checkEmailInput";
import checkPhoneInput from "./checkPhoneInput";
import Inputmask from "inputmask";
import { openPopup } from "./popup";
import { postData } from "./postData";
import responseJSON from '../response.json';

const forms = () => {
    const form = document.querySelector("#contact-form"),
        inputList = document.querySelectorAll(".form__input"),
        submitBtn = document.querySelector(".form__submit-btn");

    //Объект, в который будет записывать данные с формы
    let formData = {};

    //Маска для телефона. Формат Belarus
    const mask = new Inputmask("+375 (99) 99-99-999");
    mask.mask(phone);

    //Статусы сообщений после отправки формы (отображаются в попапе)
    const statusMessage = {
        failure: "Oops :(",
        failureDescription: "Something went wrong. ",
        loading: "loading",
        loadingMessage: "Please, wait...",
    };

    //Функция показа текста ошибки
    const showInputError = (input) => {
        const inputError = form.querySelector(`.form__input-error_${input.name}`);
        inputError.classList.add('form__input-error_active');
        input.classList.add('form__input_error');
    }
    
    //Функция скрытия текста ошибки
    const hideInputError = (input) => {
        const inputError = form.querySelector(`.form__input-error_${input.name}`);
        inputError.classList.remove('form__input-error_active');
        input.classList.remove('form__input_error');
    }

    //Проверка валидности инпута
    const isValid = (input) => {  
        if((input.name === 'name' || input.name === 'message')&& input.value.length > 0) {
            return true;
        } else if (input.name === 'phone') {
           return checkPhoneInput(input.value)
        } else if (input.name === 'email') {
            return checkEmailInput(input.value)
        } else {
            return false;
        }
    }


    // Активация/деактивация кнопки сабмита в зависти от валидности формы
    const toggleButton = (inputList) => {
        const isValidFrom = Array.from(inputList).every(elem => isValid(elem));
        if (isValidFrom) {
            submitBtn.classList.add('form__submit-btn_active');
            submitBtn.removeAttribute("disabled");
        } else {
            submitBtn.classList.remove('form__submit-btn_active')
            submitBtn.setAttribute("disabled", "disabled");
        }
    }
   
    //Навешивание слушателей на каждый инпут, "живая" валидация
    const handleInputs = () => {
        inputList.forEach((input) => {
            input.addEventListener('input', () => { 
                //Активация/деактивая кнопки сабмита
                toggleButton(inputList);

                //Отображение ошибок в инпутах
                const validity = isValid(input);
                validity ?  hideInputError(input) :  showInputError(input);

                //Сборка объекта с данными формы
                formData[input.name] = input.value
            })
        })
    }
    handleInputs();


    //Обработка сообщений об ошибке. fields = объект с полями которые содержат ошибки, Все ошибки выведутся на экран.
    const handleErrorMessage = (errors) => {
        let errorText = "";
        for(let errorName in errors) {
            errorText += "Error in " + errorName + ": " + errors[errorName] + ". ";
        }
        return errorText;
    }

    //Слушатель кнопки сабмита
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        openPopup(statusMessage.loading, statusMessage.loadingMessage)

        //Отображение прелодера загрузки, для теста используется setTimeout
        setTimeout(() => {
            postData("/", formData)
            .then((res) => {

                if (res.status === "success") {
                    openPopup(res.status, res.msg)
                    //Очистка инпутов, только если форма успешно отправлена
                    clearInputs();
                    
                } else if ((Object.keys(res).length !== 0) && res.status){

                //Если объект ответа не пуст и его статус неуспешен или какой-либо другой - открытие попапа с данными + обработка сообщения с ошибками
                    const errorMessage = handleErrorMessage(res.fields);
                    openPopup(res.status, errorMessage)
                } else {
                    openPopup(statusMessage.failure, `${statusMessage.failureDescription}`)
                }
            })
            .catch((err) => {
                const error = err || "";
                //Если ошибка содержит статус
                if(err.status) {
                    openPopup(err.status, `Something went wrong. ${err}`)
                } else {
                //Если ошибка не содержит статус, то в поле статус выводится стандартное значение.
                    openPopup(statusMessage.failure, `${statusMessage.failureDescription} ${error}`)
                }
            })
            .finally(() => {
                toggleButton(inputList)
/*                 submitBtn.classList.remove('form__submit-btn_active')
                submitBtn.setAttribute("disabled", "disabled"); */
            });
        },2000)
        
    })

    //Очистка инпута после отправки формы
    const clearInputs = () => {
        formData = {}
        inputList.forEach((input) => input.value="")
    }; 
 
};

export default forms;
