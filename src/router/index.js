import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        requiresAuth: true,
      },
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
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/PostDetails.vue')
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: () => import('../views/AuthPage.vue')
    },
    {
      path: '/Auth/SignIn',
      alias: '/SignIn',
      name: 'SignIn',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/Auth/SignUp',
      alias: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/Settings',
      name: 'Settings',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/SettingsPage.vue')
    },
  ]
})

// check all routes to see if the require authentication to be opened 
router.beforeEach((to, from, next) => {
  const auth = authStore();
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (auth.userLoggedIn) {
    next();
  } else {
    next({ name: 'Auth' });
  }
});

export default router
