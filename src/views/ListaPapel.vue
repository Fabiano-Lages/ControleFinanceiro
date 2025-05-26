<template>
   <div class="principal">
      <header>
         <h2>Papel</h2>
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
            :lista="listaGenerico" 
            :registroSelecionado="registro"
            @editarItem="editarItem"
            @selecionado="selecionaRegistro" 
         />
         <FormularioPapel
            v-if="edita || novo" 
            :registro="registro"
            @salvarRegistro="salvarRegistro"
            @limpaSelecao="limpaSelecao"
         />
      </div>
   </div>
</template>

<script lang="ts">
   import { computed, defineComponent, onMounted, ref } from "vue";
   import { useStore } from "../store";
   import { acaoPapel } from "../store/actions";
   import { IPapel } from "../interfaces/IPapel.ts";
   import { IGenerico } from "../interfaces/IGenerico";
   import RegistroGenerico from "../components/RegistroGenerico.vue";
   import ControlesEdicao from "../components/ControlesEdicao.vue";
   import FormularioPapel from "../components/FormularioPapel.vue";

   export default defineComponent({
      name: "ListaTipoInvestimento",
      components: {
         RegistroGenerico,
         ControlesEdicao,
         FormularioPapel
      },
      setup() {
         const store = useStore();
         const lista = computed(() => store.state.papel.papeis);
         const listaGenerico = computed(() => store.state.papel.papeis.map((item) => item as IGenerico));
         const registro = ref({} as IPapel);
         const novo = ref(false);
         const edita = ref(false);
         
         if(!lista.value || lista.value.length === 0) {
            const loadPapel = async () => {
               try {
                  await store.dispatch(acaoPapel.LISTA);
               } catch (error) {
                  console.error("Erro ao carregar os clientes:", error);
               }
            };
            
            onMounted(() => {
               if(!lista.value || !lista.value.length) {
                  loadPapel();
               }
            });
         }

         const selecionaRegistro = (item: IPapel) => {
            limpaSelecao();
            if(item) {
               Object.assign(registro.value, item); 
            }
         };

         const limpaSelecao = () => {
            registro.value = {} as IPapel;
            novo.value = false;
            edita.value = false;
         };

         const criarItem = () => {
            limpaSelecao();
            novo.value = true;
         };

         const editarItem = () => {
            if (registro.value.id) {
               edita.value = true;
            }
         };

         const salvarRegistro = (regTrab: IPapel) => {
            if (regTrab.id) {
               store.dispatch(acaoPapel.ALTERA, regTrab);
            } else {
               store.dispatch(acaoPapel.ADICIONA, regTrab);
            }
            limpaSelecao();
         };

         const removeRegistro = async () => {
            if(window.confirm("Deseja realmente excluir?")) {
               await store.dispatch(acaoPapel.EXCLUI, registro.value.id);
               limpaSelecao();
            }
         };

         return({
            lista,
            listaGenerico,
            selecionaRegistro,
            limpaSelecao,
            criarItem,
            editarItem,
            salvarRegistro,
            removeRegistro,
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