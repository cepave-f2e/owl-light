import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'

new Vue({
  router,
  store,
  ...App
}).$mount('#app')
