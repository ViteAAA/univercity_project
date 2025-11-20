const closeBtn = document.querySelector('#sidebar-close');
const sidebar = document.querySelector('#sidebar');
const sidebarCont = document.querySelector('#sidebar-content')
const burgerHeader = document.querySelector('#header-burger-menu');

closeBtn.addEventListener('click', () => {
    sidebar.classList.add('transition');
})



document.addEventListener('DOMContentLoaded', () => {
    function renderMenu(btn, element) {
        if (btn) {
            btn.addEventListener('click', () => {
                console.log(element.innerHTML)
                element.classList.remove('hidden');
                sidebarCont.innerHTML = element.innerHTML;
                sidebar.classList.remove('transition');
            })
        }
    }

    renderMenu(document.querySelector('#header-burger-menu'), document.querySelector('.menu'));
    renderMenu(document.querySelector('.preview-burger-menu'), document.querySelector('#preview-menu'));    
    
})