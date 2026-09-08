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
   import { mensagem } from '../services/funcoes.ts';

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

         const salvarRegistro = async (regTrab: IGenerico) => {
            let resultado = false;
            if (regTrab.id) {
               resultado = await store.dispatch(acaoMoeda.ALTERA, regTrab);
            } else {
               resultado = await store.dispatch(acaoMoeda.ADICIONA, regTrab);
            }

            if(resultado) {
               mensagem('Sucesso', 'Moeda salva', 'A moeda foi salva com sucesso!');
            } else {
               mensagem('Falha', 'Erro ao salvar moeda', 'Ocorreu um erro ao tentar salvar a moeda.');
            }
         };

         const removeRegistro = async (regTrab: IGenerico) => {
            if(window.confirm("Deseja realmente excluir?")) {
               const resultado = await store.dispatch(acaoMoeda.EXCLUI, regTrab.id);
               if(resultado) {
                  mensagem('Sucesso', 'Moeda excluída', 'A moeda foi excluída com sucesso!');
               } else {
                  mensagem('Falha', 'Erro ao excluir moeda', 'Ocorreu um erro ao tentar excluir a moeda.');
               }
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
