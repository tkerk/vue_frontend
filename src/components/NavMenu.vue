<template>
  <div class="navbar">
    <div class="navbar-brand">
      <i class='bx bxs-building-house'></i>
      <span>withDomine</span>
    </div>
    <div class="navbar-links">
      <RouterLink to="/principal"><i class='bx bx-home'></i> Inicio</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login"><i class='bx bx-log-in'></i> Iniciar sesión</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/registro"><i class='bx bx-user-plus'></i> Registro</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/multa"><i class='bx bx-error-circle'></i> Multas</RouterLink>
      <RouterLink to="/pagos"><i class='bx bx-credit-card'></i> Pagos</RouterLink>
      <div v-if="isLoggedIn" class="navbar-noti">
        <div class="noti-bell" @click="irANotificaciones">
          <i class='bx bx-bell'></i>
          <span v-if="countnovistas > 0" class="noti-count animate-bounce">{{ countnovistas }}</span>
        </div>
      </div>
      <a v-if="isLoggedIn" href="#" @click.prevent="logout"><i class='bx bx-log-out'></i> Cerrar sesión</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const isLoggedIn = ref(false)
const countnovistas = ref(0)
const router = useRouter()

function checkLogin() {
  isLoggedIn.value = !!localStorage.getItem('id_huesped')
}

async function fetchNotiCount() {
  const id_huesped = localStorage.getItem('id_huesped')
  if (!id_huesped) {
    countnovistas.value = 0
    return
  }
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/multas/huesped/${id_huesped}`)
    if (Array.isArray(res.data)) {
      countnovistas.value = res.data.filter(m => !m.visualizado).length
    }
  } catch (e) {
    countnovistas.value = 0
  }
}

function irANotificaciones() {
  router.push('/multa')
}

function logout() {
  localStorage.removeItem('id_huesped')
  isLoggedIn.value = false
  router.push('/login')
}

onMounted(() => {
  checkLogin()
  window.addEventListener('storage', checkLogin)
  fetchNotiCount()
  setInterval(fetchNotiCount, 8000)
})
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
  min-height: calc(100vh - 80px);
  padding-top: 2rem;
  display: block;
}

.noti-bell {
  position: relative;
  cursor: pointer;
  font-size: 1.6rem;
  margin-left: 1.2rem;
}
.noti-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e11d48;
  color: #fff;
  border-radius: 9999px;
  padding: 0 7px;
  font-size: 0.85rem;
  font-weight: bold;
  min-width: 22px;
  text-align: center;
  box-shadow: 0 0 0 2px #fff;
  transition: transform 0.2s;
}
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-6px);}
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