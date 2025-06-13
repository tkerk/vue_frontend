<template>
  <NavMenu />
  <h1>Crear Nueva Multa</h1>
  <p>Complete el formulario para crear una nueva multa.</p>
  <form @submit.prevent="crearMulta">
    <div>
      <label>Cantidad:</label>
      <input v-model="form.cantidad" type="number" min="0" required />
    </div>
    <div>
      <label>Razón:</label>
      <input v-model="form.razon" type="text" maxlength="255" required />
    </div>
    <div>
      <label>Emitido a las:</label>
      <input v-model="form.emitido_a_las" type="datetime-local" required />
    </div>
    <div>
      <label>Estatus:</label>
      <select v-model="form.estatus" required>
        <option value="pendiente">Pendiente</option>
        <option value="pagada">Pagada</option>
      </select>
    </div>
    <button type="submit">Crear Multa</button>
    <div v-if="error" style="color:red;">{{ error }}</div>
    <div v-if="success" style="color:green;">Multa creada correctamente</div>
  </form>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavMenu from '../components/NavMenu.vue';

const form = ref({
  cantidad: '',
  razon: '',
  emitido_a_las: '',
  estatus: 'pendiente',
})

const error = ref('')
const success = ref(false)
const notificaciones = ref([])
let intervalId = null

async function crearMulta() {
  error.value = ''
  success.value = false
  try {
    const res = await fetch('http://127.0.0.1:8000/api/multas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        id_huesped: '12345',
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      error.value = data.errors ? Object.values(data.errors).flat().join(', ') : 'Error al crear multa'
    } else {
      success.value = true
      form.value = { cantidad: '', razon: '', emitido_a_las: '', estatus: 'pendiente' }
    }
  } catch (e) {
    error.value = 'Error de conexión'
  }
}

async function obtenernuevasmultas() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/multas/recientes')
    const data = await res.json()
    notificaciones.value = data
    console.log('Multas recientes:', JSON.stringify(data))
  } catch (error) {
    console.error('Error al obtener multas recientes:', error)
  }
}

onMounted(() => {
  obtenernuevasmultas()
  intervalId = setInterval(obtenernuevasmultas, 6000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>