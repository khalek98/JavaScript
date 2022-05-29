import tabs from './modules/tabs';
import timerClock from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 600000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timerClock('2022-09-25', '.timer');
    modal('.modal', '[data-modal]', modalTimerId);
    cards();
    form('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounern: '#total',
        currentCouner: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
});