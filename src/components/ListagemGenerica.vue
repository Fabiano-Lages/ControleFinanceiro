<template>
   <div class="principal">
      <header>
         <TituloListas :valor="nomeLista" />
         <ControlesEdicao
            :registro="registro"
            @criarItem="criarItem"
            @editarItem="editarItem"
            @removeRegistro="removeRegistro"
         />
      </header>
      <div class="trabalho">
         <RegistroGenerico
            v-if="lista"
            :lista="lista"
            :registroSelecionado="registro"
            @editarItem="editarItem"
            @criarItem="criarItem"
            @selecionado="selecionaRegistro"
         />
         <FormularioGenerico
            v-if="edita || novo"
            :registro="registro"
            @salvarRegistro="salvarRegistro"
            @fechaFormulario="fechaFormulario"
         />
      </div>
   </div>
</template>

<script lang="ts">
   import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
   import { IGenerico } from "../interfaces/IGenerico.ts";
   import RegistroGenerico from "../components/RegistroGenerico.vue";
   import ControlesEdicao from "../components/ControlesEdicao.vue";
   import FormularioGenerico from "../components/FormularioGenerico.vue";
   import TituloListas from "../components/TituloListas.vue";

   export default defineComponent({
      name: "ListagemGenerica",
      components: {
         RegistroGenerico,
         ControlesEdicao,
         FormularioGenerico,
         TituloListas
      },
      props: {
         lista: {
            type: Array as () => IGenerico[],
            required: true
         },
         nomeLista: {
            type: String,
            required: true
         }
      },
      setup(props,{emit}) {
         const registro = ref({} as IGenerico);
         const novo = ref(false);
         const edita = ref(false);

         const limpaSelecao = () => {
            registro.value = {} as IGenerico;
         };

         const fechaFormulario = () => {
            novo.value = false;
            edita.value = false;
         };

         const criarItem = () => {
            limpaSelecao();
            novo.value = true;
         };

         const editarItem = () => {
            if(registro.value.id) {
               edita.value = true;
            }
         };

         const removeRegistro = () => {
            emit('removeRegistro', registro.value);
            limpaSelecao();
         };

         const selecionaRegistro = (item: IGenerico) => {
            limpaSelecao();
            if(item) {
               Object.assign(registro.value, item);
            }
         };

         const salvarRegistro = (regTrab: IGenerico) => {
            emit('salvarRegistro', regTrab);
            novo.value = false;
            edita.value = false;
         };

         const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Insert") {
               event.preventDefault();
               criarItem();
            } else if (event.key === "Enter") {
               event.preventDefault();
               editarItem();
            } else if (event.key === "Delete") {
               event.preventDefault();
               removeRegistro();
            } else if(event.key == "ArrowUp") {
               event.preventDefault();
               const index = props.lista.findIndex(item => item.id === registro.value.id);
               if(index > 0) {
                  selecionaRegistro(props.lista[index - 1]);
               }
            } else if(event.key == "ArrowDown") {
               event.preventDefault();
               const index = props.lista.findIndex(item => item.id === registro.value.id);
               if(index < props.lista.length - 1) {
                  selecionaRegistro(props.lista[index + 1]);
               }
            }
         };

         onMounted(() => {
            window.addEventListener("keydown", onKeyDown);
            if(props.lista && props.lista.length > 0) {
               selecionaRegistro(props.lista[0]);
            }
         });

         onBeforeUnmount(() => {
            window.removeEventListener("keydown", onKeyDown);
         });

         return({
            criarItem,
            editarItem,
            removeRegistro,
            selecionaRegistro,
            limpaSelecao,
            fechaFormulario,
            salvarRegistro,
            registro,
            novo,
            edita
         });
      }
   });
</script>

<style scoped>
   .principal {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 2em;
   }

   .trabalho {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 50px;
      margin-top: 5px;
   }
</style>