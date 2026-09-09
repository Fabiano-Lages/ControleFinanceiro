<template>
   <tr>
      <td>Rico</td>
      <td>MXRF11</td>
      <td>FII BR</td>
      <td>Real</td>
      <td>5.000,00</td>
      <td>1,00</td>
      <td>5.000,00</td>
   </tr>
   <tr>
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
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "RegistroInvestimento",
      setup() {

         return({

         });
      }
   });
</script>

<style scoped>
   tr {
      background-color: #777;
      color: #eee;
   }

   tr:nth-of-type(even) {
      background-color: #aaa;
      color: #000;
   }

   tr:hover {
      background-color: rgb(62, 70, 143);
      color: #eee;
      cursor: pointer;
   }

   tr.selecionado {
      background-color: rgb(172, 106, 25);
      color: #eee;
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

   @media screen and (max-width:1024px) {
      td {
         font-size: 9pt;
      }
   }
</style>
