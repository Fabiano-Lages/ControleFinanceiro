<template>
   <h2>{{ valor }}</h2>
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "TituloListas",
      props: {
         valor: {
            type: String,
            required: true
         }
      }
   });
</script>

<style scoped>
   h2 {
      font-weight: bold;
   }

   @media screen and (max-width: 1024px) {
      h2 {
         font-size: 1.5em;
      }
   }
</style>
