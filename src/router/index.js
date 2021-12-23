import Vue from 'vue'
import Router from 'vue-router'
import ShopMall from '@/components/pages/shoppingMall.vue'//这里的@代表的是项目的src目录。
import Register from '@/components/pages/register.vue'
import Login from '@/components/pages/login.vue'
import Goods from '@/components/pages/goods.vue'
import CategoryList from '@/components/pages/categoryList.vue'
import Cart from '@/components/pages/cart.vue'
import Main from '@/components/pages/main.vue'
import Member from '@/components/pages/member.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children:[
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShopMall
        },
        {
          path: '/member',
          name: 'Member',
          component: Member
        },
        {
          path: '/categorylist',
          name: 'CategoryList',
          component: CategoryList
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        }
      ]
    },
    {
      path: '/',
      redirect:'/main'
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },

  ]
})
