<template>
   <div class="principal">
      <header>
         <TituloListas valor="Investimentos" />
      </header>
      <div class="trabalho">
         <div class="controle">
            <div>
               <label>Filtro:</label>
               <select>
                  <option value="">Todos</option>
                  <option value="Corretora">Corretora</option>
                  <option value="Papel">Papel</option>
               </select>
               <select>
                  <option value="">Todos</option>
                  <option value="Itaú">Itaú</option>
                  <option value="Rico">Rico</option>
                  <option value="INCO">INCO</option>
               </select>
               <select>
                  <option value="">Todos</option>
                  <option value="MXRF11">MXRF11</option>
                  <option value="KNRI11">KNCR11</option>
                  <option value="BTHF11">BTHF11</option>
               </select>
            </div>
            <div>
               <button type="button" class="btn btn-primary" title="Adicionar Investimento"><i class="bi bi-plus-lg"></i></button>
               <button type="button" class="btn btn-secondary" title="Editar Investimento"><i class="bi bi-pen"></i></button>
               <button type="button" class="btn btn-danger" title="Remover Investimento"><i class="bi bi-trash"></i></button>
            </div>
            <div>
               <button type="button" class="btn btn-success" title="Adicionar movimentação"><i class="bi bi-cart-plus"></i></button>
               <button type="button" class="btn btn-warning" title="Listar Movimentações"><i class="bi bi-list-columns"></i></button>
               <button type="button" class="btn btn-info" title="Listar cotações"><i class="bi bi-currency-exchange"></i></button>
               <button type="button" class="btn btn-primary" title="Atualizar cotações"><i class="bi bi-arrow-clockwise"></i></button>
            </div>
         </div>
         <div class="corpo">
            <table>
               <thead>
                  <tr>
                     <th>Corretora</th>
                     <th>Papel</th>
                     <th>Tipo</th>
                     <th>Moeda</th>
                     <th>Valor Local</th>
                     <th>Taxa</th>
                     <th>Valor R$</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>Rico</td>
                     <td>MXRF11</td>
                     <td>FII BR</td>
                     <td>Real</td>
                     <td>5.000,00</td>
                     <td>1,00</td>
                     <td>5.000,00</td>
                  </tr>
                  <tr class="selecionado">
                     <td>Rico</td>
                     <td>GAME11</td>
                     <td>FII BR</td>
                     <td>Real</td>
                     <td>9.000,00</td>
                     <td>1,00</td>
                     <td>9.000,00</td>
                  </tr>
                  <tr>
                     <td>Avenue</td>
                     <td>APPL</td>
                     <td>Ação US</td>
                     <td>Dólar</td>
                     <td>2.000,00</td>
                     <td>5,06</td>
                     <td>10.120,00</td>
                  </tr>
               </tbody>
               <tfoot>
                  <tr>
                     <th colspan="6">Patrimônio:</th>
                     <th>24.120,00</th>
                  </tr>
               </tfoot>
            </table>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import { defineComponent } from "vue";
   import TituloListas from '../components/TituloListas.vue';

   export default defineComponent({
      name: "Investimentos",
      components: {
         TituloListas
      }
   });
</script>

<style scoped>
   .trabalho {
      gap: 10px;
   }

   .controle {
      width: 97%;
      display: flex;
      justify-content: flex-end;
      gap: 50px;
   }

   .controle select {
      padding: 5px 20px;
      margin-left: 10px;
      background-color: #ddd;
      color: #444;
      font-weight: bold;
   }

   .controle select option {
      font-weight: normal;
      background-color: #ddd;
      font-weight: 500;
   }

   .corpo {
      width: 100%;
   }

   table {
      border-collapse: collapse;
      width: 95%;
      margin: 0 auto;
   }
   thead {
      background-color: #333;
   }

   thead th {
      padding: 8px 15px;
      border-bottom: 1px solid #ddd;
      text-align: center;
      color: whitesmoke;
   }

   thead th:nth-of-type(1) {
      width: 25%;
      text-align: center;
   }
   thead th:nth-of-type(2) {
      width: 25%;
   }
   thead th:nth-of-type(3) {
      width: 10%;
   }
   thead th:nth-of-type(4) {
      width: 15%;
   }
   thead th:nth-of-type(5) {
      width: 10%;
   }
   thead th:nth-of-type(6) {
      width: 5%;
   }
   thead th:nth-of-type(7) {
      width: 10%;
   }

   td {
      padding: 3px 15px;
      text-align: center;
   }
   
   td:nth-of-type(2) {
      text-align: center;
   }
   td:nth-of-type(3) {
      text-align: center;
   }
   td:nth-of-type(4) {
      text-align: center;
   }
   td:nth-of-type(5) {
      text-align: right;
   }
   td:nth-of-type(6) {
      text-align: right;
   }
   td:nth-of-type(7) {
      text-align: right;
   }

   tbody tr {
      background-color: #777;
      color: #eee;
   }
   
   tbody tr:nth-child(even) {
      background-color: #aaa;
      color: #000;
   }

   tbody tr:hover {
      background-color: rgb(62, 70, 143);
      color: #eee;
      cursor: pointer;
   }

   tbody tr.selecionado {
      background-color: rgb(172, 106, 25);
      color: #eee;
   }

   tfoot {
      background-color: #333;
   }

   tfoot th {
      padding: 8px 15px;
      border-top: 1px solid #ddd;
      text-align: right;
   }
</style>