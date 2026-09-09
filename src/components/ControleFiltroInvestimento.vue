<template>
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
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "ControleFiltroInvestimento",
      setup() {

         return({

         });
      }
   });
</script>

<style scoped>
   div {
      min-width: 390px;
      display: flex;
      align-items: center;
   }

   select {
      padding: 5px 10px;
      margin-left: 10px;
      background-color: #ddd;
      color: #444;
      font-weight: bold;
   }

   select option {
      font-weight: normal;
      background-color: #ddd;
      font-weight: 500;
   }
</style>
