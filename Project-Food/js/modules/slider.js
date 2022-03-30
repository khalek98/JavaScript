function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slider = document.querySelector(container),
          btnPrev = slider.querySelector(prevArrow),
          btnNext = slider.querySelector(nextArrow),
          current = slider.querySelector(currentCounter),
          total = slider.querySelector(totalCounter),
          sliderWrapper = slider.querySelector(wrapper),
          sliderField = sliderWrapper.querySelector(field),
          slides = sliderField.querySelectorAll(slide),
          width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1,
        offset = 0;

    appendZero(slides.length, total);
    appendZero(slideIndex, current);

    function appendZero(counter, item) {
        if (counter < 10) {
            item.textContent = `0${counter}`;
        } else {
            item.textContent = counter;
        }
    }

    sliderField.style.cssText = `width: calc(100% * ${slides.length}); display: flex; transition: 1.5s all`;

    sliderWrapper.style.overflow = 'hidden';

    slider.style.position = 'relative'; 

    slides.forEach(slide => slide.style.width = width);

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);
    
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0 ) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function dotsStyleOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function togleClassFade() {
        slides.forEach(item => item.classList.remove('fade'));
        slides[slideIndex - 1].classList.add('fade');
    }

    function keepOnlyNub(value) {
        return +value.replace(/\D/g, '');
    }

    function nextSlide() {

        if (offset == keepOnlyNub(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += keepOnlyNub(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else { 
            slideIndex++;
        }

        appendZero(slideIndex, current);
        dotsStyleOpacity();

        togleClassFade();
    }

    setInterval(nextSlide, 7000);


    btnNext.addEventListener('click', () => {
        nextSlide();

    });

    btnPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = keepOnlyNub(width) * (slides.length - 1)
        } else {
            offset -= keepOnlyNub(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else { 
            slideIndex--;
        }

        appendZero(slideIndex, current);
        dotsStyleOpacity();
        
        togleClassFade();

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = keepOnlyNub(width) * (slideTo - 1);

            sliderField.style.transform = `translateX(-${offset}px)`;

            appendZero(slideIndex, current);
            dotsStyleOpacity();

            togleClassFade();

        });
    });
}

export default slider;