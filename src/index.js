import './scss/index.scss';

import MaskInput from 'mask-input';
 

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const maskInput = new MaskInput(document.querySelector('#phone'), {
        mask: '+ 375 (00) 00-00-0000',
        alwaysShowMask: true,
        maskChar: '_',
      });

});


