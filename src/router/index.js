import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWord from '../components/HelloWord.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HelloWord',
    component: HelloWord
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
