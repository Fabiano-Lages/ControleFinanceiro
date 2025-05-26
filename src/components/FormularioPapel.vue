<template>
   <div class="formulario">
      <form @submit.prevent="salvarRegistro">
         <input type="hidden" id="id" v-model="regTrab.id" />
         <div>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" class="form-control" v-model="regTrab.nome" required />
         </div>
         <div>
            <label for="tipo">Tipo de investimento:</label>
            <select id="tipo" class="form-control" v-model="regTrab.idTipoInvestimento" required>
               <option value="">Selecione um tipo</option>
               <option v-for="tipo in listaTipos" :key="tipo.id" :value="tipo.id">
                  {{ tipo.nome }}
               </option>
            </select>
         </div>
         <p>
            <button class="btn btn-primary" type="submit">Salvar</button>
            <button class="btn btn-secondary" type="button" @click="limpaSelecao">Cancelar</button>
         </p>
      </form>
   </div>
</template>

<script lang="ts">
   import { defineComponent, computed, PropType, ref, onMounted } from "vue";
   import { IPapel } from "../interfaces/IPapel";
   import { useStore } from "../store";
   import { acaoTipoInvestimnento } from "../store/actions";

   export default defineComponent({
      name: "FormularioPapel",
      props: {
         registro: {
            type: Object as PropType<IPapel>,
            required: true
         }
      },
      setup(props, {emit}) {
         const store = useStore();
         const listaTipos = computed(() => store.state.tipoInvestimento.tipoInvestimentos);
         const regTrab = ref({} as IPapel);
         Object.assign(regTrab.value, props.registro);

         
         if(!listaTipos.value || listaTipos.value.length === 0) {
            const loadTipoInvestimento = async () => {
               try {
                  await store.dispatch(acaoTipoInvestimnento.LISTA);
               } catch (error) {
                  console.error("Erro ao carregar os clientes:", error);
               }
            };
            
            onMounted(() => {
               if(!listaTipos.value || !listaTipos.value.length) {
                  loadTipoInvestimento();
               }
            });
         }

         const salvarRegistro = () => {
            emit('salvarRegistro', regTrab.value);
         };

         const limpaSelecao = () => {
            emit('limpaSelecao');
         };

         return {
            regTrab,
            salvarRegistro,
            limpaSelecao,
            listaTipos
         };
      }
   });
</script>

<style scoped>
   .formulario {
      width: 40%;
      background: #444;
      padding: 10px 20px;
      min-width: 300px;
      border-radius: 5px;
   }

   .formulario p {
      text-align: end;
      margin-bottom: 0;
   }

   .formulario label {
      font-weight: bold;
      font-size: 14px;
   }

   .formulario button {
      margin-top: 10px;
      margin-right: 10px;
   }
</style>