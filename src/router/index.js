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
    path: '/character-3d',
    name: 'Character 3D',
    component: () => import('../pages/CharacterModel.vue')
  },
  {
    path: '/sprite1',
    name: 'Sprite #1',
    component: () => import('../pages/Sprite1.vue')
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
