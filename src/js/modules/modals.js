const modals = () => {
  const bindModal = (triggersSelector, modalSelector, closeSelector) => {
    const triggers = document.querySelectorAll(triggersSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);

    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };

    const openModal = () => {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }
        openModal();
      });
    });

    close.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.style.display === 'block') {
        closeModal();
      }
    });
  };

  const showModalByTime = (selector, time) => {
    setTimeout(() => {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = 'hidden';
    }, time);
  };

  bindModal(
    '.popup_engineer_btn',
    '.popup_engineer',
    '.popup_engineer .popup_close'
  );
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  // showModalByTime('.popup', 60000);
};

export default modals;
