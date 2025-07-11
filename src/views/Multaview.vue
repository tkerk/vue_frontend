<template>
  <NavMenu />
  <div class="main-content max-w-2xl mx-auto p-6">
    
    <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Crear Nueva Multa</h1>
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
        <p class="text-blue-700">Complete el formulario para crear una nueva multa.</p>
      </div>
      <form @submit.prevent="crearMulta" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Usuario (Huésped):</label>
          <select v-model="form.id_huesped" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="" disabled>Seleccione un usuario</option>
            <option v-for="usuario in usuarios" :key="usuario.id_huesped" :value="usuario.id_huesped">
              {{ usuario.name }} ({{ usuario.email }})
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Cantidad:</label>
          <input v-model="form.cantidad" type="number" min="0" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Razón:</label>
          <input v-model="form.razon" type="text" maxlength="255" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Emitido a las:</label>
          <input v-model="form.emitido_a_las" type="datetime-local" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Estatus:</label>
          <select v-model="form.estatus" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="pendiente">Pendiente</option>
            <option value="pagada">Pagada</option>
          </select>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition" :disabled="isLoading">
          <span v-if="isLoading" class="animate-spin mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13.875 18.825A6.978 6.978 0 0018 12M6 12a6.978 6.978 0 004.125 6.825M12 6V4.125M12 20.875V19m8.485-8.485A9.95 9.95 0 0112 4.125M4.515 4.515A9.95 9.95 0 0112 19.875M19.875 12A9.95 9.95 0 0112 19.875M4.125 12A9.95 9.95 0 0112 4.125" />
            </svg>
          </span>
          Crear Multa
        </button>
        <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
          <p class="text-red-700">{{ error }}</p>
        </div>
      
      </form>
    </div>

    
    <transition name="slide-modal">
      <div v-if="showSuccessModal || isLoading || error" class="modal-overlay">
        <div class="modal-content">
          <template v-if="isLoading">
            <div class="loader-circle"></div>
            <div class="text-gray-400 mt-4">Registrando multa...</div>
          </template>
          <template v-else-if="error">
            <div class="text-2xl mb-2 text-red-600 font-bold">¡Error!</div>
            <div class="text-gray-700 mb-4">{{ error }}</div>
            <button @click="error = ''" class="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Cerrar</button>
          </template>
          <template v-else>
            <div class="text-2xl mb-2 text-blue-600 font-bold">¡Registro exitoso!</div>
            <div class="text-gray-700 mb-4">La multa fue registrada correctamente.</div>
            <button @click="showSuccessModal = false" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Cerrar</button>
          </template>
        </div>
      </div>
    </transition>

    
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div
        v-for="n in notificaciones"
        :key="n.id"
        class="bg-white border-l-4 border-blue-500 shadow-lg rounded px-4 py-3 relative max-w-xs"
        role="alert"
      >
        <button
          @click="cerrarNotificacion(n.id)"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          aria-label="Cerrar"
        >
          ×
        </button>
        <div class="font-bold text-blue-700">Nueva multa</div>
        <div class="text-gray-800">{{ n.razon }} - ${{ n.cantidad }}</div>
        <div class="text-xs text-gray-500">Emitido: {{ new Date(n.emitido_a_las).toLocaleString() }}</div>
        <div class="text-xs text-gray-500">Notificado: {{ new Date(n.notificado_en).toLocaleString() }}</div>
        <span v-if="n.estatus === 'pendiente'" class="text-red-600 font-semibold">Pendiente</span>
        <span v-else class="text-green-600 font-semibold">Pagada</span>
      </div>
    </div>

    
    <div v-if="multasRecientes.length" class="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Multas recientes (tuyas)</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="multa in multasRecientes" :key="multa.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ multa.razon }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ multa.cantidad }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm" :style="{ color: multa.estatus === 'pendiente' ? 'red' : 'green' }">{{ multa.estatus }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ new Date(multa.emitido_a_las).toLocaleString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <em v-if="!multa.visualizado">(No visto)</em>
                <span v-else>(Visto)</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    
    <div v-if="multaReciente" class="bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Tu multa más reciente</h2>
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div class="font-bold text-blue-700">{{ multaReciente.razon }}</div>
        <div class="text-gray-800">Cantidad: ${{ multaReciente.cantidad }}</div>
        <div class="text-gray-800">Estatus: <span :style="{ color: multaReciente.estatus === 'pendiente' ? 'red' : 'green' }">{{ multaReciente.estatus }}</span></div>
        <div class="text-sm text-gray-500">Emitido: {{ new Date(multaReciente.emitido_a_las).toLocaleString() }}</div>
        <div class="text-sm text-gray-500" v-if="!multaReciente.visualizado"><em>(No visto)</em></div>
        <div class="text-sm text-gray-500" v-else>(Visto)</div>
      </div>
    </div>

    
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import NavMenu from '../components/NavMenu.vue'

const form = ref({
  id_huesped: '',
  cantidad: '',
  razon: '',
  emitido_a_las: '',
  estatus: 'pendiente',
})

const usuarios = ref([])
const error = ref('')
const success = ref(false)
const multasRecientes = ref([])
const multaReciente = ref(null)
const notificaciones = ref([])
const showSuccessModal = ref(false)
const isLoading = ref(false) 
let intervalId = null


async function obtenerUsuarios() {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/usuarios')
    usuarios.value = res.data
  } catch (e) {
    error.value = 'Error al cargar usuarios'
  }
}


async function crearMulta() {
  error.value = ''
  success.value = false
  isLoading.value = true
  try {
    let emitido = form.value.emitido_a_las
    if (emitido && emitido.includes('T')) {
      emitido = emitido.replace('T', ' ') + ':00'
    }
    const payload = {
      id_huesped: form.value.id_huesped,
      cantidad: form.value.cantidad,
      razon: form.value.razon,
      emitido_a_las: emitido,
      estatus: form.value.estatus,
    }
    await axios.post('http://127.0.0.1:8000/api/multas', payload)
    success.value = true
    form.value = { id_huesped: '', cantidad: '', razon: '', emitido_a_las: '', estatus: 'pendiente' }
    await obtenerMultasUsuario()
    await obtenerMultaReciente()
    await obtenerNotificaciones()
    showSuccessModal.value = true
    setTimeout(() => { showSuccessModal.value = false }, 3000)
  } catch (e) {
    if (e.response && e.response.data && e.response.data.errors) {
      error.value = Object.values(e.response.data.errors).flat().join(', ')
    } else {
      error.value = 'Error al crear multa'
    }
  } finally {
    isLoading.value = false
  }
}


async function obtenerMultasUsuario() {
  const id_huesped = localStorage.getItem('id_huesped')
  if (!id_huesped) return
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/multas/huesped/${id_huesped}`)
    multasRecientes.value = Array.isArray(res.data) ? res.data : []
  } catch (e) {}
}


async function obtenerMultaReciente() {
  const id_huesped = localStorage.getItem('id_huesped')
  if (!id_huesped) return
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/multas/reciente/${id_huesped}`)
    multaReciente.value = res.data && res.data.id ? res.data : null
  } catch (e) {}
}


async function obtenerNotificaciones() {
  const id_huesped = localStorage.getItem('id_huesped')
  if (!id_huesped) return
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/multas/huesped/${id_huesped}`)
    if (Array.isArray(res.data)) {
      notificaciones.value = res.data
        .filter(m => !m.visualizado)
        .sort((a, b) => new Date(b.notificado_en) - new Date(a.notificado_en))
    }
  } catch (e) {}
}

function cerrarNotificacion(id) {
  notificaciones.value = notificaciones.value.filter(n => n.id !== id)
}

function startPolling() {
  intervalId = setInterval(async () => {
    await obtenerMultasUsuario()
    await obtenerMultaReciente()
    await obtenerNotificaciones()
  }, 8000)
}

onMounted(async () => {
  await obtenerUsuarios()
  await obtenerMultasUsuario()
  await obtenerMultaReciente()
  await obtenerNotificaciones()
  startPolling()
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style>
.slide-modal-enter-active, .slide-modal-leave-active {
  transition: all 0.4s cubic-bezier(.4,0,.2,1);
}
.slide-modal-enter-from {
  opacity: 0;
  transform: translateY(-40px) scale(0.98);
}
.slide-modal-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.slide-modal-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.slide-modal-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.98);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background-color: rgb(11, 11, 11);
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loader-circle {
  margin: 0 auto;
  width: 48px;
  height: 48px;
  border: 4px solid #00bcd4;
  border-top: 4px solid #fff;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.main-content {
  margin-top: 80px; 
}
</style>