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
      campos: ["nome"],
      indices: ["nome"]
   },
   { 
      tabela: 'investimento', 
      campos: ["idCorretora", "idPapel", "quantidade", "custoMedio", "valorInvestido", "valorAtual"],
      indices: ["nome", "*idCorretora,idPapel"]
   },
   {
      tabela: 'historicoPreco',
      campos: ["idInvestimento", "data", "quantidade", "valorUnitarioUS", "valorAtualUS", "cotacaoUS", "valorUnitario", "valorAtual"],
      indices: ["idInvestimento", "data"]
   },
   {
      tabela: 'historicoCotacao',
      campos: ["data", "valor"],
      indices: ["data"]
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
   }
];