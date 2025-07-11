<template>
  <div>
    <NavMenu />
    <main class="auth-container">
      <h2>Registro</h2>
      <form @submit.prevent="register">
        <label>Nombre:</label>
        <input type="text" v-model="name" required />

        <label>Email:</label>
        <input type="email" v-model="email" required />

        <label>Contraseña:</label>
        <input type="password" v-model="password" required />

        <button type="submit">Registrarse</button>
      </form>
      <div v-if="error" style="color:red;">{{ error }}</div>
      <div v-if="success" style="color:green;">Registro exitoso, ahora puedes iniciar sesión</div>
      <p>¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión aquí</RouterLink></p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)
const router = useRouter()

async function register() {
  error.value = ''
  success.value = false
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
   
    if ((res.status === 201 && res.data) || (res.data && res.data.id_huesped)) {
      success.value = true
      setTimeout(() => {
        router.push('/login')
      }, 1200) 
    } else {
      error.value = 'Respuesta inesperada del servidor'
    }
  } catch (e) {
    if (e.response?.data) {
      if (typeof e.response.data === 'object') {
        error.value = Object.values(e.response.data).flat().join(', ')
      } else {
        error.value = e.response.data
      }
    } else {
      error.value = 'Error al registrar'
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