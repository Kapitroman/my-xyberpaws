
const baseSuccessCallback = (event) => {
  event.preventDefault();
  // В данном колбеке бэкендер, либо разработчик при необходимости будет писать запрос на отправку формы на сервер и обрабатывать возможные ошибки или успешную отправку формы на сервер
  console.log(event.target);
  const url = event.target.getAttribute('action');
  fetch(url,
    {
      method: 'POST',
      body: new FormData(event.target),
    })
    .then((response) => {
      if (response.ok) {
        // eslint-disable-next-line no-console
        console.log('Ваша форма успешна отправлена');
        // modals.open('success');
        return;
      }
      throw new Error();
    })
    .catch((err) =>{
      // eslint-disable-next-line no-console
      console.error('Произошла ошибка отправки');
      // modals.open('error');
    });
};

const baseErrorCallback = (event) => {
  event.preventDefault();
  // Данный коллбек используется при необходимости выполнить какое-либо действие помимо показа ошибок при попытке отправить неккорректные данные, он не связан с запросами на сервер
};

export const callbacks = {
  base: {
    // Сбросс формы
    reset: true,
    // Таймаут сброса формы
    resetTimeout: 500,
    successCallback: baseSuccessCallback,
    errorCallback: baseErrorCallback,
  },
};
