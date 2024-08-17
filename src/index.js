document.addEventListener('DOMContentLoaded', () => {
  const refs = {
      openModalBtn: document.querySelector('[data-action="open-modal"]'),
      closeModalBtn: document.querySelector('[data-action="close-modal"]'),
      backdrop: document.querySelector('.js-backdrop'),
  };

  refs.openModalBtn.addEventListener('click', onOpenModal);
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  refs.backdrop.addEventListener('click', onBackdropClick);

  function onOpenModal() {
      document.body.classList.add('show-modal');
      document.body.classList.remove('hide-modal');
  }

  function onCloseModal() {
      document.body.classList.add('hide-modal');
      document.body.classList.remove('show-modal');
      setTimeout(() => {
          document.body.classList.remove('hide-modal');
      }, 300); // Задержка должна совпадать с длительностью анимации
  }

  function onBackdropClick(event) {
      if (event.currentTarget === event.target) {
          onCloseModal();
      }
  }
});