import {aboutInfo} from './data.js'


document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelectorAll('#about-render');
    const info = document.querySelectorAll('#about-info');
    console.log(element)
    console.log(element[0])
    element.forEach((item, i) => {
        console.log(info[i].textContent)
        item.textContent = aboutInfo[`${info[i].textContent}`]
    });
    // aboutInfo.forEach((el, index) => {
    //     console.log(el)
    //     console.log(el);
    //     element[index].textContent = el;
        
    // });
})

