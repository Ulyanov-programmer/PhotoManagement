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
window.addEventListener(`resize`, toggleToSpoilers);