import Vue from 'vue'
import Router from 'vue-router'
import shopmall from '@/components/pages/shoppingMall.vue'//这里的@代表的是项目的src目录。

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'shoppingmall',
      component: shopmall
    }
  ]
})
