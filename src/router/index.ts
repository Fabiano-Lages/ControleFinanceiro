import { createRouter, createWebHistory } from 'vue-router';
import DashBoard from '../views/DashBoard.vue';

const roteador = createRouter({
    history: createWebHistory(),
    routes: [ 
        {
            path: "/",
            name: "DashBoard",
            component: DashBoard
        },
        {
            path: "/corretora",
            name: "Corretora",
            component: () => import("../views/ListaCorretoras.vue")
        }
    ]
});

roteador.afterEach(() => {
    const dropdownElement = document.querySelector('.dropdown-menu');
    if (dropdownElement && dropdownElement.classList.contains("show")) {
        dropdownElement.classList.remove("show");
    }
});

export default roteador;