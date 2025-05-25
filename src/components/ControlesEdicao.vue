<template>
   <div class="controle">
      <button type="button" class="btn btn-primary" @click="criarItem"><i class="bi-plus-lg"></i></button>
      <button type="button" class="btn btn-secondary" @click="editarItem" :disabled="!registro.id"><i class="bi-pen"></i></button>
      <button type="button" class="btn btn-danger" @click="removeRegistro" :disabled="!registro.id"><i class="bi-trash"></i></button>
   </div>
</template>

<script lang="ts">
   import { defineComponent, PropType } from "vue";
   import { IGenerico } from "../interfaces/IGenerico";

   export default defineComponent({
      name: "ControlesEdicao",
      props: {
         registro: {
            type: Object as PropType<IGenerico>,
            required: true
         }
      },
      setup(props, { emit }) {
         const criarItem = () => {
            emit('criarItem');
         };

         const editarItem = () => {
            emit('editarItem', props.registro);
         };

         const removeRegistro = () => {
            emit('removeRegistro', props.registro);
         };

         return {
            criarItem,
            editarItem,
            removeRegistro
         };
      }
   });
</script>

<style scoped>
   .controle {
      width: 15%;
      min-width: 150px;
      text-align: end;
      margin-left: 20px;
   }

   button:disabled {
      color: #444;
   }
</style>