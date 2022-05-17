import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

const form = (formSelector, modalTimerId) => {
    const formsAll = document.querySelectorAll(formSelector);

    const message = {
        success: 'Thank you! <br> We will contact you soon.',
        failure: 'Something went wrong...'
    }

    formsAll.forEach(form => bindPostData(form));

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
            openModal('.modal', modalTimerId);

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
                closeModal('.modal');
            }, 4000);
        }
    }
}

export default form;