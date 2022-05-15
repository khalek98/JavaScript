import tabs from './modules/tabs';
import timerClock from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
// import form from './modules/form';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
    tabs('.tabheader__item ', '.tabcontent', '.tabheader__items');
    timerClock('2022-05-25', '.timer');
    modal();
    cards();
    // form();
    slider();
});