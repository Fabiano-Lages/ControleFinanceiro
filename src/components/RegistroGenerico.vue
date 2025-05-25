<template>
   <div class="listagem">
      <p 
         v-for="corretora in lista" 
         :key="corretora.id" 
         :id="`cor-${corretora.id}`"
         @click="selecionaRegistro(corretora.id)"
         :class="(registroSelecionado.id == corretora.id) ? 'selecionado' : ''"
      >{{ corretora.nome }}</p>
   </div>
</template>

<script lang="ts">
   import {defineComponent, PropType} from "vue";
   import { IGenerico } from "../interfaces/IGenerico";

   export default defineComponent({
      name: "RegistroGenerico",
      props: {
         lista: {
            type: Array as PropType<Array<IGenerico>>,
            required: true
         },
         registroSelecionado: {
            type: Object as PropType<IGenerico>,
            required: true
         }
      },
      setup(props, {emit}) {
         const selecionaRegistro = (id: number) => {
            const item = props.lista.find((item) => item.id === id) || {} as IGenerico;
            if(item) {
               emit('selecionado', item);
            }
         };

         return {
            selecionaRegistro
         };
      }
   });
</script>

<style scoped>
   .listagem {
      width: 15%;
      margin-left: 20px;
      background: #444;
      padding: 10px 20px;
      min-width: 150px;
      height: 400px;
      border-radius: 5px;
      overflow-y: auto;
   }

   .listagem p {
      color: #fff;
      font-size: 1.2em;
      margin: 0;
      cursor: pointer;
      padding: 0 15px; 
   }

   .listagem p.selecionado {
      background-color: #555;
      color: #fff;
   }

   .listagem p:hover {
      background-color: #666;
   }
</style>