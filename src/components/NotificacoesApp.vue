<template>
    <div class="notificacoes">
        <article 
            v-for="notificacao in notificacoes" 
            :key="notificacao.id" 
            class="message" 
            :class="`alert alert-${notificacao.tipo}`"
        >
            <div class="message-header">
                {{ notificacao.titulo }}
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
    import { useStore } from '../store/index.ts';
    import { computed, defineComponent } from 'vue';

    export default defineComponent({
        name: 'NotificacoesApp',
        setup() {
            const store = useStore();
            return({
                notificacoes: computed(() => store.state.notificacoes),
            });
        }
    });
</script>

<style scoped>
    .notificacoes {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 300px;
        padding: 8px;
        z-index: 5;
    }
</style>