import Vue from 'vue'
import Router from 'vue-router'
import shopcar from '@/components/shopcar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shopcar',
      component: shopcar
    }
  ]
})
