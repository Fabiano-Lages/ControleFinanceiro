import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { IEstado } from "../interfaces/IEstado.ts";
import { IEstadoCorretora, corretora } from "./modulos/corretora/index.ts";
import { IEstadoTipoInvestimento, tipoInvestimento } from "./modulos/tipoinvestimento/index.ts";
import { IEstadoPapel, papel } from "./modulos/papel/index.ts";
import { IEstadoMoeda, moeda } from "./modulos/moeda/index.ts";
import { Notificacao } from "./mutations.ts";
import { INotificacao } from "../interfaces/INotificacao.ts";

export const key: InjectionKey<Store<IEstado>> = Symbol();

export const store = createStore<IEstado>({
   state: {
      usuario: { 
         id: 1,
         nome: "Fabiano Teixeira Lages",
         email: "fabianolages@gmail.com",
         senha: ""
      },
      corretora: {} as IEstadoCorretora,
      tipoInvestimento: {} as IEstadoTipoInvestimento,
      papel: {} as IEstadoPapel,
      moeda: {} as IEstadoMoeda,
      notificacoes: []
   },
   mutations: {
      [Notificacao.NOTIFICAR](state, novaNotificacao: INotificacao) {
         novaNotificacao.id = new Date().getTime();
         state.notificacoes.push(novaNotificacao);

         setTimeout(() => {
               state.notificacoes.splice(state.notificacoes.findIndex(ntf => ntf.id == novaNotificacao.id), 1);
         }, 5000);
      }
   },
   actions: {
      
   },
   modules: {
      corretora,
      tipoInvestimento,
      papel,
      moeda
   }
});

export function useStore() : Store<IEstado> {
   return vuexUseStore(key);
};