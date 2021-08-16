'use strict'
let body = document.body;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;

// ? If you see an error here, it's normal.
@@include('_modalWindow.js');
@@include('_spoiler.js');


function prependProductActionsMenu(e) {
    let targetProductBody = e.target.firstElementChild;
    let prodActionsClone = productActionsMenu.cloneNode(true);

    prodActionsClone.classList.remove('_non-active');

    targetProductBody.prepend(prodActionsClone);
    if (getInnerWigth() <= 768) {
        prodActionsClone.classList.add('_active');
    }
}
function removeProductActionsMenu(e) {
    // Try to get menu from product => body => actions.
    let actionsMenu = e.target.firstElementChild.firstElementChild;

    if (actionsMenu.classList.contains("product-actions")) {
        actionsMenu.classList.remove("_active")
        setTimeout(function () {
            actionsMenu.remove();
        }, 200)
    }
}
// const productActionsMenu = document.querySelector('.product-actions');
// const products = document.querySelectorAll('.product');
