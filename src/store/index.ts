import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { banco } from "../services/banco.ts";
import { IEstado } from "../interfaces/IEstado.ts";
import { IEstadoCorretora, corretora } from "./modulos/corretora/index.ts";

export const key: InjectionKey<Store<IEstado>> = Symbol();

export const store = createStore<IEstado>({
   state: {
      usuario: { 
         id: 1,
         nome: "Fabiano Teixeira Lages"
      },
      corretora: {} as IEstadoCorretora
   },
   mutations: {
      
   },
   actions: {
      
   },
   modules: {
      corretora
   }
});

export function useStore() : Store<IEstado> {
   banco.iniciaBanco();
   return vuexUseStore(key);
};