function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    console.log(modalTimerId);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function showModalByScroll(modalSelector, modalTimerId) {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    }

} 

function modalWindow(triggerSelector, modalSelector, modalTimerId) {
    
    const modaltrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modaltrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); 
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {  
            closeModal(modalSelector);           
        }
    });
    
    window.addEventListener('scroll', showModalByScroll(modalSelector, modalTimerId));
}

export default modalWindow;
export {closeModal, openModal, showModalByScroll};