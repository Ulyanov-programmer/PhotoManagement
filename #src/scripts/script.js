'use strict'

let body = document.body;
let innerWindowWigth = window.innerWidth;
let innerWindowHeight = window.innerWidth;

// ? If you see an error here, it's normal.
@@include('_spoiler.js');
@@include('_isMobile.js');

function showOrHideNavmenu(e) {
    const navmenu = document.querySelector('.navmenu');

    if (navmenu !== undefined) {
        burger.classList.toggle('active');
        body.classList.toggle('fixed');
        navmenu.classList.toggle('navmenu-fullscreen');
    }
}
const burger = document.querySelector('#burgerButton');
burger.addEventListener('click', showOrHideNavmenu);


function headerToFixed(e) {
    // Calculating the degree of scrolling in pixels, 
    // multiply the innerWindowHeight by the desired scrolling percentage as 0.percent.
    /* Example:
        25 percent of innerWindowHeight = innerWindowHeight * 0.25 
        5 percent of 700 = 700 * 0.05
    */
    var scrollPercentage = innerWindowHeight * 0.15;

    if (pageYOffset > scrollPercentage) {
        burger.classList.add('burger-black');
        header.classList.add('fixed-header');
    } else {
        burger.classList.remove('burger-black');
        header.classList.remove('fixed-header');
    }
}
const header = document.querySelector('.header__body');
window.addEventListener('scroll', headerToFixed);
