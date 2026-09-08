<template>
   <aside class="sidebar">
      <ul>
         <li class="nav-item"><router-link class="nav-link" aria-current="page" to="/">DashBoard</router-link></li>
         <li>Listas</li>
            <ul>
               <li class="nav-item"><router-link class="nav-link" aria-current="page" to="Corretora">Corretora</router-link></li>
               <li class="nav-item"><router-link class="nav-link" aria-current="page" to="Moeda">Moeda</router-link></li>
               <li class="nav-item"><router-link class="nav-link" aria-current="page" to="Papel">Papel</router-link></li>
               <li class="nav-item"><router-link class="nav-link" aria-current="page" to="TipoInvestimento">Tipo de Investimento</router-link></li>
            </ul>
         <li class="nav-item"><router-link class="nav-link" aria-current="page" to="Investimentos">Investiomentos</router-link></li>
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

   li {
      color: lightgray;
      cursor: default;
   }

   li>a {
      color: white;
      text-wrap: nowrap;
   }

   li>a:hover {
      color: yellow;
   }

   @media screen and (max-width: 1024px) {
      aside {
         padding-top: 20px;
         padding-right: 20px;
      }

      li {
         font-size: 12px;
      }
   }
</style>
