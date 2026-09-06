<template>
   <ListagemGenerica 
      :lista="lista" 
      nomeLista="Corretora" 
      @removeRegistro="removeRegistro"
      @salvarRegistro="salvarRegistro"
   />
</template>

<script lang="ts">
   import { computed, defineComponent, onMounted } from "vue";
   import { useStore } from "../store/index.ts";
   import { acaoCorretora } from "../store/actions.ts";
   import { IGenerico } from "../interfaces/IGenerico.ts";
   import ListagemGenerica from "../components/ListagemGenerica.vue";
   export default defineComponent({
      name: "ListaCorretoras",
      components: {
         ListagemGenerica
      },
      setup() {
         const store = useStore();
         const lista = computed(() => store.state.corretora.corretoras);

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

         const salvarRegistro = (regTrab: IGenerico) => {
            if (regTrab.id) {
               store.dispatch(acaoCorretora.ALTERA, regTrab);
            } else {
               store.dispatch(acaoCorretora.ADICIONA, regTrab);
            }
         };

         const removeRegistro = async (registro: IGenerico) => {
            if(window.confirm("Deseja realmente excluir?")) {
               await store.dispatch(acaoCorretora.EXCLUI, registro.id);
            }
         };

         return({
            lista,
            salvarRegistro,
            removeRegistro,
         });
      }
   });
</script>

<style scoped>
</style>
