import App from './App'
import i18n from './locale/index'


// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.prototype._i18n = i18n; //作为属性挂载
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  i18n,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app
  }
}
// #endif
