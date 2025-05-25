<template>
   <div class="principal">
      <header>
         <h2>Dashboard</h2>
      </header>
      <div>
         Teste
      </div>
   </div>
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "DashBoard"
   });
</script>

<style scoped>
  .principal {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2em;
  }
</style>