import {aboutInfo} from './data.js'

function renderInfo(item) {
    return `
        <li>${item}</li>
    `
}

document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelectorAll('#about-render');
    console.log(element[0])
    aboutInfo.forEach((el, i) => {
        el.forEach(item => {
            console.log(element[i]);
            element[i].innerHTML += renderInfo(item);
        });
    });
})

