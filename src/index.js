const refs = {
    openModalBtn: document.querySelector('[data-action="open-modal"]'),
    closeModalBtn: document.querySelector('[data-action="close-modal"]'),
    backdrop: document.querySelector(".js-backdrop"),
  };
  
  refs.openModalBtn.addEventListener("click", onOpenModal);
  refs.closeModalBtn.addEventListener("click", onCloseModal);
  refs.backdrop.addEventListener("click", onBackDropClick);
  
  function onOpenModal() {
    document.body.classList.add("show-modal");
  }
  
  function onCloseModal() {
    document.body.classList.remove("show-modal");
  }
  
  function onBackDropClick(event) {
    console.log(event.currentTarget);
    console.log(event.target);
  
    if (event.currentTarget === event.target) {
      console.log("Клікнули по бекдропу");
  
      onCloseModal();
    }
  }

  const container = document.querySelector('.container');

  async function cloneItems() {
      const items = container.querySelectorAll('.item'); // выбираем все элементы с классом .item
      items.forEach(item => {
          const clone = item.cloneNode(true); // клонируем элемент
          container.appendChild(clone); // добавляем его в контейнер
      });
  }
  
  // Привязываем функцию клонирования к кнопке "Загрузить еще"
  document.getElementById('loadMoreBtn').addEventListener('click', cloneItems);
  
  // Если нужно сразу загрузить больше элементов, можем вызвать функцию сразу
  cloneItems();