import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { banco } from "../services/banco.ts";

import { IEstado } from "../interfaces/IEstado.ts";

export const key: InjectionKey<Store<IEstado>> = Symbol();

export const store = createStore<IEstado>({
   state: {
      usuario: "Fabiano Teixeira Lages"
   },
   mutations: {

   },
   actions: {

   }
});

export function useStore() : Store<IEstado> {
   banco.iniciaBanco();
   return vuexUseStore(key);
};