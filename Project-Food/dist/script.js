/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const cards = () => {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = +price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 30.3;
      this.currencyConrertation();
    }

    currencyConrertation() {
      this.price = Math.floor(this.price * this.transfer);
    }

    render() {
      const elem = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        elem.classList.add(this.element);
      } else {
        this.classes.forEach(className => elem.classList.add(className));
      }

      elem.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
      this.parent.append(elem);
    }

  }

  const getResource = async url => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }; // getResource('http://localhost:3000/menu')
  //     .then(data => {
  //         data.forEach(({img, altimg, title, descr, price}) => {
  //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //         });
  //     });


  axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
    area.addEventListener(action, e => {
      if (e.target == modalWindow || e.target.getAttribute('data-close-modal') == '' || e.code == 'Escape') {
        closeModal();
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

  window.addEventListener('scroll', showModalByScroll); ///////////////////////////////////// From

  const formsAll = document.querySelectorAll('form');
  const message = {
    success: 'Thank you! <br> We will contact you soon.',
    failure: 'Something went wrong...'
  };
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
    form.addEventListener('submit', e => {
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
      postData('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        progressBar.remove();
        showThanksModal(message.success);
      }).catch(() => {
        progressBar.remove();
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });

    function showThanksModal(message) {
      const modalDialog = document.querySelector('.modal__dialog');
      modalDialog.classList.add('hide');
      openModal();
      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog', 'show');
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

/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const slider = () => {
  const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesInner = slidesWrapper.querySelector('.offer__slider-inner'),
        mainSlider = document.querySelector('.offer__slider'),
        slides = slidesInner.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1,
      offset = 0;

  function counterWithZero(amount, counter) {
    if (amount < 10) {
      counter.textContent = `0${amount}`;
    } else {
      counter.textContent = amount;
    }
  }

  counterWithZero(slides.length, total);
  counterWithZero(slideIndex, current);
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => slide.style.width = width);
  mainSlider.style.position = 'relative';
  const dots = document.createElement('ol'),
        dotsArr = [];
  dots.classList.add('carousel-indicators');
  mainSlider.append(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);

    if (i == 0) {
      dot.style.opacity = 1;
    }

    dots.append(dot);
    dotsArr.push(dot);
  }

  slidesInner.style.cssText = `
        width: ${100 * slides.length}%; 
        display: flex;
        transition: 0.5s all;
    `;
  next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    counterWithZero(slideIndex, current);
    slidesInner.style.transform = `translateX(-${offset}px)`;
    dotsArr.forEach(dot => dot.style.opacity = '.5');
    dotsArr[slideIndex - 1].style.opacity = '1';
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    counterWithZero(slideIndex, current);
    slidesInner.style.transform = `translateX(-${offset}px)`;
    dotsArr.forEach(dot => dot.style.opacity = '.5');
    dotsArr[slideIndex - 1].style.opacity = '1';
  });
  dotsArr.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesInner.style.transform = `translateX(-${offset}px)`;
      counterWithZero(slideIndex, current);
      dotsArr.forEach(dot => dot.style.opacity = '.5');
      dotsArr[slideIndex - 1].style.opacity = '1';
    });
  }); // showSlides(slideIndex);
  // if (slides.length < 10) {
  //     total.textContent = `0${slides.length}`;
  // } else {
  //     total.textContent = slides.length;
  // }
  // function showSlides(n) {
  //     if (n > slides.length) {
  //         slideIndex = 1;
  //     }
  //     if (n < 1) {
  //         slideIndex = slides.length;
  //     }
  //     slides.forEach(slide => slide.style.display = 'none');
  //     slides[slideIndex - 1].style.display = 'block';
  //     if (slideIndex < 10) {
  //         current.textContent = `0${slideIndex}`;
  //     } else {
  //         current.textContent = slideIndex;
  //     }
  // }
  // function plusSlide(n) {
  //     showSlides(slideIndex += n);
  // }
  // prev.addEventListener('click', () => {
  //     plusSlide(-1);
  // });
  // next.addEventListener('click', () => {
  //     plusSlide(1);
  // });
};

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const tabs = (tabsSelector, contentsSelector, parentSelector) => {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(contentsSelector),
        tabsParent = document.querySelector(parentSelector);

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.remove('show', 'fade');
      item.classList.add('hide');
    });
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const timer = (setDeadline, selector) => {
  const deadline = setDeadline,
        timer = document.querySelector(selector);

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      const promotionEndedMessage = document.createElement('div');
      promotionEndedMessage.classList.add('promotion__message');
      promotionEndedMessage.innerHTML = 'Акция закончилась';
      timer.innerHTML = '';
      timer.style.display = 'block';
      timer.append(promotionEndedMessage);
      setTimeout(() => {
        document.querySelector('.promotion').style.display = 'none';
        document.querySelector('.divider_before-prom').style.display = 'none';
      }, 5000);
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)), hours = Math.floor(t / (1000 * 60 * 60) % 24), minutes = Math.floor(t / (1000 * 60) % 60), seconds = Math.floor(t / 1000 % 60);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function addZero(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(endtime) {
    const days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.minutes);
      seconds.innerHTML = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(deadline);
};

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");



 // import form from './modules/form';


window.addEventListener('DOMContentLoaded', () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item ', '.tabcontent', '.tabheader__items');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('2022-05-25', '.timer');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])(); // form();

  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map