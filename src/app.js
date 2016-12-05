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
        hello owl-light!
        <ul>
          <li>
            <router-link to="/alarm">Alarm</router-link>
          </li>
          <li>
            <router-link to="/graph">Graph</router-link>
          </li>
          <li>
            <router-link to="/vuex">Vuex Sample</router-link>
          </li>
        </ul>
        <router-view />
      </div>
    )
  }
})
