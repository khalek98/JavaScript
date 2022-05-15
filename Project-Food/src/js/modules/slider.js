const slider = () => {
    const mainSlider = document.querySelector('.offer__slider'),
          prev = mainSlider.querySelector('.offer__slider-prev'),
          next = mainSlider.querySelector('.offer__slider-next'),
          current = mainSlider.querySelector('#current'),
          total = mainSlider.querySelector('#total'),
          sliderWrapper = mainSlider.querySelector('.offer__slider-wrapper'),
          sliderInner = sliderWrapper.querySelector('.offer__slider-inner'),
          slides = sliderInner.querySelectorAll('.offer__slide'),
          width = window.getComputedStyle(sliderWrapper).width;

    function counterWithZero(amount, counter) {
        if (amount < 10) {
            counter.textContent = `0${amount}`;
        } else {
            counter.textContent = amount;
        }
    }

    function activeDot() {
        dotsArr.forEach(dot => dot.style.opacity = '0.5');
        dotsArr[slideIndex - 1].style.opacity = '1';
    }

    let slideIndex = 1,
        offset = 0;

    mainSlider.style.position = 'relative';

    slides.forEach(slide => slide.style.width = width);

    sliderWrapper.style.overflow = 'hidden';
    
    sliderInner.style.cssText = `
        width: ${slides.length * 100}%;
        display: flex;
        transition: 0.5s all;
    `;

    counterWithZero(slides.length, total);
    counterWithZero(slideIndex, current);

    const dots = document.createElement('ol'),
          dotsArr = [];
    dots.classList.add('carousel-indicators');
    mainSlider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = '1';
        }
        dots.append(dot);
        dotsArr.push(dot);
    }
    

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
        activeDot();
        sliderInner.style.transform = `translateX(-${offset}px)`;
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
        activeDot();
        sliderInner.style.transform = `translateX(-${offset}px)`;
    });

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            counterWithZero(slideIndex, current);
            activeDot();
            sliderInner.style.transform = `translateX(-${offset}px)`;
        });
    });
    
};

export default slider;