function showOrHideFullscreenNav(e) {
    const fsNavmenu = document.querySelector('.fullscreen-navmenu');
    let sbWidth = innerWindowWidth() - document.querySelector('html').clientWidth;
    let header = document.querySelector('header');

    if (fsNavmenu !== undefined) {
        burger.classList.toggle('active');
        
        body.classList.toggle('fixed');
        body.style.paddingRight = sbWidth + 'px';

        header.classList.toggle('fixed-header');
        header.style.paddingRight = sbWidth + 'px';

        fsNavmenu.classList.toggle('active');
    }
}
const burger = document.getElementById('burgerButton');
burger.addEventListener('click', showOrHideFullscreenNav);