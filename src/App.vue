<template>
  <main>
    <CabecalhoSite />
    <div class="main">
      <MenuSite />
      <section class="body">
        <router-view />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import CabecalhoSite from "./components/CabecalhoSite.vue";
  import MenuSite from "./components/MenuSite.vue";

  export default defineComponent({
    name: "App",
    components: {
      CabecalhoSite,
      MenuSite
    }
  });
</script>

<style scoped>
  main {
    height: 100%;
  }

  .main {
    display: flex;
    flex-direction: row;
    height: 95%;
  }

  section {
    background-color: #555;
    color: whitesmoke;
    width: 90%;
  }
</style>