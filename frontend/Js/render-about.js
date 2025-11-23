import {aboutInfo} from './data.js'


document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelectorAll('#about-render');
    const info = document.querySelectorAll('#about-info');
    element.forEach((item, i) => {
        item.textContent = aboutInfo[`${info[i].textContent}`]
    });
    // aboutInfo.forEach((el, index) => {
    //     console.log(el)
    //     console.log(el);
    //     element[index].textContent = el;
        
    // });
})

