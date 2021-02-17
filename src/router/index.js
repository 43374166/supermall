import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('views/home/Home.vue')
  },
  {
    path: '/category',
    component: () => import('views/category/Category')
  },
  {
    path: '/shopcart',
    component: () => import('views/shopcart/Shopcart')
  },
  {
    path: '/profile',
    component: () => import('views/profile/Profile')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 解决NavigationDuplicated: Avoided redundant navigation to current location(导航重复：避免了对当前位置的冗余导航：)
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
 	return originalPush.call(this, location).catch(err => err)
}

export default router