import { IPapel }  from "../../../interfaces/IPapel.ts";
import { IEstado }  from "../../../interfaces/IEstado.ts";
import { banco } from "../../../services/banco.ts";
import { acaoPapel } from "../../actions.ts";
import { mutacaoPapel } from "../../mutations.ts";
import { Module } from "vuex";
import { ordenaLista } from "../../../services/funcoes.ts";

export interface IEstadoPapel {
   papeis: IPapel[]
}

const tabela = "papel";

export const papel: Module<IEstadoPapel, IEstado> = {
   mutations: {
      [mutacaoPapel.LISTA](state, lista: IPapel[]) {
         state.papeis = lista;
      },
      [mutacaoPapel.ADICIONA](state, papel: IPapel) {
         state.papeis.push(papel);
         ordenaLista(state.papeis);
      },
      [mutacaoPapel.ALTERA](state, papel: IPapel) {
         const index = state.papeis.findIndex((c) => c.id === papel.id);
         if (index !== -1) {
            state.papeis[index] = papel;
            ordenaLista(state.papeis);
         }
      },
      [mutacaoPapel.EXCLUI](state, id: number) {
         const index = state.papeis.findIndex((c) => c.id === id);
         if (index !== -1) {
            state.papeis.splice(index, 1);
         }
      }
   },
   actions: {
      [acaoPapel.LISTA](context) {
         return(
            banco
               .listaRegistros(tabela)
               .then((lista) => {
                  context.commit(mutacaoPapel.LISTA, lista);
               })
         );
      },
      [acaoPapel.ADICIONA](context, papel: IPapel) {
         return(
            banco
               .addData(tabela, JSON.parse(JSON.stringify(papel)))
               .then((id) => {
                  papel.id = id;
                  context.commit(mutacaoPapel.ADICIONA, papel);
               })
               .catch((error) => {
                  console.error("Erro ao adicionar papel: ", error);
               })
         );
      },
      [acaoPapel.ALTERA](context, papel: IPapel) {
         return(
            banco
               .updateData(tabela, papel.id, papel)
               .then(() => {
                  context.commit(mutacaoPapel.ALTERA, papel);
               })
               .catch((error) => {
                  console.error("Erro ao alterar o papel: ", error);
               })
         );
      },
      [acaoPapel.EXCLUI](context, id: number) {
         return(
            banco
               .findData("investimento", "idPapel", id.toString())
               .then((existe : boolean) => {
                  if (!existe) {
                     banco
                        .deleteData(tabela, id)
                        .then(() => {
                           context.commit(mutacaoPapel.EXCLUI, id);
                        })
                        .catch((error) => {
                           console.error("Erro ao excluir o papel: ", error);
                        });
                  } else {
                     console.error("Erro ao excluir o papel: Papel está vinculado a um papel.");
                  }
               })
         );
      }
   }
};