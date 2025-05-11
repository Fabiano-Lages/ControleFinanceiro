<script setup lang="ts">
</script>

<template>
  <main>
    <header>
      <a href="/"><img src="/img/logo.png" alt="logo" class="logo vue" /></a>
      <h1>Controle Financeiro</h1>
      <div class="controle">
        <span class="usuario">
          <i class="bi bi-person-fill"></i>
          Fabiano Teixeira Lages
        </span>
      </div>
    </header>
    <div class="main">
      <aside class="sidebar">
        <ul>
          <li>Dashboard</li>
          <li>Listas</li>
            <ul>
              <li>Corretora</li>
              <li>Tipo de Investimento</li>
              <li>Investimento</li>
            </ul>
          <li>Investimentos</li>
        </ul>
      </aside>
      <section class="body">
        <header>
          <h2>Dashboard</h2>
        </header>
        <div>
          Teste
        </div>
          <!--router-view /-->
      </section>
    </div>
  </main>
</template>

<style scoped>
  main {
    height: 100%;
  }

  main>header {
    height: 5%;
    background-color: #242424;
    color: white;
    display: flex;
    justify-content: space-between;
  }

  main>header>a {
    width: 10%;
  }

  main>header>h1 {
    font-size: 18pt;
    margin-top: 10px;
    width: 80%;
  }

  main>header>div {
    font-size: 12pt;
    margin-top: 15px;
    width: 10%;
    text-align: center;
  }

  .main {
    display: flex;
    flex-direction: row;
    height: 95%;
  }

  aside {
    height: 100%;
    background-color: #242424;
    color: #ffffff;
    padding: 1em;
    padding-top: 50px
  }

  aside ul {
    list-style: none;
    padding: 0;
    margin: 0 0 0 20px;
  }

  section.body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2em;
    background-color: #555;
    color: whitesmoke;
  }

  .logo {
    height: 80px;
    will-change: filter;
    transition: filter 300ms;
    margin-left: 30px;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
