import forms from './components/forms';
import { handlePopup } from './components/popup'
 
const preloader = document.querySelector('.preloader');

window.addEventListener("load", () => {
    "use strict";
    preloader.classList.remove('preloader_active');
    handlePopup();
    forms();
});


