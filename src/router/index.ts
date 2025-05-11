import { createRouter, createWebHistory } from 'vue-router';

const roteador = createRouter({
    history: createWebHistory(),
    routes: [ 
    ]
});

roteador.afterEach(() => {
    const dropdownElement = document.querySelector('.dropdown-menu');
    if (dropdownElement && dropdownElement.classList.contains("show")) {
        dropdownElement.classList.remove("show");
    }
});

export default roteador;