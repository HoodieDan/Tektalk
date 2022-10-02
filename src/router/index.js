import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('../views/UserProfile.vue')
    },
  ]
})

export default router
