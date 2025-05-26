import { IGenerico }  from "../../../interfaces/IGenerico.ts";
import { IEstado }  from "../../../interfaces/IEstado.ts";
import { banco } from "../../../services/banco.ts";
import { acaoTipoInvestimnento } from "../../actions.ts";
import { mutacaoTipoInvestimento } from "../../mutations.ts";
import { Module } from "vuex";
import { ordenaLista } from "../../../services/funcoes.ts";

export interface IEstadoTipoInvestimento {
   tipoInvestimentos: IGenerico[]
}

const tabela = "tipoInvestimento";

export const tipoInvestimento: Module<IEstadoTipoInvestimento, IEstado> = {
   mutations: {
      [mutacaoTipoInvestimento.LISTA](state, lista: IGenerico[]) {
         state.tipoInvestimentos = lista;
      },
      [mutacaoTipoInvestimento.ADICIONA](state, tipoInvestimento: IGenerico) {
         state.tipoInvestimentos.push(tipoInvestimento);
         ordenaLista(state.tipoInvestimentos);
      },
      [mutacaoTipoInvestimento.ALTERA](state, tipoInvestimento: IGenerico) {
         const index = state.tipoInvestimentos.findIndex((c) => c.id === tipoInvestimento.id);
         if (index !== -1) {
            state.tipoInvestimentos[index] = tipoInvestimento;
            ordenaLista(state.tipoInvestimentos);
         }
      },
      [mutacaoTipoInvestimento.EXCLUI](state, id: number) {
         const index = state.tipoInvestimentos.findIndex((c) => c.id === id);
         if (index !== -1) {
            state.tipoInvestimentos.splice(index, 1);
         }
      }
   },
   actions: {
      [acaoTipoInvestimnento.LISTA](context) {
         return(
            banco
               .listaRegistros(tabela)
               .then((lista) => {
                  context.commit(mutacaoTipoInvestimento.LISTA, lista);
               })
         );
      },
      [acaoTipoInvestimnento.ADICIONA](context, tipoInvestimento: IGenerico) {
         return(
            banco
               .addData(tabela, JSON.parse(JSON.stringify(tipoInvestimento)))
               .then((id) => {
                  tipoInvestimento.id = id;
                  context.commit(mutacaoTipoInvestimento.ADICIONA, tipoInvestimento);
               })
               .catch((error) => {
                  console.error("Erro ao adicionar tipo de investimento: ", error);
               })
         );
      },
      [acaoTipoInvestimnento.ALTERA](context, tipoInvestimento: IGenerico) {
         return(
            banco
               .updateData(tabela, tipoInvestimento.id, tipoInvestimento)
               .then(() => {
                  context.commit(mutacaoTipoInvestimento.ALTERA, tipoInvestimento);
               })
               .catch((error) => {
                  console.error("Erro ao alterar tipo de investimento: ", error);
               })
         );
      },
      [acaoTipoInvestimnento.EXCLUI](context, id: number) {
         return(
            banco
               .findData("papel", "idTipoInvestimento", id.toString())
               .then((existe : boolean) => {
                  if (!existe) {
                     banco
                        .deleteData(tabela, id)
                        .then(() => {
                           context.commit(mutacaoTipoInvestimento.EXCLUI, id);
                        })
                        .catch((error) => {
                           console.error("Erro ao excluir tipo de investimento: ", error);
                        });
                  } else {
                     console.error("Erro ao excluir tipo de investimento: Tipo de investimento está vinculado a um papel.");
                  }
               })
         );
      }
   }
};