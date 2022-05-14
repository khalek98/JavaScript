const slider = () => {
    const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesInner = slidesWrapper.querySelector('.offer__slider-inner'),
          mainSlider = document.querySelector('.offer__slider'),
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
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesInner.style.transform = `translateX(-${offset}px)`;

            counterWithZero(slideIndex, current);

            dotsArr.forEach(dot => dot.style.opacity = '.5');
            dotsArr[slideIndex - 1].style.opacity = '1';
        });
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