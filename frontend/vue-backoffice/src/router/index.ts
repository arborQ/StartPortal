import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ManufacturerRoutes from '../views/Manufacturers/Manufacturer.Routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  ManufacturerRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
