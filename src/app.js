import Vue from 'vue'
import router from './router'
import store from './store'
import s from './app.scss'

module.exports = new Vue({
  router,
  store,
  render(h) {
    return (
      <div id="app" class={s.app}>
        <router-view />
      </div>
    )
  }
})
