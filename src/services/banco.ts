export const banco = {
   db : null as null | IDBDatabase,
   nomeBanco: "FTL-Financeiro" as string,
   iniciaBanco: function() : void {
      const request = indexedDB.open(this.nomeBanco, 1);

      request.onupgradeneeded = function(event) {
         if (event.target) {
            banco.db = (event.target as IDBOpenDBRequest).result;
         }
         estrutura.forEach(estr => {
            if(banco.db) {
               const objectStore : IDBObjectStore = banco.db.createObjectStore(estr.tabela, { keyPath: 'id', autoIncrement: true });
               estr.indices.forEach((indice : string, n : number) => {
                  const nome  = indice.replace("*","");
                  objectStore.createIndex((estr.tabela + "-" + n), (nome.indexOf(",") > -1 ? nome.split(',') : nome), { unique: indice.startsWith("*") });
               });
            }
         });
      };
   
      request.onsuccess = function(event) {
         if (event.target) {
            banco.db = (event.target as IDBOpenDBRequest).result;
         }
         console.log('Banco aberto com sucesso');
      };
   
      request.onerror = function(event) {
         console.error('Erro de banco:', (event.target as IDBRequest).error?.name);
      };
   },
   addData: function(tabela : string, data: object) : null | number {
      let retorno = null;
      if(this.db) {
         const transaction = this.db.transaction(tabela, 'readwrite');
         const objectStore = transaction.objectStore(tabela);
         const request = objectStore.add(data);

         request.onsuccess = function() {
            console.log('Registro adicionado com sucesso');
            retorno = (request as IDBRequest).result.id;
         };

         request.onerror = function(event) {
            console.error('Erro adicionado registro:', (event.target as IDBRequest).error?.name);
         };
      }
      return(retorno);
   },
   getData: function(tabela : string, id : number) : null | object {
      let retorno = null;
      if(this.db) {
         const transaction = this.db.transaction(tabela, 'readonly');
         const objectStore = transaction.objectStore(tabela);
         const request = objectStore.get(id);
      
         request.onsuccess = function(event) {
            retorno = (event.target as IDBRequest).result;
            console.log('Registro recuperado:', retorno);
         };
      
         request.onerror = function(event) {
            console.error('Erro recuperando registro:', (event.target as IDBRequest).error?.name);
         };
      }
      return(retorno);
   },
   updateData: function(tabela : string, id : number, updatedData : object) : boolean {
      let retorno = false;
      if(this.db) {
         const transaction = this.db.transaction(tabela, 'readwrite');
         const objectStore = transaction.objectStore(tabela);
         const request = objectStore.put({ ...updatedData, id });
      
         request.onsuccess = function() {
            console.log('Registro atualizado com sucesso');
            retorno = true;
         };
      
         request.onerror = function(event: Event) {
            console.error('Erro atualizando registro:', (event.target as IDBRequest).error?.name);
         };
      }
      return(retorno);
    },
    deleteData: function(tabela: string, id : number) : boolean {
      let retorno = false;
      if(this.db) {
         const transaction = this.db.transaction(tabela, 'readwrite');
         const objectStore = transaction.objectStore(tabela);
         const request = objectStore.delete(id);
      
         request.onsuccess = function() {
            console.log('Registro apagado com sucesso');
            retorno = true;
         };
      
         request.onerror = function(event: Event) {
         console.error('Erro apagando registro:', (event.target as IDBRequest).error?.name);
         };
      }
      return(retorno);
   }
};

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