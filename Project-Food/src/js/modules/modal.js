const modal = () => {
    const modalWindow = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]');

    function openModal() {
        modalWindow.classList.remove('fadeOut');
        modalWindow.classList.remove('hide');
        modalWindow.classList.add('fadeIn');
        modalWindow.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);    
    }

    modalTrigger.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    function closeModal() {
        modalWindow.classList.remove('fadeIn');
        modalWindow.classList.add('fadeOut');
        setTimeout(() => {
            modalWindow.classList.remove('show');
            modalWindow.classList.add('hide');
        }, 1000);
        document.body.style.overflow = '';
    }

    function closeModalByEvent(area, action) {
        area.addEventListener(action, (e) => {
            if (e.target == modalWindow || e.target.getAttribute('data-close-modal') == '' || e.code == 'Escape') {
                closeModal()
            }
        });
    }

    closeModalByEvent(modalWindow, 'click');
    closeModalByEvent(document, 'keydown');  

    const modalTimerId = setTimeout(openModal, 60000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    ///////////////////////////////////// From

    const formsAll = document.querySelectorAll('form');

    const message = {
        success: 'Thank you! <br> We will contact you soon.',
        failure: 'Something went wrong...'
    }

    formsAll.forEach(form => bindPostData(form));

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const progressBar = document.createElement('div'),
                  progressSub = document.createElement('div'),
                  statusMessage = document.createElement('div');

            progressBar.classList.add('progress-bar');
            progressSub.classList.add('progress-sub');
            statusMessage.classList.add('status');

            progressBar.append(progressSub);
            form.insertAdjacentElement('afterend', progressBar);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    progressBar.remove();
                    showThanksModal(message.success);
                })
                .catch(() => {
                    progressBar.remove();
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });

        function showThanksModal(message) {
            const modalDialog = document.querySelector('.modal__dialog');
            modalDialog.classList.add('hide');
            openModal();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog', 'show')
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close-modal class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

            document.querySelector('.modal').append(thanksModal);

            setTimeout(() => {
                thanksModal.remove();
                setTimeout(() => {
                    modalDialog.classList.remove('hide');
                    modalDialog.classList.add('show');
                }, 1500);
                closeModal();
            }, 4000);
        }


    }

    
};

export default modal;