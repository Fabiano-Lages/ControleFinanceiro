<template>
   <aside class="sidebar">
      <ul>
         <li>Dashboard</li>
         <li>Listas</li>
            <ul>
               <li>Corretora</li>
               <li>Investimento</li>
               <li>Tipo de Investimento</li>
            </ul>
         <li>Investimentos</li>
      </ul>
   </aside>
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "MenuSite",
   });
</script>

<style scoped>
   aside {
      height: 100%;
      background-color: #242424;
      color: #ffffff;
      padding-left: 1em;
      padding-top: 50px;
      padding-right: 50px;
   }

   aside ul {
      list-style: none;
      padding: 0;
      margin: 0 0 0 20px;
   }
</style>