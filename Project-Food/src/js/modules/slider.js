const slider = ({container, slide, nextArrow, prevArrow, totalCounern, currentCouner, wrapper, field}) => {
    const mainSlider = document.querySelector(container),
          prev = mainSlider.querySelector(prevArrow),
          next = mainSlider.querySelector(nextArrow),
          current = mainSlider.querySelector(currentCouner),
          total = mainSlider.querySelector(totalCounern),
          sliderWrapper = mainSlider.querySelector(wrapper),
          sliderInner = sliderWrapper.querySelector(field),
          slides = sliderInner.querySelectorAll(slide),
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
    
    function keepNum(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == keepNum(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += keepNum(width);
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
            offset = keepNum(width) * (slides.length - 1);
        } else {
            offset -= keepNum(width);
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
            offset = keepNum(width) * (slideTo - 1);

            counterWithZero(slideIndex, current);
            activeDot();
            sliderInner.style.transform = `translateX(-${offset}px)`;
        });
    });
    
};

export default slider;