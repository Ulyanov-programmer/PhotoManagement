let body = document.body;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;

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
}

document.addEventListener('keydown', function (key) {
    if (key.code === 'Escape') {
        let activeModal = document.querySelector('.modal-window.active');
        closeModal(activeModal, true);
    }
});

;


function appendInfoModalMenu(e) {
    if (innerWindowWidth() >= 900) {
        let targetContentPreview = e.currentTarget;
        let modalElementClone = modalElement.cloneNode(true);

        modalElementClone.classList.remove('_non-active');

        targetContentPreview.append(modalElementClone);
        setTimeout(function () {
            modalElementClone.classList.add('_active');
            if (innerWindowWidth() < 1150) {
                modalElementClone.classList.add('bigger');
            }
        }, 30)
    }
}
function removeInfoModalMenu(e) {
    // Try to get modal block.
    let modalMenu = e.currentTarget.lastElementChild;

    if (modalMenu.classList.contains("modal-content-info")) {
        modalMenu.classList.remove("_active")
        setTimeout(function () {
            modalMenu.remove();
        }, 200)
    }
}
const contentElements = document.querySelectorAll('.album-element__preview');
const modalElement = document.querySelector('.modal-content-info');

contentElements.forEach(element => {
    element.addEventListener("mouseenter", appendInfoModalMenu);
    element.addEventListener("mouseleave", removeInfoModalMenu);
});

const inputStep = 1;
const albumElements = document.querySelectorAll('.album__content');
const rangeInput = document.getElementById('blockSizer');

function changeAlbumGrid(inputEvent, increaseOrDecrease, newColumnsCount) {
    let input = inputEvent.currentTarget;

    if (newColumnsCount > 1 && newColumnsCount < 6) {
        input.value = newColumnsCount;
    } else {
        if (increaseOrDecrease === true) {
            input.value = parseInt(input.value) + inputStep;
        }
        else if (increaseOrDecrease === false) {
            input.value = parseInt(input.value) - inputStep;
        }
    }

    localStorage.setItem("defaultColumnsCount", `${input.value}`);
    for (const element of albumElements) {
        element.style.gridTemplateColumns = `repeat(${input.value}, 1fr)`;
    }
}

function returnChangeGridByWheel(wheelEvent) {
    let changeSize = parseInt(wheelEvent.deltaY);

    if (changeSize <= 0) {
        return true;
    } else {
        return false;
    }
}

if (localStorage.getItem("defaultColumnsCount") !== null) {
    rangeInput.value = localStorage.getItem("defaultColumnsCount");
    for (const element of albumElements) {
        element.style.gridTemplateColumns = `repeat(${rangeInput.value}, 1fr)`;
    }
} else {
    // Enter here value from album__content => grid-template-columns
    rangeInput.value = 3;
}
rangeInput.addEventListener('input', changeAlbumGrid);
rangeInput.onwheel = (arg) => {
    let increaseOrDecrease = returnChangeGridByWheel(arg);

    changeAlbumGrid(arg, increaseOrDecrease);

    return false;
}
rangeInput.oncontextmenu = (event) => {
    if (event.which == 3) {
        changeAlbumGrid(event, null, 4);
    }
    return false;
}