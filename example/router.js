import Vue from 'vue'
import Router from 'vue-router'

import index from './index'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  routes: [{
    path: '/index',
    name: 'index',
    component: index
  }, {
    path: '*',
    component: index
  }]
})

export default router
