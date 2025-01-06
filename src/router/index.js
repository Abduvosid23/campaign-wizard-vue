import { createRouter, createWebHistory } from 'vue-router'
import {HomeView, AddFormView , AboutView} from '@/views/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:
      [
          {path: '/', name: 'home', component: HomeView},
          {path: '/add-form', name:'add-form', component:AddFormView},
          {path: '/about', name:'about', component:AboutView}
      ]
})

export default router
