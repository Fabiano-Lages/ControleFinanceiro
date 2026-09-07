<template>
   <div class="formulario">
      <form @submit.prevent="salvarRegistro">
         <input type="hidden" id="id" v-model="regTrab.id" />
         <div>
            <label for="nome">Nome:</label>
            <input ref="nomeInput" type="text" id="nome" class="form-control" v-model="regTrab.nome" required />
         </div>
         <div>
            <label for="tipo">Tipo de investimento:</label>
            <select id="tipo" class="form-control" v-model="regTrab.idTipoInvestimento" required>
               <option value="">Selecione um tipo</option>
               <option v-for="tipo in listaTipo" :key="tipo.id" :value="tipo.id">
                  {{ tipo.nome }}
               </option>
            </select>
         </div>
         <p>
            <button class="btn btn-primary" type="submit">Salvar</button>
            <button class="btn btn-secondary" type="button" @click="fechaFormulario">Cancelar</button>
         </p>
      </form>
   </div>
</template>

<script lang="ts">
   import { defineComponent, PropType, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
   import { IPapel } from "../interfaces/IPapel.ts";
   import { IGenerico } from "../interfaces/IGenerico.ts";

   export default defineComponent({
      name: "FormularioPapel",
      props: {
         registro: {
            type: Object as PropType<IPapel>,
            required: true
         },
         listaTipo: {
            type: Array as PropType<IGenerico[]>,
            required: true
         }
      },
      emits: ['salvarRegistro', 'fechaFormulario'],
      setup(props, {emit}) {
         const regTrab = ref({} as IPapel);
         const nomeInput = ref<HTMLInputElement | null>(null);

         Object.assign(regTrab.value, props.registro);

         onMounted(async () => {
            await nextTick();
            nomeInput.value?.focus();
         });

         const salvarRegistro = () => {
            if(regTrab.value.nome && regTrab.value.idTipoInvestimento) {
               emit('salvarRegistro', regTrab.value);
            } else {
               alert("Todos os campos são obrigatórios.");
            }
         };

         const fechaFormulario = () => {
            emit('fechaFormulario');
         };
         
         const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
               event.preventDefault();
               salvarRegistro();
            } else if (event.key === "Escape") {
               event.preventDefault();
               fechaFormulario();
            }
         };

         onMounted(() => {
            window.addEventListener("keydown", onKeyDown);
         });

         onBeforeUnmount(() => {
            window.removeEventListener("keydown", onKeyDown);
         });

         return {
            regTrab,
            salvarRegistro,
            fechaFormulario,
            nomeInput
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