'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const tableButtons = document.querySelectorAll('.dishes_menu__label'),
        tableElements = document.querySelectorAll('.table'),
        slider = document.querySelector('.slider'),
        slides = document.querySelectorAll('.slide'),
        slidesField = document.querySelector('.slider__wrapper'),
        slidesWrapper = document.querySelector('.slider__inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    // Tabs
    const removeAllClasses = (arr, classString) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].classList.remove(classString);
        }
    }

    tableButtons.forEach((buttonItem, i) => {
        buttonItem.addEventListener('click', () => {
            removeAllClasses(tableButtons, 'active');
            removeAllClasses(tableElements, 'show');
            buttonItem.classList.add('active');
            for (let j = 0; j < tableElements.length; j++) {
                if (i === j) {
                    tableElements[j].classList.add('show')
                }
            }
        })
    })

    // SLider

    let slideIndex = 1;
    let offset = 0;

    slider.style.position = 'relative';

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
            margin: 0 15%;
            list-style: none;
    `;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 9.32px;
                height: 9.32px;
                margin: 0 18.64px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-radius: 50%;
                opacity: .5;
                transition: opacity .6s ease;
        `;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    // Timer

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('#timer', '08-06-2021');


})