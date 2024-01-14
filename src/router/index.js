import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import axios from 'axios'
import { authGuard } from '../utils/connexion.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: () => import('../views/RecipeView.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/ConnexionView.vue')
    },
    {
      path: '/montres',
      name: 'montres',
      component: () => import('../views/montreView.vue')
    },
    {
      path: '/montres/:configId',
      name: 'MontreDetails',
      component: () => import('../views/[id].vue'),
      beforeEnter: authGuard
    },

    {
      path: '/add-watch',
      name: 'addWatch',
      component: () => import('../views/addWatchView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/panier/:userId',
      name: 'panier',
      component: () => import('../views/PanierView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/three',
      name: 'three',
      component: () => import('../views/ThreeView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: authGuard
    },
    {
      path: '/try',
      name: 'try',
      component: () => import('../views/TryView.vue')
    }
  ]
})

export default router
