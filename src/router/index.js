import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    // 发现音乐
    path: '/discovery',
    component: () => import('@/views/01.discovery')
  },
  {
    // 推荐歌单
    path: '/playlists',
    component: () => import('@/views/02.playlists')
  },
  {
    // 最新音乐
    path: '/songs',
    component: () => import('@/views/03.songs')
  },
  {
    // 最新MV
    path: '/mvs',
    component: () => import('@/views/04.mvs')
  },
  {
    // 搜索结果页
    path: '/result',
    component: () => import('@/views/05.result')
  }
]

const router = new VueRouter({
  routes
})

export default router
