'use strict'

let body = document.body;
let innerWindowWigth = window.innerWidth;
let innerWindowHeight = window.innerWidth;

// ? If you see an error here, it's normal.
@@include('_isMobile.js');

// function showOrHideNavmenu(e) {
//     const navmenu = document.querySelector('.navmenu');

//     if (navmenu !== undefined) {
//         burger.classList.toggle('active');
//         body.classList.toggle('fixed');
//         navmenu.classList.toggle('navmenu-fullscreen');
//     }
// }
// const burger = document.querySelector('#burgerButton');
// burger.addEventListener('click', showOrHideNavmenu);

function showOrHideSubmenu(e) {
    const submenu = document.querySelector('.navmenu__submenu');

    if (submenu !== undefined) {
        activateSubmenuButton.classList.toggle('active');
        submenu.classList.toggle('show');
    }
}
const activateSubmenuButton = document.getElementById('submenu-open-button');
activateSubmenuButton.addEventListener('click', showOrHideSubmenu);

// ? Use this if you have scroll buttons.
function scrollToElement(eventData) {
    let scrollElement = document.querySelector(`.${eventData.target.dataset.scrollTo}`);

    if (scrollElement !== undefined) {
        scrollElement.scrollIntoView({ block: "start", behavior: "smooth" });
    }
}

let scrollButtons = document.querySelectorAll('[data-scroll-to]');
for (let scrollButton of scrollButtons) {
    scrollButton.addEventListener('click', scrollToElement);
}

/* ? the headerToFixed function
function headerToFixed(e) {
    // Calculating the degree of scrolling in pixels,
    // multiply the innerWindowHeight by the desired scrolling percentage as 0.percent.
    // Example:
    //  25 percent of innerWindowHeight = innerWindowHeight * 0.25
    //  5 percent of 700 = 700 * 0.05

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
*/