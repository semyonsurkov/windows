import { checkNumInputs } from './index.js';

export const forms = (state) => {
  const forms = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Данные не отправлены',
  };

  const postData = async (url, formData) => {
    const object = {};
    formData.forEach((value, key) => (object[key] = value));
    const body = JSON.stringify(object);
    document.querySelector('.status').textContent = message.loading;
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    return await result.text();
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = '';
    });
  };

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form.appendChild(statusMessage);

      const formData = new FormData(form);
      if (form.getAttribute('data-calc') === 'end') {
        for (let key in state) {
          formData.append(key, state[key]); 
        }
      }

      postData('https://simple-server-cumz.onrender.com/api/data', formData)
        .then((result) => {
          console.log(result);
          statusMessage.textContent = message.success;
        })
        .catch(() => (statusMessage.textContent = message.failure))
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};
