const slider = () => {
    const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesInner = slidesWrapper.querySelector('.offer__slider-inner'),
          slides = slidesInner.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next  = document.querySelector('.offer__slider-next'),
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
    });

    // showSlides(slideIndex);

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

export default slider;