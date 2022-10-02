import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/profile/:username',
      name: 'Profile',
      component: () => import('../views/UserProfile.vue')
    },
    {
      path: '/post/:postID',
      name: 'Post',
      component: () => import('../views/PostDetails.vue')
    },
  ]
})

export default router
