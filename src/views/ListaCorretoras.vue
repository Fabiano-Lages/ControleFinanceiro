<template>
   <div class="principal">
      <header>
         <h2>Corretoras</h2>
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
            @selecionado="selecionaRegistro" 
         />
         <FormularioGenerico
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
   import { acaoCorretora } from "../store/actions";
   import { IGenerico } from "../interfaces/IGenerico";
   import RegistroGenerico from "../components/RegistroGenerico.vue";
   import ControlesEdicao from "../components/ControlesEdicao.vue";
   import FormularioGenerico from "../components/FormularioGenerico.vue";

   export default defineComponent({
      name: "ListaCorretoras",
      components: {
         RegistroGenerico,
         ControlesEdicao,
         FormularioGenerico
      },
      setup() {
         const store = useStore();
         const lista = computed(() => store.state.corretora.corretoras);
         const registro = ref({} as IGenerico);
         const novo = ref(false);
         const edita = ref(false);
         
         if(!lista.value || lista.value.length === 0) {
            const loadCorretoras = async () => {
               try {
                  await store.dispatch(acaoCorretora.LISTA);
               } catch (error) {
                  console.error("Erro ao carregar os clientes:", error);
               }
            };
            
            onMounted(() => {
               if(!lista.value || !lista.value.length) {
                  loadCorretoras();
               }
            });
         }

         const selecionaRegistro = (item: IGenerico) => {
            limpaSelecao();
            if(item) {
               Object.assign(registro.value, item); 
            }
         };

         const limpaSelecao = () => {
            registro.value = {} as IGenerico;
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

         const salvarRegistro = (regTrab: IGenerico) => {
            if (regTrab.id) {
               store.dispatch(acaoCorretora.ALTERA, regTrab);
            } else {
               store.dispatch(acaoCorretora.ADICIONA, regTrab);
            }
            limpaSelecao();
         };

         const removeRegistro = async () => {
            if(window.confirm("Deseja realmente excluir?")) {
               await store.dispatch(acaoCorretora.EXCLUI, registro.value.id);
               limpaSelecao();
            }
         };

         return({
            lista,
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