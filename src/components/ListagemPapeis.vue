<template>
   <div class="principal">
      <header>
         <TituloListas valor="Papéis" />
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
         <FormularioPapel
            v-if="edita || novo"
            :registro="registro"
            :listaTipo="listaTipo"
            @salvarRegistro="salvarRegistro"
            @fechaFormulario="fechaFormulario"
         />
      </div>
   </div>
</template>

<script lang="ts">
   import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from "vue";
   import { useStore } from "../store/index.ts";
   import { IPapel } from "../interfaces/IPapel.ts";
   import RegistroGenerico from "../components/RegistroGenerico.vue";
   import ControlesEdicao from "../components/ControlesEdicao.vue";
   import FormularioPapel from "../components/FormularioPapel.vue";
   import TituloListas from "../components/TituloListas.vue";

   export default defineComponent({
      name: "ListagemPapeis",
      components: {
         RegistroGenerico,
         ControlesEdicao,
         FormularioPapel,
         TituloListas
      },
      props: {
         lista: {
            type: Array as () => IPapel[],
            required: true
         }
      },
      emits: ["removeRegistro", "salvarRegistro"],
      setup(props,{emit}) {
         const store = useStore();
         const listaTipo = computed(() => store.state.tipoInvestimento.tipoInvestimentos);

         const registro = ref({} as IPapel);
         const novo = ref(false);
         const edita = ref(false);

         const limpaSelecao = () => {
            registro.value = {} as IPapel;
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

         const selecionaRegistro = (item: IPapel) => {
            limpaSelecao();
            if(item) {
               Object.assign(registro.value, item);
            }
         };

         const salvarRegistro = (regTrab: IPapel) => {
            emit('salvarRegistro', regTrab);
            fechaFormulario();
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
            listaTipo,
            registro,
            novo,
            edita
         });
      }
   });
</script>

<style scoped>
</style>