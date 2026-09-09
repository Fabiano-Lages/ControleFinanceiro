<template>
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
         <RegistroInvestimento />
      </tbody>
      <tfoot>
         <tr>
            <th colspan="6">Patrimônio:</th>
            <th>24.120,00</th>
         </tr>
      </tfoot>
   </table>
</template>

<script lang="ts">
   import { defineComponent } from "vue";
   import RegistroInvestimento from './RegistroInvestimento.vue';

   export default defineComponent({
      name: "TabelaInvestimento",
      components:{
         RegistroInvestimento
      },
      setup() {

         return({

         });
      }
   });
</script>

<style scoped>
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
      width: 20%;
      text-align: center;
   }

   thead th:nth-of-type(2) {
      width: 20%;
   }

   thead th:nth-of-type(3) {
      width: 20%;
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

   tfoot {
      background-color: #333;
   }

   tfoot th {
      padding: 8px 15px;
      border-top: 1px solid #ddd;
      text-align: right;
   }
</style>
