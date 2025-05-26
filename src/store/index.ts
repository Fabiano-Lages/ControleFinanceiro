import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { banco } from "../services/banco.ts";
import { IEstado } from "../interfaces/IEstado.ts";
import { IEstadoCorretora, corretora } from "./modulos/corretora/index.ts";
import { IEstadoTipoInvestimento, tipoInvestimento } from "./modulos/tipoinvestimento/index.ts";
import { IEstadoPapel, papel } from "./modulos/papel/index.ts";

export const key: InjectionKey<Store<IEstado>> = Symbol();

export const store = createStore<IEstado>({
   state: {
      usuario: { 
         id: 1,
         nome: "Fabiano Teixeira Lages"
      },
      corretora: {} as IEstadoCorretora,
      tipoInvestimento: {} as IEstadoTipoInvestimento,
      papel: {} as IEstadoPapel
   },
   mutations: {
      
   },
   actions: {
      
   },
   modules: {
      corretora,
      tipoInvestimento,
      papel
   }
});

export function useStore() : Store<IEstado> {
   banco.iniciaBanco();
   return vuexUseStore(key);
};