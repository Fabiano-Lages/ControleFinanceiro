<template>
   <ListagemPapeis
      :lista="lista"
      @removeRegistro="removeRegistro"
   />
</template>

<script lang="ts">
   import { computed, defineComponent, onMounted, ref } from "vue";
   import { useStore } from "../store/index.ts";
   import { acaoPapel, acaoTipoInvestimnento } from "../store/actions.ts";
   import { IPapel } from "../interfaces/IPapel.ts";
   import ListagemPapeis from "../components/ListagemPapeis.vue";

   export default defineComponent({
      name: "ListaTipoInvestimento",
      components: {
         ListagemPapeis
      },
      setup() {
         const store = useStore();
         const lista = computed(() => store.state.papel.papeis);
         const listaTP = computed(() => store.state.tipoInvestimento.tipoInvestimentos);
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
               if(!listaTP.value || listaTP.value.length === 0) {
                  store.dispatch(acaoTipoInvestimnento.LISTA);
               }

               if(!lista.value || !lista.value.length) {
                  loadPapel();
               }
            });
         }

         const limpaSelecao = () => {
            registro.value = {} as IPapel;
            novo.value = false;
            edita.value = false;
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
            salvarRegistro,
            removeRegistro
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
