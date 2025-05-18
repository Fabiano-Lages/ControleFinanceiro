<template>
   <header>
      <a class="aLogo" href="/"><img src="/img/logo.png" alt="logo" class="logo vue" /></a>
      <h1>Controle Financeiro</h1>
      <div class="controle">
         <span class="usuario">
            <i class="bi bi-person-fill"></i>
            Fabiano Teixeira Lages
         </span>
      </div>
   </header>
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "CabecalhoSite"
      
   });
</script>

<style scoped>
   header {
      height: 5%;
      background-color: #242424;
      color: white;
      display: flex;
      justify-content: space-between;
   }

   a {
      width: 10%;
   }

   h1 {
      font-size: 18pt;
      margin-top: 10px;
      width: 80%;
   }

   div {
      font-size: 12pt;
      margin-top: 15px;
      width: 10%;
      text-align: center;
   }

   .aLogo {
      text-align: center;
   }

   .logo {
      height: 80px;
      will-change: filter;
      transition: filter 300ms;
   }

   .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
   }

   .logo.vue:hover {
      filter: drop-shadow(0 0 2em #42b883aa);
   }
</style>