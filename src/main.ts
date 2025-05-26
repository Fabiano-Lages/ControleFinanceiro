import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import { store, key } from './store/index.ts';
import App from './App.vue';
import roteador from './router/index.ts';
import { banco } from './services/banco.ts';

banco.iniciaBanco();

createApp(App)
   .use(roteador)
   .use(store, key)
   .mount('#app');