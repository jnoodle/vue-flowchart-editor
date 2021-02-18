import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './demo.vue'

// https://www.iconfont.cn/ Customize Icons
// projectId=1546640
import './iconfont'
Vue.use(ElementUI)
const app = new Vue({
  render: (h) => h(App),
}).$mount('#app')
