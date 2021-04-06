import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/s/deadpool',
    name: 'Deadpool',
    component: () => import('../pages/stages/Deadpool.vue')
  },
  {
    path: '/s/brucelee',
    name: 'Brucelee',
    component: () => import('../pages/stages/Brucelee.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
