import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
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
      path: '/:username',
      name: 'Profile',
      component: () => import('../views/UserProfile.vue')
    },
    {
      path: '/post/:postID',
      name: 'Post',
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
    {
      path: '/Settings/EditProfile',
      name: 'EditProfile',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/EditProfile.vue')
    },
    {
      path: '/Talks',
      name: 'Talks',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/TalksPage.vue')
    },
    {
      path: '/Notifications',
      name: 'Notifications',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/NotificationPage.vue')
    },
    {
      path: '/ErrorPage',
      name: 'Error',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/ErrorPage.vue')
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' },
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
