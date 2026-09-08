<template>
   <ListagemGenerica 
      :lista="lista" 
      v-if="lista"
      nomeLista="Moedas" 
      @removeRegistro="removeRegistro"
      @salvarRegistro="salvarRegistro"
   />
</template>

<script lang="ts">
   import { computed, defineComponent, onMounted } from "vue";
   import { useStore } from "../store/index.ts";
   import { acaoMoeda } from "../store/actions.ts";
   import { IGenerico } from "../interfaces/IGenerico.ts";
   import ListagemGenerica from "../components/ListagemGenerica.vue";
   export default defineComponent({
      name: "ListaCorretoras",
      components: {
         ListagemGenerica
      },
      setup() {
         const store = useStore();
         const lista = computed(() => store.state.moeda.moedas);

         if(!lista.value || lista.value.length === 0) {
            const loadCorretoras = async () => {
               try {
                  await store.dispatch(acaoMoeda.LISTA);
               } catch (error) {
                  console.error("Erro ao carregar as moedas:", error);
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
               store.dispatch(acaoMoeda.ALTERA, regTrab);
            } else {
               store.dispatch(acaoMoeda.ADICIONA, regTrab);
            }
         };

         const removeRegistro = async (regTrab: IGenerico) => {
            if(window.confirm("Deseja realmente excluir?")) {
               await store.dispatch(acaoMoeda.EXCLUI, regTrab.id);
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
