import responseJSON from '../response.json';

export const postData = async (url, data) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //Тело заккоментировано, чтобы не переписало файл json
      /*body: JSON.stringify(data) */
    })
      
      /* .then((response) => {
        return response.json();
      }) */
      
      //Возвращаем ответ в формате JSON
      .then((res) => {
        return responseJSON;
      });
  };