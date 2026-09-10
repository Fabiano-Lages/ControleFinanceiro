<template>
   <div class="principal">
      <header>
         <TituloListas valor="Investimentos" />
      </header>
      <div class="trabalho">
         <div class="controle">
            <ControleFiltroInvestimento />
            <div class="pnBotoes">
               <ControleInvestimento />
               <ControleMovimento />
            </div>
         </div>
         <div class="corpo">
            <TabelaInvestimento />
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import { defineComponent } from "vue";
   import TituloListas from '../components/TituloListas.vue';
   import ControleInvestimento from '../components/ControleInvestimento.vue';
   import ControleMovimento from '../components/ControleMovimento.vue';
   import ControleFiltroInvestimento from '../components/ControleFiltroInvestimento.vue';
   import TabelaInvestimento from '../components/TabelaInvestimento.vue';

   export default defineComponent({
      name: "Investimentos",
      components: {
         TituloListas,
         ControleInvestimento,
         ControleMovimento,
         ControleFiltroInvestimento,
         TabelaInvestimento
      }
   });
</script>

<style scoped>
   .trabalho {
      gap: 10px;
   }

   .controle {
      width: 95%;
      display: flex;
      justify-content: space-between;
      gap: 50px;
      margin: auto;
   }

   .pnBotoes {
      min-width: 320px;
      display: flex;
      justify-content: space-between;
   }

   .corpo {
      width: 100%;
   }
</style>
