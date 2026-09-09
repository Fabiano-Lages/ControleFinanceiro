<template>
   <div>
      <button type="button" class="btn btn-primary" title="Adicionar Investimento"><i class="bi bi-plus-lg"></i></button>
      <button type="button" class="btn btn-secondary" title="Editar Investimento"><i class="bi bi-pen"></i></button>
      <button type="button" class="btn btn-danger" title="Remover Investimento"><i class="bi bi-trash"></i></button>
   </div>
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "ControleInvestimento",
      setup() {

         return({

         });
      }
   });

</script>

<style scoped>
   div {
      min-width: 130px;
   }
</style>
