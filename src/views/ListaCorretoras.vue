<template>
   <ListagemGenerica 
      :lista="lista" 
      v-if="lista"
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
   import { mensagem } from '../services/funcoes.ts';

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

         const salvarRegistro = async (regTrab: IGenerico) => {
            let resultado = false;
            if (regTrab.id) {
               resultado = await store.dispatch(acaoCorretora.ALTERA, regTrab);
            } else {
               resultado = await store.dispatch(acaoCorretora.ADICIONA, regTrab);
            }

            if(resultado) {
               mensagem('Sucesso', 'Corretora salva', 'A corretora foi salva com sucesso!');
            } else {
               mensagem('Falha', 'Erro ao salvar corretora', 'Ocorreu um erro ao tentar salvar a corretora.');
            }
         };

         const removeRegistro = async (regTrab: IGenerico) => {
            if(window.confirm("Deseja realmente excluir?")) {
               const resultado = await store.dispatch(acaoCorretora.EXCLUI, regTrab.id);
               if(resultado) {
                  mensagem('Sucesso', 'Corretora excluída', 'A corretora foi excluída com sucesso!');
               } else {
                  mensagem('Falha', 'Erro ao excluir corretora', 'Ocorreu um erro ao tentar excluir a corretora.');
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
