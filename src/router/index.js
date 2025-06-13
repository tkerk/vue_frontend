import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Multaview from '../views/Multaview.vue'
import Principalview from '../views/Principalview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/multa',
      name: 'Multa',
      component: Multaview,
    },
    {
      path: '/principal',
      name: 'Principal',
      component: Principalview,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
