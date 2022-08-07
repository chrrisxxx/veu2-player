import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局初始化 css 样式
import '@/assets/index.css'

// 导入 ElementUI 组件库
import ElementUI from 'element-ui'

// // 导入 ElementUI 样式文件
import 'element-ui/lib/theme-chalk/index.css'

// 将 ElementUI 配置为 Vue 的插件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
