import { estrutura } from "./estrutura.ts";

export const banco = {
   db : null as null | IDBDatabase,
   nomeBanco: "FTL-Financeiro" as string,
   iniciaBanco: function() : Promise<void> {
      return(
         new Promise((resolve, reject) => {
            const request = indexedDB.open(this.nomeBanco, 1);
            request.onupgradeneeded = function(event) {
               banco.criaBanco(event.target as IDBOpenDBRequest)
                  .then(() => {
                     console.log('Banco criado com sucesso');
                  })
                  .catch((error) => {
                     console.error('Erro ao criar o banco: ', error);
                  });
            };
      
            request.onsuccess = function(event) {
               if (event.target) {
                  banco.db = (event.target as IDBOpenDBRequest).result;
               }
               resolve();
            };
         
            request.onerror = function(event) {
               reject('Erro de banco: ' + (event.target as IDBRequest).error?.name);
            };
         })
      );
   },
   addData: function(tabela : string, data: object) : Promise<number> {
      return(
         new Promise((resolve, reject) => {
            if(this.db) {
               const transaction = this.db.transaction(tabela, 'readwrite');
               const objectStore = transaction.objectStore(tabela);
               const request = objectStore.add(data);

               request.onsuccess = function() {
                  resolve(Number(request.result));
               };
            
               request.onerror = function(event) {
                  reject('Erro adicionando registro: ' + (event.target as IDBRequest).error?.name);
               };
            } else {
               reject('Banco não inicializado');
            }
         })
      );
   },
   getData: function(tabela : string, id : number) : Promise<IDBRequest> {
      return(
         new Promise((resolve, reject) => {
            if(this.db) {
               const transaction = this.db.transaction(tabela, 'readonly');
               const objectStore = transaction.objectStore(tabela);
               const request = objectStore.get(id);
               
               request.onsuccess = function(event) {
                  resolve((event.target as IDBRequest).result);
               };
            
               request.onerror = function(event) {
                  reject('Erro recuperando registro: ' + (event.target as IDBRequest).error?.name);
               };
            } else {
               reject('Banco não inicializado');
            }
         })
      );
   },
   findData: function(tabela: string, campo: string, valor: string): Promise<boolean> {
      return (
         new Promise((resolve, reject) => {
            if (this.db) {
               const transaction = this.db.transaction(tabela, 'readonly');
               const objectStore = transaction.objectStore(tabela);

               let request: IDBRequest;
               try {
                  const index = objectStore.index(campo);
                  request = index.getAll(valor);
               } catch {
                  request = objectStore.openCursor();
                  const results = [];
                  request.onsuccess = function(event) {
                     const cursor = (event.target as IDBRequest).result;
                     if (cursor) {
                        if (cursor.value && cursor.value[campo] == valor) {
                           results.push(cursor.value);
                        }
                        cursor.continue();
                     } else {
                        resolve(results.length > 0);
                     }
                  };
                  request.onerror = function(event) {
                     reject('Erro recuperando registro: ' + (event.target as IDBRequest).error?.name);
                  };
               }

               request.onsuccess = function(event) {
                  const result = (event.target as IDBRequest).result;
                  resolve(Array.isArray(result) ? result.length > 0 : !!result);
               };

               request.onerror = function(event) {
                  reject('Erro recuperando registro: ' + (event.target as IDBRequest).error?.name);
               };
            } else {
               reject('Banco não inicializado');
            }
         })
      );
   },
   updateData: function(tabela: string, id: number, updatedData: object) : Promise<boolean> {
      return(
         new Promise((resolve, reject) => {
            if(this.db) {
               const transaction = this.db.transaction(tabela, 'readwrite');
               const objectStore = transaction.objectStore(tabela);
               const request = objectStore.put({ ...updatedData, id });
            
               request.onsuccess = function() {
                  resolve(true);
               };
            
               request.onerror = function(event: Event) {
                  reject('Erro atualizando registro: ' + (event.target as IDBRequest).error?.name);
               };
            }
         })
      );
   },
   deleteData: function(tabela: string, id : number) : Promise<boolean> {
      return(
         new Promise((resolve, reject) => {
            if(this.db) {
               const transaction = this.db.transaction(tabela, 'readwrite');
               const objectStore = transaction.objectStore(tabela);
               const request = objectStore.delete(id);
      
               request.onsuccess = function() {
                  resolve(true);
               };
      
               request.onerror = function(event: Event) {
                  reject('Erro apagando registro: ' + (event.target as IDBRequest).error?.name);
               };
            } else {
               reject('Banco não inicializado');
            }
         })
      );
   },
   criaBanco: function(target : IDBOpenDBRequest) : Promise<void> {
      return(
         new Promise((resolve, reject) => {
            if (target) {
               this.db = target.result;
               
               estrutura.forEach(estr => {
                  if(this.db) {
                     const objectStore : IDBObjectStore = this.db.createObjectStore(estr.tabela, { keyPath: 'id', autoIncrement: true });
                     estr.indices.forEach((indice : string, n : number) => {
                        const nome  = indice.replace("*","");
                        objectStore.createIndex((estr.tabela + "-" + n), (nome.indexOf(",") > -1 ? nome.split(',') : nome), { unique: indice.startsWith("*") });
                     });
                  }
               });
               resolve();
            } else {
               reject('Banco não inicializado');
            }
         })
      );
   },
   listaRegistros: (tabela : string) : Promise<object[]> => {
      return(
         new Promise((resolve, reject) => {
            if(banco.db) {
               const transaction = banco.db.transaction(tabela, 'readonly');
               const objectStore = transaction.objectStore(tabela);
               const request = objectStore.getAll();
               request.onsuccess = function(event) {
                  resolve((event.target as IDBRequest).result);
               };
            
               request.onerror = function(event) {
                  reject((event.target as IDBRequest).error?.name);
               };
            } else {
               reject('Banco não inicializado');
            }
         })
      );
   },
   importDatabase: (bancoJson: Record<string, object[]>) => {
      return(
         new Promise((resolve, reject) => {
            if(banco.db) {
               const transaction = banco.db.transaction(Array.from(banco.db.objectStoreNames), 'readwrite');
               let storesProcessed = 0;

               Object.keys(bancoJson).forEach(storeName  => {
                  const objectStore = transaction.objectStore(storeName);
                  const storeData = bancoJson[storeName];

                  storeData.forEach(item => {
                     objectStore.put(item);
                  });
                  storesProcessed++;
               });

               transaction.oncomplete = function(event) {
                  if (storesProcessed === Object.keys(bancoJson).length) {
                     resolve(true);
                  } else {
                     reject('Erro ao importar dados: ' + (event.target as IDBRequest).error?.name);
                  }
               };

               transaction.onerror = function(event) {
                  reject('Erro ao importar dados: ' + (event.target as IDBRequest).error?.name);
               };
            }
         })
      );
   },
   exportDatabase: () : Promise<boolean> => {
      return(
         new Promise((resolve, reject) => {
            const _db : IDBDatabase | null = banco.db;
            if(_db) {
               const transaction = _db.transaction(Array.from(_db.objectStoreNames), 'readonly');
               const exportData: Record<string, object[]> = {};
         
               let storesProcessed = 0;

               const tabelas = Array.from(_db.objectStoreNames);
         
               tabelas.forEach(storeName => {
                  const objectStore = transaction.objectStore(storeName);
                  const cursorRequest = objectStore.openCursor();
                  exportData[storeName] = [];
         
                  cursorRequest.onsuccess = function (event) {
                     if (event.target) {
                        const cursor = (event.target as IDBRequest).result;
                        if (cursor) {
                           exportData[storeName].push(cursor.value);
                           cursor.continue();
                        } else {
                           storesProcessed++;
                        }

                        if (storesProcessed === _db.objectStoreNames.length) {
                           const jsonData = JSON.stringify(exportData, null, 2);
                           const blob = new Blob([jsonData], { type: 'application/json' });
                           const url = URL.createObjectURL(blob);
            
                           const a = document.createElement('a');
                           a.href = url;
                           a.download = 'indexeddb_dump.json';
                           document.body.appendChild(a);
                           a.click();
                           document.body.removeChild(a);

                           resolve(true);
                        }
                     } else {
                        reject('Erro: event.target é null.');
                     }
                  };
                  
                  cursorRequest.onerror = function (event) {
                     reject('Erro ao exportar store: ' + storeName + " - " + (event.target as IDBRequest).error?.name);
                  };
               });
            } else {
               reject('Banco não inicializado');
            }
         })
      );
   }
};