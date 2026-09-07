<template>
   <div class="principal">
      <header>
         <TituloListas valor="Investimentos" />
      </header>
      <div>
         <div>
            <div>
               <p>Em desenvolvimento...</p>
            </div>
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

</style>