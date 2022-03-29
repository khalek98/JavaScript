import tabs from './modules/tabs';
import modalWindow from './modules/modalWindow';
import calc from './modules/calc';
import forms from './modules/forms';
import menuCards from './modules/menuCards';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modalWindow';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 500000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modalWindow('[data-modal]', '.modal', modalTimerId);
    calc();
    forms('form', modalTimerId);
    menuCards();
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter:'#current',
        wrapper: '.offer__slider-wrapper',
        field:  '.offer__slider-inner'
    });
    timer('.timer', '2022-05-10');

    //TABS 
    //Timer
    // Modal 
    // MenuCard classes
    // FORMS 
    // Slides  =======================================================

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(slide) {
    //     if (slide > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (slide < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(sl => sl.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slideIndex < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function pluseSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // function changeIndexOfClick(btn, value) {
    //     btn.addEventListener('click', () => {
    //         pluseSlides(value);
    //     });
    // } 

    // changeIndexOfClick(prev, -1);
    // changeIndexOfClick(next, 1);

    //Calc =================================================================

    

});