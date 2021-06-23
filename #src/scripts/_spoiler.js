let spoilerContainers = [
    document.querySelector('.contacts-block'),
    document.querySelector('.subscribe-block'),
];

var spoilersOne = Array.prototype.slice.call(document.querySelectorAll('.contacts-block__list')),
    spoilersTwo = Array.prototype.slice.call(document.querySelectorAll('.subscribe-block__body'))

var allSpoilers = spoilersOne.concat(spoilersTwo);

function toggleSpoilers(event) {
    let windowWigth = 0;

    if (event === undefined) {
        windowWigth = window.innerWidth;
    } else {
        windowWigth = event.target.innerWidth;
    }

    if (spoilerContainers !== undefined && allSpoilers !== undefined) {

        if (windowWigth <= 768) {
            spoilerContainers.forEach(container => {
                container.classList.add('spoiler-container');
            });
            allSpoilers.forEach(spoiler => {
                spoiler.classList.add('spoiler');
                spoiler.lastElementChild.classList.add('spoiler-content');
            });
        } else {
            spoilerContainers.forEach(container => {
                container.classList.remove('spoiler-container');
            });
            allSpoilers.forEach(spoiler => {
                spoiler.classList.remove('spoiler');
                spoiler.lastElementChild.classList.remove('spoiler-content');
            });
        }
    }
    allSpoilers.forEach(element => {
        element.firstElementChild.addEventListener('click', toggleSpoilerState);
    });
}

function toggleSpoilerState(event) {
    let targetSpoiler = event.target;
    let spoilerContent = targetSpoiler.nextElementSibling;

    targetSpoiler.classList.toggle('active');
    spoilerContent.classList.toggle('active');
}

toggleSpoilers();
window.addEventListener(`resize`, toggleSpoilers);