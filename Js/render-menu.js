const closeBtn = document.querySelector('#sidebar-content');
const sidebar = document.querySelector('#sidebar');
const burgerHeader = document.querySelector('#header-burger-menu');

closeBtn.addEventListener('click', () => {
    sidebar.classList.add('transition');
})



document.addEventListener('DOMContentLoaded', () => {
    burgerHeader.addEventListener('click', () => {
        sidebar.classList.remove('transition');
    })
})