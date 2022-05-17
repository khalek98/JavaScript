function openModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector)

    modalWindow.classList.remove('fadeOut');
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('fadeIn');
    modalWindow.classList.add('show');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }  
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector)

    modalWindow.classList.remove('fadeIn');
    modalWindow.classList.add('fadeOut');
    setTimeout(() => {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
    }, 1000);
    document.body.style.overflow = '';
}

const modal = (modalSelector, triggerSelector, modalTimerId) => {
    const modalWindow = document.querySelector(modalSelector),
          modalTrigger = document.querySelectorAll(triggerSelector);

    modalTrigger.forEach(trigger => {
        trigger.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    function closeModalByEvent(area, action) {
        area.addEventListener(action, (e) => {
            if (e.target == modalWindow || e.target.getAttribute('data-close-modal') == '' || e.code == 'Escape') {
                closeModal(modalSelector)
            }
        });
    }

    closeModalByEvent(modalWindow, 'click');
    closeModalByEvent(document, 'keydown');  

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); 
        }
    }
    window.addEventListener('scroll', showModalByScroll); 
};

export default modal;
export {closeModal, openModal};