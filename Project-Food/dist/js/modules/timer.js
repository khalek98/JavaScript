const timerClock = (setDeadline, selector) => {

    const deadline = setDeadline,
          timer = document.querySelector(selector);

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date);

        if (t <= 0) {
            const promotionEndedMessage = document.createElement('div');
            promotionEndedMessage.classList.add('promotion__message');
            promotionEndedMessage.innerHTML = 'Акция закончилась';
            timer.innerHTML = '';
            timer.style.display = 'block';
            timer.append(promotionEndedMessage);
            setTimeout(() => {
                // document.querySelector('.promotion').style.display = 'none';
                document.querySelector('.promotion').style.cssText = `
                    height: 0px;
                    opacity: 0;
                    padding: 0;
                    transition: all 1s;
                `;
                document.querySelector('.divider_before-prom').style.display = 'none';
            }, 5000);
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }

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

export default timerClock;


