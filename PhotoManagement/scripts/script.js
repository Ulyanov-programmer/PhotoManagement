'use strict'
let body = document.body;
let innerWindowWidth = () => window.innerWidth;

// ? If you see an error here, it's normal.
// Variables for work modal window 
// ! I don`t recommend to use references for open and close modal windows.

let modalLinks = document.querySelectorAll('[data-modal-link]');
for (let modalLink of modalLinks) {
    modalLink.addEventListener("click", function (e) {
        let popupId = modalLink.dataset.modalLink;

        if (popupId !== undefined) {
            let modal = document.getElementById(popupId);
            showOrHideModal(modal);
        }
    });
}

let modalClosers = document.querySelectorAll('.modal-closer');
for (const modalCloser of modalClosers) {
    modalCloser.addEventListener("click", function (e) {
        closeModal(modalCloser.closest('.modal-window'), true);
    });
}

// When the body loses scrolling, the page may shift.
// To fix this, it will be padded in the size of the scrollbar.
function returnScrollbarWidth() {
    let scrollbarWidth = innerWindowWidth() - document.querySelector('html').clientWidth;
    
    return scrollbarWidth;
}

// This is to prevent the new modal from opening too quickly.
let unlock = true;

// Transition time FROM modal window style (in seconds or .number).
const transitionTimeout = 0.5;


function showOrHideModal(modalElement) {
    if (modalElement && unlock) {
        let activeModal = document.querySelector('.modal-window.active');

        if (activeModal) {
            closeModal(activeModal, false);
        } else {
            toggleBodyScroll(false);
        }

        modalElement.classList.add("active");
    }
    modalElement.addEventListener("click", function (e) {

        // Checks if the pressed element has a CONTENT parent, if not, closes the modal.
        if (!e.target.closest('.modal-window__content')) {
            closeModal(modalElement, true);
        }
    })
}

function closeModal(modalWindow, bodyIsScrollable) {
    if (unlock) {
        modalWindow.classList.remove("active");

        if (bodyIsScrollable) {
            toggleBodyScroll(true);
        }
    }
}
function toggleBodyScroll(toggleScrollOn) {

    if (toggleScrollOn) {
        body.style.paddingRight = 0;
        body.classList.remove("fixed");
    } else {
        body.style.paddingRight = returnScrollbarWidth() + 'px';
        body.classList.add('fixed');
    }

    unlock = false;
    // Prevents a new window from opening too quickly.
    setTimeout(function () {
        unlock = true;
    }, transitionTimeout * 1000);
}

document.addEventListener('keydown', function (key) {
    if (key.code === 'Escape') {
        let activeModal = document.querySelector('.modal-window.active');
        closeModal(activeModal, true);
    }
});

;
let spoilerButtons = document.querySelectorAll('[data-spoiler-button]');
let spoilerContentElements = document.querySelectorAll('[data-spoiler-content]');

function toggleToSpoilers(e) {
    if (spoilerContentElements.length > 0 &&
        spoilerButtons.length == spoilerContentElements.length) {
        for (let index = 0; index < spoilerContentElements.length; index++) {

            if (window.innerWidth <= 900) {
                spoilerContentElements[index].classList.add('spoiler-content');
                spoilerButtons[index].classList.add('spoiler-button');
            } else {
                spoilerContentElements[index].classList.remove('spoiler-content');
                spoilerButtons[index].classList.remove('spoiler-button');
            }
        }

        for (let spoilerButton of spoilerButtons) {
            spoilerButton.addEventListener('click', toggleSpoilerState);
        }
    }
}

function toggleSpoilerState(event) {
    let targetSpoilerButton = event.target;
    let spoilerContainer = targetSpoilerButton.nextElementSibling;

    targetSpoilerButton.classList.toggle('active');
    spoilerContainer.classList.toggle('active');
}

// Determines spoilers when the page is loaded and when it is resized.
toggleToSpoilers();
window.addEventListener(`resize`, toggleToSpoilers);;


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
