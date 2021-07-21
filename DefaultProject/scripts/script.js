'use strict'

let body = document.body;
let innerWindowWigth = window.innerWidth;
let innerWindowHeight = window.innerWidth;

// ? If you see an error here, it's normal.
class IsMobile {
    static Android() {
        return navigator.userAgent.match(/Android/i);
    }
    static BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    }
    static iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
    static Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
    }
    static Windows() {
        return navigator.userAgent.match(/IEMobile/i);
    }
    static any() {
        return (
            this.Android() || this.BlackBerry() ||
            this.iOS() || this.Opera() || this.Windows()
        );
    }
}
// ? IsMobile before ECMAScript 2015
/* const isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return ( isMobile.Android() || isMobile.BlackBerry() ||
            isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
 }; */

if (IsMobile.any()) {
    body.classList.add('_touch');
} else {
    body.classList.add('_pc');
};

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
