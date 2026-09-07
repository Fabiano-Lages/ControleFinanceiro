<template>
   <ListagemPapeis
      :lista="lista"
      v-if="lista"
      @removeRegistro="removeRegistro"
      @salvarRegistro="salvarRegistro"
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

         const salvarRegistro = (regTrab: IPapel) => {
            if (regTrab.id) {
               store.dispatch(acaoPapel.ALTERA, regTrab);
            } else {
               store.dispatch(acaoPapel.ADICIONA, regTrab);
            }
         };

         const removeRegistro = async () => {
            if(window.confirm("Deseja realmente excluir?")) {
               await store.dispatch(acaoPapel.EXCLUI, registro.value.id);
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

</style>
