import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";

import IEstado from "../interfaces/IEstado";

export const key: InjectionKey<Store<IEstado>> = Symbol();

export const store = createStore<IEstado>({

});

export function useStore() : Store<IEstado> {
   return vuexUseStore(key);
};