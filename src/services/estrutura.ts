import { IEstrutura } from "../interfaces/IEstrutura.ts";

export const estrutura = [
   { 
      tabela: 'corretora', 
      campos: ["nome"],
      indices: ["nome"]
   },
   { 
      tabela: 'tipoInvestimento', 
      campos: ["nome"],
      indices: ["nome"]
   },
   { 
      tabela: 'papel', 
      campos: ["nome", "idTipoInvestimento"],
      indices: ["nome"]
   },
   { 
      tabela: 'moeda', 
      campos: ["nome"],
      indices: ["nome"]
   },
   { 
      tabela: 'investimento', 
      campos: ["idCorretora", "idPapel", "tipo", "moeda", "quantidade", "custoMedio", "valorInvestido", "valorLocal", "Taxa", "valorReal"],
      indices: ["nome", "*idCorretora, idPapel"]
   },
   {
      tabela: 'historicoPreco',
      campos: ["idInvestimento", "data", "quantidade", "valorUnitarioLocal", "valorAtualLocal",  "taxa", "valorUnitario", "valorAtual", "diferenca", "percentual"],
      indices: ["idInvestimento", "data"]
   },
   {
      tabela: 'historicoCotacao',
      campos: ["data", "idMoeda", "taxa"],
      indices: ["taxa"]
   },
   {
      tabela: 'historicoDividendos',
      campos: ["idInvestimento", "data", "valor"],
      indices: ["idInvestimento", "data"]
   },
   {
      tabela: 'historicoRendimentos',
      campos: ["idInvestimento", "data", "valor"],
      indices: ["idInvestimento", "data"]
   },
   {
      tabela: 'historicoCambio',
      campos: ["idInvestimento", "data", "valorLocal", "valorUS", "IOF", "cotacao"],
      indices: ["idInvestimento", "data"]
   },
   {
      tabela: 'movimento',
      campos: ["idInvestimento", "data",  "valor", "quantidade", "total"],
      indices: ["idInvestimento", "data"]
   },
   {
      tabela: "usuario",
      campos: ["nome", "email", "senha", "password"],
      indices: ["nome", "email"]
   }
] as IEstrutura[];