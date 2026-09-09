<template>
   <div>
      <button type="button" class="btn btn-success" title="Adicionar movimentação"><i class="bi bi-cart-plus"></i></button>
      <button type="button" class="btn btn-warning" title="Listar Movimentações"><i class="bi bi-list-columns"></i></button>
      <button type="button" class="btn btn-info" title="Listar cotações"><i class="bi bi-currency-exchange"></i></button>
      <button type="button" class="btn btn-primary" title="Atualizar cotações"><i class="bi bi-arrow-clockwise"></i></button>
   </div>
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "ControleMovimento",
      setup() {

         return({

         });
      }
   });

</script>

<style scoped>
   div {
      min-width: 170px;
   }
</style>
