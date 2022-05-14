// const form = () => {
//     const formsAll = document.querySelectorAll('form');

//     const message = {
//         success: 'Спасибо! Скоро мы с Вами свяжемся!',
//         failure: 'Что-то пошло не так...'
//     }

//     formsAll.forEach(item => {
//         postData(item);
//     });

//     function postData(form) {
//         form.addEventListener('submit', (e) => {
//             e.preventDefault();

//             const progressBar = document.createElement('div'),
//                   prorgessSub = document.createElement('div'),
//                   statusMessage = document.createElement('div');

//             progressBar.classList.add('progress-bar');
//             prorgessSub.classList.add('progress-sub');
//             statusMessage.classList.add('status');

//             progressBar.append(prorgessSub);
//             // form.append(progressBar);
//             form.insertAdjacentElement('afterend', progressBar);

//             const formData = new FormData(form);
            
//             // const object = {};
//             // formData.forEach((value, key) => {
//             //     object[key] = value;
//             // });
//             // console.log(object);

//             fetch('server.php', {
//                 method: 'POST',
//                 // headers: {
//                 //     'Content-type': 'application/json'
//                 // },
//                 body: formData
//             }).then(data => {
//                 console.log(data);
//                 progressBar.remove();
//                 showThanksModal(message.success);
//                 form.reset();
//             }).catch(() => {
//                 progressBar.remove();
//                 showThanksModal(message.failure);
//                 statusMessage.textContent = message.failure;
//                 form.append(statusMessage);
//                 setTimeout(() => {
//                     statusMessage.remove();
//                 }, 5000);
//             }).finally(() => {
//                 form.reset();
//             })



//             // request.addEventListener('load', () => {
//             //     if (request.status === 200) {
//             //         console.log(request.response);
//             //         progressBar.remove();
//             //         showThanksModal(message.success);
//             //         form.reset();
                    
//             //     } else {
//             //         progressBar.remove();
//             //         showThanksModal(message.failure);
//             //         // statusMessage.textContent = message.failure;
//             //         // form.append(statusMessage);
//             //         // setTimeout(() => {
//             //         //     statusMessage.remove();
//             //         // }, 5000);
//             //     }
//             // });
//         });
//     }

//     function showThanksModal(message) {
//         const modalDialog = document.querySelector('.modal__dialog');
//         modalDialog.classList.add('hide');
//         // openModal: 

//         ///////////////////////////////////////////////////

//         const thanksModal = document.createElement('div');
//         thanksModal.classList.add('modal__dialog');
//         thanksModal.innerHTML = `
//             <div class="modal__content">
//                 <div class=modal__close" data-close>х</div>
//                 <div class="modal__title">${message}</div>
//             </div>
//         `;
//         document.querySelector('.modal').append(thanksModal);
//         setTimeout(() => {
//            thanksModal.remove(); 
//         }, 4000);
//         modalDialog.classList.add('show');
//         modalDialog.classList.remove('hide');
//         closeModa();
//     }

// };

// export default form;