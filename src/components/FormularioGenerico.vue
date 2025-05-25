<template>
   <div class="formulario">
      <form @submit.prevent="salvarRegistro">
         <input type="hidden" id="id" v-model="regTrab.id" />
         <div>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" class="form-control" v-model="regTrab.nome" />
         </div>
         <p>
            <button class="btn btn-primary" type="submit">Salvar</button>
            <button class="btn btn-secondary" type="button" @click="limpaSelecao">Cancelar</button>
         </p>
      </form>
   </div>
</template>

<script lang="ts">
   import { defineComponent, PropType, ref } from "vue";
   import { IGenerico } from "../interfaces/IGenerico";

   export default defineComponent({
      name: "FormularioGenerico",
      props: {
         registro: {
            type: Object as PropType<IGenerico>,
            required: true
         }
      },
      setup(props, {emit}) {
         const regTrab = ref({} as IGenerico);
         Object.assign(regTrab.value, props.registro);

         const salvarRegistro = () => {
            emit('salvarRegistro', regTrab.value);
         };

         const limpaSelecao = () => {
            emit('limpaSelecao');
         };

         return {
            regTrab,
            salvarRegistro,
            limpaSelecao
         };
      }
   });
</script>

<style scoped>
   .formulario {
      width: 40%;
      background: #444;
      padding: 10px 20px;
      min-width: 300px;
      border-radius: 5px;
   }

   .formulario p {
      text-align: end;
      margin-bottom: 0;
   }

   .formulario button {
      margin-top: 10px;
      margin-right: 10px;
   }
</style>