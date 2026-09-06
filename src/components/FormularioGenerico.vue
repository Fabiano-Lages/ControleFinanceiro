<template>
   <div class="formulario">
      <form @submit.prevent="salvarRegistro">
         <input type="hidden" id="id" v-model="regTrab.id" />
         <div>
            <label for="nome">Nome:</label>
            <input ref="nomeInput" type="text" id="nome" class="form-control" v-model="regTrab.nome" required />
         </div>
         <p>
            <button class="btn btn-primary" type="submit">Salvar</button>
            <button class="btn btn-secondary" type="button" @click="limpaSelecao">Cancelar</button>
         </p>
      </form>
   </div>
</template>

<script lang="ts">
   import { defineComponent, nextTick, onMounted, onBeforeUnmount,PropType, ref } from "vue";
   import { IGenerico } from "../interfaces/IGenerico.ts";

   export default defineComponent({
      name: "FormularioGenerico",
      props: {
         registro: {
            type: Object as PropType<IGenerico>,
            required: true
         }
      },
      emits: ['salvarRegistro', 'fechaFormulario'],
      setup(props, {emit}) {
         const regTrab = ref({} as IGenerico);
         const nomeInput = ref<HTMLInputElement | null>(null);

         Object.assign(regTrab.value, props.registro);

         onMounted(async () => {
            await nextTick();
            nomeInput.value?.focus();
         });

         const salvarRegistro = () => {
            if(!regTrab.value.nome || regTrab.value.nome.trim() === "") {
               alert("O campo nome é obrigatório.");
            } else {
               emit('salvarRegistro', regTrab.value);
            }
         };

         const limpaSelecao = () => {
            emit('fechaFormulario');
         };
         
         const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
               event.preventDefault();
               salvarRegistro();
            } else if (event.key === "Escape") {
               event.preventDefault();
               limpaSelecao();
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
            nomeInput,
            salvarRegistro,
            limpaSelecao
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

   .formulario button {
      margin-top: 10px;
      margin-right: 10px;
   }
</style>