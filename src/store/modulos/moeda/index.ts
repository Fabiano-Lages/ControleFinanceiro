import { IGenerico }  from "../../../interfaces/IGenerico.ts";
import { IEstado }  from "../../../interfaces/IEstado.ts";
import { banco } from "../../../services/banco.ts";
import { acaoMoeda } from "../../actions.ts";
import { mutacaoMoeda } from "../../mutations.ts";
import { Module } from "vuex";
import { ordenaLista } from "../../../services/funcoes.ts";

export interface IEstadoMoeda {
   moedas: IGenerico[]
}

const tabela = "moeda";

export const moeda: Module<IEstadoMoeda, IEstado> = {
   mutations: {
      [mutacaoMoeda.LISTA](state, lista: IGenerico[]) {
         state.moedas = lista;
         ordenaLista(state.moedas);
      },
      [mutacaoMoeda.ADICIONA](state, corretora: IGenerico) {
         state.moedas.push(corretora);
         ordenaLista(state.moedas);
      },
      [mutacaoMoeda.ALTERA](state, corretora: IGenerico) {
         const index = state.moedas.findIndex((c:IGenerico) => c.id === corretora.id);
         if (index !== -1) {
            state.moedas[index] = corretora;
            ordenaLista(state.moedas);
         }
      },
      [mutacaoMoeda.EXCLUI](state, id: number) {
         const index = state.moedas.findIndex((c:IGenerico) => c.id === id);
         if (index !== -1) {
            state.moedas.splice(index, 1);
         }
      }
   },
   actions: {
      [acaoMoeda.LISTA](context) {
         return(
            banco
               .listaRegistros(tabela)
               .then((lista) => {
                  context.commit(mutacaoMoeda.LISTA, lista);
               })
         );
      },
      [acaoMoeda.ADICIONA](context, moeda: IGenerico) {
         return(
            banco
               .addData(tabela, JSON.parse(JSON.stringify(moeda)))
               .then((id) => {
                  moeda.id = id;
                  context.commit(mutacaoMoeda.ADICIONA, moeda);
               })
               .catch((error) => {
                  console.error("Erro ao adicionar moeda: ", error);
               })
         );
      },
      [acaoMoeda.ALTERA](context, moeda: IGenerico) {
         return(
            banco
               .updateData(tabela, moeda.id, moeda)
               .then(() => {
                  context.commit(mutacaoMoeda.ALTERA, moeda);
               })
               .catch((error) => {
                  console.error("Erro ao alterar moeda: ", error);
               })
         );
      },
      [acaoMoeda.EXCLUI](context, id: number) {
         return(
            banco
               .findData("investimento", "idMoeda", id.toString())
               .then((existe : boolean) => {
                  if (!existe) {
                     banco
                        .deleteData(tabela, id)
                        .then(() => {
                           context.commit(mutacaoMoeda.EXCLUI, id);
                        })
                        .catch((error) => {
                           console.error("Erro ao excluir moeda: ", error);
                        });
                  } else {
                     console.error("Erro ao excluir moeda: Moeda está vinculada a um investimento.");
                  }
               })
               .catch((error) => {
                  console.error("Erro ao verificar vinculo de moeda: ", error);
               })
         );
      }
   }
};