let body = document.body;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;

// ? If you see an error here, it's normal.
@@include('_modalWindow.js');
@@include('_spoiler.js');


function appendInfoModalMenu(e) {
    let targetContentPreview = e.currentTarget;
    let modalElementClone = modalElement.cloneNode(true);

    modalElementClone.classList.remove('_non-active');

    targetContentPreview.append(modalElementClone);
    setTimeout(function () {
        modalElementClone.classList.add('_active');
    }, 30)
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

function changeContentWidthByWheel(inputEvent) {
    let elementsWasResized = albumElements[0].style.width !== "";
    let scrollFactor = -0.01;
    if (inputEvent.deltaY < 100 /*for Firefox */) {
        scrollFactor = -0.1;
    }
    // Takes resize (scroll) value and rounding to the integer.
    // You can change the step by changing the value scrollFactor.
    
    let changeSize = parseInt(inputEvent.deltaY * scrollFactor);

    let oldContentWidth = albumContentWidth;
    if (elementsWasResized) {
        oldContentWidth = parseInt(albumElements[0].style.width.replace("px", ""));
    }
    let newContentWidth;

    if (changeSize >= 0) {
        newContentWidth = oldContentWidth + changeSize;
    } else {
        newContentWidth = oldContentWidth - Math.abs(changeSize);
    }
    // Does not allow you to change the size 
    // if it is below the permissible values of min and max in the range input.
    if (newContentWidth <= albumContentWidth + 102 && newContentWidth >= albumContentWidth - 102) {
        albumElements.forEach(element => {
            element.style.width = newContentWidth + "px";
        });
        // Changes the position of the slider.
        if (changeSize <= 0) {
            inputEvent.target.value = parseInt(inputEvent.target.value) - Math.abs(changeSize);
        } else {
            inputEvent.target.value = parseInt(inputEvent.target.value) + changeSize;
        }
    }
}

function changeContentWidthByClick(inputEvent) {
    let changeSize = parseInt(inputEvent.currentTarget.value);
    let newContentWidth;

    if (changeSize >= 0) {
        newContentWidth = albumContentWidth + changeSize;
    } else {
        changeSize = Math.abs(changeSize)
        newContentWidth = albumContentWidth - changeSize;
    }

    albumElements.forEach(element => {
        element.style.width = newContentWidth + "px";
    });
}
let albumContentWidth = 260;
const albumElements = document.querySelectorAll('.album-element');
const rangeInput = document.querySelector('#blockSizer');

rangeInput.addEventListener('input', changeContentWidthByClick);
rangeInput.onwheel = (arg) => {
    changeContentWidthByWheel(arg);
    return false;
}
rangeInput.oncontextmenu = (event) => {
    if (event.which == 3) {
        albumElements.forEach(element => {
            element.style.width = '';
        });
        rangeInput.value = 0;
    }
    return false;
}