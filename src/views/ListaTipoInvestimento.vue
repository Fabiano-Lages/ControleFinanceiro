<template>
   <ListagemGenerica 
      :lista="lista" 
      nomeLista="Tipo de investimento" 
      @removeRegistro="removeRegistro"
      @salvarRegistro="salvarRegistro"
   />
</template>

<script lang="ts">
   import { computed, defineComponent, onMounted } from "vue";
   import { useStore } from "../store/index.ts";
   import { acaoTipoInvestimnento } from "../store/actions.ts";
   import { IGenerico } from "../interfaces/IGenerico.ts";
   import ListagemGenerica from "../components/ListagemGenerica.vue";

   export default defineComponent({
      name: "ListaTipoInvestimento",
      components: {
         ListagemGenerica
      },
      setup() {
         const store = useStore();
         const lista = computed(() => store.state.tipoInvestimento.tipoInvestimentos);

         if(!lista.value || lista.value.length === 0) {
            const loadTipoInvestimento = async () => {
               try {
                  await store.dispatch(acaoTipoInvestimnento.LISTA);
               } catch (error) {
                  console.error("Erro ao carregar os clientes:", error);
               }
            };

            onMounted(() => {
               if(!lista.value || !lista.value.length) {
                  loadTipoInvestimento();
               }
            });
         }

         const salvarRegistro = (regTrab: IGenerico) => {
            if (regTrab.id) {
               store.dispatch(acaoTipoInvestimnento.ALTERA, regTrab);
            } else {
               store.dispatch(acaoTipoInvestimnento.ADICIONA, regTrab);
            }
         };

         const removeRegistro = async (registro: IGenerico) => {
            if(window.confirm("Deseja realmente excluir?")) {
               await store.dispatch(acaoTipoInvestimnento.EXCLUI, registro.id);
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
