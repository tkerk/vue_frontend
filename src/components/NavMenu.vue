<template>
  <div class="navbar">
    <div class="navbar-brand">
      <i class='bx bxs-building-house'></i>
      <span>withDomine</span>
    </div>
    <div class="navbar-links">
      <RouterLink to="/principal"><i class='bx bx-home'></i> Inicio</RouterLink>
      <RouterLink to="/login"><i class='bx bx-log-in'></i> Iniciar sesión</RouterLink>
      <RouterLink to="/registro"><i class='bx bx-user-plus'></i> Registro</RouterLink>
      <RouterLink to="/multa"><i class='bx bx-error-circle'></i> Multas</RouterLink>
      <RouterLink to="/pagos"><i class='bx bx-credit-card'></i> Pagos</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  background-color: #1f1f1f;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2rem;
  box-sizing: border-box;
  flex-wrap: wrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.7rem;
  font-weight: bold;
}

.navbar-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.navbar-links a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.1rem;
  transition: color 0.2s;
}

.navbar-links a.router-link-exact-active,
.navbar-links a.router-link-active {
  color: #00bcd4;
}

.navbar-links a:hover {
  color: #00bcd4;
}

@media screen and (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
  .navbar-links {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;
    width: 100%;
    margin-top: 0.5rem;
  }
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

main {
  width: 100%;
  min-height: calc(100vh - 80px); /* Ajusta según el alto del navbar */
  padding-top: 2rem;
  display: block;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>