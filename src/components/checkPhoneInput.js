const checkPhoneInput = (value) => {
  const phone_format =  /\d/g;
      
 const validateValue  = value.match(phone_format) || 0;


  if(validateValue.length === 12) {
    return true;
  } else {
    return false;
  }
}

export default checkPhoneInput;
