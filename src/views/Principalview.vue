<template>
   <NavMenu />
  <section>
    <h2><i class='bx bx-home-alt'></i> Bienvenido a withDomine</h2>
    <p>Gestione su condominio de forma eficiente con nuestro sistema. Desde pagos hasta multas, todo en un solo lugar.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavMenu from '../components/NavMenu.vue';
</script>

<style scoped>
body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #121212;
      color: #f0f0f0;
    }

    header {
      background-color: #1f1f1f;
      color: #ffffff;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    header h1 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
    }

    nav {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    nav a {
      color: #ffffff;
      text-decoration: none;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    nav a:hover {
      color: #00bcd4;
    }

    main {
      padding: 2rem;
      max-width: 1920px;
      margin: 0 auto;
    }

    .carousel {
      margin: 2rem auto;
      max-width: 100%;
      height: 250px;
      background: url('https://via.placeholder.com/1920x250?text=Banner+Condominio') no-repeat center center/cover;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.6);
    }

    section {
      padding: 2rem;
      background-color: #1f1f1f;
      margin: 2rem auto;
      max-width: 1200px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    h2 {
      color: #00bcd4;
    }

    footer {
      background-color: #1f1f1f;
      color: #aaa;
      text-align: center;
      padding: 1rem;
      margin-top: 2rem;
      font-size: 0.9rem;
    }

    @media screen and (max-width: 768px) {
      header {
        flex-direction: column;
        align-items: flex-start;
      }

      nav {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      section {
        margin: 1rem;
        padding: 1rem;
      }

      .carousel {
        height: 180px;
      }
    }
</style>