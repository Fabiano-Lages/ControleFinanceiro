import { IGenerico }  from "../../../interfaces/IGenerico.ts";
import { IEstado }  from "../../../interfaces/IEstado.ts";
import { banco } from "../../../services/banco.ts";
import { acaoCorretora } from "../../actions.ts";
import { mutacaoCorretora } from "../../mutations.ts";
import { Module } from "vuex";
import { ordenaLista } from "../../../services/funcoes.ts";

export interface IEstadoCorretora {
   corretoras: IGenerico[]
}

export const corretora: Module<IEstadoCorretora, IEstado> = {
   mutations: {
      [mutacaoCorretora.LISTA](state, lista: IGenerico[]) {
         state.corretoras = lista;
      },
      [mutacaoCorretora.ADICIONA](state, corretora: IGenerico) {
         state.corretoras.push(corretora);
         ordenaLista(state.corretoras);
      },
      [mutacaoCorretora.ALTERA](state, corretora: IGenerico) {
         const index = state.corretoras.findIndex((c) => c.id === corretora.id);
         if (index !== -1) {
            state.corretoras[index] = corretora;
            ordenaLista(state.corretoras);
         }
      },
      [mutacaoCorretora.EXCLUI](state, id: number) {
         const index = state.corretoras.findIndex((c) => c.id === id);
         if (index !== -1) {
            state.corretoras.splice(index, 1);
         }
      }
   },
   actions: {
      [acaoCorretora.LISTA](context) {
         return(
            banco
               .listaRegistros("corretora")
               .then((lista) => {
                  context.commit(mutacaoCorretora.LISTA, lista);
               })
         );
      },
      [acaoCorretora.ADICIONA](context, corretora: IGenerico) {
         return(
            banco
               .addData("corretora", JSON.parse(JSON.stringify(corretora)))
               .then((id) => {
                  corretora.id = id;
                  context.commit(mutacaoCorretora.ADICIONA, corretora);
               })
               .catch((error) => {
                  console.error("Erro ao adicionar corretora: ", error);
               })
         );
      },
      [acaoCorretora.ALTERA](context, corretora: IGenerico) {
         return(
            banco
               .updateData("corretora", corretora.id, corretora)
               .then(() => {
                  context.commit(mutacaoCorretora.ALTERA, corretora);
               })
               .catch((error) => {
                  console.error("Erro ao alterar corretora: ", error);
               })
         );
      },
      [acaoCorretora.EXCLUI](context, id: number) {
         return(
            banco
               .deleteData("corretora", id)
               .then(() => {
                  context.commit(mutacaoCorretora.EXCLUI, id);
               })
               .catch((error) => {
                  console.error("Erro ao excluir corretora: ", error);
               })
         );
      }
   }
};