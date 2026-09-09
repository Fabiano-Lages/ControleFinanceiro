<template>
   <div class="principal">
      <header>
         <TituloListas valor="Investimentos" />
      </header>
      <div class="trabalho">
         <div class="controle">
            <ControleFiltroInvestimento />
            <ControleInvestimento />
            <ControleMovimento />
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
      width: 97%;
      display: flex;
      justify-content: flex-end;
      gap: 50px;
   }

   .corpo {
      width: 100%;
   }
</style>
