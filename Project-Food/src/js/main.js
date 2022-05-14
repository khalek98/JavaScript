import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
// import form from './modules/form';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
    tabs('.tabheader__item ', '.tabcontent', '.tabheader__items');
    timer('2022-05-25', '.timer');
    modal();
    cards();
    // form();
    slider();
});