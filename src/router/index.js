import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWord from '../components/HelloWord.vue'
import justPage from '../components/justPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HelloWord',
    component: HelloWord
  },
  {
    path:'/justPage',
    name:'justPage',
    component:justPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
