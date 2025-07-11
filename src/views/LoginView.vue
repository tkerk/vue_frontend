<template>
  <div>
    <NavMenu />
    <main class="auth-container">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="login">
        <label>Email:</label>
        <input type="email" v-model="email" required />

        <label>Contraseña:</label>
        <input type="password" v-model="password" required />

        <button type="submit">Entrar</button>
      </form>
      <div v-if="error" style="color:red;">{{ error }}</div>
      <p>¿No tienes cuenta? <RouterLink to="/registro">Regístrate aquí</RouterLink></p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value,
    })
    if (res.data && res.data.id_huesped) {
      localStorage.setItem('id_huesped', res.data.id_huesped)
      router.push('/principal')
    } else {
      error.value = 'Respuesta inesperada del servidor'
    }
  } catch (e) {
    if (e.response?.status === 422 && e.response?.data) {
      error.value = Object.values(e.response.data).flat().join(', ')
    } else if (e.response?.status === 401) {
      error.value = 'Credenciales inválidas'
    } else {
      error.value = e.response?.data?.error || 'Error al iniciar sesión'
    }
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto 0;
  padding: 2rem;
  background: #222;
  border-radius: 8px;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}
label {
  display: block;
  margin-top: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border-radius: 4px;
  border: none;
  margin-bottom: 0.5rem;
}
button {
  width: 100%;
  padding: 0.7rem;
  background: #00bcd4;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;
}
button:hover {
  background: #0097a7;
}
</style>